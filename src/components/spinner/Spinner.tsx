import React from "react";
import { cn, SK, SK_DISABLED } from "../../lib";


export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: "circle" | "spiral" | "hourglass" | "dots";
  size?: "sm" | "md" | "lg";
  colors?: { stroke?: string };
  label?: string;
  speed?: number;
  disabled?: boolean;
}

const SIZES = { sm: 24, md: 36, lg: 48 } as const;
const SW = { sm: 2.2, md: 2.5, lg: 3 } as const;

/*
 * Every SVG path uses a 0 0 40 40 viewBox.
 * Slight wobble on control-point coordinates gives the hand-drawn feel.
 */

/* ── Circle : ≈270° wobbly arc + ghost track ─────────────────────────── */

/** 3/4‑circle arc */
const CIRCLE_ARC =
  "M 20 4.5 C 29.2 3.5, 36.8 11.5, 36 20.8" +
  " C 36.5 29, 28.5 36.8, 20.3 36" +
  " C 11.5 36.5, 3.5 28.5, 4.2 20";

/** Full wobbly circle drawn lightly behind the arc */
const CIRCLE_TRACK =
  "M 20 4.5 C 29.2 3.5, 36.8 11.5, 36 20.8" +
  " C 36.5 29, 28.5 36.8, 20.3 36" +
  " C 11.5 36.5, 3.5 28.5, 4.2 20" +
  " C 3.8 11, 11.5 3.8, 20 4.5";

/* ── Spiral : expanding doodle drawn from center ─────────────────────── */

const SPIRAL_PATH =
  "M 20 20 C 22.5 17, 26.5 16.5, 27.5 19.5" +
  " C 28.5 22.5, 27 26.5, 24 27.5" +
  " C 21 28.5, 16.5 27, 15.5 23.5" +
  " C 14.5 20, 14 15.5, 17.5 13" +
  " C 21 10.5, 27.5 10, 31 14.5" +
  " C 34.5 19, 33.5 27, 29.5 31" +
  " C 25.5 35, 16 35.5, 11.5 30.5" +
  " C 7 25.5, 7.5 16, 13 11.5";

/* ── Hourglass : two wobbly triangles + sand ─────────────────────────── */

const HG_OUTLINE =
  "M 10.5 6.5 L 29.5 6 L 20.5 19.5 L 29.5 34 L 10 34.5 L 19.5 20.5 Z";
const HG_SAND_TOP = "M 15.5 10 L 24.5 10 L 21.5 15.5 L 18.5 15.5 Z";
const HG_SAND_BOT = "M 15 30.5 L 25 30.5 L 22 26 L 18 26 Z";
const HG_STREAM = "M 20 20 L 20 25.5";

/* ── Dots : three wobbly filled circles ──────────────────────────────── */

function wobbleDot(cx: number, cy: number, r: number, seed: number): string {
  const n = 8;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n;
    const w = 0.6 * Math.sin(seed * 7.3 + i * 3.7);
    pts.push([cx + (r + w) * Math.cos(a), cy + (r + w) * Math.sin(a)]);
  }
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i <= n; i++) {
    const prev = pts[(i - 1) % n];
    const curr = pts[i % n];
    const qx = (prev[0] + curr[0]) / 2 + Math.sin(seed + i) * 0.4;
    const qy = (prev[1] + curr[1]) / 2 + Math.cos(seed + i) * 0.4;
    d += ` Q ${qx.toFixed(1)} ${qy.toFixed(1)}, ${curr[0].toFixed(1)} ${curr[1].toFixed(1)}`;
  }
  return d + " Z";
}

const DOTS = [
  wobbleDot(9, 20, 4, 1),
  wobbleDot(20, 20, 4.2, 2),
  wobbleDot(31, 20, 3.8, 3),
];

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      variant = "circle",
      size = "md",
      colors,
      label = "Loading",
      speed = 1,
      disabled = false,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const sk = disabled ? SK_DISABLED : SK;
    const stroke = colors?.stroke ?? sk.stroke;
    const dim = SIZES[size];
    const sw = SW[size];

    /** Convert a base duration (ms) through the speed multiplier. */
    const ms = (base: number) => `${Math.round(base / speed)}ms`;

    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(
          "sketch-spinner",
          `sketch-spinner--${variant}`,
          className,
        )}
        style={{ width: dim, height: dim, ...style }}
        {...props}
      >
        {/* ── Circle ─────────────────────────────────────────────── */}
        {variant === "circle" && (
          <svg
            className="sketch-spinner__svg"
            viewBox="0 0 40 40"
            width={dim}
            height={dim}
            aria-hidden="true"
            style={{ animationDuration: ms(1000) }}
          >
            {/* ghost track */}
            <path
              d={CIRCLE_TRACK}
              stroke={stroke}
              strokeWidth={sw * 0.4}
              fill="none"
              strokeLinecap="round"
              strokeDasharray="3 5"
              opacity={0.15}
            />
            {/* main arc */}
            <path
              d={CIRCLE_ARC}
              stroke={stroke}
              strokeWidth={sw}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.85}
            />
          </svg>
        )}

        {/* ── Spiral ─────────────────────────────────────────────── */}
        {variant === "spiral" && (
          <svg
            className="sketch-spinner__svg sketch-spinner__svg--spiral"
            viewBox="0 0 40 40"
            width={dim}
            height={dim}
            aria-hidden="true"
            style={{ animationDuration: ms(3000) }}
          >
            <path
              d={SPIRAL_PATH}
              stroke={stroke}
              strokeWidth={sw * 0.8}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.75}
              className="sketch-spinner__spiral-stroke"
              style={{ animationDuration: ms(1500) }}
            />
          </svg>
        )}

        {/* ── Hourglass ──────────────────────────────────────────── */}
        {variant === "hourglass" && (
          <svg
            className="sketch-spinner__svg sketch-spinner__svg--hourglass"
            viewBox="0 0 40 40"
            width={dim}
            height={dim}
            aria-hidden="true"
            style={{ animationDuration: ms(2000) }}
          >
            <path
              d={HG_OUTLINE}
              stroke={stroke}
              strokeWidth={sw}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.85}
            />
            <path d={HG_SAND_TOP} fill={stroke} opacity={0.25} />
            <path d={HG_SAND_BOT} fill={stroke} opacity={0.2} />
            <path
              d={HG_STREAM}
              stroke={stroke}
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.35}
              strokeDasharray="2 3"
              className="sketch-spinner__sand"
            />
          </svg>
        )}

        {/* ── Dots ───────────────────────────────────────────────── */}
        {variant === "dots" && (
          <svg
            className="sketch-spinner__svg"
            viewBox="0 0 40 40"
            width={dim}
            height={dim}
            aria-hidden="true"
          >
            {DOTS.map((d, i) => (
              <path
                key={i}
                d={d}
                fill={stroke}
                opacity={0.7}
                className="sketch-spinner__dot"
                style={{
                  animationDuration: ms(1400),
                  animationDelay: `${Math.round((i * 1400) / (speed * 3.5))}ms`,
                }}
              />
            ))}
          </svg>
        )}
      </div>
    );
  },
);

Spinner.displayName = "Spinner";
export { Spinner };
