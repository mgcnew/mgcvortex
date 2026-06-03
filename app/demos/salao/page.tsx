"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CalendarDays, TrendingUp, Clock, Users, ArrowRight, Scissors } from "lucide-react"
import {
  BRAND, brl, services, professionals, slots, initialAppointments,
} from "./data"

const accent = BRAND.accent
const svc = (id: string) => services.find((s) => s.id === id)!
const prof = (id: string) => professionals.find((p) => p.id === id)!

export default function SalaoDashboard() {
  const today = initialAppointments.filter((a) => a.day === 0)
  const faturamento = today.filter((a) => a.status !== "Pendente").reduce((s, a) => s + svc(a.serviceId).price, 0)
  const ocupacao = Math.round((today.length / (slots.length * professionals.length)) * 100)
  const clientes = new Set(initialAppointments.map((a) => a.client)).size
  const proximos = [...today].sort((a, b) => a.time.localeCompare(b.time)).slice(0, 5)

  // serviços mais procurados
  const counts: Record<string, number> = {}
  initialAppointments.forEach((a) => { counts[a.serviceId] = (counts[a.serviceId] || 0) + 1 })
  const topServ = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4)
  const maxServ = Math.max(...topServ.map(([, n]) => n))

  const week = [
    { d: "Seg", n: 8 }, { d: "Ter", n: 11 }, { d: "Qua", n: 7 }, { d: "Qui", n: 13 },
    { d: "Sex", n: 16 }, { d: "Sáb", n: 18 }, { d: "Dom", n: 4 },
  ]
  const maxWeek = Math.max(...week.map((w) => w.n))

  const kpis = [
    { icon: CalendarDays, label: "Agendamentos hoje", value: String(today.length) },
    { icon: TrendingUp, label: "Faturamento previsto", value: brl(faturamento) },
    { icon: Clock, label: "Ocupação do dia", value: `${ocupacao}%` },
    { icon: Users, label: "Clientes ativos", value: String(clientes) },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Visão geral</h1>
          <p className="text-sm text-slate-500">Resumo do seu salão hoje.</p>
        </div>
        <Link href="/demos/salao/agenda" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity" style={{ background: accent }}>
          Abrir agenda <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((k, i) => {
          const Icon = k.icon
          return (
            <motion.div key={k.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="grid h-9 w-9 place-items-center rounded-lg mb-3" style={{ background: `${accent}14`, color: accent }}>
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-2xl font-extrabold tracking-tight">{k.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Week chart */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold">Agendamentos na semana</h2>
            <span className="text-xs text-slate-400">últimos 7 dias</span>
          </div>
          <div className="flex items-end gap-2 sm:gap-3 h-44">
            {week.map((w, i) => (
              <div key={w.d} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-full">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(w.n / maxWeek) * 100}%` }}
                    transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 120, damping: 15 }}
                    className="w-full rounded-t-lg" style={{ background: accent, opacity: 0.5 + (w.n / maxWeek) * 0.5 }} />
                </div>
                <span className="text-[11px] text-slate-400">{w.d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top serviços */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold mb-5">Serviços mais procurados</h2>
          <div className="space-y-4">
            {topServ.map(([id, n]) => (
              <div key={id}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span>{svc(id).name}</span>
                  <span className="text-slate-400">{n}×</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(n / maxServ) * 100}%` }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="h-full rounded-full" style={{ background: accent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Próximos agendamentos */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="font-bold">Próximos de hoje</h2>
          <Link href="/demos/salao/agenda" className="text-sm font-medium" style={{ color: accent }}>Ver agenda</Link>
        </div>
        <div className="divide-y divide-slate-100">
          {proximos.map((a) => {
            const s = svc(a.serviceId)
            const p = prof(a.profId)
            return (
              <div key={a.id} className="flex items-center gap-4 px-5 py-3.5">
                <span className="font-mono text-sm text-slate-400 w-12">{a.time}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: `${accent}14`, color: accent }}>
                  <Scissors className="h-4 w-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{s.name} · {a.client}</p>
                  <p className="text-xs text-slate-500">{p.name}</p>
                </div>
                <span className="text-sm tabular-nums hidden sm:block">{brl(s.price)}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  a.status === "Confirmado" ? "text-emerald-600 bg-emerald-50"
                  : a.status === "Concluído" ? "text-slate-500 bg-slate-100"
                  : "text-amber-600 bg-amber-50"
                }`}>{a.status}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
