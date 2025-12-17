import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MATRA Tecnologia | Landing Pages, Sistemas e Sites Premium",
  description:
    "Desenvolvemos landing pages de alta conversao, sistemas sob medida e sites institucionais premium. Tecnologia que transforma resultados.",
  keywords: [
    "landing page",
    "desenvolvimento web",
    "sistemas sob medida",
    "site institucional",
    "alta conversao",
    "tecnologia",
    "MATRA",
  ],
  authors: [{ name: "MATRA Tecnologia" }],
  openGraph: {
    title: "MATRA Tecnologia | Tecnologia que Transforma Resultados",
    description:
      "Landing pages de alta conversao, sistemas sob medida e sites institucionais premium para empresas que exigem excelencia.",
    url: "https://matra.tech",
    siteName: "MATRA Tecnologia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MATRA Tecnologia | Tecnologia que Transforma Resultados",
    description:
      "Landing pages de alta conversao, sistemas sob medida e sites institucionais premium.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" className="scroll-smooth">
        <body
          className={`${inter.variable} font-sans antialiased bg-black text-white`}
        >
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#18181b",
                border: "1px solid #27272a",
                color: "#fff",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
