"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Plus, X } from "lucide-react"
import { fraunces } from "./fonts"
import {
  BRAND, brl, summary, transactions, bills, cards, statusColor, type Tx,
} from "./data"

const TABS = ["Visão geral", "Transações", "Contas", "Cartões"] as const
type Tab = (typeof TABS)[number]

const serif = (extra = "") => `${fraunces.className} ${extra}`

/* ---------------- Cashflow chart ---------------- */
function Cashflow() {
  const max = Math.max(...summary.flow.flatMap((f) => [f.in, f.out]))
  return (
    <div className="flex items-end gap-3 sm:gap-5 h-44">
      {summary.flow.map((f, i) => (
        <div key={f.m} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full flex items-end justify-center gap-1 h-full">
            <motion.div
              initial={{ height: 0 }} animate={{ height: `${(f.in / max) * 100}%` }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 120, damping: 16 }}
              className="w-2.5 sm:w-3 rounded-full" style={{ background: BRAND.accent }}
            />
            <motion.div
              initial={{ height: 0 }} animate={{ height: `${(f.out / max) * 100}%` }}
              transition={{ delay: i * 0.05 + 0.04, type: "spring", stiffness: 120, damping: 16 }}
              className="w-2.5 sm:w-3 rounded-full bg-foreground/15"
            />
          </div>
          <span className="text-[11px] text-muted-foreground">{f.m}</span>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Views ---------------- */
function VisaoGeral({ txs, balance, income, expenses }: { txs: Tx[]; balance: number; income: number; expenses: number }) {
  return (
    <div className="space-y-10">
      {/* Balance hero */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-border">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Saldo consolidado</p>
          <div className="flex items-end gap-4 flex-wrap">
            <h2 className={serif("text-5xl sm:text-7xl font-semibold tracking-tight tabular-nums")}>
              {brl(balance)}
            </h2>
            <span className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" /> {summary.balanceDelta}%
            </span>
          </div>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="text-xs text-muted-foreground mb-1 inline-flex items-center gap-1">
              <ArrowDownLeft className="h-3 w-3 text-emerald-500" /> Entradas
            </p>
            <p className={serif("text-2xl font-semibold tabular-nums")}>{brl(income)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 inline-flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-rose-500" /> Saídas
            </p>
            <p className={serif("text-2xl font-semibold tabular-nums")}>{brl(expenses)}</p>
          </div>
        </div>
      </div>

      {/* Chart + categories */}
      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className={serif("text-xl font-semibold")}>Fluxo de caixa</h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: BRAND.accent }} /> Entradas</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-foreground/20" /> Saídas</span>
            </div>
          </div>
          <Cashflow />
        </div>

        <div className="lg:col-span-2">
          <h3 className={serif("text-xl font-semibold mb-6")}>Para onde foi</h3>
          <div className="space-y-4">
            {summary.categories.map((c, i) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span>{c.name}</span>
                  <span className="tabular-nums text-muted-foreground">{brl(c.value)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                    transition={{ delay: 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
                    className="h-full rounded-full" style={{ background: BRAND.accent, opacity: 1 - i * 0.13 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent */}
      <div>
        <h3 className={serif("text-xl font-semibold mb-4")}>Movimentações recentes</h3>
        <TxList items={txs.slice(0, 5)} />
      </div>
    </div>
  )
}

function TxList({ items }: { items: typeof transactions }) {
  return (
    <div className="divide-y divide-border">
      {items.map((t) => {
        const positive = t.amount > 0
        return (
          <div key={t.id} className="flex items-center gap-4 py-3.5">
            <div className={`grid h-9 w-9 place-items-center rounded-full ${positive ? "bg-emerald-500/10" : "bg-foreground/5"}`}>
              {positive ? <ArrowDownLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> : <ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{t.desc}</p>
              <p className="text-xs text-muted-foreground">{t.category} · {t.account}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium tabular-nums ${positive ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                {positive ? "+" : "−"} {brl(Math.abs(t.amount))}
              </p>
              <p className="text-xs text-muted-foreground">{t.date}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Transacoes({ txs, onNew }: { txs: Tx[]; onNew: () => void }) {
  const [f, setF] = useState<"Todas" | "Entradas" | "Saídas">("Todas")
  const list = txs.filter((t) =>
    f === "Todas" ? true : f === "Entradas" ? t.amount > 0 : t.amount < 0
  )
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex gap-6 border-b border-border">
          {(["Todas", "Entradas", "Saídas"] as const).map((opt) => (
            <button key={opt} onClick={() => setF(opt)}
              className={`pb-2 text-sm font-medium transition-colors relative ${f === opt ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {opt}
              {f === opt && <motion.span layoutId="txFilter" className="absolute -bottom-px left-0 right-0 h-0.5" style={{ background: BRAND.accent }} />}
            </button>
          ))}
        </div>
        <button onClick={onNew} className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: BRAND.accent }}>
          <Plus className="h-4 w-4" /> Nova
        </button>
      </div>
      <TxList items={list} />
    </div>
  )
}

function Contas() {
  const receber = bills.filter((b) => b.kind === "receber")
  const pagar = bills.filter((b) => b.kind === "pagar")
  const totReceber = receber.filter((b) => b.status !== "Pago").reduce((s, b) => s + b.amount, 0)
  const totPagar = pagar.filter((b) => b.status !== "Pago").reduce((s, b) => s + b.amount, 0)

  const Column = ({ title, items, total, accent }: { title: string; items: typeof bills; total: number; accent: string }) => (
    <div>
      <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-border">
        <h3 className={serif("text-xl font-semibold")}>{title}</h3>
        <span className={serif("text-lg font-semibold tabular-nums")} style={{ color: accent }}>{brl(total)}</span>
      </div>
      <div className="space-y-3">
        {items.map((b) => (
          <div key={b.id} className="flex items-center gap-3 py-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{b.name}</p>
              <p className="text-xs text-muted-foreground">vence {b.due}</p>
            </div>
            <span className="text-sm tabular-nums">{brl(b.amount)}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[b.status]}`}>{b.status}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <Column title="A receber" items={receber} total={totReceber} accent={BRAND.accent} />
      <Column title="A pagar" items={pagar} total={totPagar} accent="#f43f5e" />
    </div>
  )
}

function Cartoes() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {cards.map((c) => {
        const pct = Math.round((c.used / c.limit) * 100)
        return (
          <div key={c.id} className="space-y-4">
            {/* card visual */}
            <div className={`relative h-48 rounded-2xl bg-gradient-to-br ${c.gradient} text-white p-6 overflow-hidden shadow-xl`}>
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="flex justify-between items-start">
                <span className="font-medium">{c.name}</span>
                <span className="text-xs opacity-70">{c.brand}</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono tracking-widest text-lg mb-2">•••• •••• •••• {c.last4}</p>
                <div className="flex justify-between text-xs opacity-80">
                  <span>Limite {brl(c.limit)}</span>
                  <span>{pct}% usado</span>
                </div>
              </div>
            </div>
            {/* usage */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Fatura atual</span>
                <span className={serif("font-semibold tabular-nums")}>{brl(c.used)}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full" style={{ background: pct > 70 ? "#f43f5e" : BRAND.accent }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------------- Page ---------------- */
export default function FinancasDemo() {
  const [tab, setTab] = useState<Tab>("Visão geral")
  const [txs, setTxs] = useState<Tx[]>(transactions)
  const [balance, setBalance] = useState(summary.balance)
  const [income, setIncome] = useState(summary.income)
  const [expenses, setExpenses] = useState(summary.expenses)
  const [newOpen, setNewOpen] = useState(false)

  const addTx = (f: { tipo: "entrada" | "saída"; desc: string; category: string; account: string; value: number }) => {
    const amount = f.tipo === "entrada" ? f.value : -f.value
    const date = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date()).replace(".", "")
    setTxs((t) => [{ id: `n${Date.now()}`, desc: f.desc, category: f.category, date, amount, account: f.account }, ...t])
    setBalance((b) => b + amount)
    if (amount > 0) setIncome((v) => v + f.value)
    else setExpenses((v) => v + f.value)
    setNewOpen(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Brand header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: BRAND.accent }}>
            <span className={serif("font-semibold")}>L</span>
          </div>
          <div className="leading-tight">
            <p className={serif("text-lg font-semibold")}>{BRAND.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{BRAND.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setNewOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: BRAND.accent }}>
            <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Nova movimentação</span>
          </button>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center text-white text-xs font-bold">MV</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-border mb-10 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`relative pb-3 text-sm font-medium whitespace-nowrap transition-colors ${tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {t}
            {tab === t && <motion.span layoutId="tabUnderline" className="absolute -bottom-px left-0 right-0 h-0.5" style={{ background: BRAND.accent }} />}
          </button>
        ))}
      </div>

      {/* Views */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {tab === "Visão geral" && <VisaoGeral txs={txs} balance={balance} income={income} expenses={expenses} />}
          {tab === "Transações" && <Transacoes txs={txs} onNew={() => setNewOpen(true)} />}
          {tab === "Contas" && <Contas />}
          {tab === "Cartões" && <Cartoes />}
        </motion.div>
      </AnimatePresence>

      {/* New transaction modal */}
      <AnimatePresence>
        {newOpen && <NewTxModal onClose={() => setNewOpen(false)} onAdd={addTx} />}
      </AnimatePresence>

      {/* footer CTA */}
      <div className="mt-14 pt-6 border-t border-border flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted-foreground">Sistema demonstrativo da MGC Vortex — imagine com a sua marca.</p>
        <a href="/#contato" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: BRAND.accent }}>
          Quero um sistema assim <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

/* ---------------- New transaction modal ---------------- */
const CATEGORIES = ["Receita", "Pessoal", "Fornecedores", "Infraestrutura", "Marketing", "Outros"]
const ACCOUNTS = ["Conta PJ", "Cartão Black", "Cartão Gold"]
const fInput =
  "w-full px-3 py-2.5 rounded-xl bg-background border border-border text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"

function NewTxModal({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (f: { tipo: "entrada" | "saída"; desc: string; category: string; account: string; value: number }) => void
}) {
  const [tipo, setTipo] = useState<"entrada" | "saída">("entrada")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState(CATEGORIES[0])
  const [account, setAccount] = useState(ACCOUNTS[0])
  const [value, setValue] = useState("")

  const valid = desc.trim() && Number(value) > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
        className="absolute inset-0 bg-zinc-950/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className={`${fraunces.className} text-2xl font-semibold`}>Nova movimentação</h3>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-accent">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 p-1 rounded-xl bg-secondary border border-border">
          {(["entrada", "saída"] as const).map((opt) => (
            <button key={opt} onClick={() => setTipo(opt)}
              className={`py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                tipo === opt
                  ? opt === "entrada" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              {opt}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Descrição</label>
            <input autoFocus value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Ex: Pagamento — Cliente Atlas" className={fInput} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Valor (R$)</label>
            <input type="number" min="0" step="0.01" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0,00" className={fInput} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={fInput}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Conta</label>
              <select value={account} onChange={(e) => setAccount(e.target.value)} className={fInput}>
                {ACCOUNTS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <button
            onClick={() => valid && onAdd({ tipo, desc, category, account, value: Number(value) })}
            disabled={!valid}
            className="w-full py-3 rounded-xl text-white font-medium disabled:opacity-50 transition-opacity"
            style={{ background: BRAND.accent }}>
            Adicionar movimentação
          </button>
        </div>
      </motion.div>
    </div>
  )
}
