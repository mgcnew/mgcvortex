"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react"
import { syne } from "./fonts"

/* ----------------------------- data ----------------------------- */
type Period = "7D" | "30D" | "90D"

type Dataset = {
  revenue: number
  delta: number
  area: number[]
  channels: { name: string; pct: number; color: string }[]
  kpis: { label: string; value: string; delta: number; spark: number[] }[]
  products: { name: string; value: number; pct: number }[]
}

const COLORS = {
  iris: "#7c5cff",
  fuchsia: "#d946ef",
  amber: "#f59e0b",
  cyan: "#22d3ee",
}

const DATA: Record<Period, Dataset> = {
  "7D": {
    revenue: 48230,
    delta: 12.5,
    area: [28, 34, 30, 42, 38, 55, 48, 62, 58, 71, 66, 80],
    channels: [
      { name: "Orgânico", pct: 42, color: COLORS.iris },
      { name: "Pago", pct: 31, color: COLORS.fuchsia },
      { name: "Indicação", pct: 17, color: COLORS.amber },
      { name: "Direto", pct: 10, color: COLORS.cyan },
    ],
    kpis: [
      { label: "Ticket médio", value: "R$ 154", delta: 4.2, spark: [3, 5, 4, 6, 5, 7, 8] },
      { label: "Pedidos", value: "312", delta: 8.1, spark: [4, 4, 5, 6, 6, 8, 9] },
      { label: "Conversão", value: "3.4%", delta: -1.3, spark: [6, 5, 6, 4, 5, 4, 4] },
      { label: "Recorrência", value: "61%", delta: 6.0, spark: [3, 4, 4, 5, 6, 7, 8] },
    ],
    products: [
      { name: "Plano Pro", value: 18400, pct: 100 },
      { name: "Plano Team", value: 12100, pct: 66 },
      { name: "Add-on API", value: 8600, pct: 47 },
      { name: "Consultoria", value: 5300, pct: 29 },
    ],
  },
  "30D": {
    revenue: 198420,
    delta: 18.2,
    area: [22, 30, 35, 33, 44, 40, 52, 60, 57, 68, 74, 88],
    channels: [
      { name: "Orgânico", pct: 38, color: COLORS.iris },
      { name: "Pago", pct: 34, color: COLORS.fuchsia },
      { name: "Indicação", pct: 18, color: COLORS.amber },
      { name: "Direto", pct: 10, color: COLORS.cyan },
    ],
    kpis: [
      { label: "Ticket médio", value: "R$ 162", delta: 5.5, spark: [4, 5, 5, 6, 7, 7, 9] },
      { label: "Pedidos", value: "1.284", delta: 14.0, spark: [3, 5, 6, 7, 7, 8, 10] },
      { label: "Conversão", value: "3.1%", delta: 2.1, spark: [4, 5, 5, 6, 6, 7, 7] },
      { label: "Recorrência", value: "64%", delta: 3.4, spark: [4, 4, 5, 6, 6, 7, 8] },
    ],
    products: [
      { name: "Plano Pro", value: 76200, pct: 100 },
      { name: "Plano Team", value: 51400, pct: 67 },
      { name: "Add-on API", value: 38900, pct: 51 },
      { name: "Consultoria", value: 21300, pct: 28 },
    ],
  },
  "90D": {
    revenue: 612900,
    delta: 24.9,
    area: [18, 24, 30, 38, 42, 50, 55, 63, 70, 78, 85, 96],
    channels: [
      { name: "Orgânico", pct: 45, color: COLORS.iris },
      { name: "Pago", pct: 28, color: COLORS.fuchsia },
      { name: "Indicação", pct: 19, color: COLORS.amber },
      { name: "Direto", pct: 8, color: COLORS.cyan },
    ],
    kpis: [
      { label: "Ticket médio", value: "R$ 171", delta: 7.8, spark: [3, 4, 5, 6, 7, 8, 10] },
      { label: "Pedidos", value: "4.021", delta: 21.3, spark: [2, 4, 5, 7, 8, 9, 11] },
      { label: "Conversão", value: "3.6%", delta: 4.0, spark: [4, 5, 6, 6, 7, 8, 9] },
      { label: "Recorrência", value: "68%", delta: 5.2, spark: [3, 4, 5, 6, 7, 8, 9] },
    ],
    products: [
      { name: "Plano Pro", value: 241000, pct: 100 },
      { name: "Plano Team", value: 168000, pct: 70 },
      { name: "Add-on API", value: 121000, pct: 50 },
      { name: "Consultoria", value: 82900, pct: 34 },
    ],
  },
}

