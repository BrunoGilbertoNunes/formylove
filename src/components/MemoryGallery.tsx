import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { memories, type Memory } from "../data/memories";
import { MemoryImage } from "./MemoryImage";
import { SectionLabel } from "./SectionLabel";
import { Lightbox } from "./Lightbox";

export function MemoryGallery() {
  const [active, setActive] = useState<Memory | null>(null);

  return (
    <section
      className="relative w-full px-6 py-28"
      aria-label="Galeria de memórias"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <SectionLabel>Memórias</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-serif text-3xl text-cream-100 sm:text-4xl"
          >
            Alguns dos meus momentos favoritos com você.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {memories.map((memory, index) => (
            <motion.figure
              key={memory.title + index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (index % 2) * 0.15 }}
              className="group overflow-hidden rounded-2xl border border-wine-800/60 bg-wine-900/30 backdrop-blur-sm"
            >
              <button
                type="button"
                onClick={() => setActive(memory)}
                aria-haspopup="dialog"
                aria-label={`Ampliar: ${memory.title}`}
                className="block w-full border-0 bg-transparent p-0 focus-visible:ring-2 focus-visible:ring-wine-400"
              >
                <div className="aspect-[4/5] w-full bg-wine-900/60">
                  <MemoryImage
                    src={memory.image}
                    alt={memory.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </button>
              {/* <figcaption className="p-6">
                <h3 className="font-serif text-xl text-cream-100">
                  {memory.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-200/70">
                  {memory.description}
                </p>
              </figcaption> */}
            </motion.figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <Lightbox
            open
            src={active.image}
            alt={active.title}
            // title={active.title}
            // description={active.description}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
