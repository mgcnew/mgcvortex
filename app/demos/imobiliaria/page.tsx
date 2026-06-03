"use client"

import { useState, useMemo } from "react"
import {
  Building2, Search, BedDouble, Bath, Maximize, MapPin, Phone, Clock,
  Menu, X, Check, ArrowRight, ShieldCheck, KeyRound, HandCoins, Star,
} from "lucide-react"
import { outfit } from "./fonts"

const NAVY = "#0f2b46"
const GOLD = "#c9913d"

const nav = [
  { label: "Comprar", id: "imoveis" },
  { label: "Alugar", id: "imoveis" },
  { label: "Sobre", id: "sobre" },
  { label: "Contato", id: "contato" },
]

type Imovel = {
  id: number; titulo: string; bairro: string; cidade: string; preco: number
  finalidade: "Comprar" | "Alugar"; tipo: "Casa" | "Apartamento" | "Comercial"
  quartos: number; banheiros: number; area: number; tone: string; destaque?: boolean
}

const imoveis: Imovel[] = [
  { id: 1, titulo: "Apartamento Jardins", bairro: "Jardins", cidade: "São Paulo", preco: 890000, finalidade: "Comprar", tipo: "Apartamento", quartos: 3, banheiros: 2, area: 110, tone: "from-sky-400 to-blue-600", destaque: true },
  { id: 2, titulo: "Casa com Quintal", bairro: "Granja Viana", cidade: "Cotia", preco: 1250000, finalidade: "Comprar", tipo: "Casa", quartos: 4, banheiros: 3, area: 220, tone: "from-emerald-400 to-teal-600" },
  { id: 3, titulo: "Studio Moderno", bairro: "Pinheiros", cidade: "São Paulo", preco: 3200, finalidade: "Alugar", tipo: "Apartamento", quartos: 1, banheiros: 1, area: 38, tone: "from-amber-400 to-orange-600" },
  { id: 4, titulo: "Sala Comercial", bairro: "Faria Lima", cidade: "São Paulo", preco: 6500, finalidade: "Alugar", tipo: "Comercial", quartos: 0, banheiros: 2, area: 75, tone: "from-slate-400 to-slate-600" },
  { id: 5, titulo: "Cobertura Duplex", bairro: "Moema", cidade: "São Paulo", preco: 2100000, finalidade: "Comprar", tipo: "Apartamento", quartos: 4, banheiros: 4, area: 180, tone: "from-violet-400 to-indigo-600", destaque: true },
  { id: 6, titulo: "Casa Térrea", bairro: "Alphaville", cidade: "Barueri", preco: 7800, finalidade: "Alugar", tipo: "Casa", quartos: 3, banheiros: 2, area: 160, tone: "from-rose-400 to-pink-600" },
]

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })

const diferenciais = [
  { icon: ShieldCheck, title: "Negociação segura", desc: "Assessoria jurídica do início ao fim." },
  { icon: KeyRound, title: "Imóveis verificados", desc: "Toda documentação conferida pela nossa equipe." },
  { icon: HandCoins, title: "Melhores condições", desc: "Parcerias com bancos para seu financiamento." },
]

