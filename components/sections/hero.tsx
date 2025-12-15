"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "../ui/button";
import { FadeIn } from "../ui/motion-wrapper";

const AbstractShape = dynamic(
  () => import("../three/abstract-shape").then((mod) => mod.AbstractShape),
  { ssr: false }
);

const stats = [
  { value: "11", label: "SaaS Proprios" },
  { value: "100+", label: "Projetos" },
  { value: "8+", label: "Anos" },
];

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Video Background - Infinite Loop (No Audio) */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          className="h-full w-full object-cover opacity-40 pointer-events-none"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 3D Background as overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen">
        <AbstractShape />
      </div>

      {/* Gradient Overlays - more dramatic for video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center lg:px-8">
        {/* Logo Badge */}
        <FadeIn delay={0.1}>
          <motion.div
            className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
          >
            <Image
              src="/logo.svg"
              alt="MATRA"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="text-sm font-medium text-white/80">
              MATRA Tecnologia & Marketing
            </span>
          </motion.div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.2}>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Construimos
            <span className="relative mx-3 inline-block">
              <span className="relative z-10">tecnologia</span>
              <motion.span
                className="absolute -inset-1 -z-10 rounded-lg bg-white/10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              />
            </span>
            que escala
          </h1>
        </FadeIn>

        {/* Subheadline */}
        <FadeIn delay={0.3}>
          <p className="mt-6 max-w-2xl text-lg text-white/50 sm:text-xl">
            11 produtos SaaS proprios. Sistemas com blockchain e IA.
            Landing pages de alta conversao.
          </p>
        </FadeIn>

        {/* Stats Row */}
        <FadeIn delay={0.35}>
          <div className="mt-8 flex items-center gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.4}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" href="#contato">
              Iniciar Projeto
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
            <Button variant="secondary" size="lg" href="#produtos">
              Conhecer Produtos
            </Button>
          </div>
        </FadeIn>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div className="h-2 w-1 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
