import React, { useId } from "react";
import { cn, SketchBorder, noiseUrl } from "../../lib";

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  variant?: "text" | "circle" | "rectangle" | "avatar";
  width?: number | string;
  height?: number | string;
  animated?: boolean;
  colors?: {
    fill?: string;
    fillAlt?: string;
    stroke?: string;
  };
}

export interface SkeletonTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /** Number of text lines. @default 3 */
  lines?: number;
  animated?: boolean;
  colors?: SkeletonProps["colors"];
}

export interface SkeletonCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  animated?: boolean;
  showAvatar?: boolean;
  colors?: SkeletonProps["colors"];
}

const VB = {
  round: { w: 80, h: 80 },
  rect: { w: 600, h: 40 },
} as const;

const DEFAULT_H: Record<string, number> = {
  text: 20,
  circle: 60,
  avatar: 60,
  rectangle: 120,
};

const CIRCLE_PATH = `M 40 8 C 25 10, 12 18, 8 30 C 6 42, 10 56, 20 65 C 30 72, 45 74, 58 70 C 68 66, 74 56, 75 44 C 76 30, 70 16, 58 10 C 50 6, 45 7, 40 8 Z`;

const RECT_PATH = `M 8 6 C 10 4.5, 15 4, 20 4 L 150 3.5 C 200 3.3, 250 3.5, 300 3.8 L 450 4.2 C 500 4.5, 550 5, 580 6 C 588 7, 594 9, 596 13 L 597 27 C 596.5 31, 593 34, 588 35 L 560 36 C 510 36.5, 460 36.8, 410 36.5 L 190 36 C 140 35.8, 90 35.5, 40 35 L 15 34.5 C 10 34, 6 32, 4 28 L 3 12 C 3.5 8.5, 5 6.5, 8 6 Z`;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      width = "100%",
      height,
      animated = true,
      colors,
      className,
      ...props
    },
    ref,
  ) => {
    const uid = useId();
    const h = height ?? DEFAULT_H[variant];
    const isRound = variant === "circle" || variant === "avatar";
    const vb = isRound ? VB.round : VB.rect;
    const wobblyPath = isRound ? CIRCLE_PATH : RECT_PATH;

    /* ── resolved colours ── */
    const fillColor = colors?.fill ?? "#e0ddd5";
    const fillAlt = colors?.fillAlt ?? "#d5d1c8";
    const strokeColor = colors?.stroke ?? "#a8a49b";

    /* ── scoped def IDs ── */
    const shimmerId = `ss${uid}`;
    const scribbleId = `st${uid}`;
    const clipId = `sc${uid}`;

    return (
      <div
        ref={ref}
        className={cn("sketch-skeleton", className)}
        style={{ width: isRound ? h : width, height: h, display: "inline-block" }}
        {...props}
      >
        <svg
          className="sketch-skeleton__svg"
          width="100%"
          height="100%"
          viewBox={`0 0 ${vb.w} ${vb.h}`}
          preserveAspectRatio={isRound ? "xMidYMid meet" : "none"}
        >
          <defs>
            {/* Animated shimmer gradient (inherently per-instance — animated stops) */}
            <linearGradient id={shimmerId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={fillColor} stopOpacity="1">
                {animated && (
                  <animate attributeName="stop-opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                )}
              </stop>
              <stop offset="50%" stopColor={fillAlt} stopOpacity="1">
                {animated && (
                  <animate attributeName="stop-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                )}
              </stop>
              <stop offset="100%" stopColor={fillColor} stopOpacity="1">
                {animated && (
                  <animate attributeName="stop-opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                )}
              </stop>
            </linearGradient>

            {/* Scribble pencil-line texture */}
            <pattern id={scribbleId} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 20 C 10 18, 20 22, 30 20 L 40 20" stroke="#c5c1b8" strokeWidth="0.5" fill="none" opacity="0.3" />
              <path d="M 0 10 C 10 8, 20 12, 30 10 L 40 10" stroke="#c5c1b8" strokeWidth="0.5" fill="none" opacity="0.2" />
              <path d="M 0 30 C 10 28, 20 32, 30 30 L 40 30" stroke="#c5c1b8" strokeWidth="0.5" fill="none" opacity="0.2" />
            </pattern>

            {/* Clip for noise overlay — confines the global noise rect to the shape */}
            <clipPath id={clipId}>
              <path d={wobblyPath} />
            </clipPath>
          </defs>

          {/* 1) Shimmer fill */}
          <path d={wobblyPath} fill={`url(#${shimmerId})`} stroke="none" />

          {/* 2) Scribble texture overlay */}
          <path d={wobblyPath} fill={`url(#${scribbleId})`} stroke="none" />

          {/* 3) Noise overlay — global noise pattern clipped to shape
               (replaces per-instance feTurbulence filter) */}
          <rect
            clipPath={`url(#${clipId})`}
            x="0"
            y="0"
            width={vb.w}
            height={vb.h}
            fill={noiseUrl()}
            opacity={0.15}
          />

          {/* 4) Avatar face doodle */}
          {variant === "avatar" && (
            <g opacity="0.3">
              <circle cx="30" cy="32" r="3" fill={strokeColor} />
              <circle cx="50" cy="32" r="3" fill={strokeColor} />
              <path
                d="M 28 45 C 32 48, 38 50, 42 48 C 46 46, 50 45, 52 45"
                stroke={strokeColor}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* 5) Border via shared primitive */}
          <SketchBorder
            d1={wobblyPath}
            d2={wobblyPath}
            stroke={strokeColor}
            w1={2}
            w2={1.5}
            o1={0.6}
            o2={0.2}
          />
        </svg>
      </div>
    );
  },
);

Skeleton.displayName = "Skeleton";

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, animated = true, colors, className, ...props }, ref) => (
    <div ref={ref} className={cn("sketch-skeleton-text", className)} {...props}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? "70%" : "100%"}
          height={16}
          animated={animated}
          colors={colors}
        />
      ))}
    </div>
  ),
);

SkeletonText.displayName = "SkeletonText";

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ animated = true, showAvatar = false, colors, className, ...props }, ref) => (
    <div ref={ref} className={cn("sketch-skeleton-card", className)} {...props}>
      {/* Image placeholder */}
      <Skeleton variant="rectangle" width="100%" height={200} animated={animated} colors={colors} />

      {/* Avatar row */}
      {showAvatar && (
        <div className="sketch-skeleton-card__avatar-row">
          <Skeleton variant="avatar" height={40} animated={animated} colors={colors} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={14} animated={animated} colors={colors} />
          </div>
        </div>
      )}

      {/* Text lines */}
      <SkeletonText lines={showAvatar ? 2 : 3} animated={animated} colors={colors} />
    </div>
  ),
);

SkeletonCard.displayName = "SkeletonCard";

export { Skeleton, SkeletonText, SkeletonCard };
