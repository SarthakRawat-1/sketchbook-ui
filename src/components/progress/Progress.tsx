import React, { useId } from "react";
import {
  cn,
  SketchPaper,
  SketchBorder,
  useSketchSize,
  SK,
  SK_DISABLED,
  DISP_PROGRESS_ID,
} from "../../lib";

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "solid" | "hatching" | "crosshatch" | "dots" | "scribble";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  disabled?: boolean;
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    label?: string;
    fill?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
    labelSize?: string;
  };
  showBorder?: boolean;
}

const SIZE_CONFIG = {
  sm: { minW: 200, minH: 32, fontSize: "1.1rem", labelSize: "1.15rem" },
  md: { minW: 280, minH: 40, fontSize: "1.3rem", labelSize: "1.4rem" },
  lg: { minW: 360, minH: 52, fontSize: "1.5rem", labelSize: "1.6rem" },
} as const;

function getScribblePattern(): string {
  let p = "";
  const n = 8;
  const sp = 30 / n;
  for (let i = 0; i < n; i++) {
    const y = 5 + i * sp + Math.sin(i) * 2;
    p += `M 0 ${y} C 10 ${y + Math.sin(i) * 1.5}, 20 ${y - Math.cos(i) * 1.5}, 30 ${y} `;
    p += `C 40 ${y + Math.sin(i + 1) * 1.5}, 50 ${y - Math.cos(i + 1) * 1.5}, 60 ${y} `;
    p += `C 70 ${y + Math.sin(i + 2) * 1.5}, 80 ${y - Math.cos(i + 2) * 1.5}, 90 ${y} L 100 ${y} `;
  }
  return p;
}

function getHatchingPattern(): string {
  let p = "";
  for (let i = -10; i < 110; i += 8) p += `M ${i} 0 L ${i + 30} 30 `;
  return p;
}

function getCrosshatchPattern(): string {
  let p = "";
  for (let i = -10; i < 110; i += 10) p += `M ${i} 0 L ${i + 30} 30 `;
  for (let i = -10; i < 110; i += 10) p += `M ${i} 30 L ${i + 30} 0 `;
  return p;
}

function getDotsPattern(): string {
  let p = "";
  for (let x = 5; x < 100; x += 12) {
    for (let y = 5; y < 30; y += 12) {
      const seed = x * 7 + y * 13;
      const r = 2 + (Math.sin(seed) * 0.5 + 0.5) * 1.5;
      const wx = x + Math.sin(seed * 1.7);
      const wy = y + Math.cos(seed * 2.3);
      p += `M ${wx - r} ${wy} C ${wx - r} ${wy - r}, ${wx + r} ${wy - r}, ${wx + r} ${wy} `;
      p += `C ${wx + r} ${wy + r}, ${wx - r} ${wy + r}, ${wx - r} ${wy} Z `;
    }
  }
  return p;
}

