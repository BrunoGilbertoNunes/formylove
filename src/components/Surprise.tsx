import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

export function Surprise() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
      aria-label="Momento especial"
    >
      {/* Dimmed overlay once revealed */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute inset-0 bg-wine-950/70"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {!revealed ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8"
          >
            <SectionLabel>Um segredo</SectionLabel>
            <h2 className="font-serif text-3xl text-cream-100 sm:text-4xl">
              Ainda não acabou...
            </h2>
            <motion.button
              onClick={() => setRevealed(true)}
              className="group inline-flex items-center gap-3 rounded-full border border-wine-500/50 bg-wine-700/30 px-8 py-4 text-sm tracking-wide text-cream-50 transition-colors hover:border-wine-400 hover:bg-wine-700/50"
            >
              Tem mais uma coisa
              <Heart
                className="h-4 w-4 text-wine-300 transition-transform group-hover:scale-110"
                aria-hidden
              />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-2xl text-cream-100 sm:text-3xl"
            >
              Se eu pudesse escolher novamente...
            </motion.p>
            <motion.p
              initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 1.1 }}
              className="font-serif text-4xl text-wine-300 sm:text-6xl"
            >
              Eu escolheria você.
            </motion.p>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 2.2 }}
            >
              <Heart
                className="h-8 w-8 text-wine-400"
                fill="currentColor"
                aria-hidden
              />
            </motion.span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
