import { prisma } from "@/lib/prisma";
import { EquipeClient } from "./client";

async function getMembros() {
  const membros = await prisma.membroEquipe.findMany({
    orderBy: { ordem: "asc" },
  });
  return membros;
}

export default async function EquipePage() {
  const membros = await getMembros();

  return <EquipeClient membros={membros} />;
}
