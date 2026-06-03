/* Mock data for the "Praça" marketplace demo system.
   100% fictitious — no real client data. */

export const BRAND = {
  name: "Praça",
  tagline: "marketplace platform",
  accent: "#f97316", // orange-500
}

export type OrderStatus = "Novo" | "Pago" | "Enviado" | "Entregue" | "Cancelado"

export type Order = {
  id: string
  customer: string
  seller: string
  items: number
  total: number
  status: OrderStatus
  date: string
  payment: "Pix" | "Cartão" | "Boleto"
}

export type Product = {
  id: string
  name: string
  seller: string
  category: string
  price: number
  stock: number
  sold: number
  rating: number
  status: "Ativo" | "Pausado" | "Esgotado"
  tone: string
}

export type Seller = {
  id: string
  name: string
  owner: string
  category: string
  products: number
  sales: number
  rating: number
  status: "Ativo" | "Pendente" | "Suspenso"
  joined: string
  tone: string
}

/* ---------------- KPIs / overview ---------------- */
export const overview = {
  gmv: 487300,
  gmvDelta: 18.4,
  orders: 1842,
  ordersDelta: 12.1,
  sellers: 64,
  sellersDelta: 6.7,
  commission: 48730, // 10% take rate
  commissionDelta: 18.4,
  // sales over last 12 periods
  salesSeries: [42, 50, 47, 58, 64, 60, 72, 78, 74, 86, 92, 100],
  salesLabels: ["", "", "", "", "", "", "", "", "", "", "", ""],
  // category split
  categories: [
    { name: "Moda", pct: 34, color: "#f97316" },
    { name: "Eletrônicos", pct: 27, color: "#0ea5e9" },
    { name: "Casa", pct: 21, color: "#22c55e" },
    { name: "Beleza", pct: 18, color: "#a855f7" },
  ],
}

/* ---------------- Orders ---------------- */
export const orders: Order[] = [
  { id: "#10482", customer: "Ana Souza", seller: "ModaViva", items: 3, total: 489.9, status: "Pago", date: "03/06", payment: "Pix" },
  { id: "#10481", customer: "Carlos Lima", seller: "TechZone", items: 1, total: 2390.0, status: "Enviado", date: "03/06", payment: "Cartão" },
  { id: "#10480", customer: "Marina Reis", seller: "CasaBela", items: 5, total: 1250.5, status: "Entregue", date: "02/06", payment: "Pix" },
  { id: "#10479", customer: "João Pedro", seller: "FitStore", items: 2, total: 318.0, status: "Novo", date: "02/06", payment: "Boleto" },
  { id: "#10478", customer: "Beatriz N.", seller: "ModaViva", items: 4, total: 760.0, status: "Pago", date: "02/06", payment: "Cartão" },
  { id: "#10477", customer: "Rafael T.", seller: "GamerHub", items: 1, total: 4299.0, status: "Cancelado", date: "01/06", payment: "Cartão" },
  { id: "#10476", customer: "Letícia M.", seller: "BelezaPura", items: 6, total: 540.3, status: "Entregue", date: "01/06", payment: "Pix" },
  { id: "#10475", customer: "Diego Alves", seller: "CasaBela", items: 2, total: 899.9, status: "Enviado", date: "01/06", payment: "Pix" },
  { id: "#10474", customer: "Paula F.", seller: "TechZone", items: 1, total: 1599.0, status: "Pago", date: "31/05", payment: "Cartão" },
  { id: "#10473", customer: "Bruno C.", seller: "FitStore", items: 3, total: 267.0, status: "Entregue", date: "31/05", payment: "Boleto" },
  { id: "#10472", customer: "Sofia R.", seller: "BelezaPura", items: 2, total: 184.5, status: "Novo", date: "31/05", payment: "Pix" },
  { id: "#10471", customer: "Igor M.", seller: "GamerHub", items: 1, total: 3150.0, status: "Entregue", date: "30/05", payment: "Cartão" },
]

