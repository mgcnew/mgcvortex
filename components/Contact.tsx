"use client"

import { useState } from "react"
import { Send, MessageCircle, Mail, Phone, MapPin, CheckCircle, ArrowUpRight } from "lucide-react"

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1400)
  }

  const whatsappUrl =
    "https://wa.me/5511930841390?text=Olá%2C%20vim%20pelo%20site%20da%20MGC%20Vortex%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços."

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all text-sm"

  return (
    <section id="contato" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14 max-w-2xl">
          <p className="font-mono text-xs text-lime-600 dark:text-lime-300 mb-3">// vamos conversar</p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
            Pronto pra tirar a ideia <span className="text-lime-600 dark:text-lime-300">do papel?</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Conte o que você precisa. Respondemos em até 24h — sem enrolação, sem compromisso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Form */}
          <div className="lg:col-span-3 rounded-3xl border border-border bg-card p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-lime-300 dark:bg-lime-400 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-zinc-950" />
                </div>
                <h3 className="font-display text-2xl font-bold">Mensagem enviada!</h3>
                <p className="text-muted-foreground">Logo entramos em contato. 🚀</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }) }}
                  className="mt-2 text-sm font-semibold text-lime-600 dark:text-lime-300 hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium mb-1.5 block">Nome</label>
                    <input id="name" type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Seu nome" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium mb-1.5 block">E-mail</label>
                    <input id="email" type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="seu@email.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="msg" className="text-sm font-medium mb-1.5 block">Mensagem</label>
                  <textarea id="msg" required rows={5} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Conte sobre seu projeto ou ideia..."
                    className={`${inputClass} resize-none`} />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-lime-300 dark:bg-lime-400 text-zinc-950 font-bold hover:bg-lime-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                  ) : (
                    <><Send className="w-4 h-4" /> Enviar mensagem</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Side */}
          <div className="lg:col-span-2 flex flex-col gap-3 sm:gap-4">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 rounded-3xl bg-zinc-950 dark:bg-lime-300 text-white dark:text-zinc-950 hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-zinc-950/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display font-bold text-lg">Fale no WhatsApp</p>
                <p className="text-sm opacity-70">Resposta rápida • Online agora</p>
              </div>
              <ArrowUpRight className="ml-auto w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Details */}
            {[
              { icon: Mail, label: "E-mail", value: "contato@mgcvortex.com.br" },
              { icon: Phone, label: "Telefone", value: "(11) 93084-1390" },
              { icon: MapPin, label: "Localização", value: "Brasil • Atendimento remoto" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-4 p-5 rounded-3xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-xl border border-border bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-lime-600 dark:text-lime-300" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
