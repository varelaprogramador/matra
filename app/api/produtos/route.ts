import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const produtoSchema = z.object({
  nome: z.string().min(1, "Nome e obrigatorio"),
  descricao: z.string().min(1, "Descricao e obrigatoria"),
  descricaoLonga: z.string().optional().nullable(),
  icone: z.string().optional().nullable(),
  imagem: z.string().optional().nullable(),
  imagens: z.array(z.string()).optional(),
  link: z.string().optional().nullable(),
  tecnologias: z.array(z.string()).optional(),
  destaque: z.boolean().optional(),
  ordem: z.number().optional(),
  ativo: z.boolean().optional(),
});

// GET - Listar produtos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ativos = searchParams.get("ativos") === "true";

    const produtos = await prisma.produto.findMany({
      where: ativos ? { ativo: true } : undefined,
      orderBy: { ordem: "asc" },
    });

    return NextResponse.json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

// POST - Criar produto
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const data = produtoSchema.parse(body);

    const produto = await prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        descricaoLonga: data.descricaoLonga || null,
        icone: data.icone || null,
        imagem: data.imagem || null,
        imagens: data.imagens || [],
        link: data.link || null,
        tecnologias: data.tecnologias || [],
        destaque: data.destaque || false,
        ordem: data.ordem || 0,
        ativo: data.ativo ?? true,
      },
    });

    return NextResponse.json(produto, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}
