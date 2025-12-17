"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FadeIn, Reveal } from "../ui/motion-wrapper";
import { Button } from "../ui/button";
import { Send, MessageCircle, Clock, Shield, Zap } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5543999999999";

// Formatar telefone para exibicao: (43) 99999-9999
function formatPhoneDisplay(value: string): string {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

// Formatar telefone para WhatsApp: 5543999999999
function formatPhoneWhatsApp(value: string): string {
  const numbers = value.replace(/\D/g, "");
  // Se ja comeca com 55, retorna como esta
  if (numbers.startsWith("55")) return numbers;
  // Se tem 11 digitos (DDD + 9 digitos), adiciona 55
  if (numbers.length === 11) return `55${numbers}`;
  // Se tem 10 digitos (DDD + 8 digitos), adiciona 55
  if (numbers.length === 10) return `55${numbers}`;
  return numbers;
}

export function CTAFinal() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneDisplay(e.target.value);
    setFormData({ ...formData, telefone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Salvar lead no banco de dados
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email || undefined,
          telefone: formData.telefone,
          mensagem: formData.mensagem,
          origem: "site-contato",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem");
      }

      setSubmitted(true);
      toast.success("Mensagem enviada com sucesso!", {
        description: "Entraremos em contato em breve.",
      });

      // Redirecionar para WhatsApp com os dados
      const whatsappPhone = formatPhoneWhatsApp(formData.telefone);
      const emailInfo = formData.email ? `\nEmail: ${formData.email}` : "";
      const message = `Ola! Meu nome e ${formData.nome}.${emailInfo}\nTelefone: ${formData.telefone}\n\n${formData.mensagem}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
      toast.error("Erro ao enviar mensagem", {
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="relative bg-black py-16 sm:py-24 flex items-center min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-t from-white/3 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="text-center lg:text-left">
            <FadeIn>
              <span className="mb-3 sm:mb-4 inline-block text-xs sm:text-sm font-medium uppercase tracking-widest text-white/40">
                Contato
              </span>
            </FadeIn>

            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                Vamos transformar sua ideia em realidade
              </h2>
            </Reveal>

            <FadeIn delay={0.2}>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/50">
                Fale com quem entende de tecnologia e conversao. Receba uma proposta personalizada em ate 24 horas.
              </p>
            </FadeIn>

            {/* Urgency Badge */}
            <FadeIn delay={0.25}>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
                <Clock className="h-4 w-4" />
                <span>Vagas limitadas para projetos em Janeiro</span>
              </div>
            </FadeIn>

            {/* Trust Indicators */}
            <FadeIn delay={0.3}>
              <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">Resposta Rapida</div>
                    <div className="text-xs text-white/40">Em ate 24 horas</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">Sem Compromisso</div>
                    <div className="text-xs text-white/40">Orcamento gratuito</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">100+ Projetos</div>
                    <div className="text-xs text-white/40">Entregues com sucesso</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Quick WhatsApp CTA for mobile */}
            <FadeIn delay={0.35}>
              <div className="mt-8 lg:hidden">
                <Button
                  size="lg"
                  href={`https://wa.me/${whatsappNumber}`}
                  className="w-full"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar pelo WhatsApp
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Right - Form */}
          <FadeIn delay={0.3}>
            <motion.div
              className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/2 p-6 sm:p-8 backdrop-blur-sm"
              whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Mensagem enviada!</h3>
                  <p className="text-white/50">Entraremos em contato em breve.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-white/60 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-white/30 focus:outline-none focus:ring-0"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-white/60 mb-2">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        required
                        value={formData.telefone}
                        onChange={handlePhoneChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-white/30 focus:outline-none focus:ring-0"
                        placeholder="(43) 99999-9999"
                        maxLength={15}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-white/30 focus:outline-none focus:ring-0"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-white/60 mb-2">
                      Conte sobre seu projeto *
                    </label>
                    <textarea
                      id="mensagem"
                      required
                      rows={4}
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-white/30 focus:outline-none focus:ring-0"
                      placeholder="Descreva brevemente o que voce precisa..."
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Mensagem
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <span className="text-xs text-white/30">ou</span>
                    </div>

                    <Button
                      variant="secondary"
                      size="lg"
                      href={`https://wa.me/${whatsappNumber}`}
                      className="w-full"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Prefiro WhatsApp
                    </Button>
                  </div>

                  <p className="text-center text-xs text-white/30">
                    Seus dados estao seguros. Nao enviamos spam.
                  </p>
                </form>
              )}
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
