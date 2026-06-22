import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { Card } from "../card";
import { cn, SK, SK_DISABLED } from "../../lib";

export interface ColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  label?: string;
  swatches?: string[];
  disabled?: boolean;
  showBorder?: boolean;
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    swatchBorder?: string;
    swatchActiveBorder?: string;
  };
  typography?: {
    fontFamily?: string;
    fontSize?: string;
    labelSize?: string;
    fontWeight?: string | number;
  };
}

const DEFAULT_SWATCHES = [
  "#F97316",
  "#EF4444",
  "#F59E0B",
  "#22C55E",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
];

const FALLBACK_COLOR = "#F97316";

function normalizeHex(value: string) {
  const trimmed = value.trim();
  const hex = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;

  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    return `#${hex
      .split("")
      .map((char) => `${char}${char}`)
      .join("")
      .toUpperCase()}`;
  }

  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    return `#${hex.toUpperCase()}`;
  }

  return "";
}

const sizeConfig = {
  sm: {
    preview: 44,
    swatch: 30,
    labelSize: "1.1rem",
    fontSize: "1rem",
  },
  md: {
    preview: 52,
    swatch: 34,
    labelSize: "1.2rem",
    fontSize: "1.05rem",
  },
  lg: {
    preview: 60,
    swatch: 38,
    labelSize: "1.3rem",
    fontSize: "1.1rem",
  },
} as const;

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      label,
      swatches = DEFAULT_SWATCHES,
      disabled = false,
      showBorder = true,
      colors,
      typography,
      className = "",
      style,
      ...rest
    },
    ref,
  ) => {
    const inputId = useId();
    const colorInputRef = useRef<HTMLInputElement>(null);
    const isControlled = value !== undefined;

    const initialColor =
      normalizeHex(defaultValue ?? value ?? FALLBACK_COLOR) ?? FALLBACK_COLOR;
    const [internalColor, setInternalColor] = useState(initialColor);
    const [draftHex, setDraftHex] = useState(initialColor);

    useEffect(() => {
      if (value !== undefined) {
        const next = normalizeHex(value) || FALLBACK_COLOR;
        setDraftHex(next);
      }
    }, [value]);

    const currentColor =
      normalizeHex(isControlled ? value ?? "" : internalColor) ||
      FALLBACK_COLOR;

    useEffect(() => {
      if (!isControlled) {
        setDraftHex(currentColor);
      }
    }, [currentColor, isControlled]);

    const config = sizeConfig.md;

    const resolvedColors = disabled
      ? {
          bg: SK_DISABLED.bg,
          bgOverlay: SK_DISABLED.bgOverlay,
          stroke: SK_DISABLED.stroke,
          text: SK_DISABLED.text,
          swatchBorder: SK_DISABLED.stroke,
          swatchActiveBorder: SK_DISABLED.text,
        }
      : {
          bg: colors?.bg ?? SK.bg,
          bgOverlay: colors?.bgOverlay ?? SK.bgOverlay,
          stroke: colors?.stroke ?? SK.stroke,
          text: colors?.text ?? SK.text,
          swatchBorder: colors?.swatchBorder ?? "rgba(42, 42, 42, 0.18)",
          swatchActiveBorder:
            colors?.swatchActiveBorder ?? colors?.stroke ?? SK.stroke,
        };

    const fontFamily = typography?.fontFamily ?? SK.font;
    const labelSize = typography?.labelSize ?? config.labelSize;
    const textSize = typography?.fontSize ?? config.fontSize;
    const fontWeight = typography?.fontWeight ?? 500;

    const colorChoices = useMemo(
      () => Array.from(new Set([currentColor, ...swatches])),
      [currentColor, swatches],
    );

    const commitColor = (next: string) => {
      const normalized = normalizeHex(next);
      if (!normalized) return;
      setDraftHex(normalized);
      if (!isControlled) {
        setInternalColor(normalized);
      }
      onChange?.(normalized);
    };

    const handleHexChange = (next: string) => {
      setDraftHex(next);
      const normalized = normalizeHex(next);
      if (normalized) {
        commitColor(normalized);
      }
    };

    const handleHexBlur = () => {
      const normalized = normalizeHex(draftHex);
      if (normalized) {
        setDraftHex(normalized);
      } else {
        setDraftHex(currentColor);
      }
    };

    const openNativePicker = () => {
      if (disabled) return;
      colorInputRef.current?.click();
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
        typography={{
          fontFamily,
        }}
        className={cn("sketch-color-picker", className)}
        style={{
          width: "100%",
          maxWidth: 560,
          ...style,
        }}
        {...rest}
      >
        <div
          style={{
            width: "100%",
            display: "grid",
            gap: 18,
            fontFamily,
            color: resolvedColors.text,
          }}
        >
          {label && (
            <label
              htmlFor={inputId}
              style={{
                display: "block",
                fontSize: labelSize,
                fontWeight,
                marginBottom: 2,
                marginLeft: 6,
                width: "fit-content",
                transform: "rotate(-0.4deg)",
              }}
            >
              {label}
            </label>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={openNativePicker}
              disabled={disabled}
              aria-label={label ? `Open ${label} chooser` : "Open color chooser"}
              style={{
                width: config.preview,
                height: config.preview,
                borderRadius: 18,
                border: `2px solid ${resolvedColors.swatchActiveBorder}`,
                background: currentColor,
                boxShadow: "2px 3px 0 rgba(0,0,0,0.08)",
                cursor: disabled ? "not-allowed" : "pointer",
                padding: 0,
                position: "relative",
                transform: "rotate(-0.4deg)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 8,
                  borderRadius: 12,
                  border: "1px dashed rgba(255,255,255,0.65)",
                }}
              />
            </button>

            <div style={{ flex: "1 1 220px", minWidth: 220 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <input
                  id={inputId}
                  type="text"
                  value={draftHex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  onBlur={handleHexBlur}
                  disabled={disabled}
                  aria-label={label ? `${label} hex value` : "Hex color value"}
                  spellCheck={false}
                  autoComplete="off"
                  maxLength={7}
                  placeholder="#F97316"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "12px 14px",
                    borderRadius: 14,
                    border: `2px solid ${resolvedColors.swatchBorder}`,
                    background: resolvedColors.bg,
                    color: resolvedColors.text,
                    fontFamily,
                    fontSize: textSize,
                    fontWeight,
                    letterSpacing: 0,
                    boxShadow: "1px 2px 0 rgba(0,0,0,0.05)",
                    outline: "none",
                    cursor: disabled ? "not-allowed" : "text",
                  }}
                />
                <input
                  ref={colorInputRef}
                  type="color"
                  value={currentColor}
                  disabled={disabled}
                  onChange={(e) => commitColor(e.target.value)}
                  aria-hidden="true"
                  tabIndex={-1}
                  style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />
              </div>
              <p
                style={{
                  margin: "8px 0 0 6px",
                  fontSize: "0.9rem",
                  opacity: 0.7,
                }}
              >
                Tap the swatches or use your browser’s native picker.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(34px, 1fr))",
              gap: 10,
            }}
          >
            {colorChoices.map((swatch) => {
              const active = normalizeHex(swatch) === currentColor;
              return (
                <button
                  key={swatch}
                  type="button"
                  disabled={disabled}
                  onClick={() => commitColor(swatch)}
                  aria-label={`Select ${swatch}`}
                  aria-pressed={active}
                  style={{
                    width: "100%",
                    minHeight: 34,
                    aspectRatio: "1 / 1",
                    borderRadius: 12,
                    border: `2px solid ${
                      active
                        ? resolvedColors.swatchActiveBorder
                        : resolvedColors.swatchBorder
                    }`,
                    background: swatch,
                    boxShadow: "1px 2px 0 rgba(0,0,0,0.06)",
                    cursor: disabled ? "not-allowed" : "pointer",
                    transform: active ? "translateY(-1px) rotate(-1deg)" : "none",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                />
              );
            })}
          </div>
        </div>
      </Card>
    );
  },
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
