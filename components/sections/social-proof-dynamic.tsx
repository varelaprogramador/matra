"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "../ui/motion-wrapper";

interface Cliente {
  id: string;
  nome: string;
  logo: string | null;
  site: string | null;
  ordem: number;
  ativo: boolean;
}

function CompanyLogo({ cliente }: { cliente: Cliente }) {
  if (cliente.logo) {
    return (
      <div className="flex h-12 items-center justify-center px-8">
        <Image
          src={cliente.logo}
          alt={cliente.nome}
          width={120}
          height={48}
          className="max-h-10 w-auto object-contain opacity-30 transition-all duration-300 hover:opacity-50 grayscale hover:grayscale-0"
        />
      </div>
    );
  }

  return (
    <div className="flex h-12 items-center justify-center px-8">
      <span className="whitespace-nowrap text-lg font-semibold tracking-wider text-white/30 transition-all duration-300 hover:text-white/50">
        {cliente.nome}
      </span>
    </div>
  );
}

export function SocialProofDynamic({ clientes }: { clientes: Cliente[] }) {
  // Triplicar para criar loop infinito
  const allClientes = [...clientes, ...clientes, ...clientes];

  return (
    <section className="relative border-y border-white/5 bg-black py-16">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-white/[0.02] to-black" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-white/40">
            Empresas que confiam na MATRA
          </p>
        </FadeIn>

        {/* Logo Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

          <motion.div
            className="flex gap-8"
            animate={{ x: [0, -1600] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {allClientes.map((cliente, index) => (
              <CompanyLogo
                key={`${cliente.id}-${index}`}
                cliente={cliente}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
