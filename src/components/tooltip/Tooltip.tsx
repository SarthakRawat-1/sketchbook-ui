import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn, SketchPaper, SketchBorder, useSketchSize, SK } from "../../lib";

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content" | "color"> {
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  openDelay?: number;
  closeDelay?: number;
  disabled?: boolean;
  open?: boolean;
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
  };
  showBorder?: boolean;
  children: React.ReactElement;
}

/** Padding inside the bubble around the text content. */
const PAD_X = 28;
const PAD_Y = 12;
/** Minimum bubble dimensions. */
const MIN_W = 60;
const MIN_H = 36;
/** Height of the speech-bubble tail. */
const TAIL_H = 10;

/** Proportional wobbly rounded-rect background. */
function bubbleBg(w: number, h: number): string {
  return `M ${w * 0.05} ${h * 0.12}
    C ${w * 0.06} ${h * 0.06}, ${w * 0.09} ${h * 0.04}, ${w * 0.13} ${h * 0.04}
    L ${w * 0.4} ${h * 0.03}
    C ${w * 0.5} ${h * 0.025}, ${w * 0.6} ${h * 0.03}, ${w * 0.7} ${h * 0.04}
    L ${w * 0.87} ${h * 0.05}
    C ${w * 0.92} ${h * 0.06}, ${w * 0.95} ${h * 0.09}, ${w * 0.96} ${h * 0.14}
    L ${w * 0.97} ${h * 0.35}
    C ${w * 0.975} ${h * 0.5}, ${w * 0.97} ${h * 0.65}, ${w * 0.96} ${h * 0.78}
    C ${w * 0.95} ${h * 0.88}, ${w * 0.93} ${h * 0.93}, ${w * 0.88} ${h * 0.95}
    L ${w * 0.7} ${h * 0.96}
    C ${w * 0.6} ${h * 0.97}, ${w * 0.5} ${h * 0.97}, ${w * 0.4} ${h * 0.96}
    L ${w * 0.13} ${h * 0.95}
    C ${w * 0.08} ${h * 0.94}, ${w * 0.05} ${h * 0.9}, ${w * 0.04} ${h * 0.82}
    L ${w * 0.03} ${h * 0.6}
    C ${w * 0.025} ${h * 0.45}, ${w * 0.03} ${h * 0.3}, ${w * 0.04} ${h * 0.18}
    C ${w * 0.043} ${h * 0.14}, ${w * 0.046} ${h * 0.13}, ${w * 0.05} ${h * 0.12} Z`;
}

function bubbleBd1(w: number, h: number): string {
  return `M ${w * 0.052} ${h * 0.13}
    C ${w * 0.062} ${h * 0.07}, ${w * 0.092} ${h * 0.05}, ${w * 0.132} ${h * 0.05}
    L ${w * 0.402} ${h * 0.04}
    C ${w * 0.502} ${h * 0.035}, ${w * 0.602} ${h * 0.04}, ${w * 0.702} ${h * 0.05}
    L ${w * 0.872} ${h * 0.06}
    C ${w * 0.922} ${h * 0.07}, ${w * 0.952} ${h * 0.1}, ${w * 0.962} ${h * 0.15}
    L ${w * 0.972} ${h * 0.36}
    C ${w * 0.977} ${h * 0.51}, ${w * 0.972} ${h * 0.66}, ${w * 0.962} ${h * 0.79}
    C ${w * 0.952} ${h * 0.89}, ${w * 0.932} ${h * 0.94}, ${w * 0.882} ${h * 0.96}
    L ${w * 0.702} ${h * 0.97}
    C ${w * 0.602} ${h * 0.98}, ${w * 0.502} ${h * 0.98}, ${w * 0.402} ${h * 0.97}
    L ${w * 0.132} ${h * 0.96}
    C ${w * 0.082} ${h * 0.95}, ${w * 0.052} ${h * 0.91}, ${w * 0.042} ${h * 0.83}
    L ${w * 0.032} ${h * 0.61}
    C ${w * 0.027} ${h * 0.46}, ${w * 0.032} ${h * 0.31}, ${w * 0.042} ${h * 0.19}
    C ${w * 0.045} ${h * 0.15}, ${w * 0.048} ${h * 0.14}, ${w * 0.052} ${h * 0.13} Z`;
}

