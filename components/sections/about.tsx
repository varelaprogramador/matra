"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, staggerItem, Reveal, ScaleOnScroll } from "../ui/motion-wrapper";

const stats = [
  { value: "11", label: "Produtos SaaS" },
  { value: "100+", label: "Projetos Entregues" },
  { value: "8+", label: "Empresas de Renome" },
  { value: "24h", label: "Tempo de Resposta" },
];

export function About() {
  return (
    <section id="sobre" className="relative bg-black py-12 sm:py-16 min-h-[50vh]">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:32px_32px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left - Content */}
          <div className="flex flex-col justify-center">
            <FadeIn>
              <span className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-widest text-white/40">
                Sobre a MATRA
              </span>
            </FadeIn>

            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                Criamos produtos, nao apenas projetos
              </h2>
            </Reveal>

            <FadeIn delay={0.2}>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-white/50">
                Somos desenvolvedores e donos de produtos. 11 SaaS em producao
                e mais de 100 projetos entregues. Entendemos de codigo e conversao.
              </p>
            </FadeIn>

            {/* Stats */}
            <StaggerContainer
              staggerDelay={0.1}
              className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="mt-1 text-[10px] sm:text-xs text-white/40">{stat.label}</div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>

          {/* Right - Visual */}
          <ScaleOnScroll className="relative hidden sm:block">
            <div className="relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-linear-to-br from-white/10 to-transparent p-1">
              <div className="h-full w-full rounded-[18px] sm:rounded-[22px] bg-black/80 p-4 sm:p-8 backdrop-blur-xl">
                {/* Logo prominente */}
                <div className="flex h-full flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative"
                  >
                    <div className="absolute -inset-6 sm:-inset-8 rounded-full bg-white/5 blur-2xl" />
                    <Image
                      src="/logo.svg"
                      alt="MATRA"
                      width={180}
                      height={180}
                      className="relative h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44"
                    />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 sm:mt-8 text-center text-sm sm:text-base lg:text-lg font-medium text-white/60"
                  >
                    Tecnologia. Marketing. Resultado.
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -top-4 -left-4 h-32 w-32 sm:h-48 sm:w-48 rounded-full bg-white/5 blur-3xl" />
          </ScaleOnScroll>
        </div>
      </div>
    </section>
  );
}
