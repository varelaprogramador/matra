"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FadeIn,
  StaggerContainer,
  staggerItem,
  Reveal,
} from "../ui/motion-wrapper";

interface Depoimento {
  id: string;
  nome: string;
  cargo: string;
  empresa: string;
  texto: string;
  avatar: string | null;
  nota: number;
  ordem: number;
  ativo: boolean;
}

const projectHighlights = [
  "Plataforma EAD completa",
  "Sistema de Eventos",
  "Registro de Marcas via Blockchain",
  "11 Produtos SaaS",
];

export function TestimonialsDynamic({
  depoimentos,
}: {
  depoimentos: Depoimento[];
}) {
  return (
    <section
      id="depoimentos"
      className="relative flex min-h-screen items-center bg-black py-12 sm:py-16"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/1 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="mb-3 sm:mb-4 inline-block text-xs sm:text-sm font-medium uppercase tracking-widest text-white/40">
              Clientes
            </span>
          </FadeIn>
          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Quem confia na MATRA
            </h2>
          </Reveal>
        </div>

        {/* Project Highlights */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {projectHighlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white/60"
              >
                {highlight}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Testimonials Grid */}
        <StaggerContainer
          staggerDelay={0.15}
          className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3"
        >
          {depoimentos.slice(0, 3).map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={staggerItem}
              className="group"
            >
              <motion.div
                className="relative h-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/2 p-4 sm:p-6 md:p-8"
                whileHover={{
                  borderColor: "rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              >
                {/* Quote icon */}
                <svg
                  className="mb-4 sm:mb-6 h-6 w-6 sm:h-8 sm:w-8 text-white/10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Rating */}
                <div className="mb-3 sm:mb-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        star <= testimonial.nota
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-white/20"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed text-white/70">
                  &quot;{testimonial.texto}&quot;
                </p>

                {/* Author */}
                <div className="mt-auto border-t border-white/10 pt-4 sm:pt-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.nome}
                        width={48}
                        height={48}
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-base sm:text-lg font-bold text-white">
                        {testimonial.empresa.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white">
                        {testimonial.empresa}
                      </div>
                      <div className="text-xs sm:text-sm text-white/40">
                        {testimonial.cargo}
                      </div>
                    </div>
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
