import { motion } from "framer-motion";
import { relationship } from "../config/relationship";
import { getRelationshipDuration } from "../utils/relationship";

export function Introduction() {
  const totalDays = getRelationshipDuration(relationship.startDate).totalDays;
  const daysLabel = totalDays.toLocaleString("pt-BR");

  return (
    <section
      className="relative flex min-h-[70vh] w-full flex-col items-center justify-center px-6 py-28 text-center"
      aria-label="Introdução"
    >
      <motion.p
        initial={{ opacity: 0, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="font-serif text-3xl leading-snug text-cream-100 sm:text-5xl"
      >
        {daysLabel} dias podem parecer apenas um número.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="mt-10 max-w-2xl text-base leading-relaxed text-cream-200/80 sm:text-lg"
      >
        Mas para mim são {daysLabel} dias de histórias, risadas, momentos
        difíceis, abraços, conversas e memórias que eu escolheria viver
        novamente.
      </motion.p>
    </section>
  );
}