function bubbleBd2(w: number, h: number): string {
  return `M ${w * 0.055} ${h * 0.14}
    C ${w * 0.065} ${h * 0.08}, ${w * 0.095} ${h * 0.06}, ${w * 0.135} ${h * 0.06}
    L ${w * 0.405} ${h * 0.05}
    C ${w * 0.505} ${h * 0.045}, ${w * 0.605} ${h * 0.05}, ${w * 0.705} ${h * 0.06}
    L ${w * 0.875} ${h * 0.07}
    C ${w * 0.925} ${h * 0.08}, ${w * 0.955} ${h * 0.11}, ${w * 0.965} ${h * 0.16}
    L ${w * 0.975} ${h * 0.37}
    C ${w * 0.98} ${h * 0.52}, ${w * 0.975} ${h * 0.67}, ${w * 0.965} ${h * 0.8}
    C ${w * 0.955} ${h * 0.9}, ${w * 0.935} ${h * 0.95}, ${w * 0.885} ${h * 0.97}
    L ${w * 0.705} ${h * 0.98}
    C ${w * 0.605} ${h * 0.99}, ${w * 0.505} ${h * 0.99}, ${w * 0.405} ${h * 0.98}
    L ${w * 0.135} ${h * 0.97}
    C ${w * 0.085} ${h * 0.96}, ${w * 0.055} ${h * 0.92}, ${w * 0.045} ${h * 0.84}
    L ${w * 0.035} ${h * 0.62}
    C ${w * 0.03} ${h * 0.47}, ${w * 0.035} ${h * 0.32}, ${w * 0.045} ${h * 0.2}
    C ${w * 0.048} ${h * 0.16}, ${w * 0.051} ${h * 0.15}, ${w * 0.055} ${h * 0.14} Z`;
}

/**
 * Wobbly speech-bubble tail.
 * The base anchors are pushed well inside the bubble body so the tail's
 * fill (rendered after SketchBorder) fully covers the border stroke at
 * the junction — eliminating the visible seam.
 */
