import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { Bouquet } from "./Bouquet";

type HeroProps = {
  onOpen: () => void;
};

type Particle = {
  id: number;
  left: number;
  top: number;
  targetX: number;
  targetY: number;
  size: number;
  delay: number;
  color: string;
};

const COLORS = ["#9a3a55", "#c05c5c", "#e5a9a9", "#f2cfcf"];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

/**
 * Particles spread across the whole screen, drifting outward from the
 * center while the page scrolls down.
 */
function createBurst(count: number): Particle[] {
  const angleStep = (Math.PI * 2) / count;
  return Array.from({ length: count }, (_, index) => {
    const angle = angleStep * index + Math.random() * 0.6;
    const distance = 120 + Math.random() * 240;
    return {
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      targetX: Math.cos(angle) * distance,
      targetY: Math.sin(angle) * distance,
      size: 6 + Math.random() * 12,
      delay: Math.random() * 0.5,
      color: getRandomColor(),
    };
  });
}

export function Hero({ onOpen }: HeroProps) {
  const reduced = usePrefersReducedMotion();
  const [opening, setOpening] = useState(false);
  const [showBouquet, setShowBouquet] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleOpen = () => {
    onOpen(); // start music
    setParticles(createBurst(28));
    setOpening(true);

    const delay = reduced ? 0 : 900;
    window.setTimeout(() => {
      document
        .getElementById("tempo")
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }, delay);
  };

  // After the scroll settles, reveal the bouquet over the hero.
  useEffect(() => {
    if (!opening) return;
    const t = window.setTimeout(() => setShowBouquet(true), reduced ? 0 : 1600);
    return () => window.clearTimeout(t);
  }, [opening, reduced]);

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
      aria-label="Abertura"
    >
      {/* Subtle radial glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(154,58,85,0.16), transparent 60%)",
        }}
      />

      {/* Full-screen heart burst overlay */}
      <AnimatePresence>
        {opening &&
          particles.map((p) => (
            <motion.span
              key={p.id}
              aria-hidden
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
              animate={{
                opacity: [0, 1, 0.9, 0],
                x: p.targetX,
                y: p.targetY,
                scale: 1,
                rotate: p.targetX > 0 ? 40 : -40,
              }}
              transition={{ duration: 2.6, delay: p.delay, ease: "easeOut" }}
              className="pointer-events-none fixed z-30"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                color: p.color,
              }}
            >
              <Heart style={{ width: p.size, height: p.size }} fill="currentColor" />
            </motion.span>
          ))}
      </AnimatePresence>

      {/* Bouquet revealed after opening */}
      <AnimatePresence>
        {showBouquet && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex items-end justify-center"
          >
            <Bouquet className="h-[54vh] max-h-[520px] w-auto drop-shadow-2xl sm:h-[64vh]" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={
          opening
            ? { opacity: showBouquet ? 1 : 0, y: showBouquet ? -40 : -24 }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.8 }}
        className="relative z-10 flex max-w-2xl flex-col items-center gap-8"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`font-serif text-2xl text-cream-100 transition-opacity duration-700 sm:text-3xl ${
            opening ? "opacity-100" : ""
          }`}
        >
          Para você, meu amor.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-md text-sm leading-relaxed text-cream-200/70 transition-opacity duration-700 sm:text-base"
        >
          Uma pequena surpresa para celebrar nossa história.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-x-4 text-2xl font-light tracking-wide text-wine-400"
        >
          <span className="font-serif text-3xl text-wine-300">1 ano</span>
          <span aria-hidden className="text-wine-500">•</span>
          <span className="font-serif text-3xl text-wine-300">11 meses</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: opening ? 0 : 1, y: opening ? -12 : 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={handleOpen}
          className="group mt-2 inline-flex items-center gap-3 rounded-full border border-wine-500/50 bg-wine-700/30 px-8 py-4 text-sm tracking-wide text-cream-50 transition-colors hover:border-wine-400 hover:bg-wine-700/50"
        >
          Abrir minha carta
          <Heart
            className="h-4 w-4 text-wine-300 transition-transform group-hover:scale-110 group-hover:fill-wine-400 group-hover:text-wine-400"
            aria-hidden
          />
        </motion.button>
      </motion.div>

      {/* Scroll hint */}
      {!opening && (
        <motion.div
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-wine-400"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          style={reduced ? { animation: "none" } : undefined}
        >
          <div className="h-10 w-px bg-gradient-to-b from-transparent via-wine-400 to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
