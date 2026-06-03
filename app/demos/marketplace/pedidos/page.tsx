"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { orders, statusColor, brl, type OrderStatus } from "../data"

const filters: ("Todos" | OrderStatus)[] = ["Todos", "Novo", "Pago", "Enviado", "Entregue", "Cancelado"]

export default function Pedidos() {
  const [q, setQ] = useState("")
  const [filter, setFilter] = useState<"Todos" | OrderStatus>("Todos")

  const list = useMemo(
    () =>
      orders.filter(
        (o) =>
          (filter === "Todos" || o.status === filter) &&
          (o.customer.toLowerCase().includes(q.toLowerCase()) ||
            o.seller.toLowerCase().includes(q.toLowerCase()) ||
            o.id.includes(q))
      ),
    [q, filter]
  )

  const totalFiltered = list.reduce((s, o) => s + o.total, 0)

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Pedidos</h1>
          <p className="text-sm text-muted-foreground">{list.length} pedidos · {brl(totalFiltered)} em vendas</p>
        </div>
      </div>

      {/* controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por cliente, vendedor ou nº do pedido..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-card border border-border overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f ? "bg-orange-500 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="hidden sm:grid grid-cols-[5rem_1fr_1fr_5rem_6rem_6rem_6rem] gap-3 px-5 py-3 border-b border-border text-xs font-mono uppercase tracking-wider text-muted-foreground">
          <span>Pedido</span><span>Cliente</span><span>Vendedor</span><span>Itens</span><span className="text-right">Total</span><span>Pgto</span><span className="text-right">Status</span>
        </div>
        <div className="divide-y divide-border">
          {list.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">Nenhum pedido encontrado.</div>
          ) : (
            list.map((o) => (
              <div key={o.id} className="grid grid-cols-2 sm:grid-cols-[5rem_1fr_1fr_5rem_6rem_6rem_6rem] gap-2 sm:gap-3 px-5 py-3.5 items-center text-sm hover:bg-accent/50 transition-colors">
                <span className="font-mono text-xs text-muted-foreground">{o.id}</span>
                <span className="font-medium truncate">{o.customer}</span>
                <span className="text-muted-foreground truncate hidden sm:block">{o.seller}</span>
                <span className="text-muted-foreground hidden sm:block">{o.items} itens</span>
                <span className="tabular-nums text-right">{brl(o.total)}</span>
                <span className="text-muted-foreground hidden sm:block">{o.payment}</span>
                <span className={`justify-self-end px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[o.status]}`}>
                  {o.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
