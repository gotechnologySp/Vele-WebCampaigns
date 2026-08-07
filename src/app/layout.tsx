import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/layout/Analytics";
import { siteConfig } from "@/config/site";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Vele Campanhas", template: "%s | Vele" },
  description: "Campanhas e iniciativas digitais da Vele Tecnologia.",
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className="antialiased"><a href="#conteudo" className="fixed left-4 top-4 z-50 -translate-y-24 rounded bg-black px-4 py-2 text-white focus:translate-y-0">Pular para o conteúdo</a>{children}<Analytics /></body></html>;
}
