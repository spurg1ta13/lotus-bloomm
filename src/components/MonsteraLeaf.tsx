import type { CSSProperties } from "react";
import leafImg from "@/assets/monstera-leaf.png";

interface Props {
  className?: string;
  style?: CSSProperties;
  flip?: boolean;
  rotate?: number;
  opacity?: number;
}

/**
 * Decorative photorealistic monstera leaf used as a soft background motif.
 */
export function MonsteraLeaf({ className, style, flip, rotate = 0, opacity = 0.7 }: Props) {
  const transform = `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)`;
  return (
    <img
      src={leafImg}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={className}
      style={{ transform, opacity, ...style }}
    />
  );
}