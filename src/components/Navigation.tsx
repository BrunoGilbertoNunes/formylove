import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const SECTIONS = [
  { id: "inicio", label: "Início" },
  { id: "tempo", label: "Tempo juntos" },
  { id: "introducao", label: "Introdução" },
  { id: "historia", label: "Nossa história" },
  { id: "memorias", label: "Memórias" },
  { id: "carta", label: "Carta" },
  { id: "coisas", label: "Coisas que amo" },
  { id: "surpresa", label: "Surpresa" },
  { id: "final", label: "Final" },
];

export function Navigation() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [showTop, setShowTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > window.innerHeight * 0.6);

      let current = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            current = i;
          }
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (index: number) => {
    const el = document.getElementById(SECTIONS[index].id);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Top progress bar */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-wine-600 via-wine-400 to-wine-300"
          style={{ scaleX: progress }}
        />
      )}

      {/* Back to top */}
      {showTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => goTo(0)}
          aria-label="Voltar ao topo"
          className="fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-wine-800/70 bg-wine-900/70 text-cream-100 shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-wine-400"
        >
          <ArrowUp className="h-4 w-4" aria-hidden />
        </motion.button>
      )}

      {/* Side dots (desktop only) */}
      <nav
        aria-label="Navegação da história"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
      >
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={s.label}
            aria-current={active === i ? "true" : undefined}
            className="group relative flex h-4 w-4 items-center justify-center"
          >
            <span
              className={`rounded-full transition-all duration-300 ${
                active === i
                  ? "h-3 w-3 bg-wine-300"
                  : "h-2 w-2 bg-wine-700 group-hover:bg-wine-500"
              }`}
            />
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-wine-800/60 bg-wine-900/90 px-2 py-1 text-xs text-cream-100 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              {s.label}
            </span>
          </button>
        ))}
      </nav>
    </>
  );
}
