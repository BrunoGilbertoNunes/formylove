import { motion } from "framer-motion";

type SectionLabelProps = {
  children: string;
};

/** Small decorative label shown above section headings. */
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="text-xs uppercase tracking-[0.3em] text-wine-400"
    >
      {children}
    </motion.span>
  );
}
