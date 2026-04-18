import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, Users, Calendar, FileText, HardDrive, Package,
  DollarSign, CreditCard, Sparkles, Zap, BarChart3, CheckCircle2, MessageSquare, Mail,
} from "lucide-react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FAQ } from "@/components/site/faq";
import { VerticalsTabs } from "@/components/site/verticals-tabs";
import { DemoButton } from "@/components/site/demo-modal";
import { Reveal } from "@/components/site/reveal";
import { StructuredData } from "@/components/structured-data";

const FAQ_ITEMS = [
  { q: "¿Puedo migrar mis datos desde Defontana, Excel o HubSpot?", a: "Sí. Tenemos importadores oficiales para Defontana, CSV de Excel, HubSpot y Pipedrive. El equipo de onboarding hace la migración durante las primeras 2 semanas sin costo adicional." },
  { q: "¿Cuánto toma realmente el onboarding?", a: "Menos de 3 semanas al primer flujo productivo. Tu cuenta queda lista en 5 minutos; las 3 semanas son para migrar datos, entrenar al equipo y dejar corriendo tus automatizaciones clave." },
  { q: "¿Qué pasa si solo necesito el ERP o solo el CRM?", a: "Se pueden comprar por separado. Si después sumas el otro producto, activas la Suite y pagas el combo con 20% de descuento — sin migrar, porque siempre estuvo integrado." },
  { q: "¿Cómo funciona la facturación SUNAT?", a: "Zentral Finance emite electrónicamente contra SUNAT sin integradores terceros. Incluye boletas, facturas, notas de crédito y débito, con envío automático al cliente por email." },
  { q: "¿Dónde están hospedados mis datos?", a: "En AWS región São Paulo (sa-east-1). Encriptación AES-256 en reposo y TLS 1.3 en tránsito. Backups diarios con retención de 30 días." },
  { q: "¿Tienen app móvil?", a: "Hay una PWA optimizada para mobile que cubre los flujos críticos (aprobar gastos, ver pipeline, responder mensajes). App nativa en el roadmap Q3 2026." },
  { q: "¿Puedo conectar WhatsApp Business sin cambiar mi número?", a: "Sí. Usamos WhatsApp Business API; tu número actual se conecta sin perder el historial. La configuración toma menos de 30 minutos con el equipo de onboarding." },
];

const ERP_MODULES = [
  { name: "Zentral People", desc: "RRHH, equipos y nóminas", Icon: Users },
  { name: "Zentral Work", desc: "Tareas y proyectos", Icon: Calendar },
  { name: "Zentral Docs", desc: "Docs y firma electrónica", Icon: FileText },
  { name: "Zentral Drive", desc: "Almacenamiento integrado", Icon: HardDrive },
  { name: "Zentral Stock", desc: "Inventario y almacenes", Icon: Package },
  { name: "Zentral Finance", desc: "Contabilidad y SUNAT", Icon: DollarSign },
  { name: "Zentral Pay", desc: "Pagos recurrentes", Icon: CreditCard },
  { name: "Zentral AI", desc: "Agentes operativos", Icon: Sparkles },
];

