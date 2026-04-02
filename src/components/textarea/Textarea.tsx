import React, { useId, useState } from "react";
import { cn, SketchPaper, SketchBorder, useSketchSize, SK, SK_DISABLED } from "../../lib";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: "sm" | "md" | "lg";
  label?: string;
  /** Show pencil-drawn notebook ruling lines. */
  showLines?: boolean;
  /** Show the red margin line on the left. */
  showMargin?: boolean;
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    label?: string;
    lineColor?: string;
    marginColor?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
    labelSize?: string;
  };
  showBorder?: boolean;
}

/* ── Size configs ───────────────────────────── */
const SIZE_CONFIG = {
  sm: {
    minW: 260, minH: 120, lineH: 24,
    fontSize: "1.1rem", labelSize: "1.15rem",
    padding: "10px 16px 10px 52px",
  },
  md: {
    minW: 340, minH: 180, lineH: 30,
    fontSize: "1.3rem", labelSize: "1.4rem",
    padding: "12px 20px 12px 60px",
  },
  lg: {
    minW: 420, minH: 240, lineH: 36,
    fontSize: "1.5rem", labelSize: "1.6rem",
    padding: "14px 24px 14px 68px",
  },
} as const;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = "md",
      label,
      showLines = true,
      showMargin = true,
      showBorder = true,
      colors,
      typography,
      className = "",
      disabled,
      placeholder = "Write your thoughts here...",
      value,
      onChange,
      defaultValue,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const uid = useId();
    const linesPatternId = `tal${uid}`;

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const sc = SIZE_CONFIG[size];

    // Dynamic sizing — width grows with container, height is fixed from size config
    const { ref: containerRef, w } = useSketchSize<HTMLDivElement>(sc.minW, sc.minH);
    const h = sc.minH;

    const c = disabled
      ? {
        bg: SK_DISABLED.bg,
        bgOverlay: SK_DISABLED.bgOverlay,
        stroke: SK_DISABLED.stroke,
        text: SK_DISABLED.text,
        label: SK_DISABLED.text,
        lineColor: colors?.lineColor ?? "#ccc",
        marginColor: colors?.marginColor ?? "#ccc",
      }
      : {
        bg: colors?.bg ?? SK.bg,
        bgOverlay: colors?.bgOverlay ?? SK.bgOverlay,
        stroke: colors?.stroke ?? SK.stroke,
        text: colors?.text ?? SK.text,
        label: colors?.label ?? SK.text,
        lineColor: colors?.lineColor ?? "#d0c9bc",
        marginColor: colors?.marginColor ?? "#e8a5a5",
      };

    const font = typography?.fontFamily ?? SK.font;

    // ── Proportional SVG paths (same structure as Input / Accordion header) ──
    const bgPath = `M ${w * 0.0133} 6
      C ${w * 0.0167} 4.5, ${w * 0.025} 4, ${w * 0.0333} 4
      L ${w * 0.25} 3.5
      C ${w * 0.3333} 3.3, ${w * 0.4167} 3.5, ${w * 0.5} 3.8
      L ${w * 0.75} 4.2
      C ${w * 0.8333} 4.5, ${w * 0.9167} 5, ${w * 0.9667} 6
      C ${w * 0.98} 7, ${w * 0.99} 9, ${w * 0.9933} 13
      L ${w * 0.995} ${h - 13}
      C ${w * 0.9942} ${h - 9}, ${w * 0.9883} ${h - 6}, ${w * 0.98} ${h - 5}
      L ${w * 0.9333} ${h - 4}
      C ${w * 0.85} ${h - 3.5}, ${w * 0.7667} ${h - 3.2}, ${w * 0.6833} ${h - 3.5}
      L ${w * 0.3167} ${h - 4}
      C ${w * 0.2333} ${h - 4.2}, ${w * 0.15} ${h - 4.5}, ${w * 0.0667} ${h - 5}
      L ${w * 0.025} ${h - 5.5}
      C ${w * 0.0167} ${h - 6}, ${w * 0.01} ${h - 8}, ${w * 0.0067} ${h - 12}
      L ${w * 0.005} 12
      C ${w * 0.0058} 8.5, ${w * 0.0083} 6.5, ${w * 0.0133} 6 Z`;

    const bd1 = `M ${w * 0.0142} 6.5
      C ${w * 0.0175} 5, ${w * 0.0258} 4.5, ${w * 0.0342} 4.5
      L ${w * 0.2508} 4
      C ${w * 0.3342} 3.8, ${w * 0.4175} 4, ${w * 0.5008} 4.3
      L ${w * 0.7508} 4.7
      C ${w * 0.8342} 5, ${w * 0.9175} 5.5, ${w * 0.9675} 6.5
      C ${w * 0.9808} 7.5, ${w * 0.9908} 9.5, ${w * 0.9942} 13.5
      L ${w * 0.9958} ${h - 12.5}
      C ${w * 0.995} ${h - 8.5}, ${w * 0.9892} ${h - 5.5}, ${w * 0.9808} ${h - 4.5}
      L ${w * 0.9342} ${h - 3.5}
      C ${w * 0.8508} ${h - 3}, ${w * 0.7675} ${h - 2.7}, ${w * 0.6842} ${h - 3}
      L ${w * 0.3175} ${h - 3.5}
      C ${w * 0.2342} ${h - 3.7}, ${w * 0.1508} ${h - 4}, ${w * 0.0675} ${h - 4.5}
      L ${w * 0.0258} ${h - 5}
      C ${w * 0.0175} ${h - 5.5}, ${w * 0.0108} ${h - 7.5}, ${w * 0.0075} ${h - 11.5}
      L ${w * 0.0058} 12.5
      C ${w * 0.0067} 9, ${w * 0.0092} 7, ${w * 0.0142} 6.5 Z`;

    const bd2 = `M ${w * 0.015} 7
      C ${w * 0.0183} 5.5, ${w * 0.0267} 5, ${w * 0.035} 5
      L ${w * 0.2517} 4.5
      C ${w * 0.335} 4.3, ${w * 0.4183} 4.5, ${w * 0.5017} 4.8
      L ${w * 0.7517} 5.2
      C ${w * 0.835} 5.5, ${w * 0.9183} 6, ${w * 0.9683} 7
      C ${w * 0.9817} 8, ${w * 0.9917} 10, ${w * 0.995} 14
      L ${w * 0.9967} ${h - 12}
      C ${w * 0.9958} ${h - 8}, ${w * 0.99} ${h - 5}, ${w * 0.9817} ${h - 4}
      L ${w * 0.935} ${h - 3}
      C ${w * 0.8517} ${h - 2.5}, ${w * 0.7683} ${h - 2.2}, ${w * 0.685} ${h - 2.5}
      L ${w * 0.3183} ${h - 3}
      C ${w * 0.235} ${h - 3.2}, ${w * 0.1517} ${h - 3.5}, ${w * 0.0683} ${h - 4}
      L ${w * 0.0267} ${h - 4.5}
      C ${w * 0.0183} ${h - 5}, ${w * 0.0117} ${h - 7}, ${w * 0.0083} ${h - 11}
      L ${w * 0.0067} 13
      C ${w * 0.0075} 9.5, ${w * 0.01} 7.5, ${w * 0.015} 7 Z`;

    // Margin line X position (proportional)
    const marginX = w * 0.083;

    return (
      <div className={cn("sketch-textarea", className)}>
        {/* ── Label ── */}
        {label && (
          <label
            className="sketch-textarea__label"
            style={{
              fontFamily: font,
              fontSize: typography?.labelSize ?? sc.labelSize,
              fontWeight: typography?.fontWeight ?? 500,
              color: c.label,
            }}
          >
            {label}
          </label>
        )}

        {/* ── Container ── */}
        <div
          ref={containerRef}
          className="sketch-textarea__wrapper"
          style={{
            minWidth: `${sc.minW}px`,
            minHeight: `${sc.minH}px`,
            transform: disabled
              ? "rotate(-0.1deg)"
              : isFocused
                ? "scale(1.01) rotate(-0.2deg)"
                : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* ── SVG background ── */}
          <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sketch-textarea__svg"
            style={{
              filter: disabled
                ? "drop-shadow(1px 2px 0px rgba(0,0,0,0.06)) grayscale(0.3) opacity(0.7)"
                : isFocused
                  ? "drop-shadow(3px 4px 0px rgba(0,0,0,0.1)) drop-shadow(5px 8px 12px rgba(0,0,0,0.05))"
                  : "drop-shadow(2px 2px 0px rgba(0,0,0,0.08)) drop-shadow(3px 4px 6px rgba(0,0,0,0.03))",
              transition: "filter 0.3s ease",
            }}
          >
            <defs>
              {/* Notebook ruling pattern — unique to textarea */}
              <pattern
                id={linesPatternId}
                x="0"
                y="0"
                width={w}
                height={sc.lineH}
                patternUnits="userSpaceOnUse"
              >
                <path
                  d={`M 0 ${sc.lineH}
                      L ${w * 0.167} ${sc.lineH - 0.2}
                      L ${w * 0.333} ${sc.lineH + 0.1}
                      L ${w * 0.5} ${sc.lineH - 0.1}
                      L ${w * 0.667} ${sc.lineH + 0.2}
                      L ${w * 0.833} ${sc.lineH - 0.3}
                      L ${w} ${sc.lineH}`}
                  stroke={c.lineColor}
                  strokeWidth="1"
                  fill="none"
                  opacity={0.35}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </pattern>
            </defs>

            {/* Paper background — shared SketchPaper (bg + overlay + noise) */}
            <SketchPaper
              d={bgPath}
              w={w}
              h={h}
              bg={c.bg}
              overlay={c.bgOverlay}
              overlayOpacity={disabled ? 0.3 : 0.5}
              noiseOpacity={0.15}
            />

            {/* Notebook ruling lines */}
            {showLines && (
              <rect x="0" y="0" width={w} height={h} fill={`url(#${linesPatternId})`} />
            )}

            {/* Red margin line — wobbly vertical */}
            {showMargin && (
              <path
                d={`M ${marginX} 2
                    L ${marginX + 0.5} ${h * 0.2}
                    L ${marginX - 0.2} ${h * 0.35}
                    L ${marginX + 0.3} ${h * 0.5}
                    L ${marginX} ${h * 0.65}
                    L ${marginX + 0.6} ${h * 0.8}
                    L ${marginX + 1} ${h - 2}`}
                stroke={c.marginColor}
                strokeWidth="2"
                opacity={0.5}
                strokeDasharray="3,1"
                vectorEffect="non-scaling-stroke"
                fill="none"
              />
            )}

            {/* Border — shared SketchBorder (primary dashed + secondary lighter) */}
            <SketchBorder
              d1={bd1}
              d2={bd2}
              stroke={c.stroke}
              w1={isFocused ? 2.5 : 2}
              o1={disabled ? 0.3 : 0.85}
              o2={disabled ? 0.15 : 0.3}
              show={showBorder}
              dash="1,0.5"
              style={{ transition: "all 0.3s ease" }}
            />
          </svg>

          {/* ── Actual textarea ── */}
          <textarea
            ref={ref}
            value={currentValue}
            onChange={(e) => {
              if (!isControlled) setInternalValue(e.target.value);
              onChange?.(e);
            }}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            placeholder={placeholder}
            disabled={disabled}
            className="sketch-textarea__field"
            style={{
              fontFamily: font,
              fontSize: typography?.fontSize ?? sc.fontSize,
              fontWeight: typography?.fontWeight ?? 400,
              lineHeight: `${sc.lineH}px`,
              color: c.text,
              padding: sc.padding,
              width: `${w}px`,
              height: `${h}px`,
              cursor: disabled ? "not-allowed" : "text",
            }}
            {...props}
          />
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
