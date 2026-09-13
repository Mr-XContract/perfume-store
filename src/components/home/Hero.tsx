"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-charcoal)_0%,_var(--color-ink)_65%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <Container className="relative pt-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.4em] text-gold uppercase"
        >
          Colección para caballero
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-6 max-w-2xl text-balance font-serif text-5xl leading-[1.05] text-porcelain md:text-7xl"
        >
          El silencio de un aroma que se impone.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-mist"
        >
          Fragancias exclusivas, presentadas con renders cinemáticos
          generados por inteligencia artificial. Minimalismo, precisión y
          carácter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 flex gap-4"
        >
          <LinkButton href="#coleccion">Descubrir la pieza</LinkButton>
          <LinkButton href="#historia" variant="ghost">
            La Casa
          </LinkButton>
        </motion.div>
      </Container>
    </section>
  );
}
