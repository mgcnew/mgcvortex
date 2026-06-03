"use client"

import { useState } from "react"
import {
  Smile, Sparkles, ShieldCheck, Baby, Stethoscope, HeartPulse,
  Star, Clock, MapPin, Phone, CalendarCheck, Check, Menu, X, ArrowRight, Award, Users, ThumbsUp,
} from "lucide-react"
import { jakarta } from "./fonts"

const nav = [
  { label: "Início", id: "inicio" },
  { label: "Serviços", id: "servicos" },
  { label: "Sobre", id: "sobre" },
  { label: "Depoimentos", id: "depoimentos" },
  { label: "Contato", id: "agendar" },
]

const servicos = [
  { icon: Sparkles, name: "Clareamento Dental", desc: "Sorriso mais branco e radiante com tecnologia segura e resultados duradouros." },
  { icon: Smile, name: "Ortodontia", desc: "Aparelhos fixos, estéticos e alinhadores invisíveis para alinhar seu sorriso." },
  { icon: ShieldCheck, name: "Implantes", desc: "Reposição de dentes com naturalidade, conforto e durabilidade." },
  { icon: HeartPulse, name: "Tratamento de Canal", desc: "Procedimentos endodônticos modernos, com o mínimo de desconforto." },
  { icon: Baby, name: "Odontopediatria", desc: "Cuidado especial e acolhedor para o sorriso das crianças." },
  { icon: Stethoscope, name: "Limpeza & Prevenção", desc: "Profilaxia e check-ups para manter sua saúde bucal sempre em dia." },
]

const diferenciais = [
  { icon: Award, title: "Equipe especializada", desc: "Profissionais com pós-graduação e atualização constante." },
  { icon: Sparkles, title: "Tecnologia de ponta", desc: "Equipamentos digitais para diagnósticos precisos." },
  { icon: ThumbsUp, title: "Atendimento humanizado", desc: "Você no centro de tudo, com escuta e cuidado." },
  { icon: CalendarCheck, title: "Parcelamento facilitado", desc: "Planos e condições que cabem no seu bolso." },
]

const equipe = [
  { name: "Dra. Marina Alves", role: "Ortodontista", initials: "MA", tone: "from-cyan-400 to-sky-500" },
  { name: "Dr. Rafael Costa", role: "Implantodontista", initials: "RC", tone: "from-teal-400 to-cyan-500" },
  { name: "Dra. Letícia Dias", role: "Odontopediatra", initials: "LD", tone: "from-sky-400 to-blue-500" },
]

const depoimentos = [
  { name: "Juliana M.", text: "Atendimento impecável! Fiz meu clareamento e amei o resultado. Equipe super atenciosa.", rating: 5 },
  { name: "Carlos E.", text: "Coloquei implante e foi tranquilo do começo ao fim. Recomendo de olhos fechados.", rating: 5 },
  { name: "Patrícia S.", text: "Levo meus filhos e eles adoram ir ao dentista — isso diz tudo sobre o cuidado deles.", rating: 5 },
]

