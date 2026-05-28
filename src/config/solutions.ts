import {
  Users, Wallet, Package, ShoppingCart, Wrench, Folder, BarChart3, ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Solution = {
  id: string;
  code: string;
  name: string;
  highlight: string;
  tag: string;
  icon: LucideIcon;
  tagline: string;
  submodules: string[];
  buyer: string;
};

export const solutions: Solution[] = [
  {
    id: "sol-01",
    code: "Solución 01",
    name: "Zentral",
    highlight: "People",
    tag: "Capital humano y nómina",
    icon: Users,
    tagline:
      "Centraliza el ciclo de vida del empleado: contratación, organización, asistencia, ausencias y nómina, en una sola plataforma.",
    submodules: [
      "Personal y organización",
      "Contratación y contratos",
      "Tiempo y asistencia",
      "Ausencias y vacaciones",
      "Nómina y recibos",
      "Portal del empleado",
    ],
    buyer: "Director de RR.HH. · CHRO",
  },
  {
    id: "sol-02",
    code: "Solución 02",
    name: "Zentral",
    highlight: "Finance",
    tag: "Control financiero integral",
    icon: Wallet,
    tagline:
      "Visibilidad y control total del dinero: facturación, cobros, pagos, tesorería, conciliación y activos.",
    submodules: [
      "Cuentas por cobrar",
      "Compras y cuentas por pagar",
      "Tesorería",
      "Conciliación bancaria",
      "Liquidaciones",
      "Solicitudes de fondos",
      "Activos fijos",
      "Auditoría financiera",
      "Contabilidad (roadmap)",
    ],
    buyer: "Director Financiero · CFO",
  },
  {
    id: "sol-03",
    code: "Solución 03",
    name: "Zentral",
    highlight: "Supply",
    tag: "Cadena de suministro y stock",
    icon: Package,
    tagline:
      "Flujo completo de productos y materias primas: catálogo, recetas, inventario, compras y almacenes con trazabilidad por ubicación.",
    submodules: [
      "Catálogo de productos",
      "Recetas y BOM",
      "Inventario multi-almacén",
      "Compras y proveedores",
      "Almacenes y ubicaciones",
      "Alertas e incidencias",
    ],
    buyer: "Director de Operaciones · COO",
  },
  {
    id: "sol-04",
    code: "Solución 04",
    name: "Zentral",
    highlight: "Commerce",
    tag: "Ventas, POS y clientes",
    icon: ShoppingCart,
    tagline:
      "Toda la relación con el cliente: punto de venta, canales digitales, fidelidad y campañas con visión 360.",
    submodules: [
      "Clientes (CRM base)",
      "Punto de venta (POS)",
      "Transacciones de venta",
      "Canales de venta",
      "Programas de fidelidad",
      "Cupones y promociones",
      "Campañas de marketing",
      "Reportes comerciales",
    ],
    buyer: "Director Comercial · CCO",
  },
  {
    id: "sol-05",
    code: "Solución 05",
    name: "Zentral",
    highlight: "Assets",
    tag: "Activos y mantenimiento",
    icon: Wrench,
    tagline:
      "Maximiza la vida útil de equipos e instalaciones con mantenimiento preventivo, órdenes de trabajo y recursos técnicos.",
    submodules: [
      "Equipos y activos operativos",
      "Planes de mantenimiento",
      "Órdenes de trabajo",
      "Recursos técnicos",
      "Alertas de mantenimiento",
    ],
    buyer: "Jefe de Mantenimiento · COO",
  },
  {
    id: "sol-06",
    code: "Solución 06",
    name: "Zentral",
    highlight: "Workplace",
    tag: "Drive, tareas y colaboración",
    icon: Folder,
    tagline:
      "Reemplaza herramientas dispersas con un entorno colaborativo conectado al ERP: drive, tareas, formularios y solicitudes.",
    submodules: [
      "Drive corporativo",
      "Tareas y proyectos",
      "Formularios dinámicos",
      "Solicitudes internas",
    ],
    buyer: "Director de Operaciones · COO",
  },
  {
    id: "sol-07",
    code: "Solución 07",
    name: "Zentral",
    highlight: "Insights",
    tag: "Analítica y dashboards",
    icon: BarChart3,
    tagline:
      "Convierte la operación diaria en decisiones estratégicas con dashboards ejecutivos, KPIs en tiempo real y reportes cross-solución.",
    submodules: [
      "Dashboard ejecutivo",
      "Reportes por solución",
      "Indicadores personales",
    ],
    buyer: "Gerencia General · CEO",
  },
  {
    id: "sol-08",
    code: "Solución 08",
    name: "Zentral",
    highlight: "Admin",
    tag: "Seguridad y gobierno",
    icon: ShieldCheck,
    tagline:
      "Control total del entorno: multiempresa, usuarios, permisos granulares, MFA y trazabilidad completa de auditoría.",
    submodules: [
      "Empresas y sedes",
      "Usuarios y accesos",
      "Roles y permisos",
      "Seguridad (MFA)",
      "Marca corporativa",
      "Auditoría",
      "Configuración global",
    ],
    buyer: "Director de TI · Admin",
  },
];
