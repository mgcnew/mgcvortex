"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { Logo } from "@/components/Logo"
import { Moon, Sun, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4">
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-3 sm:px-4 h-14 transition-all duration-300 ${
          scrolled
            ? "bg-card/80 backdrop-blur-xl border border-border shadow-sm"
            : "bg-transparent border border-transparent"
        }`}
      >
        {/* Logo */}
        <button onClick={() => handleNavClick("#inicio")} className="flex items-center group">
          <Logo className="h-9 sm:h-11 w-auto group-hover:opacity-80 transition-opacity" />
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={() => handleNavClick("#contato")}
            className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-lime-300 dark:bg-lime-400 text-zinc-950 text-sm font-bold hover:bg-lime-400 transition-all"
          >
            Falar conosco
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 rounded-2xl bg-card border border-border p-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contato")}
            className="mt-1 w-full py-3 rounded-xl bg-lime-300 dark:bg-lime-400 text-zinc-950 font-bold"
          >
            Falar conosco
          </button>
        </div>
      )}
    </header>
  )
}
