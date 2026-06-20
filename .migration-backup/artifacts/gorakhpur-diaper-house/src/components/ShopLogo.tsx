interface ShopLogoProps {
  height?: number;
  variant?: "default" | "footer";
}

export function ShopLogo({ height = 55, variant = "default" }: ShopLogoProps) {
  const textColor = variant === "footer" ? "#FDE8ED" : "#5C3D2E";
  const curveId = `gdh-curve-${variant}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 172"
      style={{ height: `${height}px`, width: "auto" }}
      aria-label="Gorakhpur Diaper House Logo"
    >
      <defs>
        {/* Gentle upward arc for "Gorakhpur" text */}
        <path id={curveId} d="M 16,46 Q 80,2 144,46" />
      </defs>

      {/* ── "Gorakhpur" curved text ── */}
      <text
        fontSize="12.5"
        fill={textColor}
        fontFamily="Fredoka One, sans-serif"
        letterSpacing="1.8"
      >
        <textPath href={`#${curveId}`} startOffset="50%" textAnchor="middle">
          Gorakhpur
        </textPath>
      </text>

      {/* ── Baby face ── */}

      {/* Ears (rendered behind the head) */}
      <circle cx="43"  cy="83" r="11" fill="#F4A0B0" />
      <circle cx="117" cy="83" r="11" fill="#F4A0B0" />
      {/* Inner ear shading */}
      <circle cx="43"  cy="83" r="6"  fill="#E8547A" opacity="0.18" />
      <circle cx="117" cy="83" r="6"  fill="#E8547A" opacity="0.18" />

      {/* Head */}
      <circle cx="80" cy="80" r="37" fill="#F4A0B0" />

      {/* Rosy cheeks */}
      <circle cx="60" cy="90" r="11" fill="#E8547A" opacity="0.20" />
      <circle cx="100" cy="90" r="11" fill="#E8547A" opacity="0.20" />

      {/* Eyes */}
      <circle cx="67" cy="72" r="4.5" fill="#5C3D2E" />
      <circle cx="93" cy="72" r="4.5" fill="#5C3D2E" />
      {/* Eye shine */}
      <circle cx="68.8" cy="70.2" r="1.7" fill="white" />
      <circle cx="94.8" cy="70.2" r="1.7" fill="white" />

      {/* Nose */}
      <ellipse cx="80" cy="81" rx="2.8" ry="2.2" fill="#E8547A" opacity="0.50" />

      {/* Smile */}
      <path
        d="M 67,91 Q 80,105 93,91"
        fill="none"
        stroke="#5C3D2E"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* ── "Diaper" text ── */}
      {/*
        Fredoka One, size 33, anchor=middle at x=80 → approx total width ~106px
        Starts at x ≈ 80 - 53 = 27.  "D" width ≈ 22px → D center x ≈ 38
        Capital height ≈ 24px above baseline (y=136) → mid-cap y ≈ 124
      */}
      <text
        x="80"
        y="136"
        textAnchor="middle"
        fontSize="33"
        fontWeight="bold"
        fill="#F4A0B0"
        fontFamily="Fredoka One, sans-serif"
      >
        Diaper
      </text>

      {/* Heart inside the "D" — white so it reads as a cutout in the pink letter */}
      <path
        transform="translate(38,122) scale(0.72)"
        d="M0,-6 C-3.5,-11 -10,-10 -10,-5 C-10,-0.5 0,7 0,7 C0,7 10,-0.5 10,-5 C10,-10 3.5,-11 0,-6 Z"
        fill="white"
      />

      {/* ── "House" text ── */}
      <text
        x="80"
        y="160"
        textAnchor="middle"
        fontSize="21"
        fontWeight="bold"
        fill={textColor}
        fontFamily="Fredoka One, sans-serif"
      >
        House
      </text>
    </svg>
  );
}
