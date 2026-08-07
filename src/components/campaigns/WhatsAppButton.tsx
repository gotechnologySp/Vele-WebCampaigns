"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppButton() {
  if (!siteConfig.whatsappNumber) return null;
  const href = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Olá, quero conversar sobre um novo site para minha empresa.")}`;
  return <a href={href} target="_blank" rel="noreferrer" onClick={() => trackEvent("whatsapp_click")} aria-label="Conversar com a Vele pelo WhatsApp" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-amber-400 text-black shadow-xl transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"><MessageCircle aria-hidden /></a>;
}
