"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../ui/motion-wrapper";

const companies = [
  { name: "Dr Atende Tudo", id: 1 },
  { name: "Anjos Colchoes", id: 2 },
  { name: "Tokeland", id: 3 },
  { name: "Lucas Chaccon", id: 4 },
  { name: "V7", id: 5 },
  { name: "Decol", id: 6 },
  { name: "Dr Jose Guilherme", id: 7 },
  { name: "RG Producoes", id: 8 },
];

function CompanyLogo({ name }: { name: string }) {
  return (
    <div className="flex h-12 items-center justify-center px-8">
      <span className="whitespace-nowrap text-lg font-semibold tracking-wider text-white/30 transition-all duration-300 hover:text-white/50">
        {name}
      </span>
    </div>
  );
}

export function SocialProof() {
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
            {/* Duplicate logos for seamless loop */}
            {[...companies, ...companies, ...companies].map((company, index) => (
              <CompanyLogo key={`${company.id}-${index}`} name={company.name} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
