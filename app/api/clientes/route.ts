import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const clienteSchema = z.object({
  nome: z.string().min(1, "Nome e obrigatorio"),
  logo: z.string().optional(),
  site: z.string().optional(),
  ordem: z.number().optional(),
  ativo: z.boolean().optional(),
});

// GET - Listar clientes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ativos = searchParams.get("ativos") === "true";

    const clientes = await prisma.cliente.findMany({
      where: ativos ? { ativo: true } : undefined,
      orderBy: { ordem: "asc" },
    });

    return NextResponse.json(clientes);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return NextResponse.json(
      { error: "Erro ao buscar clientes" },
      { status: 500 }
    );
  }
}

// POST - Criar cliente
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const data = clienteSchema.parse(body);

    const cliente = await prisma.cliente.create({
      data,
    });

    return NextResponse.json(cliente, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Erro ao criar cliente:", error);
    return NextResponse.json(
      { error: "Erro ao criar cliente" },
      { status: 500 }
    );
  }
}
