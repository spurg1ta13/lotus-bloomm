import type { CSSProperties } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
  flip?: boolean;
  rotate?: number;
}

/**
 * Decorative monstera leaf. Inherits color from `currentColor`.
 * Use with low opacity / accent color as a background motif.
 */
export function MonsteraLeaf({ className, style, flip, rotate = 0 }: Props) {
  const transform = `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)`;
  return (
    <svg
      viewBox="0 0 200 260"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ transform, ...style }}
      fill="currentColor"
    >
      {/* Stem */}
      <path d="M100 258 C 100 200, 100 160, 100 120" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Leaf body */}
      <path d="M100 10
        C 150 10, 188 50, 188 110
        C 188 170, 150 215, 100 220
        C 50 215, 12 170, 12 110
        C 12 50, 50 10, 100 10 Z" opacity="0.95" />
      {/* Fenestrations (holes) — punched through with background color */}
      <g fill="var(--background)">
        <ellipse cx="60" cy="70" rx="10" ry="22" transform="rotate(-25 60 70)" />
        <ellipse cx="140" cy="70" rx="10" ry="22" transform="rotate(25 140 70)" />
        <ellipse cx="50" cy="125" rx="12" ry="30" transform="rotate(-18 50 125)" />
        <ellipse cx="150" cy="125" rx="12" ry="30" transform="rotate(18 150 125)" />
        <ellipse cx="70" cy="175" rx="10" ry="22" transform="rotate(-30 70 175)" />
        <ellipse cx="130" cy="175" rx="10" ry="22" transform="rotate(30 130 175)" />
        {/* Splits from edge */}
        <path d="M100 10 L 100 90" stroke="var(--background)" strokeWidth="3" />
        <path d="M12 110 L 70 115" stroke="var(--background)" strokeWidth="3" />
        <path d="M188 110 L 130 115" stroke="var(--background)" strokeWidth="3" />
        <path d="M30 170 L 80 165" stroke="var(--background)" strokeWidth="2.5" />
        <path d="M170 170 L 120 165" stroke="var(--background)" strokeWidth="2.5" />
      </g>
    </svg>
  );
}