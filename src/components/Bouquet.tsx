/**
 * A hand-drawn elegant bouquet: overlapping rose/peony blossoms, wrapping,
 * stems and a ribbon — all SVG/CSS, no external images.
 */
export function Bouquet({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none inline-block ${className ?? ""}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 200 260"
        className="h-full w-auto"
        style={{
          filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.45))",
        }}
      >
        {/* Stems */}
        <g stroke="#4a6b3a" strokeWidth="4" strokeLinecap="round">
          <path d="M100 190 C 96 160, 98 150, 92 130" />
          <path d="M100 190 C 104 155, 108 148, 116 128" />
          <path d="M100 190 C 100 165, 100 158, 100 140" />
        </g>
        {/* Leaves */}
        <g fill="#5a7d42">
          <path d="M94 158 C 80 150, 74 138, 78 128 C 88 130, 92 142, 94 158 Z" />
          <path d="M112 152 C 122 146, 130 136, 128 126 C 118 128, 112 140, 112 152 Z" />
        </g>

        {/* Wrapping paper */}
        <path
          d="M82 120 C 74 150, 70 172, 76 190 L 124 190 C 130 172, 126 150, 118 120 Z"
          fill="url(#wrapGrad)"
        />
        <path d="M100 128 L 84 190 M100 140 L 100 190 M100 128 L 116 190" stroke="#00000022" strokeWidth="1" />

        {/* Blossoms */}
        <g>
          {/* Back bloom */}
          <circle cx="118" cy="92" r="26" fill="#9a3a55" />
          <path
            d="M118 92 m-24 0 a24 24 0 0 0 8 -18 a24 24 0 0 0 16 18 a24 24 0 0 0 8 -18 Z"
            fill="#7a2a44"
          />
        </g>
        <g>
          {/* Middle bloom */}
          <circle cx="88" cy="100" r="22" fill="#c05c5c" />
          <path
            d="M88 100 m-20 0 a20 20 0 0 0 7 -15 a20 20 0 0 0 13 15 a20 20 0 0 0 7 -15 Z"
            fill="#a0455a"
          />
        </g>
        <g>
          {/* Front bloom */}
          <circle cx="100" cy="80" r="24" fill="#e5a9a9" />
          <path
            d="M100 80 m-22 0 a22 22 0 0 0 7 -16 a22 22 0 0 0 15 16 a22 22 0 0 0 7 -16 Z"
            fill="#d68080"
          />
        </g>
        {/* Center tips */}
        <g fill="#f2cfcf">
          <circle cx="100" cy="78" r="3" />
          <circle cx="88" cy="99" r="3" />
          <circle cx="118" cy="90" r="3" />
        </g>

        {/* Ribbon / bow */}
        <g fill="#c05c5c">
          <circle cx="100" cy="118" r="9" />
          <path d="M100 118 L 72 100 a18 14 0 1 0 0 22 Z" />
          <path d="M100 118 L 128 96 a18 14 0 1 0 0 22 Z" />
          <path d="M96 122 L 78 140 M104 122 L 122 140" stroke="#c05c5c" strokeWidth="6" strokeLinecap="round" />
        </g>

        <defs>
          <linearGradient id="wrapGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e5a9a9" />
            <stop offset="0.5" stopColor="#f2cfcf" />
            <stop offset="1" stopColor="#e5a9a9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
