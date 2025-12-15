"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem, Reveal } from "../ui/motion-wrapper";

const steps = [
  {
    id: 1,
    number: "01",
    title: "Diagnostico",
    description:
      "Entendemos seu negocio, objetivos e desafios. Analisamos o cenario atual e identificamos oportunidades reais de melhoria.",
  },
  {
    id: 2,
    number: "02",
    title: "Planejamento",
    description:
      "Definimos arquitetura, tecnologias e cronograma. Voce recebe um roadmap claro com entregas e marcos bem definidos.",
  },
  {
    id: 3,
    number: "03",
    title: "Execucao",
    description:
      "Desenvolvimento iterativo com entregas frequentes. Voce acompanha o progresso e pode ajustar prioridades em tempo real.",
  },
  {
    id: 4,
    number: "04",
    title: "Entrega e Otimizacao",
    description:
      "Deploy com monitoramento completo. Continuamos otimizando com base em dados reais de uso e performance.",
  },
];

export function Process() {
  return (
    <section id="processo" className="relative bg-black py-16 flex items-center min-h-screen">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-white/40">
              Como trabalhamos
            </span>
          </FadeIn>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Processo transparente e eficiente
            </h2>
          </Reveal>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-lg text-white/60">
              Metodologia testada que garante previsibilidade, qualidade e
              alinhamento em cada etapa do projeto.
            </p>
          </FadeIn>
        </div>

        {/* Process Steps */}
        <StaggerContainer staggerDelay={0.15} className="mt-20">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-[27px] top-0 hidden h-full w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent md:left-1/2 md:block md:-translate-x-px" />

            <div className="space-y-12 md:space-y-0">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={staggerItem}
                  className={`relative md:flex md:items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`relative ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <motion.div
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                      whileHover={{
                        borderColor: "rgba(255,255,255,0.2)",
                        backgroundColor: "rgba(255,255,255,0.04)",
                      }}
                    >
                      <span className="text-sm font-medium text-white/30">
                        {step.number}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-white/50">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Number Indicator */}
                  <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black text-lg font-bold text-white md:left-1/2 md:-translate-x-1/2">
                    {step.number}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
