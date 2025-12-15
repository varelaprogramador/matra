"use client";

import { motion } from "framer-motion";
import { FadeIn, Reveal } from "../ui/motion-wrapper";
import { Button } from "../ui/button";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5500000000000";

export function CTAFinal() {
  return (
    <section id="contato" className="relative bg-black py-16 flex items-center min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <FadeIn>
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-white/40">
            Contato
          </span>
        </FadeIn>

        <Reveal delay={0.1}>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            Vamos construir juntos
          </h2>
        </Reveal>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Fale com quem entende de tecnologia e conversao.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              href={`https://wa.me/${whatsappNumber}`}
              className="min-w-[200px]"
            >
              Falar com Especialista
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </motion.div>
        </FadeIn>

        {/* Trust indicators */}
        <FadeIn delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/30">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
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
              Resposta em ate 24h
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
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
              Sem compromisso
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
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
              Orcamento personalizado
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
