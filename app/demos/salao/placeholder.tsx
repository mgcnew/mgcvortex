import Link from "next/link"
import { Construction, ArrowRight } from "lucide-react"
import { BRAND } from "./data"

export function EmImplementacao({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-extrabold tracking-tight mb-1">{title}</h1>
      <p className="text-sm text-slate-500 mb-8">{desc}</p>

      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-16 flex flex-col items-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl mb-5" style={{ background: `${BRAND.accent}14`, color: BRAND.accent }}>
          <Construction className="h-7 w-7" />
        </span>
        <h2 className="text-xl font-bold mb-2">Área em implementação</h2>
        <p className="text-slate-500 max-w-sm mb-6">
          Este módulo faz parte do sistema completo. Nesta demonstração, ele ainda não está habilitado —
          mas pode ser construído sob medida para o seu negócio.
        </p>
        <Link href="/#contato" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity" style={{ background: BRAND.accent }}>
          Falar com a MGC Vortex <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
