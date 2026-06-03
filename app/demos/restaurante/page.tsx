"use client"

import { useState, useMemo } from "react"
import {
  UtensilsCrossed, Flame, Wine, Wheat, Star, Clock, MapPin, Phone,
  Menu, X, Check, ArrowRight, ChevronDown,
} from "lucide-react"
import { playfair } from "./fonts"

const serif = (e = "") => `${playfair.className} ${e}`

const nav = [
  { label: "Início", id: "inicio" },
  { label: "Cardápio", id: "cardapio" },
  { label: "Sobre", id: "sobre" },
  { label: "Reservar", id: "reservar" },
]

const destaques = [
  { icon: Wheat, title: "Massa fresca", desc: "Feita à mão todos os dias, do jeito tradicional." },
  { icon: Flame, title: "Forno a lenha", desc: "Pizzas de borda fina assadas em forno italiano." },
  { icon: Wine, title: "Vinhos selecionados", desc: "Carta com rótulos italianos e nacionais." },
]

const menu = [
  {
    cat: "Entradas",
    items: [
      { n: "Bruschetta al Pomodoro", d: "Pão italiano, tomate, manjericão e azeite", p: "29" },
      { n: "Carpaccio", d: "Finas fatias de filé, parmesão e rúcula", p: "42" },
      { n: "Antipasto Misto", d: "Seleção de frios, queijos e azeitonas", p: "58" },
    ],
  },
  {
    cat: "Massas",
    items: [
      { n: "Spaghetti alle Vongole", d: "Vôngoles frescos, alho e vinho branco", p: "72" },
      { n: "Ravioli di Ricotta", d: "Recheio de ricota e espinafre, molho de manteiga e sálvia", p: "64" },
      { n: "Lasagna della Casa", d: "Camadas de massa, ragù e bechamel", p: "59" },
    ],
  },
  {
    cat: "Pizzas",
    items: [
      { n: "Margherita", d: "Molho de tomate, mozzarella e manjericão", p: "54" },
      { n: "Quattro Formaggi", d: "Quatro queijos no forno a lenha", p: "62" },
      { n: "Prosciutto e Rúcula", d: "Presunto cru, rúcula e parmesão", p: "68" },
    ],
  },
  {
    cat: "Sobremesas",
    items: [
      { n: "Tiramisù", d: "Clássico italiano com café e mascarpone", p: "32" },
      { n: "Panna Cotta", d: "Com calda de frutas vermelhas", p: "28" },
    ],
  },
]

const GOLD = "#d4a24e"

