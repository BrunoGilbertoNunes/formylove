import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { MemoryImage } from "./MemoryImage";

type LightboxProps = {
  open: boolean;
  src?: string;
  alt: string;
  title?: string;
  description?: string;
  onClose: () => void;
};

/**
 * Full-screen image viewer with escape/overlay close. Gracefully handles a
 * missing image via the placeholder fallback.
 */
export function Lightbox({
  open,
  src,
  alt,
  title,
  description,
  onClose,
}: LightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={title || alt}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-wine-950/90 p-4 backdrop-blur-md sm:p-10"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 z-[71] flex h-11 w-11 items-center justify-center rounded-full border border-wine-700/60 bg-wine-900/70 text-cream-100 transition-colors hover:border-wine-400 hover:text-wine-300"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          <motion.div
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex max-h-full w-full max-w-3xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl border border-wine-800/60 bg-wine-900/40 shadow-2xl">
              <MemoryImage
                src={src}
                alt={alt}
                eager
                className="max-h-[78vh] w-auto max-w-full object-contain"
              />
            </div>

            {(title || description) && (
              <div className="mt-5 w-full text-center">
                {title && (
                  <h3 className="font-serif text-xl text-cream-100">{title}</h3>
                )}
                {description && (
                  <p className="mt-2 text-sm leading-relaxed text-cream-200/70">
                    {description}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
