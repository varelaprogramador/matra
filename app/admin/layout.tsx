"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Package,
  Users,
  MessageSquare,
  ChevronLeft,
  UserCircle,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Produtos", href: "/admin/produtos", icon: Package },
  { name: "Clientes", href: "/admin/clientes", icon: Users },
  { name: "Depoimentos", href: "/admin/depoimentos", icon: MessageSquare },
  { name: "Equipe", href: "/admin/equipe", icon: UserCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show sidebar on sign-in/sign-up pages
  if (pathname?.includes("sign-in") || pathname?.includes("sign-up")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-zinc-800">
            <Link href="/admin" className="text-xl font-bold text-white">
              MATRA Admin
            </Link>
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors"
              title="Voltar ao site"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="border-t border-zinc-800 p-4">
            <div className="flex items-center gap-3">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                  },
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Administrador
                </p>
                <p className="text-xs text-zinc-500">Gerenciar conta</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
}
