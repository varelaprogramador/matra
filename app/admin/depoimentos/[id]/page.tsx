import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DepoimentoEditor } from "./editor";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DepoimentoDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (id === "novo") {
    return <DepoimentoEditor depoimento={null} />;
  }

  const depoimento = await prisma.depoimento.findUnique({
    where: { id },
  });

  if (!depoimento) {
    notFound();
  }

  return <DepoimentoEditor depoimento={depoimento} />;
}
