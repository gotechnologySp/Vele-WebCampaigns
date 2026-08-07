"use client";

import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const narrative = "O Movimento Tecnológico aproxima empresas da era digital com sites modernos, estratégicos e preparados para gerar oportunidades.";
const words = narrative.split(" ");
const highlights = new Set(["Movimento", "Tecnológico", "modernos,", "estratégicos", "oportunidades."]);

function RevealWord({ word, index, progress, reduce }: { word: string; index: number; progress: MotionValue<number>; reduce: boolean }) {
  const start = 0.04 + (index / Math.max(words.length - 1, 1)) * 0.86;
  const end = Math.min(start + 0.1, 1);
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);
  return <motion.span style={reduce ? undefined : { opacity, y }} className={`mr-[0.24em] inline-block ${highlights.has(word) ? "text-amber-500" : "text-zinc-950"}`}>{word}</motion.span>;
}

export function CampaignCase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const revealProgress = useTransform(scrollYProgress, [0, 0.78], [0, 1], { clamp: true });
  const progressWidth = useTransform(revealProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={sectionRef} className="relative h-[160svh] bg-[#f5f4ef]">
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden py-24">
        <div aria-hidden className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border-[5rem] border-amber-400/10" />
        <Container className="relative">
          <div className="flex items-center justify-between border-b border-zinc-300 pb-5">
            <p className="text-sm font-semibold tracking-[0.18em] text-amber-600 uppercase">Case · Movimento Tecnológico</p>
            <div className="hidden items-center gap-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase sm:flex">Role para descobrir <ArrowDownRight className="h-4 w-4" /></div>
          </div>
          <h2 className="mt-10 max-w-6xl text-[clamp(2rem,4.5vw,4.8rem)] font-semibold leading-[1.06] tracking-[-0.045em]" aria-label={narrative}>
            {words.map((word, index) => <RevealWord key={`${word}-${index}`} word={word} index={index} progress={revealProgress} reduce={reduce} />)}
          </h2>
          <div className="absolute inset-x-5 -bottom-12 h-1 overflow-hidden rounded-full bg-zinc-300 sm:inset-x-8 lg:inset-x-12">
            <motion.div style={{ width: reduce ? "100%" : progressWidth }} className="h-full bg-amber-400" />
          </div>
        </Container>
      </div>
    </div>
  );
}
