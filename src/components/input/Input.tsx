import React, { useId, useState } from "react";
import { cn, SketchPaper, SketchBorder, useSketchSize, SK, SK_DISABLED } from "../../lib";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: "sm" | "md" | "lg";
  label?: string;
  // Customization props
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    label?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
    labelSize?: string;
  };
  showBorder?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      label,
      colors,
      typography,
      showBorder = true,
      className = "",
      disabled,
      onFocus,
      onBlur,
      onChange,
      value: controlledValue,
      defaultValue,
      style: externalStyle,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || "");

    // Use controlled value if provided, otherwise use internal state
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (controlledValue === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    // Size configurations
    const sizeConfig = {
      sm: { width: 200, height: 50, fontSize: "1rem", labelSize: "1.1rem", padding: "8px 16px" },
      md: { width: 280, height: 60, fontSize: "1.2rem", labelSize: "1.25rem", padding: "12px 20px" },
      lg: { width: 360, height: 70, fontSize: "1.4rem", labelSize: "1.4rem", padding: "16px 24px" }
    };

    const config = sizeConfig[size];

    // Dynamic sizing: measure container and grow beyond default if needed
    const { ref: containerRef, w: measuredW } = useSketchSize<HTMLDivElement>(config.width, config.height);
    const w = measuredW;
    const h = config.height;

    // Default colors with customization support
    const inputColors = {
      bg: colors?.bg || SK.bg,
      bgOverlay: colors?.bgOverlay || SK.bgOverlay,
      stroke: colors?.stroke || SK.stroke,
      text: colors?.text || SK.text,
      label: colors?.label || SK.text,
    };

    // Default typography with customization support
    const inputTypography = {
      fontSize: typography?.fontSize || config.fontSize,
      fontWeight: typography?.fontWeight || "400",
      fontFamily: typography?.fontFamily || SK.font,
      labelSize: typography?.labelSize || config.labelSize,
    };

    // Disabled state overrides
    const finalColors = disabled ? {
      bg: SK_DISABLED.bg,
      bgOverlay: SK_DISABLED.bgOverlay,
      stroke: SK_DISABLED.stroke,
      text: SK_DISABLED.text,
      label: SK_DISABLED.text,
    } : inputColors;

    const uid = useId();
    const linesId = `notebookLines${uid}`;

    const bgPath = `M 8 6
      C 10 4.5, 15 4, 20 4
      L ${w * 0.375} 3.5
      C ${w * 0.4375} 3.5, ${w * 0.5} 3.5, ${w * 0.5625} 4
      L ${w * 0.875} 4.5
      C ${w * 0.90625} 5, ${w * 0.9375} 6, ${w * 0.95} 8
      C ${w * 0.9625} 10, ${w * 0.971875} 13, ${w * 0.975} 18
      L ${w * 0.978125} ${h * 0.743}
      C ${w * 0.975} ${h * 0.829}, ${w * 0.96875} ${h * 0.886}, ${w * 0.953125} ${h * 0.914}
      L ${w * 0.875} ${h * 0.936}
      C ${w * 0.8125} ${h * 0.943}, ${w * 0.75} ${h * 0.943}, ${w * 0.6875} ${h * 0.943}
      L ${w * 0.3125} ${h * 0.936}
      C ${w * 0.25} ${h * 0.936}, ${w * 0.1875} ${h * 0.929}, ${w * 0.125} ${h * 0.921}
      L ${w * 0.046875} ${h * 0.914}
      C ${w * 0.03125} ${h * 0.9}, ${w * 0.01875} ${h * 0.857}, ${w * 0.0125} ${h * 0.786}
      L ${w * 0.009375} ${h * 0.214}
      C ${w * 0.010938} ${h * 0.157}, ${w * 0.015625} ${h * 0.114}, 8 6 Z`;

    const borderPath1 = `M 7.5 6
      C 9.5 4.8, 14.5 4.2, 19.5 4
      L ${w * 0.371875} 3.8
      C ${w * 0.434375} 3.8, ${w * 0.496875} 3.8, ${w * 0.559375} 4.2
      L ${w * 0.871875} 4.8
      C ${w * 0.903125} 5.2, ${w * 0.928125} 6.2, ${w * 0.946875} 8.2
      C ${w * 0.96875} 10.2, ${w * 0.96875} 13.2, ${w * 0.975} 18.2
      L ${w * 0.975} ${h * 0.746}
      C ${w * 0.971875} ${h * 0.831}, ${w * 0.965625} ${h * 0.889}, ${w * 0.95} ${h * 0.917}
      L ${w * 0.871875} ${h * 0.94}
      C ${w * 0.809375} ${h * 0.946}, ${w * 0.746875} ${h * 0.946}, ${w * 0.684375} ${h * 0.946}
      L ${w * 0.309375} ${h * 0.94}
      C ${w * 0.246875} ${h * 0.94}, ${w * 0.184375} ${h * 0.931}, ${w * 0.121875} ${h * 0.926}
      L ${w * 0.0453125} ${h * 0.917}
      C ${w * 0.0296875} ${h * 0.903}, ${w * 0.0171875} ${h * 0.86}, ${w * 0.0109375} ${h * 0.789}
      L ${w * 0.0078125} ${h * 0.217}
      C ${w * 0.009375} ${h * 0.16}, ${w * 0.0140625} ${h * 0.117}, 7.5 6 Z`;

    const borderPath2 = `M 8.5 6.5
      C 10.5 5, 15.5 4.5, 20.5 4.3
      L ${w * 0.376563} 4
      C ${w * 0.439063} 4, ${w * 0.501563} 4, ${w * 0.564063} 4.5
      L ${w * 0.876563} 5
      C ${w * 0.907813} 5.5, ${w * 0.932813} 6.5, ${w * 0.951563} 8.5
      C ${w * 0.973438} 10.5, ${w * 0.973438} 13.5, ${w * 0.979688} 18.5
      L ${w * 0.979688} ${h * 0.75}
      C ${w * 0.976563} ${h * 0.836}, ${w * 0.970313} ${h * 0.893}, ${w * 0.954688} ${h * 0.921}
      L ${w * 0.876563} ${h * 0.943}
      C ${w * 0.814063} ${h * 0.95}, ${w * 0.751563} ${h * 0.95}, ${w * 0.689063} ${h * 0.95}
      L ${w * 0.314063} ${h * 0.943}
      C ${w * 0.251563} ${h * 0.943}, ${w * 0.189063} ${h * 0.936}, ${w * 0.126563} ${h * 0.929}
      L ${w * 0.0484375} ${h * 0.921}
      C ${w * 0.0328125} ${h * 0.907}, ${w * 0.0203125} ${h * 0.864}, ${w * 0.0140625} ${h * 0.793}
      L ${w * 0.0109375} ${h * 0.221}
      C ${w * 0.0125} ${h * 0.164}, ${w * 0.0171875} ${h * 0.121}, 8.5 6.5 Z`;

    return (
      <div style={{ position: "relative" }}>
        {/* Label */}
        {label && (
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontFamily: inputTypography.fontFamily,
              fontSize: inputTypography.labelSize,
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
          ref={containerRef}
          className={cn("sketch-input-container", className)}
          style={{
            position: "relative",
            minWidth: `${config.width}px`,
            height: `${h}px`,
            transform: disabled
              ? "rotate(-0.1deg)"
              : isFocused
                ? "rotate(-0.8deg)"
                : "rotate(-0.3deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              filter: disabled
                ? "drop-shadow(1px 2px 0px rgba(0,0,0,0.06)) grayscale(0.3) opacity(0.7)"
                : isFocused
                  ? 'drop-shadow(2px 3px 0px rgba(0,0,0,0.12)) drop-shadow(3px 5px 8px rgba(0,0,0,0.08))'
                  : 'drop-shadow(1px 2px 0px rgba(0,0,0,0.08)) drop-shadow(2px 3px 6px rgba(0,0,0,0.05))',
              transition: 'filter 0.3s ease',
            }}
          >
            <defs>
              {/* Notebook line pattern */}
              <pattern
                id={linesId}
                x="0"
                y="0"
                width={w}
                height={h}
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1={h / 2}
                  x2={w}
                  y2={h / 2}
                  stroke="#d4c5b0"
                  strokeWidth="0.8"
                  opacity="0.3"
                  strokeDasharray="2,1"
                />
              </pattern>
            </defs>

            <SketchPaper d={bgPath} w={w} h={h} fine
              bg={finalColors.bg} overlay={finalColors.bgOverlay}
              overlayOpacity={disabled ? "0.3" : "0.6"} noiseOpacity={0.12} />

            {/* Notebook line */}
            <rect x="0" y="0" width={w} height={h} fill={`url(#${linesId})`} />

            <SketchBorder d1={borderPath1} d2={borderPath2} stroke={finalColors.stroke}
              w1={isFocused ? 3 : 2.2} dash="1.5,0.8"
              o1={disabled ? 0.3 : (isFocused ? 0.9 : 0.75)}
              o2={disabled ? 0.15 : 0.25} show={showBorder}
              style={{ transition: 'all 0.3s ease' }} />

            {/* Focus state: Extra emphasized stroke */}
            {showBorder && isFocused && !disabled && (
              <path
                d={`M 6.5 5.5
                   C 8.5 4, 13.5 3.5, 18.5 3.5
                   L ${w * 0.36875} 3
                   C ${w * 0.43125} 3, ${w * 0.49375} 3, ${w * 0.55625} 3.5
                   L ${w * 0.86875} 4
                   C ${w * 0.9} 4.5, ${w * 0.925} 5.5, ${w * 0.94375} 7.5
                   L ${w * 0.971875} ${h * 0.736}
                   C ${w * 0.9625} ${h * 0.821}, ${w * 0.9625} ${h * 0.879}, ${w * 0.946875} ${h * 0.907}
                   L ${w * 0.86875} ${h * 0.929}
                   C ${w * 0.80625} ${h * 0.936}, ${w * 0.74375} ${h * 0.936}, ${w * 0.68125} ${h * 0.936}
                   L ${w * 0.30625} ${h * 0.929}
                   C ${w * 0.24375} ${h * 0.929}, ${w * 0.18125} ${h * 0.921}, ${w * 0.11875} ${h * 0.914}
                   L ${w * 0.0421875} ${h * 0.907}
                   C ${w * 0.0265625} ${h * 0.893}, ${w * 0.0140625} ${h * 0.85}, ${w * 0.0078125} ${h * 0.779}
                   L ${w * 0.0046875} ${h * 0.207}
                   C ${w * 0.00625} ${h * 0.15}, ${w * 0.0109375} ${h * 0.107}, 6.5 5.5 Z`}
                stroke={finalColors.stroke}
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
                strokeDasharray="2,1"
              />
            )}

            {/* Small doodle on the side */}
            <g opacity="0.5">
              <circle
                cx={w * 0.9375}
                cy={h * 0.214}
                r="2.5"
                stroke={finalColors.stroke}
                strokeWidth="1"
                fill="none"
              />
            </g>
          </svg>

          {/* Actual input element - absolutely positioned over the SVG */}
          <input
            ref={ref}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className="sketch-input-field"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              fontFamily: inputTypography.fontFamily,
              fontSize: inputTypography.fontSize,
              fontWeight: inputTypography.fontWeight,
              color: finalColors.text,
              padding: config.padding,
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              boxShadow: "none",
              cursor: disabled ? "not-allowed" : "text",
              ...externalStyle,
            }}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };