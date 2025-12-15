"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem, Reveal } from "../ui/motion-wrapper";

const testimonials = [
  {
    id: 1,
    content:
      "A MATRA desenvolveu nossa plataforma EAD do zero. Sistema robusto, escalavel e que atende milhares de alunos diariamente.",
    author: "Cliente",
    role: "Diretor",
    company: "Dr Atende Tudo",
  },
  {
    id: 2,
    content:
      "O sistema de eventos que criaram revolucionou nossa operacao. Gestao completa, do cadastro ao check-in, tudo automatizado.",
    author: "Cliente",
    role: "Gerente de Operacoes",
    company: "RG Producoes",
  },
  {
    id: 3,
    content:
      "Landing pages que realmente convertem. O time entende de marketing e tecnologia — raro encontrar os dois juntos.",
    author: "Cliente",
    role: "CEO",
    company: "Tokeland",
  },
];

const projectHighlights = [
  "Plataforma EAD completa",
  "Sistema de Eventos",
  "Registro de Marcas via Blockchain",
  "11 Produtos SaaS",
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="relative bg-black py-16 flex items-center min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-white/40">
              Clientes e Projetos
            </span>
          </FadeIn>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Resultados reais para empresas reais
            </h2>
          </Reveal>
        </div>

        {/* Project Highlights */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-4">
            {projectHighlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60"
              >
                {highlight}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Testimonials Grid */}
        <StaggerContainer
          staggerDelay={0.15}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={staggerItem}
              className="group"
            >
              <motion.div
                className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8"
                whileHover={{
                  borderColor: "rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              >
                {/* Quote icon */}
                <svg
                  className="mb-6 h-8 w-8 text-white/10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Content */}
                <p className="mb-6 text-lg leading-relaxed text-white/70">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="mt-auto border-t border-white/10 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white">
                      {testimonial.company.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.company}
                      </div>
                      <div className="text-sm text-white/40">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
