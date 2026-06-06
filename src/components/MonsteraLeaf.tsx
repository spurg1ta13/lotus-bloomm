import type { CSSProperties } from "react";
import leafAsset from "@/assets/monstera-leaf.webp.asset.json";

interface Props {
  className?: string;
  style?: CSSProperties;
  flip?: boolean;
  rotate?: number;
  opacity?: number;
  eager?: boolean;
}

/**
 * Decorative photorealistic monstera leaf used as a soft background motif.
 */
export function MonsteraLeaf({ className, style, flip, rotate = 0, opacity = 0.7, eager }: Props) {
  const transform = `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)`;
  return (
    <img
      src={leafAsset.url}
      alt=""
      aria-hidden="true"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      className={className}
      style={{ transform, opacity, ...style }}
    />
  );
}