function tailPath(
  bw: number,
  bh: number,
  placement: TooltipProps["placement"],
): string {
  const cx = bw / 2;
  const cy = bh / 2;
  const t = TAIL_H;
  // base sits ~12 % inside the body so the fill covers the 2 px border stroke
  const s = t * 0.7;
  switch (placement) {
    case "top":
      return `M ${cx - 8} ${bh * 0.82} C ${cx - 4} ${bh + t * 0.2}, ${cx - 1} ${bh + t * 0.7}, ${cx + 1} ${bh + t} C ${cx + 2} ${bh + t * 0.55}, ${cx + 5} ${bh + t * 0.15}, ${cx + 8} ${bh * 0.82}`;
    case "bottom":
      return `M ${cx - 8} ${bh * 0.18} C ${cx - 4} ${-t * 0.2}, ${cx - 1} ${-t * 0.7}, ${cx + 1} ${-t} C ${cx + 2} ${-t * 0.55}, ${cx + 5} ${-t * 0.15}, ${cx + 8} ${bh * 0.18}`;
    case "left":
      return `M ${bw * 0.82} ${cy - 8} C ${bw + s * 0.2} ${cy - 4}, ${bw + s * 0.7} ${cy}, ${bw + s} ${cy + 1} C ${bw + s * 0.55} ${cy + 2}, ${bw + s * 0.15} ${cy + 5}, ${bw * 0.82} ${cy + 8}`;
    case "right":
      return `M ${bw * 0.18} ${cy - 8} C ${-s * 0.2} ${cy - 4}, ${-s * 0.7} ${cy}, ${-s} ${cy + 1} C ${-s * 0.55} ${cy + 2}, ${-s * 0.15} ${cy + 5}, ${bw * 0.18} ${cy + 8}`;
    default:
      return "";
  }
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      placement = "top",
      openDelay = 200,
      closeDelay = 100,
      disabled,
      open: controlledOpen,
      colors,
      typography,
      showBorder = true,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    /* ── visibility state ── */
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(false);
    const visible = isControlled ? controlledOpen : internalOpen;
    const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
    const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const show = useCallback(() => {
      if (disabled) return;
      clearTimeout(closeTimer.current);
      openTimer.current = setTimeout(() => setInternalOpen(true), openDelay);
    }, [disabled, openDelay]);

    const hide = useCallback(() => {
      clearTimeout(openTimer.current);
      closeTimer.current = setTimeout(() => setInternalOpen(false), closeDelay);
    }, [closeDelay]);

    useEffect(
      () => () => {
        clearTimeout(openTimer.current);
        clearTimeout(closeTimer.current);
      },
      [],
    );

    /* ── content measurement (same technique as Button) ── */
    const { ref: sizerRef, w: cw, h: ch } = useSketchSize<HTMLSpanElement>();
    const w = Math.max(MIN_W, cw + PAD_X * 2);
    const h = Math.max(MIN_H, ch + PAD_Y * 2);

    /* ── colours ── */
    const c = {
      bg: colors?.bg ?? SK.bg,
      bgOverlay: colors?.bgOverlay ?? SK.bgOverlay,
      stroke: colors?.stroke ?? SK.stroke,
      text: colors?.text ?? SK.text,
    };
    const font = typography?.fontFamily ?? SK.font;

    /* ── SVG paths ── */
    const bgD = bubbleBg(w, h);
    const bd1 = bubbleBd1(w, h);
    const bd2 = bubbleBd2(w, h);
    const tail = tailPath(w, h, placement);

    /* ── positioning offset for the bubble ── */
    const gapTB = TAIL_H + 4;        // top/bottom tail + breathing room
    const gapLR = TAIL_H * 0.7 + 4;  // left/right uses shorter tail
    const posStyle: React.CSSProperties = (() => {
      switch (placement) {
        case "top":
          return { bottom: "100%", left: "50%", transform: `translateX(-50%) translateY(-${gapTB}px)` };
        case "bottom":
          return { top: "100%", left: "50%", transform: `translateX(-50%) translateY(${gapTB}px)` };
        case "left":
          return { right: "100%", top: "50%", transform: `translateY(-50%) translateX(-${gapLR}px)` };
        case "right":
          return { left: "100%", top: "50%", transform: `translateY(-50%) translateX(${gapLR}px)` };
      }
    })();

    return (
      <div
        ref={ref}
        className={cn("sketch-tooltip", className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {/* trigger */}
        {children}

        {/* hidden sizer for content measurement */}
        <span
          ref={sizerRef}
          aria-hidden="true"
          className="sketch-tooltip__sizer"
          style={{
            fontSize: typography?.fontSize ?? "1.15rem",
            fontWeight: typography?.fontWeight ?? 500,
            fontFamily: font,
          }}
        >
          {content}
        </span>

        {/* bubble */}
        <div
          className="sketch-tooltip__bubble"
          role="tooltip"
          style={{
            ...posStyle,
            opacity: visible ? 1 : 0,
            pointerEvents: visible ? "auto" : "none",
          }}
        >
          <svg
            className="sketch-tooltip__svg"
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
          >
            {/* Paper background */}
            <SketchPaper d={bgD} w={w} h={h} bg={c.bg} overlay={c.bgOverlay} fine />

            {/* Border */}
            <SketchBorder d1={bd1} d2={bd2} stroke={c.stroke} show={showBorder} />

            {/* Speech-bubble tail — bg fill covers the border at junction,
                then overlay tints to match paper, then outline strokes the outer edge */}
            <path d={tail} fill={c.bg} stroke="none" />
            <path d={tail} fill={c.bgOverlay} opacity={0.6} stroke="none" />
            <path
              d={tail}
              fill="none"
              stroke={c.stroke}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.85}
              strokeDasharray="1,0.5"
            />
          </svg>

          {/* text overlay */}
          <span
            className="sketch-tooltip__text"
            style={{
              fontFamily: font,
              fontSize: typography?.fontSize ?? "1.15rem",
              fontWeight: typography?.fontWeight ?? 500,
              color: c.text,
            }}
          >
            {content}
          </span>
        </div>
      </div>
    );
  },
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
