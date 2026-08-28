import { motion } from "framer-motion";
import { letter, letterTitle } from "../data/letter";
import { SectionLabel } from "./SectionLabel";

export function LoveLetter() {
  return (
    <section
      className="relative w-full px-6 py-32"
      aria-label="Carta"
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-16 text-center">
          <SectionLabel>A minha parte preferida</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-serif text-3xl text-cream-100 sm:text-4xl"
          >
            {letterTitle}
          </motion.h2>
        </div>

        {/* The letter */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-wine-800/50 bg-gradient-to-b from-wine-900/60 to-wine-950/40 p-8 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-12"
        >
          {/* Decorative top edge */}
          <div
            aria-hidden
            className="absolute top-0 left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-wine-400/70 to-transparent"
          />

          {letter.map((paragraph, index) => (
            <motion.p
              key={paragraph.text + index}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className={`${
                paragraph.signature
                  ? "mt-10 font-serif text-2xl text-wine-200"
                  : index === 0
                  ? "font-serif text-xl text-cream-100"
                  : "mb-8 text-base leading-relaxed text-cream-200/85"
              }`}
            >
              {paragraph.text}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
