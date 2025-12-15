import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const membroSchema = z.object({
  nome: z.string().min(1, "Nome e obrigatorio"),
  cargo: z.string().min(1, "Cargo e obrigatorio"),
  descricao: z.string().optional().nullable(),
  foto: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  ordem: z.number().optional(),
  ativo: z.boolean().optional(),
});

// GET - Listar membros da equipe
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ativos = searchParams.get("ativos") === "true";

    const membros = await prisma.membroEquipe.findMany({
      where: ativos ? { ativo: true } : undefined,
      orderBy: { ordem: "asc" },
    });

    return NextResponse.json(membros);
  } catch (error) {
    console.error("Erro ao buscar membros:", error);
    return NextResponse.json(
      { error: "Erro ao buscar membros da equipe" },
      { status: 500 }
    );
  }
}

// POST - Criar membro da equipe
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const data = membroSchema.parse(body);

    const membro = await prisma.membroEquipe.create({
      data,
    });

    return NextResponse.json(membro, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Erro ao criar membro:", error);
    return NextResponse.json(
      { error: "Erro ao criar membro da equipe" },
      { status: 500 }
    );
  }
}
