"use client"

import { motion } from "framer-motion"
import { Globe, Settings, ShoppingCart, Smartphone, Palette, Lightbulb, ArrowUpRight } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Desenvolvimento Web",
    description:
      "Sites institucionais, landing pages e portais com design moderno, performance e SEO estratégico.",
    span: "sm:col-span-2",
    featured: true,
  },
  { icon: Settings, title: "Sistemas Personalizados", description: "ERPs, CRMs e painéis sob medida para automatizar e escalar seu negócio.", span: "" },
  { icon: ShoppingCart, title: "E-commerce", description: "Lojas integradas a pagamento, estoque e logística para vender mais.", span: "" },
  { icon: Smartphone, title: "Apps Mobile", description: "Aplicativos iOS e Android fluidos, com APIs e design intuitivo.", span: "" },
  { icon: Palette, title: "UI/UX Design", description: "Interfaces que encantam e convertem, do wireframe ao protótipo.", span: "" },
  {
    icon: Lightbulb,
    title: "Consultoria Tech",
    description:
      "Estratégia, arquitetura e revisão de código para escalar sua solução com segurança.",
    span: "sm:col-span-2",
    featured: true,
  },
]

export function Services() {
  return (
    <section id="servicos" className="py-16 sm:py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <p className="font-mono text-xs text-lime-600 dark:text-lime-300 mb-3">// o que fazemos</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-xl leading-[1.05]">
              Tudo que seu negócio precisa pra existir no digital
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs md:text-right">
            Seis frentes, um time. Do primeiro pixel à infraestrutura que segura o crescimento.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06, type: "spring", stiffness: 90, damping: 16 }}
                className={`group relative ${s.span} rounded-3xl border border-border bg-card p-6 sm:p-7 hover:border-lime-400 dark:hover:border-lime-400/60 hover:-translate-y-1 transition-all duration-300 ${
                  s.featured ? "lg:col-span-2 flex flex-col justify-between min-h-[200px]" : "min-h-[200px] flex flex-col"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl border border-border bg-secondary flex items-center justify-center group-hover:bg-lime-300 dark:group-hover:bg-lime-400 transition-colors">
                    <Icon className="w-5 h-5 group-hover:text-zinc-950 transition-colors" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-auto pt-6">
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-2 flex items-center gap-1">
                    {s.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-lime-600 dark:text-lime-300 transition-all" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
