"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, Linkedin, Github, Mail, Users } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  staggerItem,
  Reveal,
} from "../ui/motion-wrapper";

interface MembroEquipe {
  id: string;
  nome: string;
  cargo: string;
  descricao: string | null;
  foto: string | null;
  linkedin: string | null;
  github: string | null;
  email: string | null;
  ordem: number;
  ativo: boolean;
}

// Skeleton component for loading state
function TeamSkeleton() {
  return (
    <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="relative h-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/2 p-4 sm:p-6 animate-pulse"
        >
          {/* Photo Skeleton */}
          <div className="mb-4 sm:mb-5 aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-white/5" />

          {/* Info Skeleton */}
          <div className="text-center space-y-2">
            <div className="mx-auto h-5 w-32 rounded bg-white/10" />
            <div className="mx-auto h-4 w-24 rounded bg-white/5" />
          </div>

          {/* Hint Skeleton */}
          <div className="mt-3 sm:mt-4 text-center">
            <div className="mx-auto h-3 w-28 rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Empty state component
function TeamEmpty() {
  return (
    <div className="mt-10 sm:mt-16 flex flex-col items-center justify-center py-16 sm:py-20">
      <div className="rounded-full bg-white/5 p-6 mb-6">
        <Users className="h-12 w-12 text-white/30" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-white/70 mb-2">
        Equipe em construção
      </h3>
      <p className="text-sm sm:text-base text-white/40 text-center max-w-md">
        Em breve você conhecerá os profissionais que fazem a MATRA acontecer.
      </p>
    </div>
  );
}

export function TeamDynamic({ membros, isLoading = false }: { membros: MembroEquipe[]; isLoading?: boolean }) {
  const [selectedMember, setSelectedMember] = useState<MembroEquipe | null>(null);

  // Don't render section if no members and not loading
  if (!isLoading && membros.length === 0) {
    return null;
  }

  return (
    <section
      id="equipe"
      className="relative flex min-h-screen items-center bg-black py-12 sm:py-16"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="mb-3 sm:mb-4 inline-block text-xs sm:text-sm font-medium uppercase tracking-widest text-white/40">
              Nossa Equipe
            </span>
          </FadeIn>
          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Quem faz acontecer
            </h2>
          </Reveal>
          <FadeIn delay={0.2}>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/50">
              Profissionais apaixonados por tecnologia e resultado.
            </p>
          </FadeIn>
        </div>

        {/* Loading State */}
        {isLoading && <TeamSkeleton />}

        {/* Empty State */}
        {!isLoading && membros.length === 0 && <TeamEmpty />}

        {/* Team Grid */}
        {!isLoading && membros.length > 0 && (
          <StaggerContainer
            staggerDelay={0.1}
            className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {membros.map((membro) => (
            <motion.div
              key={membro.id}
              variants={staggerItem}
              className="group cursor-pointer"
              onClick={() => setSelectedMember(membro)}
            >
              <motion.div
                className="relative h-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/2 p-4 sm:p-6 transition-all duration-300"
                whileHover={{
                  borderColor: "rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  scale: 1.02,
                }}
              >
                {/* Photo */}
                <div className="relative mb-4 sm:mb-5 aspect-square overflow-hidden rounded-lg sm:rounded-xl">
                  {membro.foto ? (
                    <Image
                      src={membro.foto}
                      alt={membro.nome}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/10 text-3xl sm:text-4xl font-bold text-white">
                      {membro.nome.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {membro.nome}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-white/50">
                    {membro.cargo}
                  </p>
                </div>

                {/* Click hint */}
                <div className="mt-3 sm:mt-4 text-center">
                  <span className="text-[10px] sm:text-xs text-white/30 group-hover:text-white/50 transition-colors">
                    Clique para saber mais
                  </span>
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 -z-10 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            </motion.div>
          ))}
          </StaggerContainer>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/95 p-4 sm:p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Photo */}
              <div className="relative mx-auto mb-4 sm:mb-6 w-32 h-32 sm:w-40 sm:h-40 overflow-hidden rounded-full border-2 border-white/20">
                {selectedMember.foto ? (
                  <Image
                    src={selectedMember.foto}
                    alt={selectedMember.nome}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/10 text-4xl sm:text-5xl font-bold text-white">
                    {selectedMember.nome.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedMember.nome}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-white/60">
                  {selectedMember.cargo}
                </p>
              </div>

              {/* Description */}
              {selectedMember.descricao && (
                <p className="mt-4 sm:mt-6 text-sm sm:text-base text-white/70 text-center leading-relaxed">
                  {selectedMember.descricao}
                </p>
              )}

              {/* Social Links */}
              <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4">
                {selectedMember.linkedin && (
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {selectedMember.github && (
                  <a
                    href={selectedMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {selectedMember.email && (
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="p-3 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
