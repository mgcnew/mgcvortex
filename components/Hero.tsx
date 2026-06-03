"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const
const ROTATING = ["vende.", "converte.", "escala.", "encanta."]

/* Rotating highlighted word with a re-drawing "marker" stroke */
function RotatingHighlight() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((p) => (p + 1) % ROTATING.length), 2400)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <span className="relative inline-grid align-baseline">
      <span className="sr-only">vende.</span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={i}
          aria-hidden
          className="[grid-area:1/1] relative inline-block"
          initial={reduce ? false : { opacity: 0, y: "0.4em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: "-0.4em" }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <motion.span
            className="absolute inset-0 rounded-md bg-lime-300 dark:bg-lime-400"
            style={{ rotate: -1, originX: 0 }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
          />
          <span className="relative z-10 px-2 text-zinc-950">{ROTATING[i]}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* Headline line with mask reveal */
function Line({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean | null }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/* ---------- Animated code card ---------- */
const codeLines = [
  { t: "$ vortex deploy --client=voce", c: "text-lime-600 dark:text-lime-300" },
  { t: "→ build otimizado ........ ok", c: "text-muted-foreground" },
  { t: "→ performance 100/100 ... ok", c: "text-muted-foreground" },
  { t: "→ conversao +37% ........ ok", c: "text-muted-foreground" },
  { t: "✓ no ar em 8.2s", c: "text-foreground font-semibold" },
]

function CodeCard() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible((v) => (v >= codeLines.length ? 0 : v + 1))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-full flex flex-col rounded-3xl border border-border bg-card overflow-hidden">
      {/* terminal bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <Terminal className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-mono text-muted-foreground">deploy.sh</span>
        <div className="ml-auto flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
        </div>
      </div>
      {/* code */}
      <div className="flex-1 p-4 font-mono text-[11px] sm:text-xs leading-relaxed space-y-1.5 min-h-[160px]">
        {codeLines.map((line, i) => (
          <div
            key={i}
            className={`transition-all duration-300 ${line.c} ${
              i < visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
            }`}
          >
            {line.t}
            {i === visible - 1 && <span className="blink ml-0.5">▋</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Mini bar chart ---------- */
const bars = [40, 65, 50, 80, 70, 95, 88]
function ChartCard() {
  return (
    <div className="h-full flex flex-col justify-between rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Crescimento</span>
        <span className="text-xs font-bold text-lime-600 dark:text-lime-300">+128%</span>
      </div>
      <div className="flex items-end gap-1.5 h-16 mt-3">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 120, damping: 14 }}
            style={{ height: `${h}%`, transformOrigin: "bottom" }}
            className="flex-1 rounded-sm bg-lime-300 dark:bg-lime-400/80"
          />
        ))}
      </div>
    </div>
  )
}

const tech = [
  "Next.js", "React", "TypeScript", "Node.js", "Tailwind", "PostgreSQL",
  "React Native", "Python", "Stripe", "Supabase", "Figma", "AWS",
]

const cardBase =
  "rounded-3xl border border-border bg-card transition-all duration-300"

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring" as const, stiffness: 90, damping: 16 },
  }),
}

export function Hero() {
  const reduce = useReducedMotion()
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-24 pb-12 bg-background overflow-hidden"
    >
      {/* subtle blueprint backdrop */}
      <div className="absolute inset-0 bg-blueprint opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---- Top region: headline + code ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Headline card */}
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className={`lg:col-span-2 ${cardBase} p-7 sm:p-10 flex flex-col justify-between gap-8`}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary text-xs font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
                </span>
                Sites & sistemas sob medida
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight" aria-label="Seu negócio rodando em algo que vende.">
                <Line delay={0.1} reduce={reduce}>Seu negócio</Line>
                <Line delay={0.22} reduce={reduce}>rodando em algo</Line>
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.36 }}
                  >
                    que <RotatingHighlight />
                  </motion.span>
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base sm:text-lg text-muted-foreground leading-relaxed">
                Chega de site lento e planilha manual. A MGC Vortex constrói a
                máquina digital que trabalha 24h pra você — do design ao deploy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo("#contato")}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-lime-300 dark:bg-lime-400 text-zinc-950 font-bold hover:gap-3 transition-all"
              >
                Começar projeto
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={() => scrollTo("#portfolio")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-border bg-secondary hover:bg-accent font-semibold transition-all"
              >
                Ver portfólio
              </button>
            </div>
          </motion.div>

          {/* Code card */}
          <motion.div custom={1} variants={fade} initial="hidden" animate="show" className="min-h-[260px]">
            <CodeCard />
          </motion.div>
        </div>

        {/* ---- Bottom region: bento stats ---- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
          {/* Stat 1 */}
          <motion.div
            custom={2}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`${cardBase} p-5 sm:p-6 flex flex-col justify-between min-h-[120px] hover:-translate-y-1`}
          >
            <span className="text-xs font-medium text-muted-foreground">Projetos entregues</span>
            <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight">+50</span>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`${cardBase} p-5 sm:p-6 flex flex-col justify-between min-h-[120px] hover:-translate-y-1`}
          >
            <span className="text-xs font-medium text-muted-foreground">Satisfação dos clientes</span>
            <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-lime-600 dark:text-lime-300">99%</span>
          </motion.div>

          {/* Chart */}
          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="hover:-translate-y-1 transition-transform"
          >
            <ChartCard />
          </motion.div>

          {/* Status / sparkles */}
          <motion.div
            custom={5}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`${cardBase} p-5 sm:p-6 flex flex-col justify-between min-h-[120px] bg-zinc-950 dark:bg-lime-300 text-white dark:text-zinc-950 hover:-translate-y-1`}
          >
            <Sparkles className="w-5 h-5" />
            <div>
              <p className="font-display text-lg font-bold leading-tight">Vaga aberta</p>
              <p className="text-xs opacity-70">pra novos projetos este mês</p>
            </div>
          </motion.div>
        </div>

        {/* ---- Tech marquee ---- */}
        <div className="relative mt-3 sm:mt-4 overflow-hidden rounded-3xl border border-border bg-card py-4">
          <div className="flex w-max animate-marquee gap-8 px-4">
            {[...tech, ...tech].map((t, i) => (
              <span
                key={i}
                className="font-mono text-sm text-muted-foreground whitespace-nowrap flex items-center gap-8"
              >
                {t}
                <span className="text-lime-500">/</span>
              </span>
            ))}
          </div>
          {/* edge fades */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card to-transparent" />
        </div>
      </div>
    </section>
  )
}
