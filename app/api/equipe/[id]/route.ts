import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const membroSchema = z.object({
  nome: z.string().min(1, "Nome e obrigatorio").optional(),
  cargo: z.string().min(1, "Cargo e obrigatorio").optional(),
  descricao: z.string().optional().nullable(),
  foto: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  ordem: z.number().optional(),
  ativo: z.boolean().optional(),
});

// GET - Buscar membro por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const membro = await prisma.membroEquipe.findUnique({
      where: { id },
    });

    if (!membro) {
      return NextResponse.json(
        { error: "Membro nao encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(membro);
  } catch (error) {
    console.error("Erro ao buscar membro:", error);
    return NextResponse.json(
      { error: "Erro ao buscar membro" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar membro
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
    const data = membroSchema.parse(body);

    const membro = await prisma.membroEquipe.update({
      where: { id },
      data,
    });

    return NextResponse.json(membro);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Erro ao atualizar membro:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar membro" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir membro
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
    await prisma.membroEquipe.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir membro:", error);
    return NextResponse.json(
      { error: "Erro ao excluir membro" },
      { status: 500 }
    );
  }
}
