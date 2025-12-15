"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  Star,
  MoreHorizontal,
  Search,
  LayoutGrid,
  List,
} from "lucide-react";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  descricaoLonga: string | null;
  icone: string | null;
  imagem: string | null;
  imagens: string[];
  link: string | null;
  tecnologias: string[];
  destaque: boolean;
  ordem: number;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function ProdutosClient({ produtos }: { produtos: Produto[] }) {
  const router = useRouter();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filteredProdutos = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.descricao.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/produtos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir produto");
      }

      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir produto");
    } finally {
      setDeletingId(null);
      setMenuOpen(null);
    }
  };

  const toggleStatus = async (produto: Produto, field: "ativo" | "destaque") => {
    try {
      const response = await fetch(`/api/produtos/${produto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !produto[field] }),
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
          <h1 className="text-2xl font-bold text-white">Produtos</h1>
          <p className="text-zinc-400">
            {produtos.length} produtos cadastrados
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-64 rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-zinc-700 focus:outline-none"
            />
          </div>

          {/* View Toggle */}
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

          {/* New Product Button */}
          <Link
            href="/admin/produtos/novo"
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
          >
            <Plus className="h-4 w-4" />
            Novo Produto
          </Link>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProdutos.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <p className="text-zinc-500">Nenhum produto encontrado</p>
              <Link
                href="/admin/produtos/novo"
                className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                <Plus className="h-4 w-4" />
                Criar primeiro produto
              </Link>
            </div>
          ) : (
            filteredProdutos.map((produto) => (
              <div
                key={produto.id}
                className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900"
              >
                {/* Cover Image */}
                <Link href={`/admin/produtos/${produto.id}`} className="block">
                  {produto.imagem ? (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                      <span className="text-6xl">{produto.icone || "📦"}</span>
                    </div>
                  )}
                </Link>

                {/* Badges */}
                <div className="absolute left-3 top-3 flex gap-2">
                  {!produto.ativo && (
                    <span className="rounded-full bg-zinc-900/80 px-2 py-1 text-xs text-zinc-400 backdrop-blur-sm">
                      Inativo
                    </span>
                  )}
                  {produto.destaque && (
                    <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs text-yellow-400 backdrop-blur-sm">
                      <Star className="inline h-3 w-3 fill-current" /> Destaque
                    </span>
                  )}
                </div>

                {/* Menu Button */}
                <div className="absolute right-3 top-3">
                  <button
                    onClick={() =>
                      setMenuOpen(menuOpen === produto.id ? null : produto.id)
                    }
                    className="rounded-lg bg-zinc-900/80 p-1.5 text-zinc-400 backdrop-blur-sm hover:text-white"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {menuOpen === produto.id && (
                    <div className="absolute right-0 top-10 z-10 min-w-[160px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl">
                      <Link
                        href={`/admin/produtos/${produto.id}`}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800"
                      >
                        <Pencil className="h-4 w-4" /> Editar
                      </Link>
                      {produto.link && (
                        <a
                          href={produto.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                        >
                          <ExternalLink className="h-4 w-4" /> Abrir Link
                        </a>
                      )}
                      <button
                        onClick={() => toggleStatus(produto, "ativo")}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800"
                      >
                        {produto.ativo ? (
                          <>
                            <EyeOff className="h-4 w-4" /> Desativar
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" /> Ativar
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => toggleStatus(produto, "destaque")}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800"
                      >
                        <Star className="h-4 w-4" />
                        {produto.destaque
                          ? "Remover Destaque"
                          : "Marcar Destaque"}
                      </button>
                      <hr className="border-zinc-800" />
                      <button
                        onClick={() => handleDelete(produto.id)}
                        disabled={deletingId === produto.id}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" /> Excluir
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <Link
                  href={`/admin/produtos/${produto.id}`}
                  className="block p-4"
                >
                  <div className="flex items-start gap-3">
                    {produto.icone && !produto.imagem && (
                      <span className="text-2xl">{produto.icone}</span>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-white">
                        {produto.nome}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
                        {produto.descricao}
                      </p>

                      {/* Technologies */}
                      {produto.tecnologias && produto.tecnologias.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {produto.tecnologias.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
                            >
                              {tech}
                            </span>
                          ))}
                          {produto.tecnologias.length > 3 && (
                            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">
                              +{produto.tecnologias.length - 3}
                            </span>
                          )}
                        </div>
                      )}
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
                  Produto
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                  Tecnologias
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-zinc-400">
                  Ordem
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
              {filteredProdutos.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-zinc-500"
                  >
                    Nenhum produto encontrado
                  </td>
                </tr>
              ) : (
                filteredProdutos.map((produto) => (
                  <tr
                    key={produto.id}
                    className="bg-zinc-900/30 hover:bg-zinc-900/50"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/produtos/${produto.id}`}
                        className="flex items-center gap-3"
                      >
                        {produto.imagem ? (
                          <img
                            src={produto.imagem}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        ) : (
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-xl">
                            {produto.icone || "📦"}
                          </span>
                        )}
                        <div>
                          <p className="font-medium text-white hover:text-blue-400">
                            {produto.nome}
                          </p>
                          <p className="max-w-xs truncate text-sm text-zinc-500">
                            {produto.descricao}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {produto.tecnologias && produto.tecnologias.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                        {produto.tecnologias && produto.tecnologias.length > 2 && (
                          <span className="text-xs text-zinc-500">
                            +{produto.tecnologias.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm text-zinc-400">
                        {produto.ordem}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            produto.ativo
                              ? "bg-green-500/10 text-green-500"
                              : "bg-zinc-500/10 text-zinc-500"
                          }`}
                        >
                          {produto.ativo ? "Ativo" : "Inativo"}
                        </span>
                        {produto.destaque && (
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {produto.link && (
                          <a
                            href={produto.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <Link
                          href={`/admin/produtos/${produto.id}`}
                          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(produto.id)}
                          disabled={deletingId === produto.id}
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

      {/* Click outside to close menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setMenuOpen(null)}
        />
      )}
    </div>
  );
}
