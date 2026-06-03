import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "MGC Vortex — Sistemas & Websites de Alta Performance",
  description:
    "A MGC Vortex transforma suas ideias em soluções digitais que impressionam, convertem e escalam. Desenvolvimento web, sistemas personalizados, e-commerce e apps mobile.",
  keywords: ["desenvolvimento web", "sistemas", "sites", "e-commerce", "apps", "MGC Vortex"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-full antialiased">
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  )
}
