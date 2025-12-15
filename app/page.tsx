"use client";

import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Products } from "@/components/sections/products";
import { Differentials } from "@/components/sections/differentials";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { CTAFinal } from "@/components/sections/cta-final";
import { Footer } from "@/components/sections/footer";
import { FullpageScroll } from "@/components/ui/fullpage-scroll";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const sections = [
  {
    id: "inicio",
    component: <Hero />,
  },
  {
    id: "sobre",
    component: (
      <div className="h-screen overflow-y-auto bg-black">
        <SocialProof />
        <About />
      </div>
    ),
  },
  {
    id: "servicos",
    component: <Services />,
  },
  {
    id: "produtos",
    component: <Products />,
  },
  {
    id: "diferenciais",
    component: <Differentials />,
  },
  {
    id: "processo",
    component: <Process />,
  },
  {
    id: "depoimentos",
    component: <Testimonials />,
  },
  {
    id: "contato",
    component: <CTAFinal />,
  },
  {
    id: "footer",
    component: <Footer />,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <FullpageScroll sections={sections} transitionDuration={0.6} />
      <WhatsAppButton />
    </>
  );
}