export default function ImobiliariaDemo() {
  const [open, setOpen] = useState(false)
  const [fin, setFin] = useState<"Comprar" | "Alugar">("Comprar")
  const [tipo, setTipo] = useState<"Todos" | "Casa" | "Apartamento" | "Comercial">("Todos")
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nome: "", tel: "", interesse: "Comprar" })

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const lista = useMemo(
    () => imoveis.filter((i) => i.finalidade === fin && (tipo === "Todos" || i.tipo === tipo)),
    [fin, tipo]
  )

  return (
    <div className={`${outfit.className} h-[calc(100dvh-3rem)] overflow-y-auto bg-white text-slate-900`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => go("inicio")} className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: NAVY }}><Building2 className="h-5 w-5" /></span>
            <span className="font-extrabold text-lg tracking-tight" style={{ color: NAVY }}>Habita</span>
          </button>
          <ul className="hidden md:flex items-center gap-1">
            {nav.map((n, idx) => (
              <li key={idx}>
                <button onClick={() => go(n.id)} className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors">{n.label}</button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button onClick={() => go("contato")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>
              Anunciar imóvel
            </button>
            <button onClick={() => setOpen(!open)} className="md:hidden grid h-9 w-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-slate-100 px-4 py-2">
            {nav.map((n, i) => <button key={i} onClick={() => go(n.id)} className="block w-full text-left px-3 py-2.5 text-slate-600">{n.label}</button>)}
          </div>
        )}
      </nav>

      {/* Hero + search */}
      <section id="inicio" className="relative" style={{ background: NAVY }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center text-white">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Encontre o <span style={{ color: GOLD }}>lar</span> ideal
          </h1>
          <p className="mt-5 text-slate-300 max-w-xl mx-auto text-lg">
            Mais de 1.200 imóveis selecionados para comprar ou alugar, com a segurança de quem entende do mercado.
          </p>

          {/* search panel */}
          <div className="mt-10 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl text-left max-w-3xl mx-auto">
            <div className="flex gap-1 mb-4 p-1 rounded-xl bg-slate-100 w-fit">
              {(["Comprar", "Alugar"] as const).map((f) => (
                <button key={f} onClick={() => setFin(f)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${fin === f ? "text-white" : "text-slate-600"}`} style={fin === f ? { background: NAVY } : undefined}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <select value={tipo} onChange={(e) => setTipo(e.target.value as typeof tipo)} className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-none focus:border-slate-400">
                {["Todos", "Casa", "Apartamento", "Comercial"].map((t) => <option key={t}>{t}</option>)}
              </select>
              <div className="flex-[2] flex items-center gap-2 px-4 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="h-4 w-4 text-slate-400" />
                <input placeholder="Bairro ou cidade" className="flex-1 py-3 bg-transparent text-sm text-slate-900 outline-none" />
              </div>
              <button onClick={() => go("imoveis")} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold" style={{ background: GOLD }}>
                <Search className="h-4 w-4" /> Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="imoveis" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="font-semibold mb-1" style={{ color: GOLD }}>Imóveis para {fin.toLowerCase()}</p>
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: NAVY }}>{lista.length} imóveis encontrados</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lista.map((im) => (
            <div key={im.id} className="group rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
              <div className={`relative h-44 bg-gradient-to-br ${im.tone}`}>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-xs font-semibold" style={{ color: NAVY }}>{im.tipo}</span>
                {im.destaque && <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white inline-flex items-center gap-1" style={{ background: GOLD }}><Star className="h-3 w-3 fill-white" /> Destaque</span>}
              </div>
              <div className="p-5">
                <p className="text-xl font-extrabold" style={{ color: NAVY }}>
                  {brl(im.preco)}{im.finalidade === "Alugar" && <span className="text-sm font-medium text-slate-400">/mês</span>}
                </p>
                <h3 className="font-semibold mt-1">{im.titulo}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="h-3.5 w-3.5" /> {im.bairro}, {im.cidade}</p>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600">
                  {im.quartos > 0 && <span className="inline-flex items-center gap-1"><BedDouble className="h-4 w-4 text-slate-400" /> {im.quartos}</span>}
                  <span className="inline-flex items-center gap-1"><Bath className="h-4 w-4 text-slate-400" /> {im.banheiros}</span>
                  <span className="inline-flex items-center gap-1"><Maximize className="h-4 w-4 text-slate-400" /> {im.area}m²</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Diferenciais */}
      <section id="sobre" className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-3 gap-6">
          {diferenciais.map((d) => {
            const Icon = d.icon
            return (
              <div key={d.title} className="p-6 rounded-2xl bg-white border border-slate-100">
                <span className="grid h-11 w-11 place-items-center rounded-xl text-white mb-4" style={{ background: NAVY }}><Icon className="h-5 w-5" /></span>
                <h3 className="font-bold mb-1" style={{ color: NAVY }}>{d.title}</h3>
                <p className="text-sm text-slate-600">{d.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-semibold mb-2" style={{ color: GOLD }}>Fale com um corretor</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: NAVY }}>Vamos encontrar seu imóvel</h2>
          <p className="mt-4 text-slate-600 max-w-sm">Deixe seus dados e um de nossos corretores entra em contato para entender o que você procura.</p>
          <div className="mt-8 space-y-3 text-sm text-slate-700">
            <p className="flex items-center gap-3"><Phone className="h-5 w-5" style={{ color: GOLD }} /> (11) 93084-1390</p>
            <p className="flex items-center gap-3"><MapPin className="h-5 w-5" style={{ color: GOLD }} /> Av. das Nações, 900 — São Paulo/SP</p>
            <p className="flex items-center gap-3"><Clock className="h-5 w-5" style={{ color: GOLD }} /> Seg a Sáb · 9h às 18h</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {sent ? (
            <div className="flex flex-col items-center text-center py-8 gap-3">
              <span className="grid h-16 w-16 place-items-center rounded-full text-white" style={{ background: NAVY }}><Check className="h-8 w-8" /></span>
              <h3 className="text-xl font-bold" style={{ color: NAVY }}>Contato enviado!</h3>
              <p className="text-slate-600 text-sm">Um corretor falará com você em breve. 🏡</p>
              <button onClick={() => { setSent(false); setForm({ nome: "", tel: "", interesse: "Comprar" }) }} className="mt-2 text-sm font-semibold" style={{ color: GOLD }}>Novo contato</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
              <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Seu nome" className={iInput} />
              <input required value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="Telefone / WhatsApp" className={iInput} />
              <select value={form.interesse} onChange={(e) => setForm({ ...form, interesse: e.target.value })} className={iInput}>
                <option>Comprar</option><option>Alugar</option><option>Anunciar meu imóvel</option>
              </select>
              <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-white inline-flex items-center justify-center gap-2" style={{ background: GOLD }}>
                Falar com corretor <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white" style={{ background: NAVY }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: GOLD }}><Building2 className="h-4 w-4 text-white" /></span>
            <span className="font-extrabold">Habita</span>
          </div>
          <p className="text-sm text-slate-300">© {new Date().getFullYear()} Habita Imóveis · Site demonstrativo por MGC Vortex</p>
        </div>
      </footer>
    </div>
  )
}

const iInput =
  "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-300/40 transition-all"
