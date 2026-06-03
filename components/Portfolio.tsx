"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { mockups, type MockupKey } from "@/components/portfolio-mockups"

type Project = { title: string; type: string; tags: string[]; mock: MockupKey; href?: string }

const projects: Project[] = [
  { title: "Praça — Marketplace", type: "Plataforma multi-vendedor", tags: ["Next.js", "Dashboard", "Multi-tela"], mock: "ecommerce", href: "/demos/marketplace" },
  { title: "Lúmen — Finanças", type: "Sistema financeiro", tags: ["Next.js", "Fluxo de caixa", "Cartões"], mock: "finance", href: "/demos/financas" },
  { title: "Camélia — Salão", type: "Agendamento de serviços", tags: ["Next.js", "Agenda", "Modais"], mock: "crm", href: "/demos/salao" },
  { title: "CRM de Vendas", type: "Sistema sob medida", tags: ["Next.js", "TypeScript", "Filtros"], mock: "crm", href: "/demos/crm" },
]

export function Portfolio() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <p className="font-mono text-xs text-lime-600 dark:text-lime-300 mb-3">// nosso trabalho</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
              Uma amostra do que entregamos
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md text-sm">
              Projetos <span className="text-foreground font-medium">ao vivo</span> — clique pra navegar e ver de perto o padrão técnico da MGC Vortex.
            </p>
          </div>
          <button
            onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-accent font-semibold text-sm transition-all"
          >
            Quero o meu aqui
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {projects.map((project, i) => {
            const Mock = mockups[project.mock]
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.06, type: "spring", stiffness: 90, damping: 16 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group relative rounded-3xl overflow-hidden border border-border bg-card hover:border-lime-400 dark:hover:border-lime-400/60 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                  </div>
                  <div className="flex-1 mx-1 h-5 rounded-md bg-secondary flex items-center px-2.5">
                    <span className="font-mono text-[10px] text-muted-foreground truncate">
                      mgcvortex.com.br/{project.mock}
                    </span>
                  </div>
                </div>

                {/* Mockup / live preview */}
                <div
                  className={`relative h-48 overflow-hidden transition-transform duration-500 ${
                    hovered === i ? "scale-[1.03]" : "scale-100"
                  }`}
                >
                  <Mock />
                  {/* badge */}
                  {project.href ? (
                    <span className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-lime-300 dark:bg-lime-400 text-zinc-950 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-pulse" />
                      ao vivo
                    </span>
                  ) : (
                    <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm border border-border text-[10px] font-mono text-muted-foreground">
                      conceito
                    </span>
                  )}
                  {/* hover CTA for live demos */}
                  {project.href && (
                    <Link
                      href={project.href}
                      target="_blank"
                      className={`absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/45 transition-opacity duration-300 ${
                        hovered === i ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-300 dark:bg-lime-400 text-zinc-950 text-sm font-bold">
                        Ver projeto <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </Link>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 border-t border-border">
                  <p className="font-mono text-[11px] text-lime-600 dark:text-lime-300 uppercase tracking-wider mb-1">
                    {project.type}
                  </p>
                  <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-1.5">
                    {project.href ? (
                      <Link href={project.href} target="_blank" className="hover:text-lime-600 dark:hover:text-lime-300 transition-colors inline-flex items-center gap-1">
                        {project.title}
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-md bg-secondary border border-border text-muted-foreground text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
