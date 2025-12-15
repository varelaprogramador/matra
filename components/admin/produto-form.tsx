"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, X } from "lucide-react";

const produtoSchema = z.object({
  nome: z.string().min(1, "Nome e obrigatorio"),
  descricao: z.string().min(1, "Descricao e obrigatoria"),
  icone: z.string().optional(),
  link: z.string().optional(),
  destaque: z.boolean(),
  ordem: z.number(),
  ativo: z.boolean(),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

interface ProdutoFormProps {
  produto?: {
    id: string;
    nome: string;
    descricao: string;
    icone: string | null;
    link: string | null;
    destaque: boolean;
    ordem: number;
    ativo: boolean;
  };
  onClose: () => void;
}

export function ProdutoForm({ produto, onClose }: ProdutoFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: produto?.nome || "",
      descricao: produto?.descricao || "",
      icone: produto?.icone || "",
      link: produto?.link || "",
      destaque: produto?.destaque || false,
      ordem: produto?.ordem || 0,
      ativo: produto?.ativo ?? true,
    },
  });

  const onSubmit = async (data: ProdutoFormData) => {
    setIsLoading(true);
    try {
      const url = produto ? `/api/produtos/${produto.id}` : "/api/produtos";
      const method = produto ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar produto");
      }

      router.refresh();
      onClose();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao salvar produto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {produto ? "Editar Produto" : "Novo Produto"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Nome *
            </label>
            <input
              {...register("nome")}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
              placeholder="Nome do produto"
            />
            {errors.nome && (
              <p className="mt-1 text-sm text-red-500">{errors.nome.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Descricao *
            </label>
            <textarea
              {...register("descricao")}
              rows={3}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
              placeholder="Descricao do produto"
            />
            {errors.descricao && (
              <p className="mt-1 text-sm text-red-500">
                {errors.descricao.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-300">
                Icone (emoji ou URL)
              </label>
              <input
                {...register("icone")}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
                placeholder="Ex: ou /icon.svg"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-300">
                Link
              </label>
              <input
                {...register("link")}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-300">
                Ordem
              </label>
              <input
                type="number"
                {...register("ordem", { valueAsNumber: true })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
              />
            </div>

            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("destaque")}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-white focus:ring-white"
                />
                <span className="text-sm text-zinc-300">Destaque</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("ativo")}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-white focus:ring-white"
                />
                <span className="text-sm text-zinc-300">Ativo</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
