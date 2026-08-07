"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { trackEvent } from "@/lib/analytics";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section id="inicio" className="relative flex min-h-svh items-center overflow-hidden bg-[#f5f4ef] py-28 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(24,24,27,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,0.055) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-28 top-24 h-96 w-96 opacity-25 sm:-right-16 sm:top-12 sm:h-[34rem] sm:w-[34rem] sm:opacity-90 lg:right-4 lg:top-16"
        initial={reduce ? false : { scale: 0.72, rotate: -18, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src="/images/icon-logo-dourado.svg" alt="" fill priority sizes="(min-width: 640px) 544px, 384px" className="object-contain" />
      </motion.div>
      <Container className="relative">
        <motion.p initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6 text-sm font-semibold tracking-[0.2em] uppercase">Vele apresenta</motion.p>
        <h1 className="max-w-5xl text-[clamp(3.5rem,10vw,8.5rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-zinc-950">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span initial={reduce ? false : { opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="block">Movimento</motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.18em]">
            <motion.span initial={reduce ? false : { opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="block leading-[0.92]">tecnológico.</motion.span>
          </span>
        </h1>
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="mt-10 flex max-w-5xl flex-col gap-8 border-t border-zinc-900/20 pt-7 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-lg leading-8 text-zinc-700">Conectando empresas ao futuro, transformando sua presença digital em crescimento e novas oportunidades.</p>
          <a href="#contato" onClick={() => trackEvent("cta_click", { location: "hero" })} className="group inline-flex w-fit items-center gap-3 rounded-full bg-black px-6 py-3.5 font-semibold text-white transition hover:scale-[1.03] hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500">Iniciar um projeto <ArrowDownRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></a>
        </motion.div>
      </Container>
    </section>
  );
}
