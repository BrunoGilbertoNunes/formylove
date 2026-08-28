import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { thingsILove } from "../data/letter";
import { SectionLabel } from "./SectionLabel";

export function ThingsILove() {
  return (
    <section
      className="relative w-full px-6 py-28"
      aria-label="Coisas que amo em você"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <SectionLabel>Coisas que eu amo</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-serif text-3xl text-cream-100 sm:text-4xl"
          >
            Coisas que amo em você
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {thingsILove.map((item, index) => (
            <motion.article
              key={item.title + index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
              className="group flex flex-col gap-4 rounded-2xl border border-wine-800/60 bg-wine-900/30 p-6 backdrop-blur-sm transition-colors hover:border-wine-500/60"
            >
              <Heart
                className="h-5 w-5 text-wine-400 transition-colors group-hover:text-wine-300"
                aria-hidden
              />
              <h3 className="font-serif text-lg text-cream-100">{item.title}</h3>
              <p className="text-sm leading-relaxed text-cream-200/70">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
