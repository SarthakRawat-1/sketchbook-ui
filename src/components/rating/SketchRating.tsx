import React, { useEffect, useId, useMemo, useState } from "react";
import { Card } from "../card";
import { cn, SK, SK_DISABLED } from "../../lib";

export interface SketchRatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  max?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  precision?: 1 | 0.5;
  size?: "sm" | "md" | "lg";
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  showBorder?: boolean;
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    fill?: string;
    emptyFill?: string;
  };
  typography?: {
    fontFamily?: string;
    fontSize?: string;
    labelSize?: string;
    fontWeight?: string | number;
  };
}

const SIZE_CONFIG = {
  sm: { icon: 28, gap: 6, fontSize: "1rem", labelSize: "1.05rem" },
  md: { icon: 34, gap: 8, fontSize: "1.05rem", labelSize: "1.15rem" },
  lg: { icon: 40, gap: 10, fontSize: "1.1rem", labelSize: "1.25rem" },
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function roundToPrecision(value: number, precision: 1 | 0.5) {
  return Math.round(value / precision) * precision;
}

function StarIcon({
  size,
  stroke,
  fill,
  emptyFill,
  halfFillId,
}: {
  size: number;
  stroke: string;
  fill: string;
  emptyFill: string;
  halfFillId: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={halfFillId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={fill} />
          <stop offset="50%" stopColor={emptyFill} />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SketchRating = React.forwardRef<HTMLDivElement, SketchRatingProps>(
  (
    {
      max = 5,
      value,
      defaultValue = 0,
      onChange,
      precision = 1,
      size = "md",
      label,
      readOnly = false,
      disabled = false,
      icon,
      showBorder = true,
      colors,
      typography,
      className = "",
      style,
      ...rest
    },
    ref,
  ) => {
    const ratingId = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const config = SIZE_CONFIG[size];
    const currentValue = value !== undefined ? value : internalValue;
    const displayValue = hoverValue ?? currentValue;

    useEffect(() => {
      if (value === undefined) {
        setInternalValue(defaultValue);
      }
    }, [defaultValue, value]);

    const resolvedColors = disabled
      ? {
          bg: SK_DISABLED.bg,
          bgOverlay: SK_DISABLED.bgOverlay,
          stroke: SK_DISABLED.stroke,
          text: SK_DISABLED.text,
          fill: SK_DISABLED.text,
          emptyFill: SK_DISABLED.bgOverlay,
        }
      : {
          bg: colors?.bg ?? SK.bg,
          bgOverlay: colors?.bgOverlay ?? SK.bgOverlay,
          stroke: colors?.stroke ?? SK.stroke,
          text: colors?.text ?? SK.text,
          fill: colors?.fill ?? "#f5b301",
          emptyFill: colors?.emptyFill ?? "transparent",
        };

    const fontFamily = typography?.fontFamily ?? SK.font;
    const fontSize = typography?.fontSize ?? config.fontSize;
    const labelSize = typography?.labelSize ?? config.labelSize;
    const fontWeight = typography?.fontWeight ?? 500;

    const stars = useMemo(
      () => Array.from({ length: max }, (_, index) => index),
      [max],
    );

    const commit = (next: number) => {
      if (disabled || readOnly) return;
      const clamped = clamp(roundToPrecision(next, precision), 0, max);
      if (value === undefined) {
        setInternalValue(clamped);
      }
      onChange?.(clamped);
    };

    const getStepValue = (index: number, clientX: number, target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      if (precision === 0.5) {
        const half = clientX - rect.left < rect.width / 2 ? 0.5 : 1;
        return index + half;
      }
      return index + 1;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled || readOnly) return;

      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        event.preventDefault();
        commit(currentValue + precision);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        event.preventDefault();
        commit(currentValue - precision);
      } else if (event.key === "Home") {
        event.preventDefault();
        commit(0);
      } else if (event.key === "End") {
        event.preventDefault();
        commit(max);
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const next = hoverValue ?? currentValue;
        commit(next);
      }
    };

    return (
      <Card
        ref={ref}
        variant="paper"
        showBorder={showBorder}
        colors={{
          bg: resolvedColors.bg,
          bgOverlay: resolvedColors.bgOverlay,
          stroke: resolvedColors.stroke,
          text: resolvedColors.text,
        }}
        typography={{ fontFamily }}
        className={cn("sketch-rating", className)}
        style={{ width: "100%", maxWidth: 560, ...style }}
        {...rest}
      >
        <div
          role="radiogroup"
          aria-label={label ?? "Rating"}
          aria-valuetext={`${displayValue.toFixed(
            precision === 0.5 ? 1 : 0,
          )} out of ${max} stars`}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseLeave={() => setHoverValue(null)}
          style={{
            width: "100%",
            display: "grid",
            gap: 16,
            fontFamily,
            color: resolvedColors.text,
          }}
        >
          {label && (
            <div
              style={{
                marginLeft: 6,
                fontSize: labelSize,
                fontWeight,
                transform: "rotate(-0.35deg)",
                width: "fit-content",
              }}
            >
              {label}
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: config.gap,
            }}
          >
            {stars.map((index) => {
              const starValue = index + 1;
              const fillValue = Math.min(1, Math.max(0, displayValue - index));
              const fillLevel =
                precision === 0.5
                  ? fillValue >= 1
                    ? 1
                    : fillValue >= 0.5
                      ? 0.5
                      : 0
                  : fillValue >= 1
                    ? 1
                    : 0;
              const isActive = currentValue >= starValue;
              const isPartial = precision === 0.5 && fillLevel === 0.5;
              const starId = `${ratingId}-star-${index}`;

              return (
                <button
                  key={starId}
                  type="button"
                  role="radio"
                  aria-checked={isActive || isPartial}
                  aria-label={`${starValue}${precision === 0.5 ? " star" : ""}${starValue === 1 ? "" : "s"}`}
                  disabled={disabled || readOnly}
                  tabIndex={-1}
                  onMouseEnter={() =>
                    !disabled &&
                    !readOnly &&
                    setHoverValue(roundToPrecision(starValue, precision))
                  }
                  onMouseMove={(event) =>
                    !disabled &&
                    !readOnly &&
                    setHoverValue(
                      roundToPrecision(
                        getStepValue(index, event.clientX, event.currentTarget),
                        precision,
                      ),
                    )
                  }
                  onClick={(event) => {
                    const next = getStepValue(index, event.clientX, event.currentTarget);
                    commit(next);
                  }}
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    cursor: disabled || readOnly ? "not-allowed" : "pointer",
                    transform: isFocused ? "translateY(-1px)" : "none",
                    transition: "transform 0.15s ease",
                    lineHeight: 0,
                  }}
                >
                  {icon ? (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: config.icon,
                        height: config.icon,
                        opacity: fillLevel === 1 ? 1 : fillLevel === 0.5 ? 0.7 : 0.35,
                        color: fillLevel > 0 ? resolvedColors.fill : resolvedColors.stroke,
                      }}
                    >
                      {icon}
                    </span>
                  ) : fillLevel === 0.5 ? (
                    <svg
                      width={config.icon}
                      height={config.icon}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id={`${starId}-half`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="50%" stopColor={resolvedColors.fill} />
                          <stop offset="50%" stopColor={resolvedColors.emptyFill} />
                        </linearGradient>
                      </defs>
                      <path
                        d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z"
                        fill={`url(#${starId}-half)`}
                        stroke={resolvedColors.stroke}
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <StarIcon
                      size={config.icon}
                      stroke={resolvedColors.stroke}
                      fill={fillLevel === 1 ? resolvedColors.fill : "transparent"}
                      emptyFill={resolvedColors.emptyFill}
                      halfFillId={`${starId}-full`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            style={{
              marginLeft: 6,
              fontSize,
              opacity: 0.72,
            }}
          >
            {displayValue.toFixed(precision === 0.5 ? 1 : 0)} / {max}
          </div>
        </div>
      </Card>
    );
  },
);

SketchRating.displayName = "SketchRating";

export { SketchRating };
