import {
  Copy, Search, Clock, Puzzle,
  Sheet, MessageCircle, Cloud, Calendar, Calculator, Package, ListTodo, BarChart3,
  Sun, BellRing, Users,
  Wallet, ShoppingCart, Folder, Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const pains: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Copy, title: "Duplicidad de datos", body: "El mismo número en 3 hojas distintas. Nunca sabes cuál es el real." },
  { icon: Search, title: "Sin trazabilidad", body: "¿Quién aprobó esto? ¿Cuándo llegó? Nadie puede responder." },
  { icon: Clock, title: "Procesos manuales", body: "Horas perdidas copiando, pegando y enviando archivos por WhatsApp." },
  { icon: Puzzle, title: "ERPs que no encajan", body: "Odoo y SAP: o muy rígidos, o demasiado caros y lentos de implementar." },
];

export const probTools: { icon: LucideIcon; title: string }[] = [
  { icon: Sheet, title: "Excel" },
  { icon: MessageCircle, title: "WhatsApp" },
  { icon: Cloud, title: "Drive" },
  { icon: Calendar, title: "Calendario" },
  { icon: Calculator, title: "Contabilidad" },
  { icon: Users, title: "RR.HH." },
  { icon: ListTodo, title: "Tareas" },
  { icon: Package, title: "Inventario" },
  { icon: BarChart3, title: "Reportes" },
];

export const aiCards: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Sun, title: "Resumen del día", body: "Zentral IA analiza tus módulos cada mañana y te envía un resumen de lo más importante." },
  { icon: BellRing, title: "Alertas proactivas", body: "Te avisa cuando el flujo de caja cae por debajo de tu umbral o cuando hay tareas críticas vencidas." },
  { icon: BarChart3, title: "Reportes en segundos", body: "Pídele el reporte que necesitas en lenguaje natural. Sin Excel, sin esperar al contador." },
  { icon: Users, title: "Gestión de equipo", body: "Sabe quién cumplió sus metas, qué tareas están bloqueadas y qué necesita atención hoy." },
];

export const stats: { value: string; emValue?: string; unit?: string; label: string }[] = [
  { emValue: "−60%", value: "", label: "herramientas separadas reemplazadas" },
  { value: "3", unit: "semanas", label: "tiempo promedio de implementación" },
  { value: "8", unit: "soluciones", label: "en una sola suite empresarial" },
  { value: "4:1", label: "ratio objetivo ingresos / costos" },
];

export const beforeTools: { icon: LucideIcon; label: string; count?: string }[] = [
  { icon: Sheet, label: "Excel por área", count: "× 4" },
  { icon: MessageCircle, label: "Grupos de WhatsApp", count: "× 3" },
  { icon: Cloud, label: "Drive desorganizado" },
  { icon: Calculator, label: "Sistema contable externo" },
  { icon: Search, label: "Sin trazabilidad" },
];

export const afterRows: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Users, label: "Zentral People", value: "activo" },
  { icon: Wallet, label: "Zentral Finance", value: "activo" },
  { icon: ShoppingCart, label: "Zentral Commerce", value: "activo" },
  { icon: Package, label: "Zentral Supply", value: "activo" },
  { icon: Folder, label: "Zentral Workplace", value: "activo" },
  { icon: Sparkles, label: "Zentral IA · cross-dominio", value: "24/7" },
];

export const testimonials = [
  {
    quote:
      '"Antes usábamos 7 herramientas distintas. Con Zentral todo está en un solo lugar y mi equipo sabe exactamente qué tiene que hacer cada día."',
    initials: "CM",
    name: "Carlos M.",
    role: "Gerente General · Distribuidora Norte",
    stats: [
      { n: "4", l: "herramientas\nreemplazadas" },
      { n: "12h", l: "recuperadas\npor semana" },
    ],
  },
  {
    quote:
      '"La implementación fue rápida y el equipo de Indrox nos ayudó a configurar todo según nuestra operación. No fue instalar y abandonar."',
    initials: "AP",
    name: "Ana P.",
    role: "Directora de Operaciones · TechRetail",
    stats: [{ n: "3 sem", l: "para despliegue\ncompleto" }],
  },
];
