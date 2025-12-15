"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem, Reveal, SlideSection } from "../ui/motion-wrapper";

const services = [
  {
    id: 1,
    title: "Landing Pages de Alta Conversao",
    description:
      "Paginas otimizadas para performance e conversao. Cada elemento e estrategicamente posicionado para guiar o visitante ate a acao desejada.",
    features: [
      "Otimizacao para velocidade",
      "A/B testing integrado",
      "Analytics avancado",
      "SEO tecnico",
    ],
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Sistemas Sob Medida",
    description:
      "Solucoes personalizadas que resolvem problemas reais. Desde plataformas EAD ate sistemas de registro de marcas via blockchain.",
    features: [
      "Arquitetura escalavel",
      "Integracao com APIs",
      "Dashboard administrativo",
      "Suporte continuo",
    ],
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Sites Institucionais Premium",
    description:
      "Presenca digital que transmite autoridade e profissionalismo. Design sofisticado aliado a tecnologia de ponta.",
    features: [
      "Design exclusivo",
      "Performance maxima",
      "CMS intuitivo",
      "Responsivo perfeito",
    ],
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Marketing Digital",
    description:
      "Estrategias de marketing integradas com tecnologia. Trafego pago, automacao e funis de conversao que geram resultados mensuráveis.",
    features: [
      "Gestao de trafego pago",
      "Automacao de marketing",
      "Funis de conversao",
      "Analise de dados",
    ],
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="servicos" className="relative bg-black py-16 flex items-center min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-white/40">
              O que fazemos
            </span>
          </FadeIn>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Tecnologia e marketing integrados
            </h2>
          </Reveal>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-lg text-white/60">
              Unimos desenvolvimento de alto nivel com estrategias de marketing
              digital para entregar resultados completos.
            </p>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <StaggerContainer
          staggerDelay={0.15}
          className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              className="group relative"
            >
              <motion.div
                className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-500"
                whileHover={{
                  borderColor: "rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-5 inline-flex rounded-xl border border-white/10 bg-white/5 p-3 text-white">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-5 text-sm text-white/50">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs text-white/40"
                      >
                        <svg
                          className="h-3 w-3 text-white/30"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
