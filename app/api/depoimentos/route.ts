import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const depoimentoSchema = z.object({
  nome: z.string().min(1, "Nome e obrigatorio"),
  cargo: z.string().min(1, "Cargo e obrigatorio"),
  empresa: z.string().min(1, "Empresa e obrigatoria"),
  texto: z.string().min(1, "Texto e obrigatorio"),
  avatar: z.string().optional(),
  nota: z.number().min(1).max(5).optional(),
  ordem: z.number().optional(),
  ativo: z.boolean().optional(),
});

// GET - Listar depoimentos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ativos = searchParams.get("ativos") === "true";

    const depoimentos = await prisma.depoimento.findMany({
      where: ativos ? { ativo: true } : undefined,
      orderBy: { ordem: "asc" },
    });

    return NextResponse.json(depoimentos);
  } catch (error) {
    console.error("Erro ao buscar depoimentos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar depoimentos" },
      { status: 500 }
    );
  }
}

// POST - Criar depoimento
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const data = depoimentoSchema.parse(body);

    const depoimento = await prisma.depoimento.create({
      data,
    });

    return NextResponse.json(depoimento, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Erro ao criar depoimento:", error);
    return NextResponse.json(
      { error: "Erro ao criar depoimento" },
      { status: 500 }
    );
  }
}
