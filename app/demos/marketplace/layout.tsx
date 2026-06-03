"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, ShoppingBag, Package, Store, Wallet,
  Settings, Search, Bell, Menu,
} from "lucide-react"
import { BRAND } from "./data"

const nav = [
  { label: "Visão geral", href: "/demos/marketplace", icon: LayoutDashboard },
  { label: "Pedidos", href: "/demos/marketplace/pedidos", icon: ShoppingBag },
  { label: "Produtos", href: "/demos/marketplace/produtos", icon: Package },
  { label: "Vendedores", href: "/demos/marketplace/vendedores", icon: Store },
  { label: "Financeiro", href: "/demos/marketplace/financeiro", icon: Wallet },
]

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const SidebarContent = () => (
    <>
      {/* brand */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border">
        <div className="grid h-8 w-8 place-items-center rounded-lg text-white font-bold" style={{ background: BRAND.accent }}>
          P
        </div>
        <div className="leading-tight">
          <p className="font-bold tracking-tight">{BRAND.name}</p>
          <p className="font-mono text-[10px] text-muted-foreground">{BRAND.tagline}</p>
        </div>
      </div>
      {/* nav */}
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
              style={active ? { background: BRAND.accent } : undefined}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      {/* footer item */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground">
          <Settings className="h-4 w-4" />
          Configurações
        </div>
      </div>
    </>
  )

  return (
    <div className="flex min-h-[calc(100vh-3rem)]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 flex-col border-r border-border bg-card sticky top-12 h-[calc(100vh-3rem)]">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-zinc-950/50" onClick={() => setOpen(false)} />
          <aside className="relative w-64 flex flex-col bg-card border-r border-border">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="h-16 border-b border-border bg-card/60 backdrop-blur flex items-center gap-3 px-4 sm:px-6 sticky top-12 z-30">
          <button onClick={() => setOpen(true)} className="lg:hidden grid h-9 w-9 place-items-center rounded-lg hover:bg-accent">
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Buscar pedidos, produtos, vendedores..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
            />
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg hover:bg-accent relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full" style={{ background: BRAND.accent }} />
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 grid place-items-center text-white text-xs font-bold">
            MV
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
