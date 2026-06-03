"use client"

import * as React from "react"

type Theme = "dark" | "light"

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = "mgctech-theme"

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)

  // Sync state with the class already set by the blocking script
  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const initial =
      stored ?? (document.documentElement.classList.contains("dark") ? "dark" : "light")
    setThemeState(initial)
  }, [])

  const applyTheme = React.useCallback((next: Theme) => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const setTheme = React.useCallback(
    (next: Theme) => {
      setThemeState(next)
      applyTheme(next)
    },
    [applyTheme]
  )

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
  return ctx
}
