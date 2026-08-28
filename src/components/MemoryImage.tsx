import { useState } from "react";
import { ImageOff } from "lucide-react";

type MemoryImageProps = {
  src?: string;
  alt: string;
  className?: string;
  eager?: boolean;
};

/**
 * Renders an image with a graceful fallback when the file is missing,
 * so the site never breaks without photos.
 */
export function MemoryImage({ src, alt, className, eager }: MemoryImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} (placeholder)`}
        className={`flex items-center justify-center bg-wine-800/60 ${className ?? ""}`}
      >
        <div className="flex flex-col items-center gap-2 text-wine-400/70">
          <ImageOff className="h-8 w-8" aria-hidden />
          <span className="px-4 text-center text-xs tracking-wider">
            Sua foto aqui
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
