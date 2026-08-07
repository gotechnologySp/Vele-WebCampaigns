"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BriefcaseBusiness, ChartNoAxesCombined, CodeXml, Handshake, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { movementContent } from "@/config/campaigns";

const icons = [BriefcaseBusiness, ChartNoAxesCombined, CodeXml, Handshake];
const featureVisuals = [
  { background: "from-amber-100 via-orange-50 to-white", glow: "bg-amber-300/45", icon: "text-amber-500" },
  { background: "from-sky-100 via-blue-50 to-white", glow: "bg-sky-300/45", icon: "text-sky-500" },
  { background: "from-violet-100 via-fuchsia-50 to-white", glow: "bg-violet-300/40", icon: "text-violet-500" },
  { background: "from-emerald-100 via-teal-50 to-white", glow: "bg-emerald-300/40", icon: "text-emerald-500" },
];

export function FeatureGrid() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; scrollLeft: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (selectedFeature === null) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedFeature(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedFeature]);

  return (
    <section className="relative h-[160svh] bg-white">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden py-8 sm:py-12">
      <Container>
        <motion.div initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-sm font-semibold tracking-[0.18em] text-amber-500 uppercase">Por que a Vele</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-zinc-950 sm:text-6xl">Tecnologia que vai além</h2>
        </motion.div>
      </Container>

      <Container>
      <motion.div
        ref={trackRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.1 } } }}
        onPointerDown={(event) => {
          const track = trackRef.current;
          if (!track) return;
          dragRef.current = { x: event.clientX, scrollLeft: track.scrollLeft, moved: false };
          track.style.scrollSnapType = "none";
          track.style.cursor = "grabbing";
        }}
        onPointerMove={(event) => {
          const track = trackRef.current;
          const drag = dragRef.current;
          if (!track || !drag) return;
          if (Math.abs(event.clientX - drag.x) > 6 && !drag.moved) {
            drag.moved = true;
            track.setPointerCapture(event.pointerId);
          }
          track.scrollLeft = drag.scrollLeft - (event.clientX - drag.x);
        }}
        onPointerUp={(event) => {
          const track = trackRef.current;
          if (!track) return;
          suppressClickRef.current = Boolean(dragRef.current?.moved);
          dragRef.current = null;
          if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
          track.style.scrollSnapType = "x mandatory";
          track.style.cursor = "grab";
          window.setTimeout(() => { suppressClickRef.current = false; }, 0);
        }}
        onPointerCancel={() => { dragRef.current = null; }}
        className="scrollbar-none mt-8 flex w-[calc(100vw-1.25rem)] cursor-grab snap-x snap-mandatory select-none gap-4 overflow-x-auto overscroll-x-contain pr-5 sm:mt-10 sm:w-[calc(100vw-2rem)] sm:gap-5 sm:pr-8 lg:w-[calc(100vw-max(3rem,calc((100vw-80rem)/2+3rem)))]"
      >
        {movementContent.features.map((item, index) => {
          const Icon = icons[index] ?? BriefcaseBusiness;
          const visual = featureVisuals[index] ?? featureVisuals[0]!;
          return (
            <motion.article key={item.title} role="button" tabIndex={0} aria-label={`Saiba mais sobre ${item.title}`} onClick={() => { if (!suppressClickRef.current) setSelectedFeature(index); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedFeature(index); } }} variants={{ hidden: { opacity: 0, y: reduce ? 0 : 36, scale: reduce ? 1 : 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }} className="group relative h-[54svh] min-h-[25rem] max-h-[34rem] w-[78vw] max-w-80 shrink-0 cursor-pointer snap-start overflow-hidden rounded-[2rem] bg-[#f5f5f7] p-7 transition-colors duration-500 hover:bg-[#f0f0f2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 sm:h-[46svh] sm:min-h-[22rem] sm:max-h-[30rem] sm:w-80 sm:p-8 lg:h-[34rem] lg:max-h-[34rem]">
              <div className="relative z-10">
                <p className="text-xs font-semibold text-zinc-600">0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.035em] text-zinc-950 sm:text-3xl">{item.title}</h3>
                <p className="mt-4 max-w-sm leading-7 text-zinc-600">{item.text}</p>
              </div>
              <div aria-hidden className={`absolute inset-x-0 bottom-0 h-[44%] overflow-hidden bg-gradient-to-b ${visual.background}`}>
                <div className={`absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${visual.glow}`} />
                <div className="absolute -bottom-8 left-1/2 h-48 w-[78%] -translate-x-1/2 rounded-[2.25rem] border border-white/90 bg-white/65 shadow-[0_28px_70px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:rotate-[-1deg] sm:h-52">
                  <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-zinc-300/80" />
                  <div className="relative mx-auto mt-5 grid h-24 w-24 place-items-center rounded-[1.75rem] border border-white bg-white/80 shadow-[0_18px_45px_rgba(0,0,0,0.12)] sm:h-28 sm:w-28">
                    <Icon className={`h-12 w-12 stroke-[1.35] ${visual.icon} sm:h-14 sm:w-14`} />
                    <span className="absolute -right-3 -top-3 h-8 w-8 rounded-full border-4 border-white bg-zinc-950 shadow-lg" />
                  </div>
                </div>
              </div>
              <button type="button" aria-label={`Saiba mais sobre ${item.title}`} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); setSelectedFeature(index); }} className="absolute bottom-5 right-5 z-20 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-zinc-950 text-white transition duration-500 hover:rotate-90 hover:bg-amber-400 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"><Plus className="h-5 w-5" /></button>
            </motion.article>
          );
        })}
      </motion.div>
      </Container>

      </div>

      <AnimatePresence>
        {selectedFeature !== null && (() => {
          const item = movementContent.features[selectedFeature];
          const Icon = icons[selectedFeature] ?? BriefcaseBusiness;
          if (!item) return null;
          return (
            <motion.div
              className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-3 backdrop-blur-sm sm:items-center sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedFeature(null); }}
            >
              <motion.div role="dialog" aria-modal="true" aria-labelledby="feature-modal-title" initial={reduce ? false : { opacity: 0, y: 50, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }} transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }} className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-[#f5f5f7] p-7 shadow-2xl sm:p-10">
                <button type="button" onClick={() => setSelectedFeature(null)} aria-label="Fechar modal" className="absolute right-5 top-5 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-zinc-950 text-white transition hover:rotate-90 hover:bg-amber-400 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"><X className="h-5 w-5" /></button>
                <p className="text-sm font-semibold tracking-[0.18em] text-amber-500 uppercase">Por que a Vele · 0{selectedFeature + 1}</p>
                <h3 id="feature-modal-title" className="mt-5 max-w-lg pr-14 text-3xl font-semibold tracking-[-0.045em] text-zinc-950 sm:text-5xl">{item.title}</h3>
                <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">{item.text}</p>
                <div className="relative mt-10 h-48 overflow-hidden rounded-[1.5rem] bg-zinc-950 sm:h-56">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(251,191,36,0.24),transparent_48%)]" />
                  <Icon aria-hidden className="absolute -bottom-10 right-6 h-56 w-56 stroke-[1] text-amber-400 sm:h-64 sm:w-64" />
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
