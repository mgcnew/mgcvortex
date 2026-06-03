"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 50, suffix: "+", label: "Projetos entregues" },
  { value: 30, suffix: "+", label: "Clientes ativos" },
  { value: 5, suffix: "", label: "Anos de estrada" },
  { value: 99, suffix: "%", label: "Taxa de satisfação" },
]

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function Stat({ value, suffix, label }: (typeof stats)[0]) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(value, 1800, visible)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.4 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display text-5xl sm:text-7xl font-bold tracking-tight tabular-nums leading-none">
        {count}
        {suffix}
      </span>
      <span className="mt-2 text-sm font-medium text-zinc-950/70">{label}</span>
    </div>
  )
}

export function Stats() {
  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-lime-300 dark:bg-lime-400 text-zinc-950 px-6 sm:px-12 py-12 sm:py-16">
          <p className="font-mono text-xs text-zinc-950/60 mb-8">// resultados que falam por nós</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
