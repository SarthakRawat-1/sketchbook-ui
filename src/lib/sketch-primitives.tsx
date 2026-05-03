import { useRef, useState, useEffect } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";

export const NOISE_ID = "sk-n";
export const NOISE_FINE_ID = "sk-nf";
export const DISP_AVATAR_ID = "sk-da";
export const DISP_BADGE_ID = "sk-db";
export const DISP_DIVIDER_ID = "sk-dd";
export const DISP_SLIDER_ID = "sk-ds";
export const DISP_PROGRESS_ID = "sk-dp";

/** Place once at app root. Provides shared SVG noise filters and patterns. */
export function SketchProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <defs>
          <filter id={`${NOISE_ID}-n`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.9}
              numOctaves={4}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <pattern
            id={`${NOISE_ID}-np`}
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="100"
              height="100"
              filter={`url(#${NOISE_ID}-n)`}
              opacity="0.4"
            />
          </pattern>

          <filter id={`${NOISE_FINE_ID}-n`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.85}
              numOctaves={4}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <pattern
            id={`${NOISE_FINE_ID}-np`}
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="100"
              height="100"
              filter={`url(#${NOISE_FINE_ID}-n)`}
              opacity="0.4"
            />
          </pattern>

          <filter id={DISP_AVATAR_ID}>
            <feTurbulence
              baseFrequency={0.03}
              numOctaves={3}
              seed={4}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={1.8}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id={DISP_BADGE_ID}>
            <feTurbulence
              baseFrequency={0.03}
              numOctaves={2}
              seed={2}
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={1.5}
            />
          </filter>

          <filter id={DISP_DIVIDER_ID}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.08}
              numOctaves={2}
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={2} />
          </filter>

          <filter id={DISP_SLIDER_ID}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.8}
              numOctaves={3}
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={2} />
          </filter>

          <filter id={DISP_PROGRESS_ID}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.05}
              numOctaves={2}
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={1.5} />
          </filter>
        </defs>
      </svg>
      {children}
    </>
  );
}

/** @deprecated Use `SketchProvider` instead. */
export function SketchNoiseDefs({
  id,
  baseFrequency = 0.9,
}: {
  id: string;
  baseFrequency?: number;
}) {
  return (
    <>
      <filter id={`${id}-n`}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency={baseFrequency}
          numOctaves={4}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <pattern
        id={`${id}-np`}
        x="0"
        y="0"
        width="100"
        height="100"
        patternUnits="userSpaceOnUse"
      >
        <rect width="100" height="100" filter={`url(#${id}-n)`} opacity="0.4" />
      </pattern>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const noiseUrl = (fine = false) =>
  `url(#${fine ? NOISE_FINE_ID : NOISE_ID}-np)`;

export function SketchPaper({
  d,
  w,
  h,
  bg,
  overlay,
  overlayOpacity = 0.6,
  noiseOpacity = 0.12,
  fine = false,
}: {
  d: string;
  w: number;
  h: number;
  bg: string;
  overlay: string;
  overlayOpacity?: number | string;
  noiseOpacity?: number;
  fine?: boolean;
}) {
  return (
    <>
      <path d={d} fill={bg} stroke="none" />
      <path d={d} fill={overlay} opacity={overlayOpacity} />
      <rect
        x="0"
        y="0"
        width={w}
        height={h}
        fill={noiseUrl(fine)}
        opacity={noiseOpacity}
      />
    </>
  );
}

export function SketchBorder({
  d1,
  d2,
  stroke,
  w1 = 2.5,
  w2 = 1.5,
  o1 = 0.85,
  o2 = 0.3,
  dash = "1,0.5",
  show = true,
  style,
}: {
  d1: string;
  d2?: string;
  stroke: string;
  w1?: number;
  w2?: number;
  o1?: number;
  o2?: number;
  dash?: string;
  show?: boolean;
  style?: CSSProperties;
}) {
  if (!show) return null;
  return (
    <>
      <path
        d={d1}
        stroke={stroke}
        strokeWidth={w1}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={o1}
        strokeDasharray={dash}
        style={style}
      />
      {d2 && (
        <path
          d={d2}
          stroke={stroke}
          strokeWidth={w2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={o2}
        />
      )}
    </>
  );
}

/** Measures element size via ResizeObserver. `w`/`h` never drop below the supplied minimums. */
// eslint-disable-next-line react-refresh/only-export-components
export function useSketchSize<T extends Element = HTMLElement>(
  minW = 0,
  minH = 0,
): { ref: RefObject<T | null>; w: number; h: number } {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ w: minW, h: minH });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) => {
        const nw = Math.max(minW, Math.ceil(width));
        const nh = Math.max(minH, Math.ceil(height));
        if (nw === prev.w && nh === prev.h) return prev;
        return { w: nw, h: nh };
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [minW, minH]);

  return { ref, w: size.w, h: size.h };
}
