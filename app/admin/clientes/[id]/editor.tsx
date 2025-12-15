"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Trash2,
  Link as LinkIcon,
  Hash,
  Building2,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/admin/image-upload";

interface Cliente {
  id: string;
  nome: string;
  logo: string | null;
  site: string | null;
  descricao: string | null;
  ordem: number;
  ativo: boolean;
}

interface ClienteEditorProps {
  cliente: Cliente | null;
}

export function ClienteEditor({ cliente }: ClienteEditorProps) {
  const router = useRouter();
  const isNew = !cliente;

  const [formData, setFormData] = useState({
    nome: cliente?.nome || "",
    logo: cliente?.logo || "",
    site: cliente?.site || "",
    descricao: cliente?.descricao || "",
    ordem: cliente?.ordem || 0,
    ativo: cliente?.ativo ?? true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateField = useCallback(
    <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSave = async () => {
    if (!formData.nome.trim()) {
      alert("Nome e obrigatorio");
      return;
    }

    setIsSaving(true);

    try {
      const url = isNew ? "/api/clientes" : `/api/clientes/${cliente.id}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          logo: formData.logo || null,
          site: formData.site || null,
          descricao: formData.descricao || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao salvar cliente");
      }

      router.push("/admin/clientes");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert(error instanceof Error ? error.message : "Erro ao salvar cliente");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!cliente) return;
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/clientes/${cliente.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir cliente");
      }

      router.push("/admin/clientes");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir cliente");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/clientes"
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-white">
                {isNew ? "Novo Cliente" : formData.nome || "Sem nome"}
              </h1>
              <p className="text-sm text-zinc-500">
                {isNew ? "Criando novo cliente" : "Editando cliente"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateField("ativo", !formData.ativo)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                formData.ativo
                  ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {formData.ativo ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
              <span className="text-sm">{formData.ativo ? "Ativo" : "Inativo"}</span>
            </button>

            {!isNew && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Salvar
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Logo */}
        <div className="mb-8">
          <label className="text-sm font-medium text-zinc-400 block mb-3">
            Logo do Cliente
          </label>
          <ImageUpload
            value={formData.logo}
            onChange={(url) => updateField("logo", url || "")}
            endpoint="logoUploader"
          />
          <p className="text-xs text-zinc-500 mt-2">
            Recomendado: PNG transparente ou JPG
          </p>
        </div>

        {/* Name */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-5 w-5 text-zinc-500" />
            <label className="text-sm font-medium text-zinc-400">Nome do Cliente</label>
          </div>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => updateField("nome", e.target.value)}
            placeholder="Ex: Empresa XYZ"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
          />
        </div>

        {/* Site */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <LinkIcon className="h-5 w-5 text-zinc-500" />
            <label className="text-sm font-medium text-zinc-400">Site</label>
          </div>
          <input
            type="url"
            value={formData.site}
            onChange={(e) => updateField("site", e.target.value)}
            placeholder="https://exemplo.com"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-5 w-5 text-zinc-500" />
            <label className="text-sm font-medium text-zinc-400">Descricao (opcional)</label>
          </div>
          <textarea
            value={formData.descricao}
            onChange={(e) => updateField("descricao", e.target.value)}
            placeholder="Uma breve descricao sobre o cliente..."
            rows={3}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-none"
          />
        </div>

        {/* Order */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Hash className="h-5 w-5 text-zinc-500" />
            <label className="text-sm font-medium text-zinc-400">Ordem de Exibicao</label>
          </div>
          <input
            type="number"
            value={formData.ordem}
            onChange={(e) => updateField("ordem", parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
          />
          <p className="text-xs text-zinc-500 mt-2">
            Menor numero aparece primeiro
          </p>
        </div>
      </main>
    </div>
  );
}
