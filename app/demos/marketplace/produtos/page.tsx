"use client"

import { useMemo, useState } from "react"
import { Star, Search } from "lucide-react"
import { products, statusColor, brl } from "../data"

const cats = ["Todas", "Moda", "Eletrônicos", "Casa", "Beleza"]

export default function Produtos() {
  const [cat, setCat] = useState("Todas")
  const [q, setQ] = useState("")

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "Todas" || p.category === cat) &&
          (p.name.toLowerCase().includes(q.toLowerCase()) || p.seller.toLowerCase().includes(q.toLowerCase()))
      ),
    [cat, q]
  )

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Produtos</h1>
        <p className="text-sm text-muted-foreground">{list.length} produtos no catálogo</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar produto ou vendedor..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-card border border-border overflow-x-auto">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                cat === c ? "bg-orange-500 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {list.map((p) => (
          <div key={p.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:-translate-y-1 transition-transform">
            <div className={`relative h-32 bg-gradient-to-br ${p.tone}`}>
              <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor[p.status]}`}>
                {p.status}
              </span>
            </div>
            <div className="p-4">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{p.category}</p>
              <h3 className="font-medium text-sm mt-0.5 mb-1 truncate">{p.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">por {p.seller}</p>
              <div className="flex items-center justify-between">
                <span className="font-display font-bold">{brl(p.price)}</span>
                <span className="inline-flex items-center gap-0.5 text-xs text-amber-500">
                  <Star className="h-3 w-3 fill-amber-500" /> {p.rating}
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>{p.sold} vendidos</span>
                <span>{p.stock > 0 ? `${p.stock} em estoque` : "esgotado"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
