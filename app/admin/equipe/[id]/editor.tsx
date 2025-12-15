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
  FileText,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/admin/image-upload";

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
}

interface MembroEditorProps {
  membro: MembroEquipe | null;
}

export function MembroEditor({ membro }: MembroEditorProps) {
  const router = useRouter();
  const isNew = !membro;

  const [formData, setFormData] = useState({
    nome: membro?.nome || "",
    cargo: membro?.cargo || "",
    descricao: membro?.descricao || "",
    foto: membro?.foto || "",
    linkedin: membro?.linkedin || "",
    github: membro?.github || "",
    email: membro?.email || "",
    ordem: membro?.ordem || 0,
    ativo: membro?.ativo ?? true,
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
    if (!formData.nome.trim() || !formData.cargo.trim()) {
      alert("Nome e cargo sao obrigatorios");
      return;
    }

    setIsSaving(true);

    try {
      const url = isNew ? "/api/equipe" : `/api/equipe/${membro.id}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          foto: formData.foto || null,
          descricao: formData.descricao || null,
          linkedin: formData.linkedin || null,
          github: formData.github || null,
          email: formData.email || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao salvar membro");
      }

      router.push("/admin/equipe");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert(error instanceof Error ? error.message : "Erro ao salvar membro");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!membro) return;
    if (!confirm("Tem certeza que deseja excluir este membro?")) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/equipe/${membro.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir membro");
      }

      router.push("/admin/equipe");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir membro");
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
              href="/admin/equipe"
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-white">
                {isNew ? "Novo Membro" : formData.nome || "Sem nome"}
              </h1>
              <p className="text-sm text-zinc-500">
                {isNew ? "Adicionando membro da equipe" : "Editando membro"}
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
        {/* Photo */}
        <div className="mb-8">
          <label className="text-sm font-medium text-zinc-400 block mb-3">
            Foto do Membro
          </label>
          <ImageUpload
            value={formData.foto}
            onChange={(url) => updateField("foto", url || "")}
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
            placeholder="Nome completo"
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
            placeholder="Ex: Desenvolvedor Full Stack"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-5 w-5 text-zinc-500" />
            <label className="text-sm font-medium text-zinc-400">Descricao</label>
          </div>
          <textarea
            value={formData.descricao}
            onChange={(e) => updateField("descricao", e.target.value)}
            placeholder="Uma breve descricao sobre o membro..."
            rows={4}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-none"
          />
        </div>

        {/* Social Links */}
        <div className="mb-6 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
          <p className="text-sm font-medium text-zinc-400 mb-4">Redes Sociais</p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Linkedin className="h-5 w-5 text-zinc-500" />
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
              />
            </div>

            <div className="flex items-center gap-3">
              <Github className="h-5 w-5 text-zinc-500" />
              <input
                type="url"
                value={formData.github}
                onChange={(e) => updateField("github", e.target.value)}
                placeholder="https://github.com/..."
                className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
              />
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-zinc-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="email@exemplo.com"
                className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
              />
            </div>
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
          <div className="flex flex-col items-center text-center">
            {formData.foto ? (
              <img
                src={formData.foto}
                alt=""
                className="h-24 w-24 rounded-full object-cover mb-4"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800 mb-4">
                <User className="h-10 w-10 text-zinc-500" />
              </div>
            )}
            <p className="font-semibold text-white">
              {formData.nome || "Nome do membro"}
            </p>
            <p className="text-sm text-zinc-500">
              {formData.cargo || "Cargo"}
            </p>
            {formData.descricao && (
              <p className="text-sm text-zinc-400 mt-3 max-w-xs">
                {formData.descricao}
              </p>
            )}
            <div className="flex items-center gap-3 mt-4">
              {formData.linkedin && (
                <Linkedin className="h-5 w-5 text-zinc-500" />
              )}
              {formData.github && (
                <Github className="h-5 w-5 text-zinc-500" />
              )}
              {formData.email && (
                <Mail className="h-5 w-5 text-zinc-500" />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
