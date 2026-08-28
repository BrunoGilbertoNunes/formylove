import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getRelationshipDuration,
  type RelationshipDuration,
} from "../utils/relationship";
import { relationship } from "../config/relationship";

const units: { key: keyof RelationshipDuration; label: string }[] = [
  { key: "years", label: "anos" },
  { key: "months", label: "meses" },
  { key: "days", label: "dias" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "minutos" },
];

export function RelationshipCounter() {
  const [duration, setDuration] = useState(() =>
    getRelationshipDuration(relationship.startDate)
  );

  useEffect(() => {
    const id = window.setInterval(
      () => setDuration(getRelationshipDuration(relationship.startDate)),
      30_000
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24"
      aria-label="Tempo juntos"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mb-14 font-serif text-3xl text-cream-100 sm:text-4xl"
      >
        Tempo juntos
      </motion.p>

      <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
        {units.map((unit, index) => (
          <motion.div
            key={unit.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="flex flex-col items-center rounded-2xl border border-wine-800/60 bg-wine-900/30 px-4 py-10 backdrop-blur-sm"
          >
            <span className="font-serif text-4xl text-wine-200 sm:text-5xl">
              {duration[unit.key]}
            </span>
            <span className="mt-3 text-xs uppercase tracking-[0.25em] text-wine-400">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-12 text-sm text-cream-200/60"
      >
        {duration.totalDays > 0
          ? `E continua crescendo a cada segundo.`
          : "Configure a data de início para começar a contar."}
      </motion.p>
    </section>
  );
}
