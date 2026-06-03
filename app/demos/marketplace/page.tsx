"use client"

import { motion } from "framer-motion"
import { TrendingUp, DollarSign, ShoppingBag, Store, Percent, ArrowUpRight } from "lucide-react"
import { overview, orders, sellers, statusColor, brl, BRAND } from "./data"

const kpis = [
  { label: "GMV (volume de vendas)", value: brl(overview.gmv), delta: overview.gmvDelta, icon: DollarSign },
  { label: "Pedidos", value: overview.orders.toLocaleString("pt-BR"), delta: overview.ordersDelta, icon: ShoppingBag },
  { label: "Vendedores ativos", value: String(overview.sellers), delta: overview.sellersDelta, icon: Store },
  { label: "Comissão (10%)", value: brl(overview.commission), delta: overview.commissionDelta, icon: Percent },
]

export default function Overview() {
  const max = Math.max(...overview.salesSeries)
  const topSellers = [...sellers].sort((a, b) => b.sales - a.sales).slice(0, 4)
  let acc = 0
  const R = 46
  const C = 2 * Math.PI * R

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Visão geral</h1>
        <p className="text-sm text-muted-foreground">Resumo do marketplace nos últimos 30 dias.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((k, i) => {
          const Icon = k.icon
          return (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-orange-500/10">
                  <Icon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  {k.delta}%
                </span>
              </div>
              <p className="font-display text-2xl font-bold tracking-tight">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Bars */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold">Vendas no período</h2>
            <span className="font-mono text-xs text-muted-foreground">12 semanas</span>
          </div>
          <div className="flex items-end gap-1.5 sm:gap-2 h-48">
            {overview.salesSeries.map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(v / max) * 100}%` }}
                transition={{ delay: 0.2 + i * 0.04, type: "spring", stiffness: 120, damping: 15 }}
                className="flex-1 rounded-t-md"
                style={{ background: BRAND.accent, opacity: 0.55 + (v / max) * 0.45 }}
              />
            ))}
          </div>
        </div>

        {/* Category donut */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display font-bold mb-5">Vendas por categoria</h2>
          <div className="flex justify-center mb-5">
            <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
              {overview.categories.map((c) => {
                const len = (c.pct / 100) * C
                const el = (
                  <circle key={c.name} cx="60" cy="60" r={R} fill="none" stroke={c.color}
                    strokeWidth="13" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-acc} />
                )
                acc += len
                return el
              })}
            </svg>
          </div>
          <div className="space-y-2">
            {overview.categories.map((c) => (
              <div key={c.name} className="flex items-center gap-2.5 text-sm">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                <span className="flex-1">{c.name}</span>
                <span className="font-mono text-muted-foreground">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders + top sellers */}
      <div className="grid lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-display font-bold">Pedidos recentes</h2>
            <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Ver todos</span>
          </div>
          <div className="divide-y divide-border">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center gap-3 px-5 py-3 hover:bg-accent/50 transition-colors">
                <span className="font-mono text-xs text-muted-foreground w-14">{o.id}</span>
                <span className="flex-1 text-sm font-medium truncate">{o.customer}</span>
                <span className="text-sm text-muted-foreground hidden sm:block truncate w-24">{o.seller}</span>
                <span className="text-sm tabular-nums w-24 text-right">{brl(o.total)}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium w-20 text-center ${statusColor[o.status]}`}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-display font-bold mb-4">Top vendedores</h2>
          <div className="space-y-3">
            {topSellers.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground w-4">{i + 1}</span>
                <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${s.tone} grid place-items-center text-white text-xs font-bold`}>
                  {s.name.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.category}</p>
                </div>
                <span className="text-sm tabular-nums font-medium">{brl(s.sales)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted-foreground">
          Este é um sistema <span className="font-medium text-foreground">demonstrativo</span> da MGC Vortex. Imagine ele com a sua marca e os seus dados.
        </p>
        <a href="/#contato" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold" style={{ background: BRAND.accent }}>
          Quero um assim <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
