import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const depoimentoSchema = z.object({
  nome: z.string().min(1, "Nome e obrigatorio").optional(),
  cargo: z.string().min(1, "Cargo e obrigatorio").optional(),
  empresa: z.string().min(1, "Empresa e obrigatoria").optional(),
  texto: z.string().min(1, "Texto e obrigatorio").optional(),
  avatar: z.string().optional().nullable(),
  nota: z.number().min(1).max(5).optional(),
  ordem: z.number().optional(),
  ativo: z.boolean().optional(),
});

// GET - Buscar depoimento por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const depoimento = await prisma.depoimento.findUnique({
      where: { id },
    });

    if (!depoimento) {
      return NextResponse.json(
        { error: "Depoimento nao encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(depoimento);
  } catch (error) {
    console.error("Erro ao buscar depoimento:", error);
    return NextResponse.json(
      { error: "Erro ao buscar depoimento" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar depoimento
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const data = depoimentoSchema.parse(body);

    const depoimento = await prisma.depoimento.update({
      where: { id },
      data,
    });

    return NextResponse.json(depoimento);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Erro ao atualizar depoimento:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar depoimento" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir depoimento
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.depoimento.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir depoimento:", error);
    return NextResponse.json(
      { error: "Erro ao excluir depoimento" },
      { status: 500 }
    );
  }
}