export default function ClinicaDemo() {
  const [menu, setMenu] = useState(false)
  const [form, setForm] = useState({ nome: "", tel: "", servico: servicos[0].name, data: "", msg: "" })
  const [sent, setSent] = useState(false)

  const go = (id: string) => {
    setMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className={`${jakarta.className} h-[calc(100dvh-3rem)] overflow-y-auto bg-white text-slate-900`}>
      {/* ---------- Navbar ---------- */}
      <nav className="sticky top-0 z-40 bg-white/95 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => go("inicio")} className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-500 text-white">
              <Smile className="h-5 w-5" />
            </span>
            <span className="font-extrabold text-lg tracking-tight">
              Sorriso <span className="text-cyan-500">Feliz</span>
            </span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.id}>
                <button onClick={() => go(n.id)} className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-cyan-600 rounded-lg transition-colors">
                  {n.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button onClick={() => go("agendar")}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold shadow-lg shadow-cyan-500/30 transition-colors">
              <CalendarCheck className="h-4 w-4" /> Agendar
            </button>
            <button onClick={() => setMenu(!menu)} className="md:hidden grid h-9 w-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100">
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="md:hidden border-t border-slate-100 px-4 py-2">
            {nav.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} className="block w-full text-left px-3 py-2.5 text-slate-600 hover:text-cyan-600 rounded-lg">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ---------- Hero ---------- */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="absolute top-40 -left-20 h-64 w-64 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold mb-5">
              <Star className="h-3.5 w-3.5 fill-cyan-500 text-cyan-500" /> Nota 4.9 · +5.000 sorrisos atendidos
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Seu sorriso em <span className="text-cyan-500">boas mãos</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-md">
              Odontologia moderna, acolhedora e sem dor. Cuidamos da sua saúde bucal com tecnologia e carinho — do primeiro check-up ao sorriso dos seus sonhos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={() => go("agendar")} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-colors">
                Agendar consulta <ArrowRight className="h-4 w-4" />
              </button>
              <a href="https://wa.me/5511930841390" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 font-semibold transition-colors">
                <Phone className="h-4 w-4 text-cyan-500" /> WhatsApp
              </a>
            </div>
          </div>

          {/* visual */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-[2.5rem] bg-gradient-to-br from-cyan-400 to-teal-500 p-2.5 shadow-2xl shadow-cyan-500/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/clinica-hero.png" alt="Sorriso saudável e dentes brancos" className="h-full w-full object-cover rounded-[2rem]" />
            </div>
            <div className="absolute -left-4 top-10 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 text-cyan-600"><ShieldCheck className="h-5 w-5" /></span>
              <div><p className="text-sm font-bold">Sem dor</p><p className="text-xs text-slate-500">sedação consciente</p></div>
            </div>
            <div className="absolute -right-2 bottom-10 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-100 text-teal-600"><Clock className="h-5 w-5" /></span>
              <div><p className="text-sm font-bold">Horário flexível</p><p className="text-xs text-slate-500">sáb. incluído</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="bg-cyan-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { icon: Smile, value: "+5.000", label: "Sorrisos transformados" },
            { icon: Award, value: "15 anos", label: "De experiência" },
            { icon: Users, value: "8", label: "Especialistas" },
            { icon: Star, value: "4.9", label: "Avaliação dos pacientes" },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="flex flex-col items-center">
                <Icon className="h-6 w-6 mb-2 text-cyan-100" />
                <p className="text-3xl font-extrabold">{s.value}</p>
                <p className="text-sm text-cyan-100">{s.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ---------- Serviços ---------- */}
      <section id="servicos" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-cyan-600 font-semibold mb-2">Nossos serviços</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Tratamentos para toda a família</h2>
          <p className="mt-3 text-slate-600">Do preventivo ao estético, cuidamos de cada detalhe do seu sorriso.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicos.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.name} className="group p-6 rounded-3xl border border-slate-100 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-500/5 transition-all hover:-translate-y-1 bg-white">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-colors mb-4">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-bold text-lg mb-1.5">{s.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ---------- Diferenciais + Equipe ---------- */}
      <section id="sobre" className="bg-cyan-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5 mb-16">
            {diferenciais.map((d) => {
              const Icon = d.icon
              return (
                <div key={d.title} className="p-6 rounded-3xl bg-white border border-slate-100">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-500 text-white mb-4"><Icon className="h-5 w-5" /></span>
                  <h3 className="font-bold mb-1">{d.title}</h3>
                  <p className="text-sm text-slate-600">{d.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-cyan-600 font-semibold mb-2">Nossa equipe</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Especialistas que cuidam de você</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {equipe.map((e) => (
              <div key={e.name} className="p-6 rounded-3xl bg-white border border-slate-100 text-center">
                <div className={`mx-auto h-20 w-20 rounded-full bg-gradient-to-br ${e.tone} grid place-items-center text-white text-2xl font-bold mb-4`}>
                  {e.initials}
                </div>
                <h3 className="font-bold">{e.name}</h3>
                <p className="text-sm text-cyan-600">{e.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Depoimentos ---------- */}
      <section id="depoimentos" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-cyan-600 font-semibold mb-2">Depoimentos</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Quem sorri, recomenda</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {depoimentos.map((d) => (
            <div key={d.name} className="p-6 rounded-3xl border border-slate-100 bg-white">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: d.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-700 leading-relaxed mb-4">&ldquo;{d.text}&rdquo;</p>
              <p className="font-semibold text-sm">{d.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Agendar (form) ---------- */}
      <section id="agendar" className="bg-gradient-to-br from-cyan-500 to-teal-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Agende sua avaliação</h2>
            <p className="mt-4 text-cyan-50 max-w-sm">
              Preencha o formulário e nossa equipe entra em contato para confirmar o melhor horário pra você. Primeira avaliação sem compromisso.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-cyan-100" /> (11) 93084-1390</p>
              <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-cyan-100" /> Av. dos Sorrisos, 123 — São Paulo/SP</p>
              <p className="flex items-center gap-3"><Clock className="h-5 w-5 text-cyan-100" /> Seg a Sex 8h–19h · Sáb 8h–13h</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-3">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-cyan-100 text-cyan-600"><Check className="h-8 w-8" /></span>
                <h3 className="text-xl font-bold">Agendamento recebido!</h3>
                <p className="text-slate-600 text-sm">Em breve entramos em contato para confirmar. 😁</p>
                <button onClick={() => { setSent(false); setForm({ nome: "", tel: "", servico: servicos[0].name, data: "", msg: "" }) }}
                  className="mt-2 text-cyan-600 font-semibold text-sm">Novo agendamento</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nome">
                    <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Seu nome" className={inp} />
                  </Field>
                  <Field label="Telefone">
                    <input required value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="(11) 90000-0000" className={inp} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Serviço">
                    <select value={form.servico} onChange={(e) => setForm({ ...form, servico: e.target.value })} className={inp}>
                      {servicos.map((s) => <option key={s.name}>{s.name}</option>)}
                    </select>
                  </Field>
                  <Field label="Data preferida">
                    <input type="date" required value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} className={inp} />
                  </Field>
                </div>
                <Field label="Mensagem (opcional)">
                  <textarea rows={3} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} placeholder="Conte um pouco sobre o que precisa..." className={`${inp} resize-none`} />
                </Field>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold transition-colors inline-flex items-center justify-center gap-2">
                  <CalendarCheck className="h-4 w-4" /> Confirmar agendamento
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-500 text-white"><Smile className="h-4 w-4" /></span>
              <span className="font-extrabold text-white">Sorriso <span className="text-cyan-400">Feliz</span></span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">Cuidando do seu sorriso com tecnologia, carinho e profissionais apaixonados pelo que fazem.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Contato</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>(11) 93084-1390</li>
              <li>contato@sorrisofeliz.com.br</li>
              <li>Av. dos Sorrisos, 123 — SP</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Horário</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Seg–Sex: 8h às 19h</li>
              <li>Sábado: 8h às 13h</li>
              <li>Domingo: fechado</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Clínica Sorriso Feliz · Site demonstrativo por MGC Vortex
        </div>
      </footer>
    </div>
  )
}

const inp =
  "w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-500 mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}
