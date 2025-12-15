import {
  Package,
  Users,
  MessageSquare,
  Plus,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getStats() {
  const [produtos, clientes, depoimentos, recentProdutos, recentClientes] =
    await Promise.all([
      prisma.produto.count({ where: { ativo: true } }),
      prisma.cliente.count({ where: { ativo: true } }),
      prisma.depoimento.count({ where: { ativo: true } }),
      prisma.produto.findMany({
        where: { ativo: true },
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
      prisma.cliente.findMany({
        where: { ativo: true },
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
    ]);

  return { produtos, clientes, depoimentos, recentProdutos, recentClientes };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      name: "Produtos",
      value: stats.produtos,
      icon: Package,
      href: "/admin/produtos",
      color: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20",
    },
    {
      name: "Clientes",
      value: stats.clientes,
      icon: Users,
      href: "/admin/clientes",
      color: "from-emerald-500/20 to-emerald-600/5",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/20",
    },
    {
      name: "Depoimentos",
      value: stats.depoimentos,
      icon: MessageSquare,
      href: "/admin/depoimentos",
      color: "from-purple-500/20 to-purple-600/5",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/20",
    },
  ];

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-zinc-400">
          Bem-vindo ao painel administrativo da MATRA
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className={`group relative overflow-hidden rounded-2xl border ${card.borderColor} bg-linear-to-br ${card.color} p-6 transition-all hover:scale-[1.02] hover:border-opacity-50`}
          >
            {/* Background Pattern */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-all group-hover:bg-white/10" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400">{card.name}</p>
                <p className="mt-2 text-4xl font-bold text-white">
                  {card.value}
                </p>
                <div className="mt-3 flex items-center gap-1 text-sm text-zinc-500">
                  <Activity className="h-4 w-4" />
                  <span>Ativos no site</span>
                </div>
              </div>
              <div
                className={`rounded-xl bg-zinc-900/50 p-3 ${card.iconColor}`}
              >
                <card.icon className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-4 flex items-center text-sm text-zinc-400 group-hover:text-white">
              <span>Gerenciar</span>
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Products */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Produtos Recentes
            </h2>
            <Link
              href="/admin/produtos"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Ver todos
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentProdutos.length === 0 ? (
              <p className="py-4 text-center text-sm text-zinc-500">
                Nenhum produto cadastrado
              </p>
            ) : (
              stats.recentProdutos.map((produto) => (
                <Link
                  key={produto.id}
                  href={`/admin/produtos/${produto.id}`}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 transition-all hover:border-zinc-700 hover:bg-zinc-800/50"
                >
                  {produto.imagem ? (
                    <img
                      src={produto.imagem}
                      alt=""
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 text-2xl">
                      {produto.icone || "📦"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">
                      {produto.nome}
                    </p>
                    <p className="truncate text-sm text-zinc-500">
                      {produto.descricao}
                    </p>
                  </div>
                  {produto.destaque && (
                    <span className="rounded-full bg-yellow-500/10 px-2 py-1 text-xs text-yellow-400">
                      Destaque
                    </span>
                  )}
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Clients */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Clientes Recentes
            </h2>
            <Link
              href="/admin/clientes"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Ver todos
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentClientes.length === 0 ? (
              <p className="py-4 text-center text-sm text-zinc-500">
                Nenhum cliente cadastrado
              </p>
            ) : (
              stats.recentClientes.map((cliente) => (
                <Link
                  key={cliente.id}
                  href={`/admin/clientes/${cliente.id}`}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 transition-all hover:border-zinc-700 hover:bg-zinc-800/50"
                >
                  {cliente.logo ? (
                    <img
                      src={cliente.logo}
                      alt=""
                      className="h-12 w-12 rounded-lg bg-white object-contain p-1"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 text-lg font-bold text-zinc-400">
                      {cliente.nome.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">
                      {cliente.nome}
                    </p>
                    {cliente.site && (
                      <p className="truncate text-sm text-zinc-500">
                        {cliente.site}
                      </p>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Acoes Rapidas</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/produtos/novo"
            className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-blue-500/30 hover:bg-zinc-900"
          >
            <div className="rounded-xl bg-blue-500/10 p-3 transition-colors group-hover:bg-blue-500/20">
              <Plus className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-white">Novo Produto</p>
              <p className="text-sm text-zinc-500">Adicionar produto SaaS</p>
            </div>
          </Link>

          <Link
            href="/admin/clientes/novo"
            className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-emerald-500/30 hover:bg-zinc-900"
          >
            <div className="rounded-xl bg-emerald-500/10 p-3 transition-colors group-hover:bg-emerald-500/20">
              <Plus className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-medium text-white">Novo Cliente</p>
              <p className="text-sm text-zinc-500">Adicionar cliente</p>
            </div>
          </Link>

          <Link
            href="/admin/depoimentos/novo"
            className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-purple-500/30 hover:bg-zinc-900"
          >
            <div className="rounded-xl bg-purple-500/10 p-3 transition-colors group-hover:bg-purple-500/20">
              <Plus className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="font-medium text-white">Novo Depoimento</p>
              <p className="text-sm text-zinc-500">Adicionar depoimento</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
