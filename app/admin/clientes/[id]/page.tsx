import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ClienteEditor } from "./editor";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClienteDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (id === "novo") {
    return <ClienteEditor cliente={null} />;
  }

  const cliente = await prisma.cliente.findUnique({
    where: { id },
  });

  if (!cliente) {
    notFound();
  }

  return <ClienteEditor cliente={cliente} />;
}
