"use client"

import { motion } from "framer-motion"
import { Wallet, ArrowDownToLine, ArrowUpRight, Clock } from "lucide-react"
import { sellers, overview, brl, BRAND } from "../data"

const TAKE = 0.1 // 10% de comissão do marketplace

const payouts = [
  { seller: "TechZone", amount: 14112, status: "Pago", date: "01/06" },
  { seller: "GamerHub", amount: 11205, status: "Pago", date: "01/06" },
  { seller: "BelezaPura", amount: 8847, status: "Pendente", date: "05/06" },
  { seller: "ModaViva", amount: 8046, status: "Pendente", date: "05/06" },
  { seller: "CasaBela", amount: 6048, status: "Agendado", date: "08/06" },
  { seller: "FitStore", amount: 3708, status: "Agendado", date: "08/06" },
]

const payoutColor: Record<string, string> = {
  Pago: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  Pendente: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  Agendado: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
}

export default function Financeiro() {
  const totalSales = sellers.reduce((s, v) => s + v.sales, 0)
  const commission = Math.round(totalSales * TAKE)
  const toPayout = payouts.filter((p) => p.status !== "Pago").reduce((s, p) => s + p.amount, 0)
  const paid = payouts.filter((p) => p.status === "Pago").reduce((s, p) => s + p.amount, 0)

  const cards = [
    { label: "Receita de comissão", value: brl(commission), icon: Wallet, hint: "10% sobre as vendas" },
    { label: "Repasses pagos", value: brl(paid), icon: ArrowDownToLine, hint: "este ciclo" },
    { label: "A repassar", value: brl(toPayout), icon: Clock, hint: "pendente + agendado" },
  ]

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-sm text-muted-foreground">Comissões do marketplace e repasses aos vendedores.</p>
      </div>

      {/* Hero commission card */}
      <div className="relative overflow-hidden rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${BRAND.accent}, #ea580c)` }}>
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <p className="font-mono text-xs uppercase tracking-widest opacity-80">GMV processado</p>
        <p className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">{brl(overview.gmv)}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
          <ArrowUpRight className="h-4 w-4" /> +{overview.gmvDelta}% vs. mês anterior
        </div>
      </div>

      {/* cards */}
      <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon
          return (
            <motion.div key={c.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-orange-500/10 mb-3">
                <Icon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="font-display text-2xl font-bold tracking-tight">{c.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{c.label}</p>
              <p className="text-[11px] text-muted-foreground/70 mt-1">{c.hint}</p>
            </motion.div>
          )
        })}
      </div>

      {/* payouts table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-display font-bold">Repasses aos vendedores</h2>
        </div>
        <div className="hidden sm:grid grid-cols-[1fr_8rem_8rem_7rem] gap-3 px-5 py-3 border-b border-border text-xs font-mono uppercase tracking-wider text-muted-foreground">
          <span>Vendedor</span><span className="text-right">Valor</span><span>Data</span><span className="text-right">Status</span>
        </div>
        <div className="divide-y divide-border">
          {payouts.map((p) => (
            <div key={p.seller} className="grid grid-cols-2 sm:grid-cols-[1fr_8rem_8rem_7rem] gap-2 sm:gap-3 px-5 py-3.5 items-center text-sm hover:bg-accent/50 transition-colors">
              <span className="font-medium">{p.seller}</span>
              <span className="tabular-nums text-right">{brl(p.amount)}</span>
              <span className="text-muted-foreground hidden sm:block">{p.date}</span>
              <span className={`justify-self-end px-2.5 py-0.5 rounded-full text-xs font-medium ${payoutColor[p.status]}`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