/* ---------------- Products ---------------- */
export const products: Product[] = [
  { id: "p1", name: "Vestido Floral Verão", seller: "ModaViva", category: "Moda", price: 159.9, stock: 42, sold: 318, rating: 4.8, status: "Ativo", tone: "from-rose-300 to-pink-500" },
  { id: "p2", name: "Notebook Ultra 14\"", seller: "TechZone", category: "Eletrônicos", price: 4299.0, stock: 12, sold: 86, rating: 4.9, status: "Ativo", tone: "from-slate-300 to-slate-500" },
  { id: "p3", name: "Jogo de Panelas Inox", seller: "CasaBela", category: "Casa", price: 389.9, stock: 0, sold: 204, rating: 4.7, status: "Esgotado", tone: "from-amber-200 to-orange-400" },
  { id: "p4", name: "Kit Skincare Glow", seller: "BelezaPura", category: "Beleza", price: 129.9, stock: 88, sold: 512, rating: 4.9, status: "Ativo", tone: "from-fuchsia-300 to-purple-500" },
  { id: "p5", name: "Tênis Runner Pro", seller: "FitStore", category: "Moda", price: 399.0, stock: 27, sold: 176, rating: 4.6, status: "Ativo", tone: "from-lime-300 to-emerald-500" },
  { id: "p6", name: "Headset Gamer RGB", seller: "GamerHub", category: "Eletrônicos", price: 549.0, stock: 5, sold: 143, rating: 4.8, status: "Ativo", tone: "from-cyan-300 to-blue-500" },
  { id: "p7", name: "Luminária Articulada", seller: "CasaBela", category: "Casa", price: 219.9, stock: 34, sold: 97, rating: 4.5, status: "Pausado", tone: "from-yellow-200 to-amber-400" },
  { id: "p8", name: "Perfume Aura 100ml", seller: "BelezaPura", category: "Beleza", price: 289.0, stock: 61, sold: 388, rating: 4.9, status: "Ativo", tone: "from-violet-300 to-indigo-500" },
]

/* ---------------- Sellers ---------------- */
export const sellers: Seller[] = [
  { id: "s1", name: "ModaViva", owner: "Ana Beatriz", category: "Moda", products: 142, sales: 89400, rating: 4.8, status: "Ativo", joined: "Jan/26", tone: "from-rose-400 to-pink-600" },
  { id: "s2", name: "TechZone", owner: "Marcos Dias", category: "Eletrônicos", products: 86, sales: 156800, rating: 4.9, status: "Ativo", joined: "Fev/26", tone: "from-sky-400 to-blue-600" },
  { id: "s3", name: "CasaBela", owner: "Renata Lopes", category: "Casa", products: 210, sales: 67200, rating: 4.6, status: "Ativo", joined: "Jan/26", tone: "from-amber-400 to-orange-600" },
  { id: "s4", name: "BelezaPura", owner: "Camila Rocha", category: "Beleza", products: 178, sales: 98300, rating: 4.9, status: "Ativo", joined: "Mar/26", tone: "from-fuchsia-400 to-purple-600" },
  { id: "s5", name: "FitStore", owner: "Pedro Henrique", category: "Moda", products: 64, sales: 41200, rating: 4.5, status: "Pendente", joined: "Mai/26", tone: "from-lime-400 to-emerald-600" },
  { id: "s6", name: "GamerHub", owner: "Lucas Martins", category: "Eletrônicos", products: 53, sales: 124500, rating: 4.7, status: "Ativo", joined: "Fev/26", tone: "from-cyan-400 to-indigo-600" },
  { id: "s7", name: "Vintage&Co", owner: "Júlia Andrade", category: "Moda", products: 31, sales: 18900, rating: 4.3, status: "Suspenso", joined: "Abr/26", tone: "from-stone-400 to-stone-600" },
]

export const statusColor: Record<string, string> = {
  Novo: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  Pago: "bg-orange-500/15 text-orange-600 dark:text-orange-300",
  Enviado: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
  Entregue: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  Cancelado: "bg-red-500/15 text-red-600 dark:text-red-400",
  Ativo: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  Pausado: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  Esgotado: "bg-red-500/15 text-red-600 dark:text-red-400",
  Pendente: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  Suspenso: "bg-red-500/15 text-red-600 dark:text-red-400",
}

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
