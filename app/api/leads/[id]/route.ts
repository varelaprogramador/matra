import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateLeadSchema = z.object({
  status: z.enum(["NOVO", "CONTATADO", "EM_NEGOCIACAO", "CONVERTIDO", "PERDIDO"]).optional(),
  notas: z.string().optional(),
});

// GET - Buscar lead por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead nao encontrado" }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error("Erro ao buscar lead:", error);
    return NextResponse.json(
      { error: "Erro ao buscar lead" },
      { status: 500 }
    );
  }
}

// PATCH - Atualizar status/notas do lead
export async function PATCH(
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
    const data = updateLeadSchema.parse(body);

    const lead = await prisma.lead.update({
      where: { id },
      data,
    });

    return NextResponse.json(lead);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Erro ao atualizar lead:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar lead" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir lead
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

    await prisma.lead.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir lead:", error);
    return NextResponse.json(
      { error: "Erro ao excluir lead" },
      { status: 500 }
    );
  }
}
