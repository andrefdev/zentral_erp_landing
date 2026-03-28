"use client";

import { ScrollReveal, SectionNumber } from "@/components/scroll-reveal";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$79",
    description: "Para emprendedores y microempresas.",
    featured: false,
    features: [
      "Hasta 3 usuarios",
      "10 GB Drive",
      "Zentral People básico",
      "Zentral Work",
      "Zentral Docs",
      "Soporte por email",
    ],
  },
  {
    name: "Profesional",
    price: "$199",
    description: "Para PYMES en crecimiento.",
    featured: true,
    features: [
      "Hasta 10 usuarios",
      "50 GB Drive",
      "Todos los módulos",
      "Zentral AI incluido",
      "Personalización visual",
      "Soporte prioritario",
    ],
  },
  {
    name: "Empresa",
    price: "$349",
    description: "Para operaciones grandes y complejas.",
    featured: false,
    features: [
      "Hasta 25 usuarios",
      "200 GB Drive",
      "Todo ilimitado",
      "API y webhooks",
      "Onboarding dedicado",
      "SLA garantizado",
    ],
  },
];

export function Pricing() {
  return (
    <section id="precios" className="bg-[#FAFAFA] py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="06" />

        <ScrollReveal>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-black leading-[1.15] tracking-[-0.015em] max-w-3xl mb-16">
            Precios simples. Sin sorpresas.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <div
                className={`bg-white rounded-2xl p-8 h-full flex flex-col ${
                  plan.featured
                    ? "border-2 border-[#9333EA] relative"
                    : "border border-[#E5E5E5]"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#9333EA] text-white text-xs font-medium tracking-wider uppercase px-4 py-1.5 rounded-full">
                    Más popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-black font-medium text-xl mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-[#737373] text-sm">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-[44px] font-semibold text-black tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-[#737373] text-base">/mes</span>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check
                        size={16}
                        className={
                          plan.featured ? "text-[#9333EA]" : "text-black"
                        }
                        strokeWidth={2.5}
                      />
                      <span className="text-[#404040] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`block text-center font-medium py-3.5 rounded-lg transition-all duration-200 ${
                    plan.featured
                      ? "bg-[#9333EA] text-white hover:bg-[#7e22ce]"
                      : "bg-black text-white hover:bg-[#9333EA]"
                  }`}
                >
                  Empieza gratis
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="text-center text-sm text-[#737373]">
            20% de descuento en pago anual. Primeros 50 clientes: 25% off el
            primer año.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
