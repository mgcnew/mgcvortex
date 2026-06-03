/* Concept UI mockups — rendered as real markup (vector, theme-aware).
   Used in the portfolio as "Projeto conceito" previews. */

const bar = "rounded-full bg-foreground/10"
const chip = "rounded-md bg-foreground/10"

/* 1. Analytics Dashboard */
export function MockDashboard() {
  const bars = [40, 70, 55, 85, 60, 95, 75]
  return (
    <div className="absolute inset-0 p-3 flex gap-2 bg-secondary/40">
      {/* sidebar */}
      <div className="w-10 flex flex-col gap-2 pt-1">
        <div className="w-6 h-6 rounded-lg bg-lime-400" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`h-2 ${bar}`} />
        ))}
      </div>
      {/* main */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 rounded-lg bg-card border border-border p-2">
              <div className={`h-1.5 w-8 ${bar} mb-1.5`} />
              <div className={`h-3 w-10 rounded ${i === 0 ? "bg-lime-400" : "bg-foreground/20"}`} />
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-lg bg-card border border-border p-2 flex items-end gap-1.5">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-lime-400/80" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* 2. E-commerce */
export function MockEcommerce() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2 bg-secondary/40">
      <div className="flex items-center gap-2">
        <div className={`h-5 flex-1 rounded-md bg-card border border-border`} />
        <div className="w-5 h-5 rounded-md bg-lime-400" />
      </div>
      <div className="flex-1 grid grid-cols-3 gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-lg bg-card border border-border p-1.5 flex flex-col gap-1">
            <div className="flex-1 rounded-md bg-foreground/10" />
            <div className={`h-1.5 w-full ${bar}`} />
            <div className="h-2.5 w-8 rounded bg-lime-500/80" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* 3. CRM */
export function MockCRM() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2 bg-secondary/40">
      <div className="flex items-center justify-between">
        <div className={`h-2.5 w-16 ${bar}`} />
        <div className="h-5 w-12 rounded-md bg-lime-400" />
      </div>
      <div className="flex-1 rounded-lg bg-card border border-border divide-y divide-border overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 p-2">
            <div className="w-5 h-5 rounded-full bg-foreground/15 shrink-0" />
            <div className="flex-1 flex flex-col gap-1">
              <div className={`h-1.5 w-20 ${bar}`} />
              <div className={`h-1.5 w-12 ${bar}`} />
            </div>
            <div className={`h-3 w-9 rounded-full ${i % 2 === 0 ? "bg-lime-400/70" : "bg-foreground/15"}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* 4. Delivery App (mobile) */
export function MockDelivery() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-secondary/40">
      <div className="w-24 h-[170px] rounded-[1.2rem] bg-card border-2 border-border p-2 flex flex-col gap-1.5 shadow-lg">
        <div className="mx-auto w-8 h-1 rounded-full bg-foreground/20" />
        <div className="h-12 rounded-lg bg-foreground/10 relative overflow-hidden">
          <div className="absolute left-3 top-4 w-2 h-2 rounded-full bg-lime-500" />
          <div className="absolute right-4 bottom-3 w-2 h-2 rounded-full bg-foreground/30" />
        </div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-1.5 rounded-md bg-secondary p-1.5">
            <div className="w-5 h-5 rounded-md bg-foreground/15" />
            <div className="flex-1 flex flex-col gap-1">
              <div className={`h-1.5 w-full ${bar}`} />
              <div className={`h-1.5 w-8 ${bar}`} />
            </div>
          </div>
        ))}
        <div className="mt-auto h-6 rounded-lg bg-lime-400" />
      </div>
    </div>
  )
}

/* 5. Real estate portal */
export function MockRealEstate() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2 bg-secondary/40">
      <div className="h-16 rounded-lg bg-foreground/10 relative flex items-end p-2">
        <div className="h-5 w-2/3 rounded-md bg-card border border-border" />
        <div className="absolute right-2 bottom-2 h-5 w-5 rounded-md bg-lime-400" />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-lg bg-card border border-border p-1.5 flex flex-col gap-1">
            <div className="flex-1 rounded-md bg-foreground/10" />
            <div className={`h-1.5 w-full ${bar}`} />
            <div className="flex items-center justify-between">
              <div className="h-2.5 w-10 rounded bg-lime-500/80" />
              <div className={`h-1.5 w-4 ${bar}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 6. Finance SaaS */
export function MockFinance() {
  const line = [30, 45, 38, 60, 52, 75, 68, 88]
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2 bg-secondary/40">
      <div className="rounded-lg bg-lime-400 text-zinc-950 p-2.5">
        <div className="h-1.5 w-10 rounded-full bg-zinc-950/30 mb-1.5" />
        <div className="h-4 w-20 rounded bg-zinc-950/80" />
      </div>
      <div className="flex-1 rounded-lg bg-card border border-border p-2 flex items-end gap-1">
        {line.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div className="w-full rounded-sm bg-lime-400/70" style={{ height: `${h}%` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex-1 flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-foreground/15" />
            <div className={`h-1.5 flex-1 ${chip}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export const mockups = {
  dashboard: MockDashboard,
  ecommerce: MockEcommerce,
  crm: MockCRM,
  delivery: MockDelivery,
  realestate: MockRealEstate,
  finance: MockFinance,
}

export type MockupKey = keyof typeof mockups
