"use client";

import { motion, type PanInfo, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { movementContent } from "@/config/campaigns";
import { trackEvent } from "@/lib/analytics";

export function CaseGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(1);
  const [slideStep, setSlideStep] = useState(78);
  const reduce = Boolean(useReducedMotion());

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { trackEvent("cases_view"); observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      const cardWidth = window.innerWidth < 640 ? 84 : window.innerWidth < 1024 ? 78 : 76;
      const compactGap = (8 / window.innerWidth) * 100;
      setSlideStep(cardWidth + compactGap);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[160svh] bg-[#f5f5f7]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-0 pb-8 pt-20 sm:pb-10 sm:pt-24">
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 text-center sm:px-8 lg:px-12">
        <h2 className="text-base font-bold tracking-[0.18em] text-amber-400 uppercase sm:text-lg">Nossos projetos</h2>
      </div>

      <div className="relative mt-6 h-[67svh] min-h-[29rem] w-full sm:mt-9 sm:h-[65svh] lg:h-[67svh]">
        {movementContent.cases.map((item, index) => {
          const offset = index - activeProject;
          const distance = Math.abs(offset);
          return (
            <ProjectCard
              key={item.url}
              item={item}
              index={index}
              active={distance === 0}
              offset={offset}
              slideStep={slideStep}
              reduce={reduce}
              onSelect={() => setActiveProject(index)}
              onSwipe={(direction) => setActiveProject((current) => Math.min(Math.max(current + direction, 0), movementContent.cases.length - 1))}
            />
          );
        })}
      </div>

      <div className="relative z-20 mx-auto mt-5 flex select-none items-center gap-3 sm:mt-7 sm:gap-4" aria-label="Selecionar projeto">
        {movementContent.cases.map((item, index) => (
          <button key={item.url} type="button" onClick={() => setActiveProject(index)} aria-label={`Exibir ${item.title}`} aria-pressed={activeProject === index} className="group grid h-6 min-w-3 cursor-pointer place-items-center caret-transparent outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2">
            <span className={`block h-2 rounded-full transition-all duration-500 ${activeProject === index ? "w-9 bg-zinc-900" : "w-2 bg-zinc-400 group-hover:bg-amber-500"}`} />
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}

type Project = (typeof movementContent.cases)[number];

function ProjectCard({ item, index, active, offset, slideStep, reduce, onSelect, onSwipe }: { item: Project; index: number; active: boolean; offset: number; slideStep: number; reduce: boolean; onSelect: () => void; onSwipe: (direction: -1 | 1) => void }) {
  const distance = Math.abs(offset);
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -45 || info.velocity.x < -450) onSwipe(1);
    if (info.offset.x > 45 || info.velocity.x > 450) onSwipe(-1);
  };
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      draggable={false}
      aria-label={active ? `${item.title} — abrir projeto em uma nova aba` : `Centralizar projeto ${item.title}`}
      onClick={(event) => { if (!active) { event.preventDefault(); onSelect(); } }}
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.16}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing", scale: 0.985 }}
      initial={false}
      animate={{
        x: `calc(-50% + ${offset * slideStep}vw)`,
        scale: active ? 1 : 0.98,
        opacity: distance > 1 ? 0 : active ? 1 : 0.48,
        zIndex: 10 - distance,
      }}
      transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group absolute inset-y-0 left-1/2 w-[84vw] touch-pan-y select-none overflow-hidden rounded-[1.5rem] bg-zinc-900 p-5 text-white shadow-2xl shadow-black/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 sm:w-[78vw] sm:rounded-[1.75rem] sm:p-8 lg:w-[76vw] lg:p-9 ${distance > 1 ? "pointer-events-none" : active ? "cursor-grab" : "cursor-pointer"}`}
    >
      <Image src={item.mobileImage} alt={`Prévia mobile do projeto ${item.title}`} fill sizes="78vw" className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105 sm:hidden" />
      <Image src={item.image} alt={`Prévia do projeto ${item.title}`} fill sizes="(min-width: 1024px) 70vw, 72vw" className="hidden object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105 sm:block" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/35" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-end">{active && <span className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 text-xs font-semibold uppercase backdrop-blur-md">Ver projeto <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>}</div>
        <div><p className="text-xs text-zinc-300 sm:text-sm">0{index + 1} · {item.segment}</p><h3 className="mt-2 max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">{item.title}</h3></div>
      </div>
    </motion.a>
  );
}
