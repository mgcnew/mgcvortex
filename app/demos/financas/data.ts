/* Mock data for the "Lúmen" finance system demo. Fictitious data only. */

export const BRAND = { name: "Lúmen", tagline: "gestão financeira", accent: "#10b981" }

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

export const summary = {
  balance: 184290.45,
  balanceDelta: 8.2,
  income: 62400,
  expenses: 38950,
  // cashflow last 7 months (in / out)
  flow: [
    { m: "Dez", in: 41, out: 32 },
    { m: "Jan", in: 48, out: 35 },
    { m: "Fev", in: 44, out: 30 },
    { m: "Mar", in: 56, out: 41 },
    { m: "Abr", in: 52, out: 38 },
    { m: "Mai", in: 60, out: 36 },
    { m: "Jun", in: 62, out: 39 },
  ],
  categories: [
    { name: "Folha de pagamento", pct: 38, value: 14800 },
    { name: "Fornecedores", pct: 26, value: 10130 },
    { name: "Infraestrutura", pct: 18, value: 7011 },
    { name: "Marketing", pct: 12, value: 4674 },
    { name: "Outros", pct: 6, value: 2335 },
  ],
}

export type Tx = {
  id: string
  desc: string
  category: string
  date: string
  amount: number // + entrada / - saída
  account: string
}

export const transactions: Tx[] = [
  { id: "t1", desc: "Pagamento — Cliente Atlas", category: "Receita", date: "03 Jun", amount: 12400, account: "Conta PJ" },
  { id: "t2", desc: "Folha de pagamento", category: "Pessoal", date: "02 Jun", amount: -14800, account: "Conta PJ" },
  { id: "t3", desc: "Assinatura — Cloud AWS", category: "Infraestrutura", date: "02 Jun", amount: -1290, account: "Cartão Black" },
  { id: "t4", desc: "Pagamento — Cliente Nova", category: "Receita", date: "01 Jun", amount: 8600, account: "Conta PJ" },
  { id: "t5", desc: "Fornecedor — Gráfica Sul", category: "Fornecedores", date: "01 Jun", amount: -3450, account: "Conta PJ" },
  { id: "t6", desc: "Anúncios — Google Ads", category: "Marketing", date: "31 Mai", amount: -2100, account: "Cartão Black" },
  { id: "t7", desc: "Pagamento — Cliente Orbe", category: "Receita", date: "30 Mai", amount: 5400, account: "Conta PJ" },
  { id: "t8", desc: "Energia + Internet", category: "Infraestrutura", date: "29 Mai", amount: -870, account: "Conta PJ" },
  { id: "t9", desc: "Reembolso — Viagem", category: "Outros", date: "28 Mai", amount: -640, account: "Cartão Gold" },
  { id: "t10", desc: "Pagamento — Cliente Vega", category: "Receita", date: "27 Mai", amount: 9800, account: "Conta PJ" },
]

export type Bill = {
  id: string
  name: string
  due: string
  amount: number
  status: "Pendente" | "Pago" | "Atrasado"
  kind: "pagar" | "receber"
}

export const bills: Bill[] = [
  { id: "b1", name: "Cliente Atlas — 2ª parcela", due: "08 Jun", amount: 12400, status: "Pendente", kind: "receber" },
  { id: "b2", name: "Cliente Nova — projeto site", due: "12 Jun", amount: 6800, status: "Pendente", kind: "receber" },
  { id: "b3", name: "Cliente Vega — manutenção", due: "01 Jun", amount: 1500, status: "Atrasado", kind: "receber" },
  { id: "b4", name: "Aluguel escritório", due: "10 Jun", amount: 4200, status: "Pendente", kind: "pagar" },
  { id: "b5", name: "Fatura Cartão Black", due: "15 Jun", amount: 9870, status: "Pendente", kind: "pagar" },
  { id: "b6", name: "Contador", due: "05 Jun", amount: 1200, status: "Pago", kind: "pagar" },
  { id: "b7", name: "Licenças de software", due: "20 Jun", amount: 2340, status: "Pendente", kind: "pagar" },
]

export type Card = {
  id: string
  name: string
  brand: string
  last4: string
  limit: number
  used: number
  gradient: string
}

export const cards: Card[] = [
  { id: "c1", name: "Cartão Black", brand: "Mastercard", last4: "4291", limit: 50000, used: 23480, gradient: "from-zinc-800 to-zinc-950" },
  { id: "c2", name: "Cartão Gold", brand: "Visa", last4: "8830", limit: 20000, used: 6120, gradient: "from-emerald-600 to-teal-800" },
]

export const statusColor: Record<string, string> = {
  Pendente: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  Pago: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  Atrasado: "bg-red-500/15 text-red-600 dark:text-red-400",
}
