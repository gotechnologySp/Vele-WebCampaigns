"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SectionHeading({ eyebrow, title, text, invert = false }: { eyebrow: string; title: string; text?: string; invert?: boolean }) {
  const reduce = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 30, filter: reduce ? "blur(0px)" : "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };
  return (
    <motion.div
      className="max-w-3xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }}
    >
      <motion.p variants={item} transition={{ duration: 0.55 }} className="mb-4 text-sm font-semibold tracking-[0.18em] text-amber-500 uppercase">{eyebrow}</motion.p>
      <motion.h2 variants={item} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className={`text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-5xl ${invert ? "text-white" : "text-zinc-950"}`}>{title}</motion.h2>
      {text && <motion.p variants={item} transition={{ duration: 0.65 }} className={`mt-5 max-w-2xl text-lg leading-8 ${invert ? "text-zinc-200" : "text-zinc-600"}`}>{text}</motion.p>}
      <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mt-7 h-px w-24 origin-left bg-amber-400" aria-hidden />
    </motion.div>
  );
}
