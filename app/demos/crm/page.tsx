"use client"

import { useState, useMemo } from "react"
import { Search, Users, Phone, CheckCircle2, Clock } from "lucide-react"

type Status = "Novo" | "Em contato" | "Fechado"
type Lead = { id: number; name: string; company: string; value: number; status: Status }

const initial: Lead[] = [
  { id: 1, name: "Ana Souza", company: "Padaria Pão Quente", value: 4500, status: "Fechado" },
  { id: 2, name: "Carlos Lima", company: "AutoPeças CL", value: 12000, status: "Em contato" },
  { id: 3, name: "Marina Reis", company: "Clínica Vida", value: 8200, status: "Novo" },
  { id: 4, name: "João Pedro", company: "Studio JP", value: 3100, status: "Em contato" },
  { id: 5, name: "Beatriz Nunes", company: "Moda BN", value: 15600, status: "Fechado" },
  { id: 6, name: "Rafael Torres", company: "Logística RT", value: 22000, status: "Novo" },
  { id: 7, name: "Letícia M.", company: "Café Aroma", value: 5400, status: "Em contato" },
  { id: 8, name: "Diego Alves", company: "Fit Academia", value: 9800, status: "Fechado" },
]

const filters: ("Todos" | Status)[] = ["Todos", "Novo", "Em contato", "Fechado"]

const statusStyle: Record<Status, string> = {
  Novo: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  "Em contato": "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  Fechado: "bg-lime-300/60 dark:bg-lime-400/20 text-lime-700 dark:text-lime-300",
}

export default function CrmDemo() {
  const [leads] = useState<Lead[]>(initial)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<"Todos" | Status>("Todos")

  const filtered = useMemo(
    () =>
      leads.filter(
        (l) =>
          (filter === "Todos" || l.status === filter) &&
          (l.name.toLowerCase().includes(query.toLowerCase()) ||
            l.company.toLowerCase().includes(query.toLowerCase()))
      ),
    [leads, query, filter]
  )

  const stats = [
    { label: "Total de leads", value: leads.length, icon: Users },
    { label: "Em negociação", value: leads.filter((l) => l.status === "Em contato").length, icon: Clock },
    { label: "Fechados", value: leads.filter((l) => l.status === "Fechado").length, icon: CheckCircle2 },
    { label: "Pipeline", value: `R$ ${(leads.reduce((s, l) => s + l.value, 0) / 1000).toFixed(0)}k`, icon: Phone },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Funil de clientes</h1>
        <p className="text-muted-foreground text-sm">Gerencie seus leads e oportunidades em um só lugar.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Icon className="w-5 h-5 text-lime-600 dark:text-lime-300" />
              </div>
              <div>
                <p className="font-display text-xl font-bold leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome ou empresa..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all"
          />
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-secondary border border-border overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filter === f ? "bg-lime-300 dark:bg-lime-400 text-zinc-950" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-5 py-3 border-b border-border text-xs font-mono uppercase tracking-wider text-muted-foreground">
          <span>Cliente</span>
          <span>Empresa</span>
          <span className="text-right">Valor</span>
          <span className="text-right">Status</span>
        </div>
        <div className="divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">Nenhum lead encontrado.</div>
          ) : (
            filtered.map((l) => (
              <div key={l.id} className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_auto_auto] gap-2 sm:gap-4 px-5 py-3.5 items-center hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-300 to-emerald-400 flex items-center justify-center text-zinc-950 text-xs font-bold shrink-0">
                    {l.name.charAt(0)}
                  </div>
                  <span className="font-medium text-sm truncate">{l.name}</span>
                </div>
                <span className="text-sm text-muted-foreground truncate hidden sm:block">{l.company}</span>
                <span className="text-sm tabular-nums text-right sm:text-right">R$ {l.value.toLocaleString("pt-BR")}</span>
                <span className={`justify-self-end px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[l.status]}`}>
                  {l.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