const FILL_PATTERNS: Record<string, string | null> = {
  solid: null,
  scribble: getScribblePattern(),
  hatching: getHatchingPattern(),
  crosshatch: getCrosshatchPattern(),
  dots: getDotsPattern(),
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      label,
      showPercentage = true,
      variant = "scribble",
      size = "md",
      animated = true,
      disabled,
      colors,
      typography,
      showBorder = true,
      className,
      ...props
    },
    ref,
  ) => {
    const uid = useId();
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const sc = SIZE_CONFIG[size];

    /* responsive width, fixed height (avoids infinite-growth loop) */
    const { ref: containerRef, w } = useSketchSize<HTMLDivElement>(sc.minW, sc.minH);
    const h = sc.minH;

    /* ── resolved colours ── */
    const c = disabled
      ? {
        bg: SK_DISABLED.bg,
        bgOverlay: SK_DISABLED.bgOverlay,
        stroke: SK_DISABLED.stroke,
        text: SK_DISABLED.text,
        label: SK_DISABLED.text,
        fill: colors?.fill ?? SK_DISABLED.stroke,
      }
      : {
        bg: colors?.bg ?? SK.bg,
        bgOverlay: colors?.bgOverlay ?? SK.bgOverlay,
        stroke: colors?.stroke ?? SK.stroke,
        text: colors?.text ?? SK.text,
        label: colors?.label ?? SK.text,
        fill: colors?.fill ?? SK.stroke,
      };

    const font = typography?.fontFamily ?? SK.font;
    const fillPattern = FILL_PATTERNS[variant] ?? null;

    /* ── proportional SVG paths (600×40 reference → w×h) ── */
    const bgPath = `M ${w * 0.0133} ${h * 0.15}
      C ${w * 0.02} ${h * 0.1}, ${w * 0.0333} ${h * 0.075}, ${w * 0.05} ${h * 0.075}
      L ${w * 0.3333} ${h * 0.0625}
      C ${w * 0.5} ${h * 0.0575}, ${w * 0.6667} ${h * 0.0625}, ${w * 0.8333} ${h * 0.07}
      L ${w * 0.95} ${h * 0.08}
      C ${w * 0.97} ${h * 0.0875}, ${w * 0.9867} ${h * 0.1125}, ${w * 0.9933} ${h * 0.2}
      L ${w * 0.995} ${h * 0.8}
      C ${w * 0.9933} ${h * 0.9}, ${w * 0.9833} ${h * 0.95}, ${w * 0.9667} ${h * 0.9625}
      L ${w * 0.8333} ${h * 0.97}
      C ${w * 0.6667} ${h * 0.9625}, ${w * 0.5} ${h * 0.97}, ${w * 0.3333} ${h * 0.9625}
      L ${w * 0.05} ${h * 0.9375}
      C ${w * 0.0333} ${h * 0.925}, ${w * 0.02} ${h * 0.9}, ${w * 0.0133} ${h * 0.85}
      L ${w * 0.0067} ${h * 0.25}
      C ${w * 0.0067} ${h * 0.175}, ${w * 0.0092} ${h * 0.1625}, ${w * 0.0133} ${h * 0.15} Z`;

    const bd1 = `M ${w * 0.0142} ${h * 0.1625}
      C ${w * 0.0208} ${h * 0.1125}, ${w * 0.0342} ${h * 0.0875}, ${w * 0.0508} ${h * 0.0875}
      L ${w * 0.3342} ${h * 0.075}
      C ${w * 0.5008} ${h * 0.07}, ${w * 0.6675} ${h * 0.075}, ${w * 0.8342} ${h * 0.0825}
      L ${w * 0.9508} ${h * 0.0925}
      C ${w * 0.9708} ${h * 0.1}, ${w * 0.9875} ${h * 0.125}, ${w * 0.9942} ${h * 0.2125}
      L ${w * 0.9958} ${h * 0.8125}
      C ${w * 0.9942} ${h * 0.9125}, ${w * 0.9842} ${h * 0.9625}, ${w * 0.9675} ${h * 0.975}
      L ${w * 0.8342} ${h * 0.9825}
      C ${w * 0.6675} ${h * 0.975}, ${w * 0.5008} ${h * 0.9825}, ${w * 0.3342} ${h * 0.975}
      L ${w * 0.0508} ${h * 0.95}
      C ${w * 0.0342} ${h * 0.9375}, ${w * 0.0208} ${h * 0.9125}, ${w * 0.0142} ${h * 0.8625}
      L ${w * 0.0075} ${h * 0.2625}
      C ${w * 0.0075} ${h * 0.1875}, ${w * 0.01} ${h * 0.175}, ${w * 0.0142} ${h * 0.1625} Z`;

    const bd2 = `M ${w * 0.015} ${h * 0.175}
      C ${w * 0.0217} ${h * 0.125}, ${w * 0.035} ${h * 0.1}, ${w * 0.0517} ${h * 0.1}
      L ${w * 0.335} ${h * 0.0875}
      C ${w * 0.5017} ${h * 0.0825}, ${w * 0.6683} ${h * 0.0875}, ${w * 0.835} ${h * 0.095}
      L ${w * 0.9517} ${h * 0.105}
      C ${w * 0.9717} ${h * 0.1125}, ${w * 0.9883} ${h * 0.1375}, ${w * 0.995} ${h * 0.225}
      L ${w * 0.9967} ${h * 0.825}
      C ${w * 0.995} ${h * 0.925}, ${w * 0.985} ${h * 0.975}, ${w * 0.9683} ${h * 0.9875}
      L ${w * 0.835} ${h * 0.995}
      C ${w * 0.6683} ${h * 0.9875}, ${w * 0.5017} ${h * 0.995}, ${w * 0.335} ${h * 0.9875}
      L ${w * 0.0517} ${h * 0.9625}
      C ${w * 0.035} ${h * 0.95}, ${w * 0.0217} ${h * 0.925}, ${w * 0.015} ${h * 0.875}
      L ${w * 0.0083} ${h * 0.275}
      C ${w * 0.0083} ${h * 0.2}, ${w * 0.0108} ${h * 0.1875}, ${w * 0.015} ${h * 0.175} Z`;

    /* local def IDs (not worth adding to global provider) */
    const fillPatternId = `fp${uid}`;
    const clipId = `pc${uid}`;

    return (
      <div
        ref={ref}
        className={cn("sketch-progress", className)}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `Progress: ${Math.round(percentage)}%`}
        {...props}
      >
        {/* ── Header: label + percentage ── */}
        {(label || showPercentage) && (
          <div className="sketch-progress__header">
            {label && (
              <span
                className="sketch-progress__label"
                style={{
                  fontFamily: font,
                  fontSize: typography?.labelSize ?? sc.labelSize,
                  fontWeight: typography?.fontWeight ?? 500,
                  color: c.label,
                }}
              >
                {label}
              </span>
            )}
            {showPercentage && (
              <span
                className="sketch-progress__pct"
                style={{
                  fontFamily: font,
                  fontSize: typography?.fontSize ?? sc.fontSize,
                  fontWeight: typography?.fontWeight ?? 500,
                  color: disabled ? SK_DISABLED.text : "#666",
                }}
              >
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        {/* ── Bar ── */}
        <div
          ref={containerRef}
          className="sketch-progress__bar"
          style={{ height: h }}
        >
          <svg
            className="sketch-progress__svg"
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
          >
            <defs>
              {/* pattern def for non-solid variants */}
              {fillPattern && (
                <pattern
                  id={fillPatternId}
                  x="0"
                  y="0"
                  width="100"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d={fillPattern}
                    stroke={c.fill}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill={variant === "dots" ? c.fill : "none"}
                    opacity="0.8"
                  />
                </pattern>
              )}

              {/* clip path — percentage of the bar */}
              <clipPath id={clipId}>
                <rect
                  x="0"
                  y="0"
                  height={h}
                  width={w * percentage / 100}
                  style={{
                    transition: animated
                      ? "width 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                      : "none",
                  }}
                />
              </clipPath>
            </defs>

            {/* Paper background via shared primitive */}
            <SketchPaper
              d={bgPath}
              w={w}
              h={h}
              bg={c.bg}
              overlay={c.bgOverlay}
            />

            {/* ── Solid fill variant — layered rects with displacement ── */}
            {variant === "solid" && (
              <g clipPath={`url(#${clipId})`}>
                <rect
                  x={w * 0.013}
                  y={h * 0.15}
                  width={w * 0.98}
                  height={h * 0.7}
                  fill={c.fill}
                  opacity="0.15"
                  filter={`url(#${DISP_PROGRESS_ID})`}
                />
                <rect
                  x={w * 0.013}
                  y={h * 0.15}
                  width={w * 0.98}
                  height={h * 0.7}
                  fill={c.fill}
                  opacity="0.12"
                  filter={`url(#${DISP_PROGRESS_ID})`}
                  transform="translate(1, 0.5)"
                />
                <rect
                  x={w * 0.013}
                  y={h * 0.15}
                  width={w * 0.98}
                  height={h * 0.7}
                  fill={c.fill}
                  opacity="0.1"
                  filter={`url(#${DISP_PROGRESS_ID})`}
                  transform="translate(-0.5, 1)"
                />
              </g>
            )}

            {/* ── Pattern fill variants (scribble / hatching / crosshatch / dots) ── */}
            {variant !== "solid" && fillPattern && (
              <g clipPath={`url(#${clipId})`}>
                <rect
                  x={w * 0.013}
                  y={h * 0.125}
                  width={w * 0.98}
                  height={h * 0.75}
                  fill={`url(#${fillPatternId})`}
                />
              </g>
            )}

            {/* Border via shared primitive */}
            <SketchBorder
              d1={bd1}
              d2={bd2}
              stroke={c.stroke}
              w1={2}
              w2={1.5}
              show={showBorder}
            />
          </svg>
        </div>
      </div>
    );
  },
);

Progress.displayName = "Progress";

export { Progress };
