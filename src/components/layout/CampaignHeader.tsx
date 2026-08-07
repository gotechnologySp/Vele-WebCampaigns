"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { type MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState } from "react";

const allNavigation = [
  { id: "inicio", label: "Início" },
  { id: "case", label: "Case" },
  { id: "processo", label: "Processo" },
  { id: "projetos", label: "Projetos" },
  { id: "diferenciais", label: "Por que a Vele" },
  { id: "contato", label: "Contato" },
] as const;

const primaryNavigation = [
  { id: "inicio", label: "Início" },
  { id: "projetos", label: "Projeto" },
  { id: "contato", label: "Contato" },
] as const;

export function CampaignHeader() {
  const reduce = useReducedMotion();
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationRef = useRef<HTMLElement>(null);
  const navigationFrameRef = useRef<number | null>(null);
  const navigationTargetRef = useRef<string | null>(null);

  const navigateToSection = useCallback((event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    if (navigationFrameRef.current !== null) cancelAnimationFrame(navigationFrameRef.current);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = window.scrollY;
    const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
    const destination = Math.max(0, start + target.getBoundingClientRect().top - scrollMargin);
    const distance = destination - start;
    const duration = reduceMotion ? 0 : Math.min(800, Math.max(420, Math.abs(distance) * 0.12));
    const startedAt = performance.now();
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;

    navigationTargetRef.current = id;
    setActiveSection(id);
    setMenuOpen(false);
    document.documentElement.style.scrollBehavior = "auto";

    const finish = () => {
      window.scrollTo(0, destination);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      navigationTargetRef.current = null;
      navigationFrameRef.current = null;
      window.history.replaceState(null, "", `#${id}`);
    };

    if (duration === 0 || Math.abs(distance) < 2) {
      finish();
      return;
    }

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      window.scrollTo(0, start + distance * eased);

      if (progress < 1) navigationFrameRef.current = requestAnimationFrame(animate);
      else finish();
    };

    navigationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const sections = allNavigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;

    const updateActiveSection = () => {
      if (navigationTargetRef.current) return;
      const readingLine = window.innerHeight * 0.32;
      const sectionAtReadingLine = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      });
      const nearestSection = sections.reduce<HTMLElement | undefined>(
        (nearest, section) => {
          if (!nearest) return section;
          const currentDistance = Math.abs(section.getBoundingClientRect().top - readingLine);
          const nearestDistance = Math.abs(nearest.getBoundingClientRect().top - readingLine);
          return currentDistance < nearestDistance ? section : nearest;
        },
        undefined,
      );
      const current = sectionAtReadingLine?.id ?? nearestSection?.id ?? "inicio";

      setActiveSection((previous) => (previous === current ? previous : current));
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => () => {
    if (navigationFrameRef.current !== null) cancelAnimationFrame(navigationFrameRef.current);
  }, []);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!navigationRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  const activePrimary = activeSection === "contato"
    ? "contato"
    : activeSection === "projetos" || activeSection === "diferenciais"
      ? "projetos"
      : "inicio";

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-5"
    >
      <nav ref={navigationRef} aria-label="Navegação da campanha" className="relative max-w-[calc(100vw-1.5rem)] rounded-[1.4rem] border border-white/70 bg-white/80 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl">
        <div className="flex items-center gap-0.5 md:hidden">
          {primaryNavigation.map(({ id, label }) => {
            const active = activePrimary === id;
            return (
              <a key={id} href={`#${id}`} aria-current={active ? "location" : undefined} onClick={(event) => navigateToSection(event, id)} className={`relative shrink-0 rounded-2xl px-4 py-2.5 text-center text-xs font-semibold transition-colors duration-300 sm:px-5 sm:text-sm ${active ? "text-black" : "text-zinc-600 hover:text-black"}`}>
                {active && <motion.span layoutId="campaign-navigation-active-mobile" className="absolute inset-0 rounded-2xl bg-amber-400" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative z-10">{label}</span>
              </a>
            );
          })}
          <button type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="campaign-menu" onClick={() => setMenuOpen((open) => !open)} className={`ml-0.5 inline-flex shrink-0 items-center justify-center rounded-2xl p-2.5 transition-colors ${menuOpen ? "bg-zinc-950 text-white" : "text-zinc-600 hover:bg-zinc-100 hover:text-black"}`}>
            {menuOpen ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
        <div className="hidden items-center gap-0.5 md:flex">
          {allNavigation.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <a key={id} href={`#${id}`} aria-current={active ? "location" : undefined} onClick={(event) => navigateToSection(event, id)} className={`relative shrink-0 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${active ? "text-black" : "text-zinc-600 hover:text-black"}`}>
                {active && <motion.span layoutId="campaign-navigation-active-desktop" className="absolute inset-0 rounded-2xl bg-amber-400" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative z-10">{label}</span>
              </a>
            );
          })}
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div id="campaign-menu" initial={reduce ? false : { opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.2 }} className="absolute right-0 top-[calc(100%+0.65rem)] w-56 overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl md:hidden">
              {allNavigation.map(({ id, label }) => (
                <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={(event) => navigateToSection(event, id)} className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${activeSection === id ? "bg-amber-400 text-black" : "text-zinc-700 hover:bg-zinc-100 hover:text-black"}`}>
                  {label}
                  {activeSection === id && <span className="h-1.5 w-1.5 rounded-full bg-black" aria-hidden />}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
