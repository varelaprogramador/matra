import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProdutoEditor } from "./editor";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProdutoDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (id === "novo") {
    return <ProdutoEditor produto={null} />;
  }

  const produto = await prisma.produto.findUnique({
    where: { id },
  });

  if (!produto) {
    notFound();
  }

  return <ProdutoEditor produto={produto} />;
}
