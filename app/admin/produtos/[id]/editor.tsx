"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Trash2,
  Plus,
  X,
  GripVertical,
  Image as ImageIcon,
  Link as LinkIcon,
  Type,
  Hash,
} from "lucide-react";
import Link from "next/link";
import { ImageUpload, MultiImageUpload } from "@/components/admin/image-upload";

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
}

interface ProdutoEditorProps {
  produto: Produto | null;
}

export function ProdutoEditor({ produto }: ProdutoEditorProps) {
  const router = useRouter();
  const isNew = !produto;

  const [formData, setFormData] = useState({
    nome: produto?.nome || "",
    descricao: produto?.descricao || "",
    descricaoLonga: produto?.descricaoLonga || "",
    icone: produto?.icone || "",
    imagem: produto?.imagem || "",
    imagens: produto?.imagens || [],
    link: produto?.link || "",
    tecnologias: produto?.tecnologias || [],
    destaque: produto?.destaque || false,
    ordem: produto?.ordem || 0,
    ativo: produto?.ativo ?? true,
  });

  const [newTech, setNewTech] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const updateField = useCallback(
    <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSave = async () => {
    if (!formData.nome.trim() || !formData.descricao.trim()) {
      alert("Nome e descricao sao obrigatorios");
      return;
    }

    setIsSaving(true);

    try {
      const url = isNew ? "/api/produtos" : `/api/produtos/${produto.id}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          icone: formData.icone || null,
          imagem: formData.imagem || null,
          link: formData.link || null,
          descricaoLonga: formData.descricaoLonga || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao salvar produto");
      }

      router.push("/admin/produtos");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert(error instanceof Error ? error.message : "Erro ao salvar produto");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!produto) return;
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/produtos/${produto.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir produto");
      }

      router.push("/admin/produtos");
      router.refresh();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir produto");
    } finally {
      setIsDeleting(false);
    }
  };

  const addTech = () => {
    if (newTech.trim() && !formData.tecnologias.includes(newTech.trim())) {
      updateField("tecnologias", [...formData.tecnologias, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTech = (tech: string) => {
    updateField(
      "tecnologias",
      formData.tecnologias.filter((t) => t !== tech)
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/produtos"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-white">
                {isNew ? "Novo Produto" : formData.nome || "Sem nome"}
              </h1>
              <p className="text-sm text-zinc-500">
                {isNew ? "Criando novo produto" : "Editando produto"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Status Toggles */}
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

            <button
              type="button"
              onClick={() => updateField("destaque", !formData.destaque)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                formData.destaque
                  ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {formData.destaque ? (
                <Star className="h-4 w-4 fill-current" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
              <span className="text-sm">Destaque</span>
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
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Cover Image */}
        <div className="mb-8">
          <div
            className={`transition-all ${
              activeSection === "cover" ? "ring-2 ring-blue-500 rounded-lg" : ""
            }`}
            onClick={() => setActiveSection("cover")}
          >
            {formData.imagem ? (
              <div className="relative group">
                <img
                  src={formData.imagem}
                  alt="Cover"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateField("imagem", "");
                    }}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium"
                  >
                    Remover Capa
                  </button>
                </div>
              </div>
            ) : (
              <ImageUpload
                value={formData.imagem}
                onChange={(url) => updateField("imagem", url || "")}
                endpoint="imageUploader"
                className="h-48"
              />
            )}
          </div>
          <p className="text-xs text-zinc-500 mt-2 text-center">
            Imagem de capa do produto
          </p>
        </div>

        {/* Icon & Title */}
        <div className="mb-6">
          <div className="flex items-start gap-4">
            {/* Icon Input */}
            <div className="relative">
              <input
                type="text"
                value={formData.icone}
                onChange={(e) => updateField("icone", e.target.value)}
                placeholder="🚀"
                className="w-16 h-16 text-4xl text-center bg-zinc-900 border border-zinc-800 rounded-xl focus:border-zinc-700 focus:outline-none"
                maxLength={2}
              />
              <span className="absolute -bottom-5 left-0 right-0 text-[10px] text-zinc-500 text-center">
                Emoji
              </span>
            </div>

            {/* Title */}
            <div className="flex-1">
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => updateField("nome", e.target.value)}
                placeholder="Nome do Produto"
                className="w-full text-4xl font-bold bg-transparent text-white placeholder-zinc-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Short Description */}
        <div className="mb-8">
          <textarea
            value={formData.descricao}
            onChange={(e) => updateField("descricao", e.target.value)}
            placeholder="Descricao curta do produto (aparece nos cards)"
            rows={2}
            className="w-full text-lg bg-transparent text-zinc-300 placeholder-zinc-600 focus:outline-none resize-none"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 my-8" />

        {/* Properties Section */}
        <div className="space-y-6 mb-8">
          <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
            Propriedades
          </h2>

          <div className="grid gap-4">
            {/* Link */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <div className="p-2 rounded-lg bg-zinc-800">
                <LinkIcon className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-zinc-500 block mb-1">Link do Produto</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => updateField("link", e.target.value)}
                  placeholder="https://exemplo.com"
                  className="w-full bg-transparent text-white placeholder-zinc-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Order */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <div className="p-2 rounded-lg bg-zinc-800">
                <Hash className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-zinc-500 block mb-1">Ordem de Exibicao</label>
                <input
                  type="number"
                  value={formData.ordem}
                  onChange={(e) => updateField("ordem", parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent text-white placeholder-zinc-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Technologies */}
            <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-lg bg-zinc-800">
                  <Type className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-zinc-500 block">Tecnologias</label>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tecnologias.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="hover:text-blue-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Tech Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                  placeholder="Adicionar tecnologia..."
                  className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 my-8" />

        {/* Long Description - Notion Style */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
            Descricao Completa
          </h2>
          <div className="relative">
            <textarea
              value={formData.descricaoLonga}
              onChange={(e) => updateField("descricaoLonga", e.target.value)}
              placeholder="Escreva uma descricao detalhada do produto...

Voce pode incluir:
- Funcionalidades principais
- Beneficios para o cliente
- Diferenciais do produto
- Casos de uso
- Integrações disponiveis"
              rows={12}
              className="w-full px-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 my-8" />

        {/* Gallery */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
            Galeria de Imagens
          </h2>
          <MultiImageUpload
            value={formData.imagens}
            onChange={(urls) => updateField("imagens", urls)}
            maxImages={10}
          />
          <p className="text-xs text-zinc-500 mt-2">
            Adicione ate 10 imagens para mostrar o produto em detalhes
          </p>
        </div>
      </main>
    </div>
  );
}
