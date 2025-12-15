"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem, Reveal, ScaleOnScroll } from "../ui/motion-wrapper";

const products = [
  {
    id: 1,
    name: "Spotform",
    tagline: "O Typeform Brasileiro",
    description:
      "Crie formularios interativos e pesquisas com alta taxa de conversao. Interface intuitiva e analise avancada de dados.",
    highlight: true,
  },
  {
    id: 2,
    name: "MATRA CRM",
    tagline: "CRM com Inteligencia Artificial",
    description:
      "Gestao de relacionamento com clientes potencializada por IA. Automacao inteligente e insights preditivos.",
    highlight: true,
  },
  {
    id: 3,
    name: "SpotCRM",
    tagline: "CRM Enxuto e Eficiente",
    description:
      "Solucao leve e objetiva para equipes que precisam de agilidade sem complexidade desnecessaria.",
    highlight: false,
  },
  {
    id: 4,
    name: "Firebank",
    tagline: "Gestao Financeira Simplificada",
    description:
      "Controle suas financas empresariais com dashboards inteligentes e automacao de processos financeiros.",
    highlight: false,
  },
];

const otherProducts = [
  "Plataforma EAD",
  "Sistema de Eventos",
  "Registro de Marcas Blockchain",
  "E mais 4 produtos especializados",
];

export function Products() {
  return (
    <section id="produtos" className="relative bg-black py-16 flex items-center min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-white/40">
              Nossos Produtos
            </span>
          </FadeIn>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              11 SaaS construidos para escalar
            </h2>
          </Reveal>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-lg text-white/60">
              Nao apenas desenvolvemos para clientes — criamos produtos proprios
              que rodam em producao e atendem milhares de usuarios.
            </p>
          </FadeIn>
        </div>

        {/* Main Products Grid */}
        <StaggerContainer
          staggerDelay={0.1}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={staggerItem}
              className="group relative"
            >
              <motion.div
                className={`relative h-full overflow-hidden rounded-2xl border p-8 transition-all duration-300 ${
                  product.highlight
                    ? "border-white/20 bg-white/[0.04]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
                whileHover={{
                  borderColor: "rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
              >
                {/* Highlight badge */}
                {product.highlight && (
                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                      Destaque
                    </span>
                  </div>
                )}

                {/* Content */}
                <div>
                  <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                  <p className="mt-1 text-sm font-medium text-white/50">
                    {product.tagline}
                  </p>
                  <p className="mt-4 text-white/60">{product.description}</p>
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Other Products */}
        <ScaleOnScroll>
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white/40">
              Tambem desenvolvemos
            </p>
            <div className="flex flex-wrap gap-3">
              {otherProducts.map((product) => (
                <span
                  key={product}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60"
                >
                  {product}
                </span>
              ))}
            </div>
          </div>
        </ScaleOnScroll>
      </div>
    </section>
  );
}
