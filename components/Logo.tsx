"use client"

import { useTheme } from "@/components/theme-provider"

/**
 * Theme-aware brand logo.
 * Expects two transparent PNG/SVG files in /public:
 *   - /logo-dark.png  → light-colored artwork, shown in DARK mode
 *   - /logo-light.png → dark-colored artwork, shown in LIGHT mode
 */
export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  const { theme } = useTheme()
  const src = theme === "dark" ? "/logo-dark.png" : "/logo-light.png"

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="MGC Vortex" className={className} />
}
