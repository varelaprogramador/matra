import { prisma } from "@/lib/prisma";
import { ProdutosClient } from "./client";

async function getProdutos() {
  const produtos = await prisma.produto.findMany({
    orderBy: { ordem: "asc" },
  });
  return produtos;
}

export default async function ProdutosPage() {
  const produtos = await getProdutos();

  return <ProdutosClient produtos={produtos} />;
}