export default function RestauranteDemo() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ nome: "", tel: "", data: "", hora: "", pessoas: "2" })
  const [sent, setSent] = useState(false)

  const dias = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() + i)
      const value = d.toISOString().slice(0, 10)
      const label = i === 0 ? "Hoje" : i === 1 ? "Amanhã"
        : new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short" }).format(d)
      return { value, label }
    })
  }, [])
  const horarios = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"].map((h) => ({ value: h, label: h }))
  const pessoasOpts = ["1", "2", "3", "4", "5", "6", "8"].map((p) => ({ value: p, label: `${p} ${p === "1" ? "pessoa" : "pessoas"}` }))

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className={`h-[calc(100dvh-3rem)] overflow-y-auto bg-[#0c0a09] text-stone-200`} style={{ fontFamily: "var(--font-sans)" }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#0c0a09]/90 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => go("inicio")} className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full border" style={{ borderColor: GOLD, color: GOLD }}>
              <UtensilsCrossed className="h-4 w-4" />
            </span>
            <span className={serif("text-xl font-semibold tracking-wide")} style={{ color: GOLD }}>Fornello</span>
          </button>
          <ul className="hidden md:flex items-center gap-7">
            {nav.map((n) => (
              <li key={n.id}>
                <button onClick={() => go(n.id)} className="text-sm text-stone-300 hover:text-white transition-colors">{n.label}</button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button onClick={() => go("reservar")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0c0a09] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD }}>
              Reservar mesa
            </button>
            <button onClick={() => setOpen(!open)} className="md:hidden grid h-9 w-9 place-items-center rounded-lg text-stone-300 hover:bg-white/10">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-white/10 px-4 py-2">
            {nav.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} className="block w-full text-left px-3 py-2.5 text-stone-300 hover:text-white">{n.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `radial-gradient(${GOLD} 1px, transparent 1px)`, backgroundSize: "22px 22px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          <p className="uppercase tracking-[0.35em] text-xs mb-6" style={{ color: GOLD }}>cucina italiana · desde 1998</p>
          <h1 className={serif("text-5xl sm:text-7xl font-semibold leading-[1.05]")}>
            Sabores da Itália,<br />feitos <span style={{ color: GOLD }}>à mão</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-stone-400 text-lg">
            Massas frescas, forno a lenha e uma carta de vinhos para celebrar cada ocasião. Tradição que você sente no primeiro garfo.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => go("reservar")} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[#0c0a09]" style={{ background: GOLD }}>
              Reservar mesa <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => go("cardapio")} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/20 hover:bg-white/5 transition-colors">
              Ver cardápio
            </button>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section id="sobre" className="border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-3 gap-8">
          {destaques.map((d) => {
            const Icon = d.icon
            return (
              <div key={d.title} className="text-center">
                <span className="inline-grid h-14 w-14 place-items-center rounded-full border mb-4" style={{ borderColor: GOLD, color: GOLD }}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className={serif("text-xl font-semibold mb-1.5")}>{d.title}</h3>
                <p className="text-sm text-stone-400">{d.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Cardápio */}
      <section id="cardapio" className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-xs mb-3" style={{ color: GOLD }}>il menu</p>
          <h2 className={serif("text-4xl sm:text-5xl font-semibold")}>Nosso cardápio</h2>
        </div>
        <div className="space-y-12">
          {menu.map((sec) => (
            <div key={sec.cat}>
              <h3 className={serif("text-2xl font-semibold mb-5")} style={{ color: GOLD }}>{sec.cat}</h3>
              <div className="space-y-4">
                {sec.items.map((it) => (
                  <div key={it.n} className="flex items-baseline gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-100">{it.n}</p>
                      <p className="text-sm text-stone-500">{it.d}</p>
                    </div>
                    <span className="flex-1 border-b border-dotted border-white/15 translate-y-[-4px]" />
                    <span className={serif("text-lg")} style={{ color: GOLD }}>R$ {it.p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Depoimento / faixa */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5" style={{ color: GOLD, fill: GOLD }} />)}
          </div>
          <p className={serif("text-2xl sm:text-3xl font-medium leading-snug")}>
            &ldquo;A melhor massa fresca da cidade. Ambiente aconchegante e atendimento impecável.&rdquo;
          </p>
          <p className="mt-4 text-stone-400 text-sm">— Revista Sabor & Arte</p>
        </div>
      </section>

      {/* Reserva */}
      <section id="reservar" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs mb-3" style={{ color: GOLD }}>prenotazione</p>
          <h2 className={serif("text-4xl sm:text-5xl font-semibold")}>Reserve sua mesa</h2>
          <p className="mt-4 text-stone-400 max-w-sm">Garanta seu lugar e viva uma experiência italiana autêntica. Confirmamos sua reserva em instantes.</p>
          <div className="mt-8 space-y-3 text-sm text-stone-300">
            <p className="flex items-center gap-3"><Phone className="h-5 w-5" style={{ color: GOLD }} /> (11) 93084-1390</p>
            <p className="flex items-center gap-3"><MapPin className="h-5 w-5" style={{ color: GOLD }} /> Rua da Cantina, 45 — São Paulo/SP</p>
            <p className="flex items-center gap-3"><Clock className="h-5 w-5" style={{ color: GOLD }} /> Ter a Dom · 18h às 23h30</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center text-center py-8 gap-3">
              <span className="grid h-16 w-16 place-items-center rounded-full" style={{ background: `${GOLD}22`, color: GOLD }}><Check className="h-8 w-8" /></span>
              <h3 className={serif("text-2xl font-semibold")}>Reserva recebida!</h3>
              <p className="text-stone-400 text-sm">Em breve confirmamos por telefone. Grazie! 🍝</p>
              <button onClick={() => { setSent(false); setForm({ nome: "", tel: "", data: "", hora: "19:30", pessoas: "2" }) }} className="mt-2 text-sm font-semibold" style={{ color: GOLD }}>Nova reserva</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (form.data && form.hora) setSent(true) }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Seu nome" className={rInput} />
                <input required value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="Telefone" className={rInput} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <GoldSelect value={form.data} onChange={(v) => setForm({ ...form, data: v })} options={dias} placeholder="Dia" />
                <GoldSelect value={form.hora} onChange={(v) => setForm({ ...form, hora: v })} options={horarios} placeholder="Horário" />
                <GoldSelect value={form.pessoas} onChange={(v) => setForm({ ...form, pessoas: v })} options={pessoasOpts} placeholder="Pessoas" />
              </div>
              <button type="submit" disabled={!form.nome || !form.tel || !form.data || !form.hora}
                className="w-full py-3.5 rounded-xl font-bold text-[#0c0a09] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity" style={{ background: GOLD }}>
                Confirmar reserva
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <span className={serif("text-lg")} style={{ color: GOLD }}>Fornello</span>
          <p>© {new Date().getFullYear()} Cantina Fornello · Site demonstrativo por MGC Vortex</p>
        </div>
      </footer>
    </div>
  )
}

const rInput =
  "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-stone-100 placeholder:text-stone-500 outline-none focus:border-[#d4a24e] focus:ring-2 focus:ring-[#d4a24e]/20 transition-all"

function GoldSelect({
  value, onChange, options, placeholder,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const selected = options.find((o) => o.value === value)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${rInput} flex items-center justify-between gap-2 text-left ${open ? "border-[#d4a24e] ring-2 ring-[#d4a24e]/20" : ""}`}
      >
        <span className={selected ? "text-stone-100 truncate" : "text-stone-500"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: GOLD }} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-1.5 w-full max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-[#171310] p-1 shadow-2xl">
            {options.map((o) => {
              const active = o.value === value
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => { onChange(o.value); setOpen(false) }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-left transition-colors hover:bg-white/5"
                  style={active ? { color: GOLD, background: "rgba(255,255,255,0.04)" } : { color: "#e7e5e4" }}
                >
                  <span className="truncate capitalize">{o.label}</span>
                  {active && <Check className="h-3.5 w-3.5" />}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
