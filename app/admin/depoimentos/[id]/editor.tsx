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
  Hash,
  User,
  Briefcase,
  Building2,
  MessageSquare,
  Star,
} from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/admin/image-upload";

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
}

interface DepoimentoEditorProps {
  depoimento: Depoimento | null;
}

export function DepoimentoEditor({ depoimento }: DepoimentoEditorProps) {
  const router = useRouter();
  const isNew = !depoimento;

  const [formData, setFormData] = useState({
    nome: depoimento?.nome || "",
    cargo: depoimento?.cargo || "",
    empresa: depoimento?.empresa || "",
    texto: depoimento?.texto || "",
    avatar: depoimento?.avatar || "",
    nota: depoimento?.nota || 5,
    ordem: depoimento?.ordem || 0,
    ativo: depoimento?.ativo ?? true,
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
    if (!formData.nome.trim() || !formData.texto.trim()) {
      alert("Nome e texto sao obrigatorios");
      return;
    }

    setIsSaving(true);

    try {
      const url = isNew ? "/api/depoimentos" : `/api/depoimentos/${depoimento.id}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          avatar: formData.avatar || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao salvar depoimento");
      }

      router.push("/admin/depoimentos");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert(error instanceof Error ? error.message : "Erro ao salvar depoimento");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!depoimento) return;
    if (!confirm("Tem certeza que deseja excluir este depoimento?")) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/depoimentos/${depoimento.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir depoimento");
      }

      router.push("/admin/depoimentos");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir depoimento");
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
              href="/admin/depoimentos"
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-white">
                {isNew ? "Novo Depoimento" : formData.nome || "Sem nome"}
              </h1>
              <p className="text-sm text-zinc-500">
                {isNew ? "Criando novo depoimento" : "Editando depoimento"}
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
        {/* Avatar */}
        <div className="mb-8">
          <label className="text-sm font-medium text-zinc-400 block mb-3">
            Foto do Cliente
          </label>
          <ImageUpload
            value={formData.avatar}
            onChange={(url) => updateField("avatar", url || "")}
            endpoint="avatarUploader"
          />
        </div>

        {/* Name */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-5 w-5 text-zinc-500" />
            <label className="text-sm font-medium text-zinc-400">Nome</label>
          </div>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => updateField("nome", e.target.value)}
            placeholder="Nome do cliente"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="h-5 w-5 text-zinc-500" />
            <label className="text-sm font-medium text-zinc-400">Cargo</label>
          </div>
          <input
            type="text"
            value={formData.cargo}
            onChange={(e) => updateField("cargo", e.target.value)}
            placeholder="Ex: Diretor de Marketing"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
          />
        </div>

        {/* Company */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-5 w-5 text-zinc-500" />
            <label className="text-sm font-medium text-zinc-400">Empresa</label>
          </div>
          <input
            type="text"
            value={formData.empresa}
            onChange={(e) => updateField("empresa", e.target.value)}
            placeholder="Nome da empresa"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
          />
        </div>

        {/* Testimonial Text */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-5 w-5 text-zinc-500" />
            <label className="text-sm font-medium text-zinc-400">Depoimento</label>
          </div>
          <textarea
            value={formData.texto}
            onChange={(e) => updateField("texto", e.target.value)}
            placeholder="O que o cliente disse sobre a MATRA..."
            rows={5}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-none"
          />
        </div>

        {/* Rating */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Star className="h-5 w-5 text-zinc-500" />
            <label className="text-sm font-medium text-zinc-400">Avaliacao</label>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => updateField("nota", star)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= formData.nota
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-zinc-700 hover:text-zinc-500"
                  }`}
                />
              </button>
            ))}
          </div>
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

        {/* Preview */}
        <div className="mt-8 p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
          <p className="text-sm font-medium text-zinc-400 mb-4">Pre-visualizacao</p>
          <div className="relative">
            <p className="text-zinc-300 italic mb-4">
              &quot;{formData.texto || "Texto do depoimento..."}&quot;
            </p>
            <div className="flex items-center gap-3">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
                  <User className="h-5 w-5 text-zinc-500" />
                </div>
              )}
              <div>
                <p className="font-medium text-white">
                  {formData.nome || "Nome do cliente"}
                </p>
                <p className="text-sm text-zinc-500">
                  {formData.cargo || "Cargo"} na {formData.empresa || "Empresa"}
                </p>
              </div>
            </div>
            <div className="flex gap-0.5 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= formData.nota
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
