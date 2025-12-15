import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MembroEditor } from "./editor";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MembroDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (id === "novo") {
    return <MembroEditor membro={null} />;
  }

  const membro = await prisma.membroEquipe.findUnique({
    where: { id },
  });

  if (!membro) {
    notFound();
  }

  return <MembroEditor membro={membro} />;
}
