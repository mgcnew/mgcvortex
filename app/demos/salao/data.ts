/* Mock data for the "Camélia" salon scheduling demo. Fictitious only. */

export const BRAND = { name: "Camélia", tagline: "studio & agenda", accent: "#b76e79" }

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

export type Professional = { id: string; name: string; role: string; tone: string }
export const professionals: Professional[] = [
  { id: "p1", name: "Camila Rosa", role: "Cabeleireira", tone: "from-rose-300 to-pink-500" },
  { id: "p2", name: "Bruna Lima", role: "Manicure", tone: "from-amber-200 to-rose-400" },
  { id: "p3", name: "Letícia Dias", role: "Esteticista", tone: "from-fuchsia-300 to-purple-500" },
]

export type Service = { id: string; name: string; duration: number; price: number }
export const services: Service[] = [
  { id: "s1", name: "Corte Feminino", duration: 60, price: 90 },
  { id: "s2", name: "Coloração", duration: 120, price: 220 },
  { id: "s3", name: "Escova", duration: 45, price: 60 },
  { id: "s4", name: "Manicure", duration: 40, price: 45 },
  { id: "s5", name: "Pedicure", duration: 50, price: 55 },
  { id: "s6", name: "Design de Sobrancelha", duration: 30, price: 40 },
  { id: "s7", name: "Limpeza de Pele", duration: 60, price: 130 },
  { id: "s8", name: "Massagem Relax", duration: 60, price: 150 },
]

export type Status = "Confirmado" | "Pendente" | "Concluído"
export type Appointment = {
  id: string
  day: number // 0 = hoje, 1 = amanhã, 2 = depois
  time: string // "09:00"
  profId: string
  client: string
  serviceId: string
  status: Status
}

export const slots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export const initialAppointments: Appointment[] = [
  { id: "a1", day: 0, time: "09:00", profId: "p1", client: "Maria Fernanda", serviceId: "s1", status: "Confirmado" },
  { id: "a2", day: 0, time: "10:00", profId: "p1", client: "Joana Prado", serviceId: "s3", status: "Confirmado" },
  { id: "a3", day: 0, time: "11:00", profId: "p1", client: "Patrícia Sá", serviceId: "s2", status: "Pendente" },
  { id: "a4", day: 0, time: "14:00", profId: "p1", client: "Renata Alves", serviceId: "s1", status: "Confirmado" },
  { id: "a5", day: 0, time: "09:00", profId: "p2", client: "Carla Dias", serviceId: "s4", status: "Confirmado" },
  { id: "a6", day: 0, time: "11:00", profId: "p2", client: "Bia Nunes", serviceId: "s5", status: "Confirmado" },
  { id: "a7", day: 0, time: "15:00", profId: "p2", client: "Sofia Reis", serviceId: "s4", status: "Pendente" },
  { id: "a8", day: 0, time: "10:00", profId: "p3", client: "Helena M.", serviceId: "s7", status: "Confirmado" },
  { id: "a9", day: 0, time: "13:00", profId: "p3", client: "Clara V.", serviceId: "s6", status: "Concluído" },
  { id: "a10", day: 0, time: "16:00", profId: "p3", client: "Ana Júlia", serviceId: "s8", status: "Confirmado" },
  { id: "a11", day: 1, time: "10:00", profId: "p1", client: "Larissa C.", serviceId: "s2", status: "Confirmado" },
  { id: "a12", day: 1, time: "14:00", profId: "p2", client: "Marina T.", serviceId: "s4", status: "Pendente" },
]

export const statusStyle: Record<Status, string> = {
  Confirmado: "border-transparent",
  Pendente: "border-dashed",
  Concluído: "opacity-60 border-transparent",
}
