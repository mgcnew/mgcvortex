import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Demo banner */}
      <div className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-300 dark:bg-lime-400 text-zinc-950 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-pulse" />
            Demo · MGC Vortex
          </span>
        </div>
      </div>
      {children}
    </div>
  )
}
