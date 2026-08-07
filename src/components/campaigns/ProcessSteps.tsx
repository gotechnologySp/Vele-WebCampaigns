"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { movementContent } from "@/config/campaigns";

const descriptions = [
  "Mapeamos a oferta, o perfil do cliente ideal, suas objeções e a ação comercial que o site precisa gerar.",
  "Organizamos palavras-chave, intenção de busca, argumentos de venda e CTAs em uma jornada orientada à conversão.",
  "Desenhamos hierarquia, provas de confiança e pontos de decisão para conduzir o visitante até o contato.",
  "Construímos páginas rápidas com SEO técnico, dados estruturados, formulários e eventos de conversão mensuráveis.",
  "Revisamos indexação, analytics e canais de contato para entregar oportunidades rastreáveis ao time comercial.",
] as const;

export function ProcessSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef(0);
  const wheelLockedRef = useRef(false);
  const scrollAnimationRef = useRef<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (wheelLockedRef.current) return;
    const nextStep = Math.min(
      movementContent.process.length - 1,
      Math.floor(progress * movementContent.process.length),
    );
    activeStepRef.current = nextStep;
    setActiveStep((current) => (current === nextStep ? current : nextStep));
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let unlockTimer = 0;

    const scrollToPosition = (destination: number) => {
      const start = window.scrollY;
      const distance = destination - start;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reduceMotion ? 0 : 560;
      const startedAt = performance.now();
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;

      document.documentElement.style.scrollBehavior = "auto";

      const finish = () => {
        window.scrollTo(0, destination);
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        scrollAnimationRef.current = null;
        unlockTimer = window.setTimeout(() => {
          wheelLockedRef.current = false;
        }, 140);
      };

      if (duration === 0) {
        finish();
        return;
      }

      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, start + distance * eased);
        if (progress < 1) scrollAnimationRef.current = requestAnimationFrame(animate);
        else finish();
      };

      scrollAnimationRef.current = requestAnimationFrame(animate);
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 4) return;

      const bounds = section.getBoundingClientRect();
      const sectionIsLocked = bounds.top <= 1 && bounds.bottom >= window.innerHeight - 1;
      if (!sectionIsLocked) return;

      event.preventDefault();
      if (wheelLockedRef.current) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentStep = activeStepRef.current;
      const nextStep = currentStep + direction;
      const sectionTop = window.scrollY + bounds.top;
      const scrollRange = section.offsetHeight - window.innerHeight;

      wheelLockedRef.current = true;

      if (nextStep >= movementContent.process.length) {
        scrollToPosition(sectionTop + scrollRange + 2);
      } else if (nextStep < 0) {
        scrollToPosition(Math.max(0, sectionTop - 1));
      } else {
        activeStepRef.current = nextStep;
        setActiveStep(nextStep);
        const stepProgress = (nextStep + 0.08) / movementContent.process.length;
        scrollToPosition(sectionTop + scrollRange * stepProgress);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.clearTimeout(unlockTimer);
      if (scrollAnimationRef.current !== null) cancelAnimationFrame(scrollAnimationRef.current);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[160svh] bg-zinc-950 md:h-[200svh]">
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden py-24">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(255,191,0,0.11),transparent_35%)]" />
        <Container className="relative pr-12 sm:pr-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-amber-400 uppercase">Como fazemos</p>
          </div>

          <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2 sm:right-10" aria-label={`Etapa ${activeStep + 1} de ${movementContent.process.length}`}>
            {movementContent.process.map((step, index) => (
              <span key={step} className={`w-1.5 rounded-full transition-all duration-500 ${index === activeStep ? "h-10 bg-amber-400" : index < activeStep ? "h-5 bg-amber-400/50" : "h-5 bg-zinc-700"}`} />
            ))}
          </div>

          <div className="relative mt-4 min-h-60 sm:mt-5 sm:min-h-72">
            <AnimatePresence initial={false}>
              <motion.div
                key={activeStep}
                initial={reduce ? false : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -32 }}
                transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col justify-start pt-3"
              >
                <p className="font-mono text-sm text-amber-400">0{activeStep + 1} / 0{movementContent.process.length}</p>
                <h3 className="mt-3 text-[clamp(3.2rem,9vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
                  {movementContent.process[activeStep]}
                </h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300 sm:text-xl">
                  {descriptions[activeStep]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </div>
  );
}
