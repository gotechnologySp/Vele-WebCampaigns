"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FinalCTA() {
  const reduce = useReducedMotion();
  return (
    <section id="contato" className="scroll-mt-28 overflow-hidden bg-black py-20 sm:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <motion.div initial={reduce ? false : { opacity: 0, x: -42 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <SectionHeading invert eyebrow="Próximo movimento" title="Seu novo site começa com uma boa conversa." text="Conte onde sua empresa está e aonde quer chegar. A Vele ajuda a transformar esse cenário em uma presença digital mais forte." />
            <SocialLinks />
            <p className="mt-7 text-sm text-zinc-300">Sem compromisso. Seus dados serão usados somente para responder a esta solicitação.</p>
          </motion.div>
          <motion.div initial={reduce ? false : { opacity: 0, x: 48, scale: 0.97 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, delay: reduce ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}>
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
