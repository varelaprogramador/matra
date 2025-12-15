import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/sections/hero";
import { SocialProofDynamic } from "@/components/sections/social-proof-dynamic";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { ProductsDynamic } from "@/components/sections/products-dynamic";
import { Differentials } from "@/components/sections/differentials";
import { Process } from "@/components/sections/process";
import { TestimonialsDynamic } from "@/components/sections/testimonials-dynamic";
import { CTAFinal } from "@/components/sections/cta-final";
import { Footer } from "@/components/sections/footer";
import { FullpageScroll } from "@/components/ui/fullpage-scroll";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import {
  getProdutosAtivos,
  getClientesAtivos,
  getDepoimentosAtivos,
} from "@/lib/data";

export default async function Home() {
  // Fetch data from database
  const [produtos, clientes, depoimentos] = await Promise.all([
    getProdutosAtivos(),
    getClientesAtivos(),
    getDepoimentosAtivos(),
  ]);

  const sections = [
    {
      id: "inicio",
      component: <Hero />,
    },
    {
      id: "sobre",
      component: (
        <div className="h-screen overflow-y-auto bg-black">
          <SocialProofDynamic clientes={clientes} />
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
      component: <ProductsDynamic produtos={produtos} />,
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
      component: <TestimonialsDynamic depoimentos={depoimentos} />,
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

  return (
    <>
      <Navbar />
      <FullpageScroll sections={sections} transitionDuration={0.6} />
      <WhatsAppButton />
    </>
  );
}
