import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn, SK, SK_DISABLED, DISP_SLIDER_ID, SketchBorder } from "../../lib";

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Customise individual colours. */
  colors?: {
    track?: string;
    trackFill?: string;
    thumb?: string;
    thumbBg?: string;
    stroke?: string;
    text?: string;
  };
  /** Customise label / value typography. */
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
  };
}

/* ── Size configs ───────────────────────────── */
const SIZE_CONFIG = {
  sm: { h: 36, viewH: 36, thumb: 10, trackW: 2, fontSize: "1.1rem", valSize: "0.95rem" },
  md: { h: 48, viewH: 48, thumb: 14, trackW: 2.5, fontSize: "1.4rem", valSize: "1.2rem" },
  lg: { h: 60, viewH: 60, thumb: 18, trackW: 3, fontSize: "1.7rem", valSize: "1.4rem" },
} as const;

const TRACK_VIEWBOX_W = 300;
const TRACK_PAD = 10; // left & right padding inside viewBox
const TRACK_USABLE = TRACK_VIEWBOX_W - TRACK_PAD * 2; // 280

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      defaultValue = 50,
      value: controlledValue,
      onChange,
      label,
      size = "md",
      disabled = false,
      colors,
      typography,
      className = "",
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentValue = isControlled ? controlledValue : internalValue;
    const percentage = Math.min(100, Math.max(0, ((currentValue - min) / (max - min)) * 100));

    const sc = SIZE_CONFIG[size];

    // ── Resolved colours ──
    const c = disabled
      ? {
          stroke: colors?.stroke ?? SK_DISABLED.stroke,
          track: colors?.track ?? SK_DISABLED.stroke,
          trackFill: colors?.trackFill ?? SK_DISABLED.stroke,
          thumb: colors?.thumb ?? SK_DISABLED.stroke,
          thumbBg: colors?.thumbBg ?? SK_DISABLED.bg,
          text: colors?.text ?? SK_DISABLED.text,
        }
      : {
          stroke: colors?.stroke ?? SK.stroke,
          track: colors?.track ?? SK.stroke,
          trackFill: colors?.trackFill ?? SK.stroke,
          thumb: colors?.thumb ?? SK.stroke,
          thumbBg: colors?.thumbBg ?? SK.bg,
          text: colors?.text ?? SK.text,
        };

    const font = typography?.fontFamily ?? SK.font;

    // ── Value update helper (stable ref to avoid stale closures) ──
    const updateValue = useCallback(
      (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
        if (disabled || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = "touches" in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;

        let rawPercent = (clientX - rect.left) / rect.width;
        rawPercent = Math.max(0, Math.min(1, rawPercent));

        const rawValue = rawPercent * (max - min) + min;
        const steppedValue = Math.round(rawValue / step) * step;
        const finalValue = Math.max(min, Math.min(max, steppedValue));

        if (!isControlled) setInternalValue(finalValue);
        onChange?.(finalValue);
      },
      [disabled, min, max, step, isControlled, onChange],
    );

    const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      setIsDragging(true);
      updateValue(e);
    };

    // ── Global move / up listeners (only while dragging) ──
    useEffect(() => {
      if (!isDragging) return;

      const onMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        updateValue(e);
      };
      const onUp = () => setIsDragging(false);

      window.addEventListener("mousemove", onMove, { passive: false });
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("mouseup", onUp);
      window.addEventListener("touchend", onUp);

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("mouseup", onUp);
        window.removeEventListener("touchend", onUp);
      };
    }, [isDragging, updateValue]);

    // ── Thumb position in viewBox units ──
    const thumbX = TRACK_PAD + (TRACK_USABLE * percentage) / 100;
    const cy = sc.viewH / 2;
    const tr = sc.thumb; // thumb "radius" for the wobbly circle

    // ── Track path data ──
    const trackD1 = `M ${TRACK_PAD} ${cy}
                C 50 ${cy - 1}, 100 ${cy + 1}, 150 ${cy}
                C 200 ${cy - 1}, 250 ${cy + 1}, ${TRACK_VIEWBOX_W - TRACK_PAD} ${cy}`;
    const trackD2 = `M ${TRACK_PAD} ${cy + 1}
                C 50 ${cy}, 100 ${cy + 2}, 150 ${cy + 1}
                C 200 ${cy}, 250 ${cy + 2}, ${TRACK_VIEWBOX_W - TRACK_PAD} ${cy + 1}`;

    return (
      <div
        ref={ref}
        className={cn("sketch-slider", className)}
        {...props}
        style={{
          ...props.style,
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : undefined,
        }}
      >
        {/* ── Label row ── */}
        {label && (
          <div className="sketch-slider__label">
            <label
              style={{
                fontFamily: font,
                fontSize: typography?.fontSize ?? sc.fontSize,
                fontWeight: typography?.fontWeight ?? 500,
                color: c.text,
              }}
            >
              {label}
            </label>
            <span
              style={{
                fontFamily: font,
                fontSize: sc.valSize,
                color: c.text,
                opacity: 0.65,
              }}
            >
              {currentValue}
            </span>
          </div>
        )}

        {/* ── Track area ── */}
        <div
          ref={containerRef}
          className="sketch-slider__track-area"
          style={{ height: `${sc.h}px` }}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Hidden native input for keyboard / a11y */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            disabled={disabled}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!isControlled) setInternalValue(v);
              onChange?.(v);
            }}
            className="sketch-slider__native"
            aria-label={label || "Slider"}
          />

          {/* ── SVG ── */}
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${TRACK_VIEWBOX_W} ${sc.viewH}`}
            preserveAspectRatio="none"
            style={{
              pointerEvents: "none",
              overflow: "visible",
            }}
            aria-hidden="true"
          >
            {/* Track — reuses shared SketchBorder (primary dashed + secondary lighter) */}
            <SketchBorder
              d1={trackD1}
              d2={trackD2}
              stroke={c.track}
              w1={sc.trackW}
              w2={sc.trackW * 0.48}
              o1={0.8}
            />

            {/* Filled progress track */}
            <path
              d={`M ${TRACK_PAD} ${cy} L ${thumbX} ${cy}`}
              stroke={c.trackFill}
              strokeWidth={sc.trackW * 1.6}
              strokeLinecap="round"
              opacity={0.1}
              filter={`url(#${DISP_SLIDER_ID})`}
            />

            {/* ── Thumb group ── */}
            <g transform={`translate(${thumbX}, ${cy})`}>
              <g
                style={{
                  cursor: disabled ? "not-allowed" : "grab",
                  transform: isDragging
                    ? "scale(1.1)"
                    : isHovered
                      ? "scale(1.05)"
                      : "scale(1)",
                  transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              >
                {/* Drop shadow */}
                <circle
                  cx="2"
                  cy="4"
                  r={tr}
                  fill="#000"
                  opacity={0.1}
                  filter={`url(#${DISP_SLIDER_ID})`}
                />

                {/* Paper background */}
                <path
                  d={`M ${-tr + 2} ${-tr + 2}
                      C ${-tr / 2} ${-tr - 1}, ${tr / 2} ${-tr - 1}, ${tr - 2} ${-tr + 2}
                      C ${tr + 1} ${-tr / 2}, ${tr + 1} ${tr / 2}, ${tr - 2} ${tr - 2}
                      C ${tr / 2} ${tr + 1}, ${-tr / 2} ${tr + 1}, ${-tr + 2} ${tr - 2}
                      C ${-tr - 1} ${tr / 2}, ${-tr - 1} ${-tr / 2}, ${-tr + 2} ${-tr + 2} Z`}
                  fill={c.thumbBg}
                  stroke="none"
                  transform="rotate(15)"
                />

                {/* Main knob outline — wobbly circle */}
                <path
                  d={`M ${-tr + 3} ${-tr + 3}
                      C ${-tr / 2 + 1} ${-tr}, ${tr / 2 - 1} ${-tr}, ${tr - 3} ${-tr + 3}
                      C ${tr} ${-tr / 2 + 1}, ${tr} ${tr / 2 - 1}, ${tr - 3} ${tr - 3}
                      C ${tr / 2 - 1} ${tr}, ${-tr / 2 + 1} ${tr}, ${-tr + 3} ${tr - 3}
                      C ${-tr} ${tr / 2 - 1}, ${-tr} ${-tr / 2 + 1}, ${-tr + 3} ${-tr + 3} Z`}
                  stroke={c.thumb}
                  strokeWidth={sc.trackW}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.9}
                  strokeDasharray="1,0.5"
                  transform="rotate(-5)"
                />

                {/* Secondary outline */}
                <path
                  d={`M ${-tr + 2} ${-tr + 4}
                      C ${-tr / 2} ${-tr + 1}, ${tr / 2} ${-tr + 1}, ${tr - 2} ${-tr + 4}
                      C ${tr + 1} ${-tr / 2 + 2}, ${tr + 1} ${tr / 2}, ${tr - 2} ${tr - 2}
                      C ${tr / 2} ${tr + 1}, ${-tr / 2} ${tr + 1}, ${-tr + 2} ${tr - 2}
                      C ${-tr - 1} ${tr / 2}, ${-tr - 1} ${-tr / 2 + 2}, ${-tr + 2} ${-tr + 4} Z`}
                  stroke={c.thumb}
                  strokeWidth={1}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.4}
                  transform="rotate(10)"
                />

                {/* Cross-hatch shading lines */}
                <g opacity={0.15}>
                  <line
                    x1={-tr * 0.4}
                    y1={-tr * 0.4}
                    x2={tr * 0.4}
                    y2={tr * 0.4}
                    stroke={c.thumb}
                    strokeWidth={1}
                    strokeLinecap="round"
                  />
                  <line
                    x1={-tr * 0.55}
                    y1={-tr * 0.15}
                    x2={tr * 0.3}
                    y2={tr * 0.7}
                    stroke={c.thumb}
                    strokeWidth={1}
                    strokeLinecap="round"
                  />
                  <line
                    x1={-tr * 0.15}
                    y1={-tr * 0.7}
                    x2={tr * 0.7}
                    y2={tr * 0.15}
                    stroke={c.thumb}
                    strokeWidth={1}
                    strokeLinecap="round"
                  />
                </g>

                {/* Center dimple */}
                <circle r={tr * 0.14} fill={c.thumb} opacity={0.6} />
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  },
);

Slider.displayName = "Slider";

export { Slider };
