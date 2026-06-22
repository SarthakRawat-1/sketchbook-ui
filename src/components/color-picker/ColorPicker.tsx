import React, { useId, useState } from "react";
import {
  cn,
  SketchPaper,
  SketchBorder,
  useSketchSize,
  SK,
  SK_DISABLED,
} from "../../lib";
import { Input } from "../input";

export interface ColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  swatches?: string[];
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  showBorder?: boolean;
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    label?: string;
    swatchRing?: string;
    swatchGlow?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
    labelSize?: string;
  };
}

const DEFAULT_SWATCHES = [
  "#111827",
  "#ef4444",
  "#f59e0b",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

const sizeConfig = {
  sm: { width: 320, inputWidth: 132, swatchSize: 32, columns: 4, fontSize: "0.95rem", labelSize: "1.05rem" },
  md: { width: 380, inputWidth: 156, swatchSize: 38, columns: 4, fontSize: "1.05rem", labelSize: "1.15rem" },
  lg: { width: 460, inputWidth: 180, swatchSize: 44, columns: 5, fontSize: "1.15rem", labelSize: "1.25rem" },
} as const;

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      defaultValue = "#3b82f6",
      value,
      onChange,
      label = "Pick a color",
      swatches = DEFAULT_SWATCHES,
      size = "md",
      disabled = false,
      showBorder = true,
      colors,
      typography,
      className = "",
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const selectedValue = isControlled ? value : internalValue;
    const config = sizeConfig[size];

    const rows = Math.max(1, Math.ceil(swatches.length / config.columns));
    const h = 140 + rows * (config.swatchSize + 12);

    const { ref: shellRef, w } = useSketchSize<HTMLDivElement>(config.width, h);
    const uid = useId();

    const pickerColors = {
      bg: colors?.bg || SK.bg,
      bgOverlay: colors?.bgOverlay || SK.bgOverlay,
      stroke: colors?.stroke || SK.stroke,
      text: colors?.text || SK.text,
      label: colors?.label || SK.text,
      swatchRing: colors?.swatchRing || "#1f2937",
      swatchGlow: colors?.swatchGlow || "rgba(59, 130, 246, 0.18)",
    };

    const pickerTypography = {
      fontSize: typography?.fontSize || config.fontSize,
      fontWeight: typography?.fontWeight || "500",
      fontFamily: typography?.fontFamily || SK.font,
      labelSize: typography?.labelSize || config.labelSize,
    };

    const finalColors = disabled
      ? {
          bg: SK_DISABLED.bg,
          bgOverlay: SK_DISABLED.bgOverlay,
          stroke: SK_DISABLED.stroke,
          text: SK_DISABLED.text,
          label: SK_DISABLED.text,
          swatchRing: SK_DISABLED.stroke,
          swatchGlow: "transparent",
        }
      : pickerColors;

    const handleChange = (next: string) => {
      if (disabled) return;
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const shellHeight = h;
    const panelPath = `M ${w * 0.03} ${shellHeight * 0.08} C ${w * 0.04} ${shellHeight * 0.05}, ${w * 0.06} ${shellHeight * 0.04}, ${w * 0.08} ${shellHeight * 0.04} L ${w * 0.86} ${shellHeight * 0.03} C ${w * 0.91} ${shellHeight * 0.03}, ${w * 0.95} ${shellHeight * 0.05}, ${w * 0.97} ${shellHeight * 0.09} C ${w * 0.99} ${shellHeight * 0.13}, ${w * 0.99} ${shellHeight * 0.18}, ${w * 0.99} ${shellHeight * 0.25} L ${w * 0.99} ${shellHeight * 0.88} C ${w * 0.99} ${shellHeight * 0.93}, ${w * 0.96} ${shellHeight * 0.96}, ${w * 0.91} ${shellHeight * 0.97} L ${w * 0.09} ${shellHeight * 0.98} C ${w * 0.05} ${shellHeight * 0.98}, ${w * 0.03} ${shellHeight * 0.95}, ${w * 0.02} ${shellHeight * 0.9} C ${w * 0.01} ${shellHeight * 0.84}, ${w * 0.01} ${shellHeight * 0.14}, ${w * 0.03} ${shellHeight * 0.08} Z`;
    const borderPath = `M ${w * 0.028} ${shellHeight * 0.082} C ${w * 0.038} ${shellHeight * 0.054}, ${w * 0.058} ${shellHeight * 0.044}, ${w * 0.079} ${shellHeight * 0.044} L ${w * 0.858} ${shellHeight * 0.034} C ${w * 0.912} ${shellHeight * 0.034}, ${w * 0.952} ${shellHeight * 0.054}, ${w * 0.972} ${shellHeight * 0.094} C ${w * 0.992} ${shellHeight * 0.134}, ${w * 0.992} ${shellHeight * 0.184}, ${w * 0.992} ${shellHeight * 0.254} L ${w * 0.992} ${shellHeight * 0.884} C ${w * 0.992} ${shellHeight * 0.934}, ${w * 0.962} ${shellHeight * 0.964}, ${w * 0.912} ${shellHeight * 0.974} L ${w * 0.092} ${shellHeight * 0.984} C ${w * 0.052} ${shellHeight * 0.984}, ${w * 0.032} ${shellHeight * 0.954}, ${w * 0.022} ${shellHeight * 0.904} C ${w * 0.012} ${shellHeight * 0.844}, ${w * 0.012} ${shellHeight * 0.144}, ${w * 0.028} ${shellHeight * 0.082} Z`;

    return (
      <div ref={ref} className={cn("sketch-color-picker", className)} {...props}>
        {label && (
          <label
            htmlFor={uid}
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontFamily: pickerTypography.fontFamily,
              fontSize: pickerTypography.labelSize,
              color: finalColors.label,
              marginLeft: "8px",
              transform: "rotate(-0.5deg)",
              width: "fit-content",
            }}
          >
            {label}
          </label>
        )}

        <div
          ref={shellRef}
          className="sketch-color-picker-shell"
          style={{
            position: "relative",
            width: "100%",
            minWidth: `${config.width}px`,
            height: `${shellHeight}px`,
          }}
        >
          <svg
            width={w}
            height={shellHeight}
            viewBox={`0 0 ${w} ${shellHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              filter: disabled
                ? "drop-shadow(1px 2px 0px rgba(0,0,0,0.06)) grayscale(0.3) opacity(0.7)"
                : "drop-shadow(2px 4px 0px rgba(0,0,0,0.12)) drop-shadow(3px 6px 10px rgba(0,0,0,0.08))",
            }}
          >
            <SketchPaper
              d={panelPath}
              w={w}
              h={shellHeight}
              fine
              bg={finalColors.bg}
              overlay={finalColors.bgOverlay}
              overlayOpacity={disabled ? 0.4 : 0.65}
            />
            {showBorder && (
              <SketchBorder
                d1={borderPath}
                stroke={finalColors.stroke}
                w1={2.4}
                o1={0.85}
                dash="1.5,0.8"
                show={showBorder}
              />
            )}
          </svg>

          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "18px 20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  border: `2px solid ${finalColors.swatchRing}`,
                  background: selectedValue,
                  boxShadow: `0 0 0 5px ${finalColors.swatchGlow}`,
                  transform: "rotate(-2deg)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Input
                  id={uid}
                  size="sm"
                  value={selectedValue}
                  disabled={disabled}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="#3b82f6"
                  aria-label="Hex value"
                  colors={{
                    bg: finalColors.bg,
                    bgOverlay: finalColors.bgOverlay,
                    stroke: finalColors.stroke,
                    text: finalColors.text,
                    label: finalColors.label,
                  }}
                  typography={{
                    fontSize: pickerTypography.fontSize,
                    fontWeight: pickerTypography.fontWeight,
                    fontFamily: pickerTypography.fontFamily,
                    labelSize: pickerTypography.labelSize,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))`,
                gap: 10,
              }}
            >
              {swatches.map((swatch, index) => {
                const isSelected = selectedValue?.toLowerCase() === swatch.toLowerCase();
                return (
                  <button
                    key={`${swatch}-${index}`}
                    type="button"
                    aria-label={`Choose ${swatch}`}
                    disabled={disabled}
                    onClick={() => handleChange(swatch)}
                    style={{
                      height: config.swatchSize,
                      borderRadius: 14,
                      border: `2px solid ${isSelected ? finalColors.swatchRing : finalColors.stroke}`,
                      background: swatch,
                      boxShadow: isSelected
                        ? `0 0 0 4px ${finalColors.swatchGlow}`
                        : "none",
                      transform: isSelected ? "rotate(1deg)" : "rotate(-0.5deg)",
                      cursor: disabled ? "not-allowed" : "pointer",
                      opacity: disabled ? 0.55 : 1,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
