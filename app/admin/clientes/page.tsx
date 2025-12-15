import { prisma } from "@/lib/prisma";
import { ClientesClient } from "./client";

async function getClientes() {
  const clientes = await prisma.cliente.findMany({
    orderBy: { ordem: "asc" },
  });
  return clientes;
}

export default async function ClientesPage() {
  const clientes = await getClientes();

  return <ClientesClient clientes={clientes} />;
}
