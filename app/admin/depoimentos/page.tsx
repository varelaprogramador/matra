import { prisma } from "@/lib/prisma";
import { DepoimentosClient } from "./client";

async function getDepoimentos() {
  const depoimentos = await prisma.depoimento.findMany({
    orderBy: { ordem: "asc" },
  });
  return depoimentos;
}

export default async function DepoimentosPage() {
  const depoimentos = await getDepoimentos();

  return <DepoimentosClient depoimentos={depoimentos} />;
}
