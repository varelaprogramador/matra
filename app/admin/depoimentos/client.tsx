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
  Star,
  Quote,
  User,
} from "lucide-react";

interface Depoimento {
  id: string;
  nome: string;
  cargo: string;
  empresa: string;
  texto: string;
  avatar: string | null;
  nota: number;
  ordem: number;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function DepoimentosClient({
  depoimentos,
}: {
  depoimentos: Depoimento[];
}) {
  const router = useRouter();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filteredDepoimentos = depoimentos.filter(
    (d) =>
      d.nome.toLowerCase().includes(search.toLowerCase()) ||
      d.empresa.toLowerCase().includes(search.toLowerCase()) ||
      d.texto.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este depoimento?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/depoimentos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir depoimento");
    } finally {
      setDeletingId(null);
      setMenuOpen(null);
    }
  };

  const toggleStatus = async (depoimento: Depoimento) => {
    try {
      const response = await fetch(`/api/depoimentos/${depoimento.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ativo: !depoimento.ativo }),
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
          <h1 className="text-2xl font-bold text-white">Depoimentos</h1>
          <p className="text-zinc-400">
            {depoimentos.length} depoimentos cadastrados
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar depoimentos..."
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
            href="/admin/depoimentos/novo"
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
          >
            <Plus className="h-4 w-4" />
            Novo Depoimento
          </Link>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredDepoimentos.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <Quote className="mx-auto h-12 w-12 text-zinc-600" />
              <p className="mt-4 text-zinc-500">Nenhum depoimento encontrado</p>
              <Link
                href="/admin/depoimentos/novo"
                className="mt-4 inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
              >
                <Plus className="h-4 w-4" />
                Adicionar primeiro depoimento
              </Link>
            </div>
          ) : (
            filteredDepoimentos.map((depoimento) => (
              <div
                key={depoimento.id}
                className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900"
              >
                {/* Menu Button */}
                <div className="absolute right-3 top-3 z-10">
                  <button
                    onClick={() =>
                      setMenuOpen(menuOpen === depoimento.id ? null : depoimento.id)
                    }
                    className="rounded-lg bg-zinc-900/80 p-1.5 text-zinc-400 backdrop-blur-sm hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  {menuOpen === depoimento.id && (
                    <div className="absolute right-0 top-10 min-w-[140px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl">
                      <Link
                        href={`/admin/depoimentos/${depoimento.id}`}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800"
                      >
                        <Pencil className="h-4 w-4" /> Editar
                      </Link>
                      <button
                        onClick={() => toggleStatus(depoimento)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800"
                      >
                        {depoimento.ativo ? (
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
                        onClick={() => handleDelete(depoimento.id)}
                        disabled={deletingId === depoimento.id}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" /> Excluir
                      </button>
                    </div>
                  )}
                </div>

                {/* Badge */}
                {!depoimento.ativo && (
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-zinc-900/80 px-2 py-1 text-xs text-zinc-400 backdrop-blur-sm">
                      Inativo
                    </span>
                  </div>
                )}

                {/* Content */}
                <Link href={`/admin/depoimentos/${depoimento.id}`} className="block">
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-purple-500/30 mb-4" />

                  {/* Text */}
                  <p className="line-clamp-3 text-zinc-300 italic mb-4">
                    &quot;{depoimento.texto}&quot;
                  </p>

                  {/* Rating */}
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= depoimento.nota
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-zinc-700"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    {depoimento.avatar ? (
                      <img
                        src={depoimento.avatar}
                        alt={depoimento.nome}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
                        <User className="h-5 w-5 text-zinc-500" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-white">{depoimento.nome}</p>
                      <p className="text-sm text-zinc-500">
                        {depoimento.cargo} na {depoimento.empresa}
                      </p>
                    </div>
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
                  Cliente
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                  Depoimento
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-zinc-400">
                  Nota
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
              {filteredDepoimentos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                    Nenhum depoimento encontrado
                  </td>
                </tr>
              ) : (
                filteredDepoimentos.map((depoimento) => (
                  <tr
                    key={depoimento.id}
                    className="bg-zinc-900/30 hover:bg-zinc-900/50"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/depoimentos/${depoimento.id}`}
                        className="flex items-center gap-3"
                      >
                        {depoimento.avatar ? (
                          <img
                            src={depoimento.avatar}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
                            <User className="h-5 w-5 text-zinc-500" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-white hover:text-purple-400">
                            {depoimento.nome}
                          </p>
                          <p className="text-sm text-zinc-500">
                            {depoimento.cargo} na {depoimento.empresa}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="max-w-md truncate text-sm text-zinc-400">
                        &quot;{depoimento.texto}&quot;
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= depoimento.nota
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-zinc-700"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          depoimento.ativo
                            ? "bg-green-500/10 text-green-500"
                            : "bg-zinc-500/10 text-zinc-500"
                        }`}
                      >
                        {depoimento.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/depoimentos/${depoimento.id}`}
                          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(depoimento.id)}
                          disabled={deletingId === depoimento.id}
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
