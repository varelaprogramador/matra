"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem, Reveal } from "../ui/motion-wrapper";

const differentials = [
  {
    id: 1,
    title: "11 Produtos SaaS Proprios",
    description:
      "Nao somos agencia. Criamos e operamos produtos que rodam em producao com milhares de usuarios. Spotform, MATRA CRM, Firebank e mais.",
    metric: "11",
    metricLabel: "SaaS em Producao",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Tecnologia de Ponta",
    description:
      "Blockchain para registro de marcas. IA integrada em CRMs. Plataformas EAD completas. Tecnologia real, nao buzzword.",
    metric: "Blockchain",
    metricLabel: "& IA Integrada",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Marketing + Tecnologia",
    description:
      "Uniao rara. Entendemos de conversao, trafego e funis tanto quanto de codigo. Resultado: sistemas que vendem.",
    metric: "+40%",
    metricLabel: "Conversao Media",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Clientes de Renome",
    description:
      "Dr Atende Tudo, Anjos Colchoes, Tokeland, V7, RG Producoes. Empresas que exigem resultado confiam na MATRA.",
    metric: "8+",
    metricLabel: "Grandes Clientes",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    id: 5,
    title: "Performance Obsessiva",
    description:
      "Sites que carregam em menos de 2 segundos. Codigo limpo, arquitetura escalavel. Sem gambiarras.",
    metric: "< 2s",
    metricLabel: "Load Time",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    id: 6,
    title: "Projetos Complexos",
    description:
      "Plataforma EAD, sistema de eventos, registro de marcas via blockchain. Projetos que outras empresas recusam.",
    metric: "100+",
    metricLabel: "Projetos Entregues",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
];

export function Differentials() {
  return (
    <section className="relative bg-black py-12 sm:py-16 flex items-center min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] sm:bg-size-[64px_64px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
          <FadeIn>
            <span className="mb-3 sm:mb-4 inline-block text-xs sm:text-sm font-medium uppercase tracking-widest text-white/40">
              Diferenciais
            </span>
          </FadeIn>
          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Por que a MATRA
            </h2>
          </Reveal>
          <FadeIn delay={0.2}>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/50">
              Nao somos agencia. Criamos produtos proprios e entendemos o que funciona.
            </p>
          </FadeIn>
        </div>

        {/* Cards Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((diff) => (
            <motion.div
              key={diff.id}
              variants={staggerItem}
              className="group"
            >
              <motion.div
                className="relative h-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/2 p-4 sm:p-6 transition-all duration-300"
                whileHover={{
                  borderColor: "rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Top Row - Icon and Metric */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="shrink-0 rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-2 sm:p-3 text-white">
                      {diff.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-lg sm:text-xl font-bold text-white">
                        {diff.metric}
                      </div>
                      <div className="text-[10px] sm:text-xs text-white/40">{diff.metricLabel}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="mb-1.5 sm:mb-2 text-base sm:text-lg font-semibold text-white">
                      {diff.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/50">{diff.description}</p>
                  </div>
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 -z-10 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