/* ----------------------------- helpers ----------------------------- */
function useCountUp(target: number, key: string) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const dur = 900
    const from = 0
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(from + (target - from) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, key])
  return n
}

function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return ""
  let d = `M ${pts[0].x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1]
    const p1 = pts[i]
    const cx = (p0.x + p1.x) / 2
    d += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`
  }
  return d
}

function Spark({ data, positive }: { data: number[]; positive: boolean }) {
  const W = 80
  const H = 28
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / (max - min || 1)) * (H - 4) - 2,
  }))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-7" preserveAspectRatio="none">
      <path
        d={smoothPath(pts)}
        fill="none"
        stroke={positive ? COLORS.iris : "#f43f5e"}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ----------------------------- page ----------------------------- */
export default function DashboardDemo() {
  const [period, setPeriod] = useState<Period>("7D")
  const d = DATA[period]
  const revenue = useCountUp(d.revenue, period)

  // area chart geometry
  const W = 600
  const H = 220
  const maxA = Math.max(...d.area)
  const minA = Math.min(...d.area)
  const aPts = d.area.map((v, i) => ({
    x: (i / (d.area.length - 1)) * W,
    y: H - ((v - minA) / (maxA - minA || 1)) * (H - 30) - 15,
  }))
  const linePath = smoothPath(aPts)
  const areaPath = `${linePath} L ${W},${H} L 0,${H} Z`

  const [hoverPt, setHoverPt] = useState<number | null>(null)
  const [activeCh, setActiveCh] = useState<number | null>(null)

  // donut geometry
  const R = 52
  const C = 2 * Math.PI * R
  let acc = 0

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Atmospheric gradient mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full blur-[100px] opacity-40" style={{ background: COLORS.iris }} />
        <div className="absolute top-10 right-10 h-64 w-64 rounded-full blur-[100px] opacity-30" style={{ background: COLORS.fuchsia }} />
        <div className="absolute top-40 left-0 h-56 w-56 rounded-full blur-[100px] opacity-20" style={{ background: COLORS.cyan }} />
      </div>
      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ===== HERO PANEL ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 sm:p-9"
        >
          {/* corner glow */}
          <div className="pointer-events-none absolute -top-20 -right-10 h-60 w-60 rounded-full blur-3xl opacity-25" style={{ background: `radial-gradient(circle, ${COLORS.iris}, transparent 70%)` }} />

          <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="min-w-0">
              {/* wordmark */}
              <div className="flex items-center gap-2.5 mb-7">
                <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: `linear-gradient(135deg, ${COLORS.iris}, ${COLORS.fuchsia})` }}>
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className={`${syne.className} text-xl font-extrabold tracking-tight`}>Órbita</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">/ revenue intel</span>
              </div>

              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Receita acumulada</p>
              <div className="flex items-end gap-4 flex-wrap">
                <h1 className={`${syne.className} text-5xl sm:text-7xl font-extrabold leading-none tracking-tighter tabular-nums`}>
                  R$ {revenue.toLocaleString("pt-BR")}
                </h1>
                <span
                  className="mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold"
                  style={{ background: `${COLORS.iris}1f`, color: COLORS.iris }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                  {d.delta}%
                </span>
              </div>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Comparado ao período anterior. Tendência de alta sustentada em todos os canais.
              </p>
            </div>

            {/* period selector */}
            <div className="flex gap-1 rounded-2xl border border-border bg-background/60 p-1 backdrop-blur self-start">
              {(["7D", "30D", "90D"] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`relative rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                    period === p ? "text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {period === p && (
                    <motion.span
                      layoutId="periodPill"
                      className="absolute inset-0 -z-10 rounded-xl"
                      style={{ background: `linear-gradient(135deg, ${COLORS.iris}, ${COLORS.fuchsia})` }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {p}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ===== MAIN GRID ===== */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {/* Area chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 rounded-[2rem] border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`${syne.className} text-lg font-bold`}>Fluxo de receita</h2>
                <p className="text-xs text-muted-foreground">Passe o mouse para inspecionar</p>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">{period}</span>
            </div>

            <div className="relative">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 220 }} preserveAspectRatio="none"
                onMouseLeave={() => setHoverPt(null)}>
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.iris} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={COLORS.iris} stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={COLORS.iris} />
                    <stop offset="100%" stopColor={COLORS.fuchsia} />
                  </linearGradient>
                </defs>
                {/* grid lines */}
                {[0.25, 0.5, 0.75].map((g) => (
                  <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="currentColor" strokeOpacity="0.06" />
                ))}
                <motion.path d={areaPath} fill="url(#areaFill)"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
                <motion.path d={linePath} fill="none" stroke="url(#lineStroke)" strokeWidth={3}
                  vectorEffect="non-scaling-stroke" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeInOut" }} />
                {/* hover hit areas + dot */}
                {aPts.map((p, i) => (
                  <rect key={i} x={(i - 0.5) * (W / (aPts.length - 1))} y={0} width={W / (aPts.length - 1)} height={H}
                    fill="transparent" onMouseEnter={() => setHoverPt(i)} />
                ))}
                {hoverPt !== null && (
                  <g>
                    <line x1={aPts[hoverPt].x} x2={aPts[hoverPt].x} y1={0} y2={H} stroke={COLORS.iris} strokeOpacity="0.3" strokeDasharray="4 4" />
                    <circle cx={aPts[hoverPt].x} cy={aPts[hoverPt].y} r={5} fill={COLORS.iris} stroke="white" strokeWidth={2} />
                  </g>
                )}
              </svg>
              {hoverPt !== null && (
                <div
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-background px-2.5 py-1.5 shadow-lg"
                  style={{ left: `${(aPts[hoverPt].x / W) * 100}%`, top: `${(aPts[hoverPt].y / H) * 100}%` }}
                >
                  <p className="font-mono text-[10px] text-muted-foreground">ponto {hoverPt + 1}</p>
                  <p className="text-sm font-bold tabular-nums">R$ {(d.area[hoverPt] * 1000).toLocaleString("pt-BR")}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Donut: channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[2rem] border border-border bg-card p-6"
          >
            <h2 className={`${syne.className} text-lg font-bold mb-6`}>Canais de aquisição</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <svg viewBox="0 0 140 140" className="h-40 w-40 -rotate-90">
                  {d.channels.map((ch, i) => {
                    const len = (ch.pct / 100) * C
                    const seg = (
                      <circle
                        key={ch.name}
                        cx="70" cy="70" r={R}
                        fill="none"
                        stroke={ch.color}
                        strokeWidth={activeCh === i ? 18 : 14}
                        strokeDasharray={`${len} ${C - len}`}
                        strokeDashoffset={-acc}
                        strokeLinecap="butt"
                        className="transition-all duration-300"
                        style={{ opacity: activeCh === null || activeCh === i ? 1 : 0.35 }}
                        onMouseEnter={() => setActiveCh(i)}
                        onMouseLeave={() => setActiveCh(null)}
                      />
                    )
                    acc += len
                    return seg
                  })}
                </svg>
                <div className="absolute inset-0 grid place-items-center rotate-0">
                  <div className="text-center">
                    <p className={`${syne.className} text-2xl font-extrabold leading-none`}>
                      {activeCh !== null ? `${d.channels[activeCh].pct}%` : "100%"}
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">
                      {activeCh !== null ? d.channels[activeCh].name : "total"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {d.channels.map((ch, i) => (
                <div
                  key={ch.name}
                  onMouseEnter={() => setActiveCh(i)}
                  onMouseLeave={() => setActiveCh(null)}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary/60 cursor-default"
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: ch.color }} />
                  <span className="flex-1 text-sm">{ch.name}</span>
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">{ch.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ===== KPI ROW ===== */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {d.kpis.map((k, i) => {
            const up = k.delta >= 0
            return (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                className="group rounded-[1.5rem] border border-border bg-card p-5 hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{k.label}</p>
                  <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${up ? "" : "text-rose-500"}`} style={up ? { color: COLORS.iris } : undefined}>
                    {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(k.delta)}%
                  </span>
                </div>
                <p className={`${syne.className} text-3xl font-extrabold tracking-tight tabular-nums mb-2`}>{k.value}</p>
                <Spark data={k.spark} positive={up} />
              </motion.div>
            )
          })}
        </div>

        {/* ===== TOP PRODUCTS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-4 rounded-[2rem] border border-border bg-card p-6"
        >
          <h2 className={`${syne.className} text-lg font-bold mb-6`}>Receita por produto</h2>
          <div className="space-y-4">
            {d.products.map((p, i) => (
              <div key={p.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">R$ {p.value.toLocaleString("pt-BR")}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ background: i === 0 ? `linear-gradient(90deg, ${COLORS.iris}, ${COLORS.fuchsia})` : COLORS.iris, opacity: i === 0 ? 1 : 0.85 - i * 0.12 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
