export function GET() {
  const content = `# Zentral

> Zentral es la plataforma operativa todo-en-uno para PYMES en Perú y Latinoamérica. Centraliza RRHH, tareas, documentos, inventario, contabilidad e inteligencia artificial en un solo lugar.

## Información general

- Nombre: Zentral
- Tipo: Plataforma operativa / ERP cloud para PYMES
- Empresa: Indrox
- Sitio web: https://zentral.indrox.com
- Contacto: hello@indrox.com
- Mercado objetivo: PYMES en Perú y Latinoamérica
- Idioma principal: Español
- Moneda: USD

## Problema que resuelve

El 68% de las PYMES en Latinoamérica operan con herramientas fragmentadas: Excel, WhatsApp, Google Drive, software contable limitado o ERPs complejos y caros como Odoo o SAP. Zentral unifica toda la operación empresarial en una sola plataforma accesible.

## Módulos disponibles

- **Zentral People**: Gestión de RRHH, nóminas y equipos
- **Zentral Work**: Tareas, proyectos y productividad
- **Zentral Docs**: Documentos y firma electrónica
- **Zentral Drive**: Almacenamiento cloud integrado
- **Zentral Inventory**: Control de stock y almacenes

## Módulos próximamente

- **Zentral Accounting**: Contabilidad y facturación SUNAT
- **Zentral AI**: Agentes IA para análisis operativo
- **Zentral Pay**: Suscripciones y pagos recurrentes

## Planes y precios

| Plan | Precio | Usuarios | Almacenamiento |
|------|--------|----------|----------------|
| Starter | $79/mes | Hasta 3 | 10 GB |
| Profesional | $199/mes | Hasta 10 | 50 GB |
| Empresa | $349/mes | Hasta 25 | 200 GB |

- 20% de descuento en pago anual
- Primeros 50 clientes: 25% off el primer año
- Sin tarjeta de crédito para empezar
- Implementación en menos de 4 semanas

## Ventajas competitivas

1. Todo en uno de verdad: no son apps pegadas con integraciones
2. Drive y documentos integrados nativamente
3. IA operativa: análisis y automatización, no solo un chatbot
4. Personalización visual: cada empresa elige su identidad
5. Implementación rápida: semanas, no meses
6. Precio accesible: funcionalidad enterprise a precio PYME

## Comparativa de precios

- 20% más barato que Odoo
- 46% más barato que Zoho
- 34% más barato que Monday
- $199/mes incluye 10 usuarios y todos los módulos

## Roadmap 2026

- Abril: Contabilidad + SUNAT, Activos Fijos, Suscripciones
- Mayo: CRM de ventas, Compras, Correo Corporativo
- Junio: Agentes IA avanzados, OCR, Dashboards BI
- Julio: Gantt, OKRs, Wiki, POS, Multi-Almacén

## Páginas comparativas

- /vs-odoo - Zentral vs Odoo
- /vs-defontana - Zentral vs Defontana
- /vs-excel - Zentral vs Excel
- /vs-monday - Zentral vs Monday
- /vs-zoho - Zentral vs Zoho

## Datos del mercado

El mercado ERP cloud para PYMES en LATAM alcanza USD $2.81 mil millones.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
