"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Search,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  ChevronDown,
  ExternalLink,
  Inbox,
  Filter,
  Eye,
  X,
} from "lucide-react";

type LeadStatus = "NOVO" | "CONTATADO" | "EM_NEGOCIACAO" | "CONVERTIDO" | "PERDIDO";

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  mensagem: string;
  origem: string;
  status: LeadStatus;
  notas: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const statusConfig: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  NOVO: { label: "Novo", color: "text-blue-400", bg: "bg-blue-500/10" },
  CONTATADO: { label: "Contatado", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  EM_NEGOCIACAO: { label: "Em Negociacao", color: "text-purple-400", bg: "bg-purple-500/10" },
  CONVERTIDO: { label: "Convertido", color: "text-green-400", bg: "bg-green-500/10" },
  PERDIDO: { label: "Perdido", color: "text-zinc-400", bg: "bg-zinc-500/10" },
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatWhatsApp(phone: string) {
  const cleaned = phone.replace(/\D/g, "");
  return `https://wa.me/${cleaned}`;
}

export function LeadsClient({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "TODOS">("TODOS");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.nome.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.mensagem.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "TODOS" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    TODOS: leads.length,
    NOVO: leads.filter((l) => l.status === "NOVO").length,
    CONTATADO: leads.filter((l) => l.status === "CONTATADO").length,
    EM_NEGOCIACAO: leads.filter((l) => l.status === "EM_NEGOCIACAO").length,
    CONVERTIDO: leads.filter((l) => l.status === "CONVERTIDO").length,
    PERDIDO: leads.filter((l) => l.status === "PERDIDO").length,
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir");
      router.refresh();
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir lead");
    } finally {
      setDeletingId(null);
    }
  };

  const updateStatus = async (id: string, status: LeadStatus) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao atualizar status");
    }
  };

  const saveNotes = async () => {
    if (!selectedLead) return;

    try {
      const response = await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notas: notes }),
      });

      if (!response.ok) throw new Error("Erro ao salvar");
      router.refresh();
      setEditingNotes(false);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao salvar notas");
    }
  };

  const openLeadDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setNotes(lead.notas || "");
    setEditingNotes(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="text-zinc-400">
          {leads.length} leads recebidos | {statusCounts.NOVO} novos
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar leads..."
              className="w-64 rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-zinc-700 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "TODOS")}
              className="appearance-none rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-10 text-sm text-white focus:border-zinc-700 focus:outline-none"
            >
              <option value="TODOS">Todos ({statusCounts.TODOS})</option>
              <option value="NOVO">Novos ({statusCounts.NOVO})</option>
              <option value="CONTATADO">Contatados ({statusCounts.CONTATADO})</option>
              <option value="EM_NEGOCIACAO">Em Negociacao ({statusCounts.EM_NEGOCIACAO})</option>
              <option value="CONVERTIDO">Convertidos ({statusCounts.CONVERTIDO})</option>
              <option value="PERDIDO">Perdidos ({statusCounts.PERDIDO})</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Status Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["TODOS", "NOVO", "CONTATADO", "EM_NEGOCIACAO", "CONVERTIDO", "PERDIDO"] as const).map(
          (status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === status
                  ? status === "TODOS"
                    ? "bg-white text-black"
                    : `${statusConfig[status as LeadStatus].bg} ${statusConfig[status as LeadStatus].color}`
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {status === "TODOS" ? "Todos" : statusConfig[status as LeadStatus].label} (
              {statusCounts[status]})
            </button>
          )
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full">
          <thead className="border-b border-zinc-800 bg-zinc-900/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Lead</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Contato</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Mensagem</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-zinc-400">Status</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-zinc-400">Data</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <Inbox className="mx-auto h-12 w-12 text-zinc-600" />
                  <p className="mt-4 text-zinc-500">Nenhum lead encontrado</p>
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="bg-zinc-900/30 hover:bg-zinc-900/50 cursor-pointer"
                  onClick={() => openLeadDetail(lead)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-white font-medium">
                        {lead.nome.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-white">{lead.nome}</p>
                        <p className="text-xs text-zinc-500">{lead.origem}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-sm text-zinc-300">
                        <Mail className="h-3.5 w-3.5 text-zinc-500" />
                        {lead.email}
                      </p>
                      {lead.telefone && (
                        <p className="flex items-center gap-2 text-sm text-zinc-400">
                          <Phone className="h-3.5 w-3.5 text-zinc-500" />
                          {lead.telefone}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="max-w-xs truncate text-sm text-zinc-400">{lead.mensagem}</p>
                  </td>
                  <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                      className={`appearance-none rounded-full px-3 py-1 text-xs font-medium ${statusConfig[lead.status].bg} ${statusConfig[lead.status].color} border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-600`}
                    >
                      {Object.entries(statusConfig).map(([key, { label }]) => (
                        <option key={key} value={key} className="bg-zinc-900 text-white">
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <p className="flex items-center justify-center gap-1.5 text-sm text-zinc-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(lead.createdAt)}
                    </p>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openLeadDetail(lead)}
                        className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        title="Ver detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {lead.telefone && (
                        <a
                          href={formatWhatsApp(lead.telefone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-zinc-400 hover:bg-green-500/10 hover:text-green-500"
                          title="WhatsApp"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(lead.id)}
                        disabled={deletingId === lead.id}
                        className="rounded-lg p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-xl font-medium text-white">
                  {selectedLead.nome.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedLead.nome}</h2>
                  <p className="text-sm text-zinc-400">
                    {formatDate(selectedLead.createdAt)} via {selectedLead.origem}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-4">
                  <p className="mb-1 text-xs font-medium uppercase text-zinc-500">Email</p>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex items-center gap-2 text-white hover:text-blue-400"
                  >
                    <Mail className="h-4 w-4" />
                    {selectedLead.email}
                  </a>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-4">
                  <p className="mb-1 text-xs font-medium uppercase text-zinc-500">Telefone</p>
                  {selectedLead.telefone ? (
                    <a
                      href={formatWhatsApp(selectedLead.telefone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-green-400"
                    >
                      <Phone className="h-4 w-4" />
                      {selectedLead.telefone}
                    </a>
                  ) : (
                    <p className="text-zinc-500">Nao informado</p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase text-zinc-500">Status</p>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    updateStatus(selectedLead.id, e.target.value as LeadStatus);
                    setSelectedLead({ ...selectedLead, status: e.target.value as LeadStatus });
                  }}
                  className="w-full appearance-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white focus:border-zinc-600 focus:outline-none"
                >
                  {Object.entries(statusConfig).map(([key, { label }]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase text-zinc-500">Mensagem</p>
                <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-4">
                  <p className="whitespace-pre-wrap text-white">{selectedLead.mensagem}</p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase text-zinc-500">Notas Internas</p>
                  {!editingNotes && (
                    <button
                      onClick={() => setEditingNotes(true)}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Editar
                    </button>
                  )}
                </div>
                {editingNotes ? (
                  <div className="space-y-3">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
                      placeholder="Adicione notas sobre este lead..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveNotes}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setEditingNotes(false);
                          setNotes(selectedLead.notas || "");
                        }}
                        className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-4">
                    {selectedLead.notas ? (
                      <p className="whitespace-pre-wrap text-white">{selectedLead.notas}</p>
                    ) : (
                      <p className="text-zinc-500 italic">Nenhuma nota adicionada</p>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 border-t border-zinc-800 pt-6 sm:flex-row">
                {selectedLead.telefone && (
                  <a
                    href={formatWhatsApp(selectedLead.telefone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Abrir WhatsApp
                  </a>
                )}
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-700 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800"
                >
                  <Mail className="h-4 w-4" />
                  Enviar Email
                </a>
                <button
                  onClick={() => {
                    handleDelete(selectedLead.id);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/30 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