const CRM_PILLARS = [
  { name: "Captura", desc: "Leads de WhatsApp, LinkedIn, Instagram, Twitter y Facebook sin data entry.", Icon: CheckCircle2 },
  { name: "Pipeline", desc: "Funnel de 12 fases, deals con probabilidad, tareas y lead scoring inteligente.", Icon: BarChart3 },
  { name: "Outreach", desc: "Secuencias de email B2B, prospección Apollo, enriquecimiento y playbook en Chrome.", Icon: Mail },
  { name: "Insights", desc: "Dashboard en tiempo real, atribución multi-touch, analytics de revenue y smart lists.", Icon: BarChart3 },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;

  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative bg-black text-white pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
            <Reveal className="max-w-3xl mx-auto text-center" y={16}>
              <span className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-full px-4 py-1.5 text-xs text-[#A3A3A3] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
                Para mypes B2B de LATAM · ERP + CRM en un solo login
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.05] tracking-[-0.02em] mb-6">
                Tu empresa entera,<br />
                <span className="text-[#A3A3A3]">ventas incluidas.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#A3A3A3] leading-relaxed mb-8 max-w-2xl mx-auto">
                El ERP y el CRM, integrados nativamente. Operaciones, inventario, contabilidad y ventas en la misma base de datos. Implementado en <span className="text-white">semanas, no meses</span>.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={L("/precios")} className="btn-primary">
                  Empieza gratis <ArrowRight size={14} />
                </Link>
                <DemoButton />
              </div>
              <p className="text-xs text-[#888] mt-6">Sin tarjeta de crédito. Listo en 5 minutos. USD $199/mes para 10 usuarios.</p>
            </Reveal>

            <Reveal className="mt-16 md:mt-20 max-w-5xl mx-auto" delay={0.15} y={20}>
              <div className="card-dark overflow-hidden relative">
                <div className="absolute top-4 left-4 flex gap-1.5 z-10">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#262626] pt-12">
                  <div className="p-6 md:p-8 md:border-r border-[#262626]">
                    <div className="text-xs text-[#888] mb-2">PIPELINE CRM</div>
                    <div className="font-display text-lg mb-4">Deal · Consultora Andina</div>
                    <div className="space-y-2 text-sm">
                      <div className="bg-[#141414] rounded-lg p-3 border border-[#262626] flex justify-between">
                        <span>Lead desde WhatsApp</span><span className="text-[#9333EA]">Nuevo</span>
                      </div>
                      <div className="bg-[#141414] rounded-lg p-3 border border-[#262626] flex justify-between">
                        <span>Demo agendada</span><span className="text-[#A3A3A3]">→</span>
                      </div>
                      <div className="bg-[#141414] rounded-lg p-3 border border-[#262626] flex justify-between">
                        <span>Propuesta firmada</span><span className="text-[#A3A3A3]">→</span>
                      </div>
                      <div className="bg-[#9333EA]/10 rounded-lg p-3 border border-[#9333EA]/40 flex justify-between">
                        <span className="text-white">Ganado ✓</span><span className="text-[#9333EA]">USD 12,400</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="text-xs text-[#888] mb-2">ERP · AUTOMÁTICO</div>
                    <div className="font-display text-lg mb-4">Orden + factura generadas</div>
                    <div className="space-y-2 text-sm">
                      <div className="bg-[#141414] rounded-lg p-3 border border-[#262626]">
                        <div className="text-[#A3A3A3] text-xs">Orden</div>ORD-2026-0412 · Consultora Andina
                      </div>
                      <div className="bg-[#141414] rounded-lg p-3 border border-[#262626]">
                        <div className="text-[#A3A3A3] text-xs">Factura SUNAT</div>F001-000184 · Emitida ✓
                      </div>
                      <div className="bg-[#141414] rounded-lg p-3 border border-[#262626]">
                        <div className="text-[#A3A3A3] text-xs">Proyecto</div>Horas reservadas en People
                      </div>
                      <div className="bg-[#141414] rounded-lg p-3 border border-[#262626]">
                        <div className="text-[#A3A3A3] text-xs">Contabilidad</div>Asiento automático
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-4 border-t border-[#262626] bg-[#060606] text-xs text-[#888]">
                  Un deal ganado dispara automáticamente el flujo en el ERP — sin Zapier, sin consultoras.
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROOF BAR */}
        <section className="bg-black border-t border-[#262626] py-10">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xs text-[#888] uppercase tracking-wider">+120 empresas de LATAM ya confían en Zentral</div>
            <div className="flex items-center gap-8 opacity-60">
              <span className="font-display text-lg text-[#A3A3A3]">Andina Co.</span>
              <span className="font-display text-lg text-[#A3A3A3]">Tripel</span>
              <span className="font-display text-lg text-[#A3A3A3] hidden sm:inline">Conecta+</span>
              <span className="font-display text-lg text-[#A3A3A3] hidden md:inline">Indrox</span>
              <span className="font-display text-lg text-[#A3A3A3] hidden md:inline">Molina</span>
            </div>
            <div className="flex items-center gap-5 text-xs text-[#A3A3A3]">
              <span><span className="text-white font-semibold">3 sem</span> onboarding</span>
              <span className="w-px h-4 bg-[#262626]" />
              <span><span className="text-white font-semibold">78%</span> menos data entry</span>
              <span className="w-px h-4 bg-[#262626] hidden sm:block" />
              <span className="hidden sm:inline"><span className="text-white font-semibold">99.9%</span> uptime</span>
            </div>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="bg-[#0A0A0A] text-white py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <Reveal className="max-w-3xl mx-auto text-center mb-14">
              <span className="eyebrow text-[#9333EA]">El estado del arte</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium mt-3 leading-tight">
                El 68% de las mypes opera con herramientas rotas. El 78% del tiempo de tus vendedores se va en data entry.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <div className="eyebrow text-[#A3A3A3] mb-4">La operación rota</div>
                <div className="space-y-4">
                  <ProblemCard title="Excel + WhatsApp + Drive" body="Datos dispersos, errores manuales, horas perdidas copiando información entre herramientas." />
                  <ProblemCard title="ERPs caros y lentos" body="Odoo pide 3–6 meses y consultoras de USD $3K–$50K. SAP no existe para una mype de 30 personas." />
                </div>
              </div>
              <div>
                <div className="eyebrow text-[#A3A3A3] mb-4">Las ventas rotas</div>
                <div className="space-y-4">
                  <ProblemCard title="Leads perdidos en WhatsApp" body="Las conversaciones del comercial no entran a ningún CRM. El lead de LinkedIn desaparece el lunes." />
                  <ProblemCard title="Vendedores tipeando" body="78% del tiempo registrando en vez de vendiendo. Al final del mes nadie sabe qué pasó con cada deal." />
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-[#888] mt-12">
              Mercado LATAM de ERP + CRM cloud: <span className="text-white font-semibold">USD $2.81B</span>. El que lo ordene, gana.
            </p>
          </div>
        </section>

        {/* SUITE */}
        <section id="suite" className="bg-white py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <Reveal className="max-w-3xl mx-auto text-center mb-16">
              <span className="eyebrow text-[#9333EA]">Zentral Suite</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium mt-3 leading-tight text-[#111]">
                Dos productos. Un login. Cero integradores.
              </h2>
              <p className="text-lg text-[#555] mt-5 leading-relaxed">
                Zentral Suite conecta la operación con las ventas. Lo que cierras en el CRM aparece automáticamente en tu ERP.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-light p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#111] text-white grid place-items-center font-bold">E</div>
                  <div>
                    <div className="font-display text-2xl font-semibold text-[#111]">Zentral ERP</div>
                    <div className="text-sm text-[#555]">La operación conectada</div>
                  </div>
                </div>
                <p className="text-[#111]/80 mb-5 leading-relaxed">RRHH, tareas, documentos, inventario, contabilidad y pagos. Todo en la misma base de datos.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["People", "Work", "Stock", "Finance"].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full border border-[#E5E7EB] text-xs font-medium">{t}</span>
                  ))}
                  <span className="px-3 py-1 rounded-full border border-[#E5E7EB] text-xs font-medium text-[#555]">+4 más</span>
                </div>
                <Link href={L("/#erp")} className="text-[#9333EA] font-medium text-sm hover:underline">Explorar Zentral ERP →</Link>
              </div>
              <div className="card-light p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#111] text-white grid place-items-center font-bold">C</div>
                  <div>
                    <div className="font-display text-2xl font-semibold text-[#111]">Zentral CRM</div>
                    <div className="text-sm text-[#555]">La venta conectada</div>
                  </div>
                </div>
                <p className="text-[#111]/80 mb-5 leading-relaxed">Captura, pipeline, outreach e insights con IA. Tu equipo comercial deja de tipear y empieza a cerrar.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Capture", "Pipeline", "Outreach", "Insights"].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full border border-[#E5E7EB] text-xs font-medium">{t}</span>
                  ))}
                </div>
                <Link href={L("/#crm")} className="text-[#9333EA] font-medium text-sm hover:underline">Explorar Zentral CRM →</Link>
              </div>
            </div>
            <div className="mt-10 text-center text-[#555] text-sm flex items-center justify-center gap-3 flex-wrap">
              <span>Toda venta ganada se convierte en operación.</span>
              <span className="text-[#9333EA]">⇄</span>
              <span>Toda operación alimenta tu próxima venta.</span>
            </div>
          </div>
        </section>

        {/* ERP */}
        <section id="erp" className="bg-[#FAFAFA] py-24 border-t border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <Reveal className="max-w-3xl mb-14">
              <span className="eyebrow text-[#9333EA]">Zentral ERP</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium mt-3 leading-tight text-[#111]">Ocho módulos que hablan entre sí.</h2>
              <p className="text-lg text-[#555] mt-5 leading-relaxed">
                Sin plugins, sin Zapier, sin consultoras. Todo lo que tu equipo operativo necesita, en una sola plataforma.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ERP_MODULES.map(({ name, desc, Icon }) => (
                <div key={name} className="card-light p-5">
                  <div className="w-10 h-10 rounded-lg bg-[#F3F0FF] text-[#9333EA] grid place-items-center mb-3">
                    <Icon size={18} />
                  </div>
                  <div className="font-display font-semibold text-[#111]">{name}</div>
                  <p className="text-sm text-[#555] mt-1">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="eyebrow text-[#9333EA]">Diferenciador Perú</span>
                <h3 className="font-display text-3xl font-medium mt-3 mb-4 text-[#111]">Zentral Finance — SUNAT nativa, cierre en 1 click.</h3>
                <ul className="space-y-3 text-[#111]/80">
                  {[
                    "Emisión electrónica SUNAT sin integradores.",
                    "Conciliación bancaria automática con IA.",
                    "Cierre contable mensual en un solo click.",
                    "Reportes en tiempo real, exportables a Excel y PDF.",
                  ].map((l) => (
                    <li key={l} className="flex gap-3"><span className="text-[#9333EA] flex-shrink-0">✓</span> {l}</li>
                  ))}
                </ul>
              </div>
              <div className="card-light p-6 bg-white">
                <div className="text-xs text-[#555] mb-3">DASHBOARD FINANCE · ABRIL 2026</div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-[#FAFAFA] rounded-lg p-3 text-center"><div className="text-xs text-[#555]">Facturado</div><div className="font-display text-xl">$184K</div></div>
                  <div className="bg-[#FAFAFA] rounded-lg p-3 text-center"><div className="text-xs text-[#555]">Cobrado</div><div className="font-display text-xl">$152K</div></div>
                  <div className="bg-[#FAFAFA] rounded-lg p-3 text-center"><div className="text-xs text-[#555]">Por cobrar</div><div className="font-display text-xl text-[#9333EA]">$32K</div></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm bg-[#FAFAFA] rounded-lg p-3"><span>F001-000184 · Consultora Andina</span><span className="text-[#9333EA]">Emitida</span></div>
                  <div className="flex justify-between text-sm bg-[#FAFAFA] rounded-lg p-3"><span>F001-000183 · Tripel SAC</span><span className="text-[#555]">Pagada</span></div>
                  <div className="flex justify-between text-sm bg-[#FAFAFA] rounded-lg p-3"><span>F001-000182 · Molina &amp; Co.</span><span className="text-[#555]">Pagada</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CRM */}
        <section id="crm" className="bg-white py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <Reveal className="max-w-3xl mb-14">
              <span className="eyebrow text-[#9333EA]">Zentral CRM</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium mt-3 leading-tight text-[#111]">Tu equipo deja de tipear. Empieza a cerrar.</h2>
              <p className="text-lg text-[#555] mt-5 leading-relaxed">
                Captura, pipeline, outreach e insights en una sola plataforma. Con IA dentro del navegador y del CRM.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {CRM_PILLARS.map(({ name, desc, Icon }) => (
                <div key={name} className="card-light p-6">
                  <div className="w-10 h-10 rounded-lg bg-[#F3F0FF] text-[#9333EA] grid place-items-center mb-4">
                    <Icon size={18} />
                  </div>
                  <div className="font-display text-xl font-semibold mb-2 text-[#111]">{name}</div>
                  <p className="text-sm text-[#555]">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
              <div className="md:col-span-2">
                <span className="eyebrow text-[#9333EA]">Exclusivo Zentral</span>
                <h3 className="font-display text-3xl font-medium mt-3 mb-4 text-[#111]">Asistente IA en Chrome.</h3>
                <p className="text-[#111]/80 mb-4">
                  Mientras tu vendedor chatea por WhatsApp o LinkedIn, el asistente analiza sentimiento, redacta respuestas y le recuerda el próximo paso del playbook.
                </p>
                <ul className="space-y-2 text-sm text-[#555]">
                  <li className="flex gap-2"><span className="text-[#9333EA]">●</span> Análisis de sentimiento en tiempo real</li>
                  <li className="flex gap-2"><span className="text-[#9333EA]">●</span> Respuestas sugeridas por fase del funnel</li>
                  <li className="flex gap-2"><span className="text-[#9333EA]">●</span> Log automático al CRM sin cambiar de pestaña</li>
                </ul>
              </div>
              <div className="md:col-span-3">
                <div className="card-light p-5 relative">
                  <div className="text-xs text-[#555] mb-3">WhatsApp Web · Consultora Andina</div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-[#FAFAFA] rounded-xl rounded-tl-sm p-3 max-w-[80%]">Nos interesa el plan. ¿Implementan en 3 semanas?</div>
                    <div className="bg-[#F3F0FF] rounded-xl rounded-tr-sm p-3 max-w-[80%] ml-auto text-[#111]">
                      Sí — onboarding en &lt;3 semanas incluido. Te paso una propuesta con timeline concreto.
                    </div>
                  </div>
                  <div className="mt-4 bg-[#111] text-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2 text-[#9333EA]">
                      <Sparkles size={14} />
                      <span className="text-xs font-semibold uppercase tracking-wider">Zentral AI · Sales</span>
                    </div>
                    <div className="text-sm">
                      Sentimiento: <span className="text-[#9333EA]">positivo +0.82</span>. Fase sugerida: enviar propuesta. Próximo paso del playbook: agendar demo técnica en 48h.
                    </div>
                    <button className="mt-3 text-xs bg-[#9333EA] rounded-md px-3 py-1.5 font-semibold">Usar respuesta sugerida</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FLOW */}
        <section className="bg-black text-white py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <Reveal className="max-w-3xl mx-auto text-center mb-14">
              <span className="eyebrow text-[#9333EA]">Integración nativa</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium mt-3 leading-tight">Cuando un deal se cierra, el resto pasa solo.</h2>
              <p className="text-lg text-[#A3A3A3] mt-5">Sin integradores, sin Zapier, sin doble tipeo. Todo vive en la misma base de datos.</p>
            </Reveal>
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-3 mb-12">
              <FlowNode n="1" title="WhatsApp" sub="Lead entra" />
              <span className="flow-arrow">→</span>
              <FlowNode n="2" title="Pipeline" sub="Deal en fase" />
              <span className="flow-arrow">→</span>
              <FlowNode n="3" title="Ganado ✓" sub="Trigger" highlight />
              <span className="flow-arrow">→</span>
              <FlowNode n="4" title="Orden ERP" sub="Automática" />
              <span className="flow-arrow">→</span>
              <FlowNode n="5" title="Factura SUNAT" sub="+ Stock" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <FlowCase label="AGENCIA DIGITAL" body="Lead de LinkedIn → propuesta firmada → horas por consultor reservadas en People → factura mensual emitida." />
              <FlowCase label="DISTRIBUIDORA B2B" body="Cotización por WhatsApp → deal cerrado → orden de salida en Stock → factura SUNAT automática." />
              <FlowCase label="CONSULTORA" body="Lead de Apollo → contrato → proyecto en Work → control de tiempos → facturación recurrente." />
            </div>
          </div>
        </section>

        {/* CAPTURE */}
        <section className="bg-[#FAFAFA] py-24 border-y border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <span className="badge">Exclusivo en LATAM</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium mt-4 leading-tight text-[#111]">
                Tus leads llegan por WhatsApp. Que también entren a tu CRM.
              </h2>
              <p className="text-lg text-[#555] mt-5 leading-relaxed">
                Zentral Capture ingiere leads desde 5 redes automáticamente. Sin data entry, sin extensiones frágiles, sin perder conversaciones.
              </p>
              <ul className="mt-6 space-y-3 text-[#111]/80">
                {[
                  "WhatsApp Business — mensajes, contactos y grupos.",
                  "LinkedIn — mensajes, notas de conexión y respuestas.",
                  "Instagram, Twitter, Facebook — DMs convertidos en tarjetas de lead.",
                  "Cada lead llega con fuente, scoring inicial y asignación automática.",
                ].map((l) => (
                  <li key={l} className="flex gap-3"><span className="text-[#9333EA] flex-shrink-0">✓</span> {l}</li>
                ))}
              </ul>
              <Link href={L("/recursos/documentacion")} className="mt-7 inline-block text-[#9333EA] font-medium">Ver cómo funciona Capture →</Link>
            </div>
            <div className="md:col-span-2 space-y-3">
              <LeadCard net="W" netBg="#25D366" when="WhatsApp · hace 3 min" text="“Hola, nos interesa el plan profesional”" badge="Nuevo lead" badgeBg="#E6F7EC" badgeColor="#067F3B" tilt />
              <LeadCard net="in" netBg="#0A66C2" when="LinkedIn · hace 12 min" text="“¿Tienen casos de agencias en Perú?”" badge="Score 72" />
              <LeadCard net="IG" netBg="linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045)" when="Instagram · hace 1 h" text="“Me pasas precios por DM?”" badge="Revisar" badgeBg="#FFF7E6" badgeColor="#B26A00" tilt />
              <LeadCard net="X" netBg="#1DA1F2" when="Twitter · hace 2 h" text="“Interesado en el CRM, ¿demo?”" badge="Demo pedida" />
            </div>
          </div>
        </section>

        {/* AI DUAL */}
        <section className="bg-black text-white py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <Reveal className="max-w-3xl mx-auto text-center mb-14">
              <span className="eyebrow text-[#9333EA]">Zentral AI</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium mt-3 leading-tight">Dos inteligencias. Una plataforma.</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-dark p-8">
                <div className="w-12 h-12 rounded-xl bg-[#141414] text-[#9333EA] grid place-items-center mb-4"><Zap size={22} /></div>
                <div className="font-display text-2xl font-semibold mb-2">IA Operativa (ERP)</div>
                <p className="text-[#A3A3A3]">
                  Automatiza procesos del ERP: clasificación documental, conciliación bancaria, alertas de inventario, cierre contable. Trabaja en background mientras tu equipo opera.
                </p>
              </div>
              <div className="card-dark p-8">
                <div className="w-12 h-12 rounded-xl bg-[#141414] text-[#9333EA] grid place-items-center mb-4"><MessageSquare size={22} /></div>
                <div className="font-display text-2xl font-semibold mb-2">IA Conversacional (CRM + Chrome)</div>
                <p className="text-[#A3A3A3]">
                  Un analista y vendedor virtual 24/7. Analiza sentimiento, redacta respuestas, accede al playbook y sugiere el próximo paso — dentro del CRM y en tu navegador.
                </p>
              </div>
            </div>
            <blockquote className="mt-10 max-w-3xl mx-auto text-center text-xl md:text-2xl font-display italic text-[#A3A3A3] border-l-2 border-[#9333EA] pl-6 py-2">
              “No es un chatbot. Es un analista y vendedor virtual — sin licencias extra, sin prompting técnico, dentro de la plataforma.”
            </blockquote>
          </div>
        </section>

        {/* VERTICALES */}
        <section className="bg-[#FAFAFA] py-24 border-y border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <Reveal className="max-w-3xl mb-10">
              <span className="eyebrow text-[#9333EA]">Casos de uso</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium mt-3 text-[#111]">Para cómo trabajas tú.</h2>
            </Reveal>
            <VerticalsTabs />
          </div>
        </section>

        {/* PRICING CTA */}
        <section id="precios" className="bg-white py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <span className="eyebrow text-[#9333EA]">Precios</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium mt-3 text-[#111]">Precios claros. Sin letras chicas.</h2>
            <p className="text-lg text-[#555] mt-4 max-w-2xl mx-auto">
              Desde USD $79/mes (Starter) hasta $199/mes (Professional, 10 usuarios) con ERP + CRM + IA dual.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link href={L("/precios")} className="btn-primary">Ver todos los planes <ArrowRight size={14} /></Link>
              <Link href={L("/comparativa")} className="btn-ghost on-light text-[#111]">Comparativa vs. Odoo, Zoho, HubSpot</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#FAFAFA] py-24 border-t border-[#E5E7EB]">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="mb-10">
              <span className="eyebrow text-[#9333EA]">FAQ</span>
              <h2 className="font-display text-4xl font-medium mt-3 text-[#111]">Preguntas frecuentes.</h2>
            </div>
            <FAQ items={FAQ_ITEMS} />
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-black text-white py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-4xl md:text-6xl font-medium leading-tight">
              Deja de pagar 5 herramientas.<br />
              <span className="text-[#A3A3A3]">Empieza con una.</span>
            </h2>
            <p className="text-lg text-[#A3A3A3] mt-6 max-w-2xl mx-auto">
              Zentral Suite desde USD $199/mes. Los primeros 50 clientes tienen <span className="text-[#9333EA] font-semibold">25% off</span> durante el primer año y onboarding prioritario.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link href={L("/precios")} className="btn-primary">Empieza gratis</Link>
              <a href="https://indrox.com/es/contact" className="btn-ghost text-white">Agendar demo</a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

function ProblemCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="card-dark p-6">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#141414] grid place-items-center text-[#9333EA] flex-shrink-0">
          <Zap size={16} />
        </div>
        <div>
          <div className="font-display font-semibold mb-1">{title}</div>
          <div className="text-[#A3A3A3] text-sm">{body}</div>
        </div>
      </div>
    </div>
  );
}

function FlowNode({ n, title, sub, highlight }: { n: string; title: string; sub: string; highlight?: boolean }) {
  return (
    <div className="flow-node" style={highlight ? { borderColor: "#9333EA" } : undefined}>
      <div className={`text-xs mb-1 ${highlight ? "text-[#9333EA]" : "text-[#888]"}`}>{n}</div>
      {title}
      <br />
      <span className="text-xs text-[#A3A3A3]">{sub}</span>
    </div>
  );
}

function FlowCase({ label, body }: { label: string; body: string }) {
  return (
    <div className="card-dark p-6">
      <div className="text-xs text-[#888] mb-2">{label}</div>
      <div className="text-sm">{body}</div>
    </div>
  );
}

function LeadCard({
  net, netBg, when, text, badge, badgeBg, badgeColor, tilt,
}: {
  net: string; netBg: string; when: string; text: string;
  badge: string; badgeBg?: string; badgeColor?: string; tilt?: boolean;
}) {
  return (
    <div className={`card-light p-4 flex items-start gap-3 ${tilt ? "tilt" : ""}`}>
      <div
        className="w-10 h-10 rounded-full text-white grid place-items-center font-bold text-sm flex-shrink-0"
        style={{ background: netBg }}
      >
        {net}
      </div>
      <div>
        <div className="text-xs text-[#555]">{when}</div>
        <div className="text-sm text-[#111]">{text}</div>
        <div className="mt-1">
          <span
            className="badge"
            style={badgeBg ? { background: badgeBg, color: badgeColor } : undefined}
          >
            {badge}
          </span>
        </div>
      </div>
    </div>
  );
}
