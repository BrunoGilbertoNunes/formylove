import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { timeline, type TimelineItem } from "../data/timeline";
import { MemoryImage } from "./MemoryImage";
import { SectionLabel } from "./SectionLabel";
import { Lightbox } from "./Lightbox";

export function Timeline() {
  const [active, setActive] = useState<TimelineItem | null>(null);

  return (
    <section
      className="relative w-full px-6 py-28"
      aria-label="Linha do tempo"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <SectionLabel>Nossa história</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-serif text-3xl text-cream-100 sm:text-4xl"
          >
            A linha do tempo da gente
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical center line */}
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-wine-700 via-wine-600 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-14 md:space-y-20">
            {timeline.map((item, index) => {
              const alternate = index % 2 === 1;
              return (
                <li
                  key={item.title + index}
                  className="relative md:grid md:grid-cols-2 md:gap-16 md:items-center"
                >
                  {/* Dot on the line */}
                  <div
                    aria-hidden
                    className="absolute left-4 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-wine-400 ring-4 ring-wine-900 md:left-1/2"
                  />

                  <div
                    className={`ml-10 md:ml-0 ${
                      alternate
                        ? "md:col-start-2 md:pl-2"
                        : "md:col-start-1 md:text-right md:pr-2"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.7 }}
                      className={`flex flex-col gap-4 ${
                        alternate ? "md:items-start" : "md:items-end"
                      }`}
                    >
                      {/* Clickable image thumbnail (no crop) */}
                      <div className={`w-full max-w-sm ${alternate ? "" : "md:ml-auto"}`}>
                        <button
                          type="button"
                          onClick={() => setActive(item)}
                          aria-haspopup="dialog"
                          aria-label={`Ampliar: ${item.title}`}
                          className="group relative block w-full overflow-hidden rounded-2xl border border-wine-800/60 bg-wine-900/40 shadow-xl shadow-black/30 transition-colors hover:border-wine-500/60 focus-visible:ring-2 focus-visible:ring-wine-400"
                        >
                          <div className="aspect-[3/5] w-full bg-wine-900/60">
                            <MemoryImage
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                          </div>
                          <span
                            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            aria-hidden
                          >
                            <span className="rounded-full bg-wine-950/70 px-4 py-2 text-xs tracking-widest text-cream-100">
                              Ampliar
                            </span>
                          </span>
                        </button>
                      </div>

                      <div
                        className={`flex flex-col gap-2 ${
                          alternate
                            ? "md:items-start"
                            : "md:items-end"
                        }`}
                      >
                        <span className="text-xs uppercase tracking-[0.25em] text-wine-400">
                          {item.date}
                        </span>
                        <h3 className="font-serif text-xl text-cream-100 sm:text-2xl">
                          {item.title}
                        </h3>
                        <p
                          className={`max-w-md text-sm leading-relaxed text-cream-200/70 ${
                            alternate ? "" : "md:text-right"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <Lightbox
            open
            src={active.image}
            alt={active.title}
            title={active.date}
            description={`${active.title} — ${active.description}`}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
