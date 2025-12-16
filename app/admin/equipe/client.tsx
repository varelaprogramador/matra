"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  MoreHorizontal,
  Search,
  LayoutGrid,
  List,
  Users,
  User,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";

interface MembroEquipe {
  id: string;
  nome: string;
  cargo: string;
  descricao: string | null;
  foto: string | null;
  linkedin: string | null;
  github: string | null;
  email: string | null;
  ordem: number;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Skeleton components for loading state
function GridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 animate-pulse"
        >
          <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-zinc-800" />
          <div className="text-center space-y-2">
            <div className="mx-auto h-5 w-32 rounded bg-zinc-800" />
            <div className="mx-auto h-4 w-24 rounded bg-zinc-800/50" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-4 w-4 rounded bg-zinc-800/50" />
            <div className="h-4 w-4 rounded bg-zinc-800/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full">
        <thead className="border-b border-zinc-800 bg-zinc-900/50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Membro</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Cargo</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-zinc-400">Links</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-zinc-400">Status</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">Acoes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="bg-zinc-900/30 animate-pulse">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-800" />
                  <div className="h-4 w-32 rounded bg-zinc-800" />
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 rounded bg-zinc-800/50" />
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <div className="h-4 w-4 rounded bg-zinc-800/50" />
                  <div className="h-4 w-4 rounded bg-zinc-800/50" />
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="mx-auto h-6 w-16 rounded-full bg-zinc-800/50" />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <div className="h-8 w-8 rounded-lg bg-zinc-800/50" />
                  <div className="h-8 w-8 rounded-lg bg-zinc-800/50" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EquipeClient({ membros, isLoading = false }: { membros: MembroEquipe[]; isLoading?: boolean }) {
  const router = useRouter();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filteredMembros = membros.filter(
    (m) =>
      m.nome.toLowerCase().includes(search.toLowerCase()) ||
      m.cargo.toLowerCase().includes(search.toLowerCase()) ||
      (m.descricao && m.descricao.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este membro?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/equipe/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir membro");
    } finally {
      setDeletingId(null);
      setMenuOpen(null);
    }
  };

  const toggleStatus = async (membro: MembroEquipe) => {
    try {
      const response = await fetch(`/api/equipe/${membro.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ativo: !membro.ativo }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
    }
    setMenuOpen(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Equipe</h1>
          <p className="text-zinc-400">
            {membros.length} membros cadastrados
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar membros..."
              className="w-64 rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-zinc-700 focus:outline-none"
            />
          </div>

          <div className="flex rounded-lg border border-zinc-800 bg-zinc-900">
            <button
              onClick={() => setView("grid")}
              className={`p-2 ${
                view === "grid"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 ${
                view === "list"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <Link
            href="/admin/equipe/novo"
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
          >
            <Plus className="h-4 w-4" />
            Novo Membro
          </Link>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMembros.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-zinc-600" />
              <p className="mt-4 text-zinc-500">Nenhum membro encontrado</p>
              <Link
                href="/admin/equipe/novo"
                className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                <Plus className="h-4 w-4" />
                Adicionar primeiro membro
              </Link>
            </div>
          ) : (
            filteredMembros.map((membro) => (
              <div
                key={membro.id}
                className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900"
              >
                {/* Menu Button */}
                <div className="absolute right-3 top-3 z-10">
                  <button
                    onClick={() =>
                      setMenuOpen(menuOpen === membro.id ? null : membro.id)
                    }
                    className="rounded-lg bg-zinc-900/80 p-1.5 text-zinc-400 backdrop-blur-sm hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  {menuOpen === membro.id && (
                    <div className="absolute right-0 top-10 min-w-[140px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl">
                      <Link
                        href={`/admin/equipe/${membro.id}`}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800"
                      >
                        <Pencil className="h-4 w-4" /> Editar
                      </Link>
                      <button
                        onClick={() => toggleStatus(membro)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800"
                      >
                        {membro.ativo ? (
                          <>
                            <EyeOff className="h-4 w-4" /> Desativar
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" /> Ativar
                          </>
                        )}
                      </button>
                      <hr className="border-zinc-800" />
                      <button
                        onClick={() => handleDelete(membro.id)}
                        disabled={deletingId === membro.id}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" /> Excluir
                      </button>
                    </div>
                  )}
                </div>

                {/* Badge */}
                {!membro.ativo && (
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-zinc-900/80 px-2 py-1 text-xs text-zinc-400 backdrop-blur-sm">
                      Inativo
                    </span>
                  </div>
                )}

                {/* Content */}
                <Link href={`/admin/equipe/${membro.id}`} className="block">
                  {/* Photo */}
                  <div className="mb-4 aspect-square overflow-hidden rounded-xl">
                    {membro.foto ? (
                      <img
                        src={membro.foto}
                        alt={membro.nome}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                        <User className="h-16 w-16 text-zinc-600" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <p className="font-semibold text-white">{membro.nome}</p>
                    <p className="text-sm text-zinc-500">{membro.cargo}</p>
                  </div>

                  {/* Social Links */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {membro.linkedin && (
                      <Linkedin className="h-4 w-4 text-zinc-500" />
                    )}
                    {membro.github && (
                      <Github className="h-4 w-4 text-zinc-500" />
                    )}
                    {membro.email && (
                      <Mail className="h-4 w-4 text-zinc-500" />
                    )}
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full">
            <thead className="border-b border-zinc-800 bg-zinc-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                  Membro
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                  Cargo
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-zinc-400">
                  Links
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-zinc-400">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredMembros.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                    Nenhum membro encontrado
                  </td>
                </tr>
              ) : (
                filteredMembros.map((membro) => (
                  <tr
                    key={membro.id}
                    className="bg-zinc-900/30 hover:bg-zinc-900/50"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/equipe/${membro.id}`}
                        className="flex items-center gap-3"
                      >
                        {membro.foto ? (
                          <img
                            src={membro.foto}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
                            <User className="h-5 w-5 text-zinc-500" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-white hover:text-blue-400">
                            {membro.nome}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-zinc-400">{membro.cargo}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        {membro.linkedin && (
                          <Linkedin className="h-4 w-4 text-zinc-500" />
                        )}
                        {membro.github && (
                          <Github className="h-4 w-4 text-zinc-500" />
                        )}
                        {membro.email && (
                          <Mail className="h-4 w-4 text-zinc-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          membro.ativo
                            ? "bg-green-500/10 text-green-500"
                            : "bg-zinc-500/10 text-zinc-500"
                        }`}
                      >
                        {membro.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/equipe/${membro.id}`}
                          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(membro.id)}
                          disabled={deletingId === membro.id}
                          className="rounded-lg p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
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
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setMenuOpen(null)} />
      )}
    </div>
  );
}
