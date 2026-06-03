import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { Portfolio } from "@/components/Portfolio"
import { Stats } from "@/components/Stats"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  )
}
