"use client";

import { SectionNumber } from "@/components/scroll-reveal";
import { SplitWords } from "@/components/animations/split-text";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-children";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 79,
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
    price: 199,
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
    price: 349,
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

        <SplitWords
          text="Precios simples. Sin sorpresas."
          className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-black leading-[1.15] tracking-[-0.015em] max-w-3xl mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <motion.div
                className={`bg-white rounded-2xl p-8 h-full flex flex-col ${
                  plan.featured
                    ? "border-2 border-[#9333EA] relative"
                    : "border border-[#E5E5E5]"
                }`}
                whileHover={{
                  y: -8,
                  boxShadow: plan.featured
                    ? "0 25px 50px -12px rgba(147, 51, 234, 0.25)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                {plan.featured && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#9333EA] text-white text-xs font-medium tracking-wider uppercase px-4 py-1.5 rounded-full"
                  >
                    Más popular
                  </motion.span>
                )}

                <div className="mb-6">
                  <h3 className="text-black font-medium text-xl mb-2">{plan.name}</h3>
                  <p className="text-[#737373] text-sm">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-[44px] font-semibold text-black tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-[#737373] text-base">/mes</span>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature, fi) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + fi * 0.05 }}
                    >
                      <Check
                        size={16}
                        className={plan.featured ? "text-[#9333EA]" : "text-black"}
                        strokeWidth={2.5}
                      />
                      <span className="text-[#404040] text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <MagneticButton
                  href="#"
                  className={`block text-center font-medium py-3.5 rounded-lg transition-all duration-300 ${
                    plan.featured
                      ? "bg-[#9333EA] text-white hover:bg-[#7e22ce] hover:shadow-lg hover:shadow-[#9333EA]/20"
                      : "bg-black text-white hover:bg-[#9333EA]"
                  }`}
                  strength={0.15}
                >
                  Empieza gratis
                </MagneticButton>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm text-[#737373]"
        >
          20% de descuento en pago anual. Primeros 50 clientes: 25% off el primer año.
        </motion.p>
      </div>
    </section>
  );
}
