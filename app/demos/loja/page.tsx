"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus, X, Check } from "lucide-react"

type Product = { id: number; name: string; price: number; cat: string; tone: string }

const products: Product[] = [
  { id: 1, name: "Tênis Runner Pro", price: 399, cat: "Calçados", tone: "from-lime-300 to-emerald-400" },
  { id: 2, name: "Jaqueta Urban", price: 289, cat: "Roupas", tone: "from-zinc-300 to-zinc-500" },
  { id: 3, name: "Mochila Tech", price: 219, cat: "Acessórios", tone: "from-amber-200 to-orange-400" },
  { id: 4, name: "Óculos Aura", price: 159, cat: "Acessórios", tone: "from-sky-200 to-indigo-400" },
  { id: 5, name: "Camiseta Base", price: 89, cat: "Roupas", tone: "from-rose-200 to-pink-400" },
  { id: 6, name: "Boné Classic", price: 79, cat: "Acessórios", tone: "from-teal-200 to-cyan-400" },
  { id: 7, name: "Calça Cargo", price: 199, cat: "Roupas", tone: "from-stone-300 to-stone-500" },
  { id: 8, name: "Sneaker Lite", price: 349, cat: "Calçados", tone: "from-violet-200 to-purple-400" },
]

const cats = ["Todos", "Calçados", "Roupas", "Acessórios"]

export default function LojaDemo() {
  const [cat, setCat] = useState("Todos")
  const [cart, setCart] = useState<Record<number, number>>({})
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)

  const visible = cat === "Todos" ? products : products.filter((p) => p.cat === cat)
  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const dec = (id: number) =>
    setCart((c) => {
      const n = (c[id] || 0) - 1
      const next = { ...c }
      if (n <= 0) delete next[id]
      else next[id] = n
      return next
    })

  const items = Object.entries(cart).map(([id, qty]) => ({ p: products.find((x) => x.id === +id)!, qty }))
  const count = items.reduce((s, i) => s + i.qty, 0)
  const total = items.reduce((s, i) => s + i.p.price * i.qty, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Aura Store</h1>
          <p className="text-muted-foreground text-sm">Moda e acessórios — entrega para todo o Brasil.</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lime-300 dark:bg-lime-400 text-zinc-950 font-bold"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Carrinho</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-950 text-white text-xs flex items-center justify-center font-bold">
              {count}
            </span>
          )}
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              cat === c ? "bg-foreground text-background" : "bg-secondary border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {visible.map((p) => (
          <div key={p.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:-translate-y-1 transition-all">
            <div className={`h-36 bg-gradient-to-br ${p.tone}`} />
            <div className="p-4">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{p.cat}</p>
              <h3 className="font-medium text-sm mt-0.5 mb-2">{p.name}</h3>
              <div className="flex items-center justify-between">
                <span className="font-display font-bold">R$ {p.price}</span>
                <button
                  onClick={() => add(p.id)}
                  className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center hover:bg-lime-300 dark:hover:bg-lime-400 hover:text-zinc-950 transition-all"
                  aria-label="Adicionar"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-zinc-950/50" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-sm bg-card border-l border-border flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-display font-bold text-lg">Seu carrinho</h2>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            {done ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-lime-300 dark:bg-lime-400 flex items-center justify-center">
                  <Check className="w-7 h-7 text-zinc-950" />
                </div>
                <p className="font-display font-bold text-lg">Pedido confirmado!</p>
                <p className="text-sm text-muted-foreground">Obrigado pela compra. 🎉</p>
                <button onClick={() => { setDone(false); setCart({}); setOpen(false) }} className="mt-2 text-sm font-semibold text-lime-600 dark:text-lime-300">
                  Continuar comprando
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <ShoppingCart className="w-10 h-10 opacity-30" />
                <p className="text-sm">Seu carrinho está vazio</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-3">
                  {items.map(({ p, qty }) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${p.tone} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground">R$ {p.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => dec(p.id)} className="w-6 h-6 rounded-md bg-secondary border border-border flex items-center justify-center">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center text-sm tabular-nums">{qty}</span>
                        <button onClick={() => add(p.id)} className="w-6 h-6 rounded-md bg-secondary border border-border flex items-center justify-center">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-5 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-display text-xl font-bold">R$ {total}</span>
                  </div>
                  <button onClick={() => setDone(true)} className="w-full py-3 rounded-xl bg-lime-300 dark:bg-lime-400 text-zinc-950 font-bold">
                    Finalizar compra
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
