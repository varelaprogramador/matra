import { prisma } from "@/lib/prisma";
import { LeadsClient } from "./client";

async function getLeads() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
  return leads;
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return <LeadsClient leads={leads} />;
}
