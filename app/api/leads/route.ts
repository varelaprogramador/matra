import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const leadSchema = z.object({
  nome: z.string().min(1, "Nome e obrigatorio"),
  email: z.string().email("Email invalido").optional().or(z.literal("")),
  telefone: z.string().min(1, "Telefone e obrigatorio"),
  mensagem: z.string().min(1, "Mensagem e obrigatoria"),
  origem: z.string().optional(),
});

const updateLeadSchema = z.object({
  status: z.enum(["NOVO", "CONTATADO", "EM_NEGOCIACAO", "CONVERTIDO", "PERDIDO"]).optional(),
  notas: z.string().optional(),
});

// GET - Listar leads (requer autenticacao)
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const leads = await prisma.lead.findMany({
      where: status ? { status: status as "NOVO" | "CONTATADO" | "EM_NEGOCIACAO" | "CONVERTIDO" | "PERDIDO" } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Erro ao buscar leads:", error);
    return NextResponse.json(
      { error: "Erro ao buscar leads" },
      { status: 500 }
    );
  }
}

// POST - Criar lead (publico - vem do formulario do site)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: {
        nome: data.nome,
        email: data.email || null,
        telefone: data.telefone,
        mensagem: data.mensagem,
        origem: data.origem || "site",
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Erro ao criar lead:", error);
    return NextResponse.json(
      { error: "Erro ao criar lead" },
      { status: 500 }
    );
  }
}
