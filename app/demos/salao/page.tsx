"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Plus, X, Check, Clock, Scissors, CalendarDays, TrendingUp, ArrowUpRight } from "lucide-react"
import { cormorant } from "./fonts"
import {
  BRAND, brl, professionals, services, slots, initialAppointments,
  type Appointment, type Status,
} from "./data"

const serif = (e = "") => `${cormorant.className} ${e}`
const svc = (id: string) => services.find((s) => s.id === id)!
const prof = (id: string) => professionals.find((p) => p.id === id)!
const inputClass =
  "w-full px-3 py-2.5 rounded-xl bg-background border border-border text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all"

export default function SalaoDemo() {
  const [appts, setAppts] = useState<Appointment[]>(initialAppointments)
  const [day, setDay] = useState(0)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // modals
  const [newSlot, setNewSlot] = useState<{ time: string; profId: string } | null>(null)
  const [detail, setDetail] = useState<Appointment | null>(null)

  const dayAppts = appts.filter((a) => a.day === day)
  const at = (time: string, profId: string) => dayAppts.find((a) => a.time === time && a.profId === profId)

  const dateLabel = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + day)
    return new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "2-digit", month: "long" }).format(d)
  }, [day])

  const faturamento = dayAppts
    .filter((a) => a.status !== "Pendente")
    .reduce((s, a) => s + svc(a.serviceId).price, 0)
  const ocupacao = Math.round((dayAppts.length / (slots.length * professionals.length)) * 100)

  const openNew = (time: string, profId: string) => setNewSlot({ time, profId })

  const createAppt = (f: { client: string; serviceId: string; profId: string; time: string }) => {
    setAppts((a) => [
      ...a,
      { id: `n${Date.now()}`, day, time: f.time, profId: f.profId, client: f.client.trim(), serviceId: f.serviceId, status: "Confirmado" },
    ])
    setNewSlot(null)
  }

  const setStatus = (id: string, status: Status) => {
    setAppts((a) => a.map((x) => (x.id === id ? { ...x, status } : x)))
    setDetail((d) => (d && d.id === id ? { ...d, status } : d))
  }
  const cancelAppt = (id: string) => {
    setAppts((a) => a.filter((x) => x.id !== id))
    setDetail(null)
  }

  const accent = BRAND.accent

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Brand header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: accent }}>
            <span className={serif("text-xl font-semibold")}>C</span>
          </div>
          <div className="leading-tight">
            <p className={serif("text-xl font-semibold")}>{BRAND.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{BRAND.tagline}</p>
          </div>
        </div>
        <button
          onClick={() => openNew("09:00", "p1")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-medium shadow-sm hover:opacity-90 transition-opacity"
          style={{ background: accent }}
        >
          <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Novo agendamento</span>
        </button>
      </div>

      {/* Date nav + stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setDay((d) => Math.max(0, d - 1))} disabled={day === 0}
            className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-accent disabled:opacity-40">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="min-w-[200px] text-center">
            <p className={serif("text-2xl font-semibold capitalize")}>{mounted ? dateLabel : "—"}</p>
            <p className="text-xs text-muted-foreground">{day === 0 ? "Hoje" : day === 1 ? "Amanhã" : "Em breve"}</p>
          </div>
          <button onClick={() => setDay((d) => Math.min(2, d + 1))} disabled={day === 2}
            className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-accent disabled:opacity-40">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-3">
          {[
            { icon: CalendarDays, label: "Agendamentos", value: String(dayAppts.length) },
            { icon: TrendingUp, label: "Faturamento previsto", value: brl(faturamento) },
            { icon: Clock, label: "Ocupação", value: `${ocupacao}%` },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-2.5">
                <Icon className="h-4 w-4" style={{ color: accent }} />
                <div>
                  <p className={serif("text-base font-semibold leading-none")}>{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Agenda grid */}
      <div className="rounded-2xl border border-border bg-card overflow-x-auto">
        <div className="min-w-[640px]">
          {/* professional headers */}
          <div className="grid border-b border-border" style={{ gridTemplateColumns: `64px repeat(${professionals.length}, minmax(0,1fr))` }}>
            <div className="p-3" />
            {professionals.map((p) => (
              <div key={p.id} className="p-3 flex items-center gap-2.5 border-l border-border">
                <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${p.tone} grid place-items-center text-white text-xs font-bold`}>
                  {p.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="leading-tight min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">{p.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* time rows */}
          {slots.map((time) => (
            <div key={time} className="grid border-b border-border last:border-0" style={{ gridTemplateColumns: `64px repeat(${professionals.length}, minmax(0,1fr))` }}>
              <div className="p-2 text-xs font-mono text-muted-foreground flex items-start justify-end pr-3 pt-3">{time}</div>
              {professionals.map((p) => {
                const a = at(time, p.id)
                if (a) {
                  const s = svc(a.serviceId)
                  return (
                    <button key={p.id} onClick={() => setDetail(a)}
                      className={`m-1 p-2.5 rounded-xl text-left border-l-2 hover:shadow-md transition-shadow ${a.status === "Concluído" ? "opacity-60" : ""}`}
                      style={{
                        background: `${accent}14`,
                        borderLeftColor: accent,
                        borderStyle: a.status === "Pendente" ? "dashed" : "solid",
                        borderTopWidth: a.status === "Pendente" ? 1 : 0,
                        borderRightWidth: a.status === "Pendente" ? 1 : 0,
                        borderBottomWidth: a.status === "Pendente" ? 1 : 0,
                        borderColor: a.status === "Pendente" ? accent : undefined,
                      }}>
                      <p className="text-xs font-semibold truncate">{s.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{a.client}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: accent }}>
                        {a.status} · {s.duration}min
                      </p>
                    </button>
                  )
                }
                return (
                  <button key={p.id} onClick={() => openNew(time, p.id)}
                    className="m-1 rounded-xl border border-dashed border-transparent hover:border-border hover:bg-accent/40 transition-colors group grid place-items-center min-h-[58px]">
                    <Plus className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* footer CTA */}
      <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted-foreground">Sistema demonstrativo da MGC Vortex — imagine com a sua marca.</p>
        <a href="/#contato" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: accent }}>
          Quero um sistema assim <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* ---------- New appointment modal ---------- */}
      <AnimatePresence>
        {newSlot && (
          <NewApptModal slot={newSlot} onClose={() => setNewSlot(null)} onCreate={createAppt} />
        )}
      </AnimatePresence>

      {/* ---------- Detail modal ---------- */}
      <AnimatePresence>
        {detail && (
          <Modal onClose={() => setDetail(null)} title="Agendamento">
            {(() => {
              const s = svc(detail.serviceId)
              const p = prof(detail.profId)
              return (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-full" style={{ background: `${accent}1f` }}>
                      <Scissors className="h-5 w-5" style={{ color: accent }} />
                    </div>
                    <div>
                      <p className={serif("text-xl font-semibold")}>{s.name}</p>
                      <p className="text-sm text-muted-foreground">{detail.client}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Info label="Profissional" value={p.name} />
                    <Info label="Horário" value={`${detail.time} · ${s.duration}min`} />
                    <Info label="Valor" value={brl(s.price)} />
                    <Info label="Status" value={detail.status} />
                  </div>
                  <div className="flex gap-2 pt-1">
                    {detail.status === "Pendente" && (
                      <button onClick={() => setStatus(detail.id, "Confirmado")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: accent }}>
                        <Check className="h-4 w-4" /> Confirmar
                      </button>
                    )}
                    {detail.status !== "Concluído" && (
                      <button onClick={() => setStatus(detail.id, "Concluído")}
                        className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-accent">
                        Concluir
                      </button>
                    )}
                    <button onClick={() => cancelAppt(detail.id)}
                      className="px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-rose-600 hover:bg-rose-500/10">
                      Cancelar
                    </button>
                  </div>
                </div>
              )
            })()}
          </Modal>
        )}
      </AnimatePresence>

    </div>
  )
}

/* ---------- small UI helpers ---------- */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0 bg-zinc-950/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className={`${cormorant.className} text-2xl font-semibold`}>{title}</h3>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-accent">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

function NewApptModal({
  slot,
  onClose,
  onCreate,
}: {
  slot: { time: string; profId: string }
  onClose: () => void
  onCreate: (f: { client: string; serviceId: string; profId: string; time: string }) => void
}) {
  const [client, setClient] = useState("")
  const [serviceId, setServiceId] = useState("s1")
  const [profId, setProfId] = useState(slot.profId)
  const [time, setTime] = useState(slot.time)

  return (
    <Modal onClose={onClose} title="Novo agendamento">
      <div className="space-y-4">
        <Field label="Cliente">
          <input autoFocus value={client} onChange={(e) => setClient(e.target.value)}
            placeholder="Nome do cliente" className={inputClass} />
        </Field>
        <Field label="Serviço">
          <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} className={inputClass}>
            {services.map((s) => <option key={s.id} value={s.id}>{s.name} — {brl(s.price)} ({s.duration}min)</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Profissional">
            <select value={profId} onChange={(e) => setProfId(e.target.value)} className={inputClass}>
              {professionals.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </Field>
          <Field label="Horário">
            <select value={time} onChange={(e) => setTime(e.target.value)} className={inputClass}>
              {slots.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>
        <button onClick={() => onCreate({ client, serviceId, profId, time })} disabled={!client.trim()}
          className="w-full py-3 rounded-xl text-white font-medium disabled:opacity-50 transition-opacity"
          style={{ background: BRAND.accent }}>
          Confirmar agendamento
        </button>
      </div>
    </Modal>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}
