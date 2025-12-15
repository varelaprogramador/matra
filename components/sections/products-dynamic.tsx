"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeIn,
  StaggerContainer,
  staggerItem,
  Reveal,
  ScaleOnScroll,
} from "../ui/motion-wrapper";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  descricaoLonga?: string | null;
  icone?: string | null;
  imagem?: string | null;
  imagens?: string[];
  link?: string | null;
  tecnologias?: string[];
  destaque: boolean;
  ordem: number;
  ativo: boolean;
}

const otherProducts = [
  "Plataforma EAD",
  "Sistema de Eventos",
  "Registro de Marcas Blockchain",
  "E mais produtos especializados",
];

// Modal Component
function ProductModal({
  produto,
  onClose,
}: {
  produto: Produto;
  onClose: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine main image with gallery images
  const allImages = [
    ...(produto.imagem ? [produto.imagem] : []),
    ...(produto.imagens || []),
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-4"
      onClick={onClose}
    >
      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[95vh] sm:max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl"
      >
        {/* Close Button - Inside modal */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-2 sm:right-4 top-2 sm:top-4 z-50 rounded-full border border-white/20 bg-black/50 p-2 sm:p-3 text-white/70 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-black/70 hover:text-white"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        {/* Hero Image / Gallery */}
        {allImages.length > 0 ? (
          <div className="relative h-[200px] sm:h-[300px] md:h-[400px] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={allImages[currentImageIndex]}
                alt={produto.nome}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-1.5 sm:p-2 text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-black/70"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-1.5 sm:p-2 text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-black/70"
                >
                  <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 sm:gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white w-4 sm:w-6"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Icon Overlay */}
            {produto.icone && (
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8">
                <span className="text-4xl sm:text-6xl drop-shadow-2xl">{produto.icone}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative flex h-[150px] sm:h-[200px] md:h-[300px] items-center justify-center bg-linear-to-br from-white/5 to-transparent">
            {produto.icone && (
              <span className="text-5xl sm:text-7xl md:text-8xl opacity-50">{produto.icone}</span>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-3 sm:pt-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
              >
                {produto.nome}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-1.5 sm:mt-2 text-sm sm:text-base md:text-lg text-white/60"
              >
                {produto.descricao}
              </motion.p>
            </div>

            {produto.link && (
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                href={produto.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-black transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 w-full sm:w-auto"
              >
                Acessar
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            )}
          </div>

          {/* Technologies */}
          {produto.tecnologias && Array.isArray(produto.tecnologias) && produto.tecnologias.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 sm:mt-6"
            >
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-wider text-white/40">
                Tecnologias
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {produto.tecnologias.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Long Description */}
          {produto.descricaoLonga && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 sm:mt-8"
            >
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-wider text-white/40">
                Sobre o Projeto
              </p>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-sm sm:text-base text-white/70 leading-relaxed">
                  {produto.descricaoLonga}
                </p>
              </div>
            </motion.div>
          )}

          {/* Gallery Thumbnails */}
          {allImages.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 sm:mt-8"
            >
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-wider text-white/40">
                Galeria
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-video overflow-hidden rounded-md sm:rounded-lg transition-all ${
                      index === currentImageIndex
                        ? "ring-2 ring-white ring-offset-1 sm:ring-offset-2 ring-offset-zinc-950"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${produto.nome} - ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductsDynamic({ produtos }: { produtos: Produto[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);

  // Separar produtos em destaque e outros
  // Se nao houver produtos em destaque, mostrar os primeiros 4
  const produtosDestaque = produtos.filter((p) => p.destaque);
  const produtosParaMostrar = produtosDestaque.length > 0
    ? produtosDestaque.slice(0, 4)
    : produtos.slice(0, 4);

  const produtosExtras = produtos
    .filter((p) => !produtosParaMostrar.some(d => d.id === p.id))
    .map((p) => p.nome);

  const extras =
    produtosExtras.length > 0 ? produtosExtras : otherProducts;

  return (
    <>
      <section
        id="produtos"
        className="relative flex min-h-screen items-center bg-black py-16"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-white/40">
                Produtos
              </span>
            </FadeIn>
            <Reveal delay={0.1}>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Nossos produtos
              </h2>
            </Reveal>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-lg text-white/50">
                11 SaaS em producao. Milhares de usuarios. Tecnologia propria.
              </p>
            </FadeIn>
          </div>

          {/* Main Products Grid */}
          <StaggerContainer
            staggerDelay={0.1}
            className="mt-16 grid gap-6 md:grid-cols-2"
          >
            {produtosParaMostrar.map((product) => (
              <motion.div
                key={product.id}
                variants={staggerItem}
                className="group relative cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <motion.div
                  className={`relative h-full overflow-hidden rounded-2xl border transition-all duration-300 ${
                    product.destaque
                      ? "border-white/20 bg-white/[0.04]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                  whileHover={{
                    borderColor: "rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Cover Image */}
                  {product.imagem && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={product.imagem}
                        alt={product.nome}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8">
                    {/* Highlight badge */}
                    {product.destaque && !product.imagem && (
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                          Destaque
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      {product.icone && (
                        <span className="text-3xl">{product.icone}</span>
                      )}
                      <h3 className="text-2xl font-bold text-white">
                        {product.nome}
                      </h3>
                    </div>
                    <p className="mt-4 line-clamp-2 text-white/60">{product.descricao}</p>

                    {/* Technologies Preview */}
                    {product.tecnologias && Array.isArray(product.tecnologias) && product.tecnologias.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.tecnologias.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-white/5 px-2 py-1 text-xs text-white/50"
                          >
                            {tech}
                          </span>
                        ))}
                        {product.tecnologias.length > 3 && (
                          <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-white/50">
                            +{product.tecnologias.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Click hint */}
                    <div className="mt-4 flex items-center text-sm text-white/40 transition-colors group-hover:text-white/70">
                      <span>Ver detalhes</span>
                      <svg
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
                    </div>
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
                {extras.map((product) => (
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

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            produto={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
