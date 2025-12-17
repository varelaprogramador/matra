"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem, Reveal } from "../ui/motion-wrapper";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

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
    <section id="processo" className="relative bg-black py-12 sm:py-16 flex items-center min-h-screen">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="mb-3 sm:mb-4 inline-block text-xs sm:text-sm font-medium uppercase tracking-widest text-white/40">
              Como trabalhamos
            </span>
          </FadeIn>
          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Processo transparente e eficiente
            </h2>
          </Reveal>
          <FadeIn delay={0.2}>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/60">
              Metodologia testada que garante previsibilidade, qualidade e
              alinhamento em cada etapa do projeto.
            </p>
          </FadeIn>
        </div>

        {/* Process Steps */}
        <StaggerContainer staggerDelay={0.15} className="mt-12 sm:mt-16 md:mt-20">
          <div className="relative">
            {/* Connection Line - Mobile */}
            <div className="absolute left-[23px] sm:left-[27px] top-0 h-full w-px bg-linear-to-b from-white/20 via-white/10 to-transparent md:hidden" />
            {/* Connection Line - Desktop */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px bg-linear-to-b from-white/20 via-white/10 to-transparent md:block md:-translate-x-px" />

            <div className="space-y-8 sm:space-y-12 md:space-y-0">
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
                    className={`relative ml-14 sm:ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 lg:pr-16 md:text-right" : "md:pl-12 lg:pl-16"
                    }`}
                  >
                    <motion.div
                      className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/2 p-4 sm:p-6"
                      whileHover={{
                        borderColor: "rgba(255,255,255,0.2)",
                        backgroundColor: "rgba(255,255,255,0.04)",
                      }}
                    >
                      <span className="text-xs sm:text-sm font-medium text-white/30">
                        {step.number}
                      </span>
                      <h3 className="mt-1.5 sm:mt-2 text-lg sm:text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-white/50">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Number Indicator */}
                  <div className="absolute left-0 top-0 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/20 bg-black text-sm sm:text-lg font-bold text-white md:left-1/2 md:-translate-x-1/2">
                    {step.number}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerContainer>

        {/* CTA after process */}
        <FadeIn delay={0.5}>
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-sm sm:text-base text-white/50 mb-6">
              Pronto para comecar? O primeiro passo e uma conversa sem compromisso.
            </p>
            <Button size="lg" href="#contato">
              Agendar Diagnostico Gratuito
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
