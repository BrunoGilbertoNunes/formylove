import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type FloatHeart = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
};

function buildHearts(count: number): FloatHeart[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 8 + Math.random() * 8,
    size: 8 + Math.random() * 18,
    opacity: 0.15 + Math.random() * 0.3,
  }));
}

export function FinalMessage() {
  const reduced = usePrefersReducedMotion();
  const hearts = useMemo(() => buildHearts(16), []);
  const [active, setActive] = useState(true);

  useEffect(() => {
    // Show hearts for a while after mount, then stop to keep it subtle.
    const t = window.setTimeout(() => setActive(false), 6000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
      aria-label="Mensagem final"
    >
      {/* Floating hearts */}
      {active &&
        !reduced &&
        hearts.map((h) => (
          <motion.span
            key={h.id}
            aria-hidden
            initial={{ opacity: 0, y: "20vh" }}
            animate={{ opacity: [0, h.opacity, 0], y: "-20vh" }}
            transition={{
              repeat: Infinity,
              duration: h.duration,
              delay: h.delay,
              ease: "linear",
            }}
            className="pointer-events-none absolute bottom-0"
            style={{ left: `${h.left}%` }}
          >
            <Heart
              style={{ width: h.size, height: h.size }}
              className="text-wine-500"
              fill="currentColor"
            />
          </motion.span>
        ))}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <p className="font-serif text-3xl text-cream-100 sm:text-4xl">
          1 ano <span className="text-wine-400">•</span> 11 meses
        </p>
        <p className="font-serif text-2xl text-cream-200/80 sm:text-3xl">
          e ainda é só o começo.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 mt-16 font-serif text-4xl text-wine-200 sm:text-6xl"
      >
        Eu te amo.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 mt-8 text-sm tracking-wide text-cream-200/70"
      >
        Feliz nosso aniversário
        <span className="ml-2 inline-block">
          <Heart className="h-4 w-4 text-wine-400" fill="currentColor" aria-hidden />
        </span>
      </motion.p>
    </section>
  );
}
