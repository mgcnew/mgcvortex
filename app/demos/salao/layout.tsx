"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CalendarDays, Scissors, Users, Wallet, Settings } from "lucide-react"
import { manrope } from "./fonts"
import { BRAND } from "./data"

const nav = [
  { label: "Dashboard", href: "/demos/salao", icon: LayoutDashboard },
  { label: "Agenda", href: "/demos/salao/agenda", icon: CalendarDays },
  { label: "Serviços", href: "/demos/salao/servicos", icon: Scissors },
  { label: "Clientes", href: "/demos/salao/clientes", icon: Users },
  { label: "Caixa", href: "/demos/salao/caixa", icon: Wallet },
  { label: "Configurações", href: "/demos/salao/configuracoes", icon: Settings },
]

// Force a light theme inside this demo regardless of the app theme
const lightVars = {
  "--background": "oklch(1 0 0)",
  "--foreground": "oklch(0.21 0 0)",
  "--card": "oklch(1 0 0)",
  "--card-foreground": "oklch(0.21 0 0)",
  "--popover": "oklch(1 0 0)",
  "--popover-foreground": "oklch(0.21 0 0)",
  "--border": "oklch(0.922 0 0)",
  "--input": "oklch(0.922 0 0)",
  "--muted": "oklch(0.965 0 0)",
  "--muted-foreground": "oklch(0.552 0 0)",
  "--secondary": "oklch(0.967 0 0)",
  "--secondary-foreground": "oklch(0.21 0 0)",
  "--accent": "oklch(0.967 0 0)",
  "--accent-foreground": "oklch(0.21 0 0)",
} as React.CSSProperties

export default function SalaoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className={`${manrope.className} h-[calc(100dvh-3rem)] flex flex-col bg-white text-slate-900`} style={lightVars}>
      {/* Topbar */}
      <header className="shrink-0 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl text-white font-extrabold" style={{ background: BRAND.accent }}>C</span>
            <div className="leading-tight">
              <p className="font-extrabold tracking-tight">{BRAND.name}</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{BRAND.tagline}</p>
            </div>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 grid place-items-center text-white text-xs font-bold">MV</div>
        </div>

        {/* Nav tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex gap-1 overflow-x-auto -mb-px">
            {nav.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative inline-flex items-center gap-2 px-3.5 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    active ? "" : "text-slate-500 hover:text-slate-900"
                  }`}
                  style={active ? { color: BRAND.accent } : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: BRAND.accent }} />}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
