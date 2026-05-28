export type Cell = "yes" | "no" | "partial";

export const competitors = ["Zentral", "Odoo", "SAP B1", "Excel + WhatsApp"] as const;

export const comparisonRows: { feature: string; values: Cell[] | (Cell | string)[] }[] = [
  { feature: "Implementación rápida (< 4 semanas)", values: ["yes", "no", "no", "yes"] },
  { feature: "IA nativa integrada", values: ["yes", "no", "no", "no"] },
  { feature: "Personalización a medida", values: ["yes", "partial", "partial", "no"] },
  { feature: "Precio accesible para MYPEs", values: ["yes", "partial", "no", "yes"] },
  { feature: "Soporte y realidad LATAM", values: ["yes", "partial", "no", "no"] },
  { feature: "Todo en un solo lugar", values: ["yes", "yes", "yes", "no"] },
];

export const comparisonChips = [
  { label: "Zentral vs Odoo", href: "#" },
  { label: "Zentral vs SAP", href: "#" },
  { label: "Zentral vs Excel", href: "#" },
];
