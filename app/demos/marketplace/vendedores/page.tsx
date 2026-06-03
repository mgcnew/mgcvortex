"use client"

import { useState } from "react"
import { Star, Check, X } from "lucide-react"
import { sellers as seedSellers, statusColor, brl, type Seller } from "../data"

export default function Vendedores() {
  const [list, setList] = useState<Seller[]>(seedSellers)

  const setStatus = (id: string, status: Seller["status"]) =>
    setList((l) => l.map((s) => (s.id === id ? { ...s, status } : s)))

  const pending = list.filter((s) => s.status === "Pendente").length

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Vendedores</h1>
          <p className="text-sm text-muted-foreground">{list.length} lojistas cadastrados</p>
        </div>
        {pending > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-600 dark:text-amber-300">
            {pending} aguardando aprovação
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {list.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${s.tone} grid place-items-center text-white font-bold`}>
                {s.name.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold truncate">{s.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor[s.status]}`}>{s.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{s.owner} · desde {s.joined}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div>
                <p className="font-display font-bold text-sm">{s.products}</p>
                <p className="text-[10px] text-muted-foreground">produtos</p>
              </div>
              <div>
                <p className="font-display font-bold text-sm">{brl(s.sales)}</p>
                <p className="text-[10px] text-muted-foreground">vendas</p>
              </div>
              <div>
                <p className="font-display font-bold text-sm inline-flex items-center justify-center gap-0.5">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />{s.rating}
                </p>
                <p className="text-[10px] text-muted-foreground">avaliação</p>
              </div>
            </div>

            {s.status === "Pendente" ? (
              <div className="flex gap-2">
                <button onClick={() => setStatus(s.id, "Ativo")} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium">
                  <Check className="h-4 w-4" /> Aprovar
                </button>
                <button onClick={() => setStatus(s.id, "Suspenso")} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-sm font-medium hover:bg-accent">
                  <X className="h-4 w-4" /> Recusar
                </button>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">
                Categoria: <span className="text-foreground font-medium">{s.category}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
