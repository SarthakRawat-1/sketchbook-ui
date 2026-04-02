import React, { useState } from "react";
import { cn, SketchPaper, SketchBorder, SK, SK_DISABLED } from "../../lib";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  size?: "sm" | "md" | "lg";
  label?: string;
  // Customization props
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    check?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
  };
  showBorder?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      label,
      colors,
      typography,
      showBorder = true,
      className = "",
      disabled,
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Use controlled checked if provided, otherwise use internal state
    const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

    const handleMouseEnter = (e: React.MouseEvent<HTMLLabelElement>) => {
      if (!disabled) {
        setIsHovered(true);
        onMouseEnter?.(e as unknown as React.MouseEvent<HTMLInputElement>);
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLLabelElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e as unknown as React.MouseEvent<HTMLInputElement>);
    };

    const handleToggle = () => {
      if (disabled) return;

      const newValue = !isChecked;
      if (controlledChecked === undefined) {
        setInternalChecked(newValue);
      }
      onChange?.(newValue);
    };

    // Size configurations
    const sizeConfig = {
      sm: { width: 32, height: 32, fontSize: "1.1rem" },
      md: { width: 40, height: 40, fontSize: "1.35rem" },
      lg: { width: 48, height: 48, fontSize: "1.6rem" }
    };

    const config = sizeConfig[size];

    // Default colors with customization support
    const checkboxColors = {
      bg: colors?.bg || SK.bg,
      bgOverlay: colors?.bgOverlay || SK.bgOverlay,
      stroke: colors?.stroke || SK.stroke,
      text: colors?.text || SK.text,
      check: colors?.check || SK.text,
    };

    // Default typography with customization support
    const checkboxTypography = {
      fontSize: typography?.fontSize || config.fontSize,
      fontWeight: typography?.fontWeight || "400",
      fontFamily: typography?.fontFamily || SK.font,
    };

    // Disabled state overrides
    const finalColors = disabled ? {
      bg: SK_DISABLED.bg,
      bgOverlay: SK_DISABLED.bgOverlay,
      stroke: SK_DISABLED.stroke,
      text: SK_DISABLED.text,
      check: SK_DISABLED.text,
    } : checkboxColors;

    const w = config.width;
    const h = config.height;

    const bgPath = `M ${w * 0.125} ${w * 0.0875}
      C ${w * 0.15} ${w * 0.0625}, ${w * 0.2} ${w * 0.05}, ${w * 0.25} ${w * 0.05}
      L ${w * 0.7} ${w * 0.0625}
      C ${w * 0.775} ${w * 0.0625}, ${w * 0.85} ${w * 0.075}, ${w * 0.9} ${w * 0.1}
      C ${w * 0.9375} ${w * 0.125}, ${w * 0.95} ${w * 0.175}, ${w * 0.95} ${w * 0.225}
      L ${w * 0.9375} ${w * 0.725}
      C ${w * 0.9375} ${w * 0.8}, ${w * 0.925} ${w * 0.85}, ${w * 0.8875} ${w * 0.8875}
      L ${w * 0.75} ${w * 0.925}
      C ${w * 0.675} ${w * 0.9375}, ${w * 0.6} ${w * 0.95}, ${w * 0.525} ${w * 0.95}
      L ${w * 0.3} ${w * 0.9375}
      C ${w * 0.225} ${w * 0.9375}, ${w * 0.15} ${w * 0.925}, ${w * 0.1} ${w * 0.8875}
      C ${w * 0.0625} ${w * 0.85}, ${w * 0.05} ${w * 0.775}, ${w * 0.05} ${w * 0.7}
      L ${w * 0.0625} ${w * 0.25}
      C ${w * 0.0625} ${w * 0.175}, ${w * 0.075} ${w * 0.125}, ${w * 0.125} ${w * 0.0875} Z`;

    const borderPath1 = `M ${w * 0.1125} ${w * 0.095}
      C ${w * 0.1375} ${w * 0.07}, ${w * 0.1875} ${w * 0.0575}, ${w * 0.2375} ${w * 0.0575}
      L ${w * 0.6875} ${w * 0.07}
      C ${w * 0.7625} ${w * 0.07}, ${w * 0.8375} ${w * 0.0825}, ${w * 0.8875} ${w * 0.1075}
      C ${w * 0.925} ${w * 0.1325}, ${w * 0.9375} ${w * 0.1825}, ${w * 0.9375} ${w * 0.2325}
      L ${w * 0.925} ${w * 0.72}
      C ${w * 0.925} ${w * 0.795}, ${w * 0.9125} ${w * 0.845}, ${w * 0.875} ${w * 0.8825}
      L ${w * 0.7375} ${w * 0.92}
      C ${w * 0.6625} ${w * 0.9325}, ${w * 0.5875} ${w * 0.945}, ${w * 0.5125} ${w * 0.945}
      L ${w * 0.2875} ${w * 0.9325}
      C ${w * 0.2125} ${w * 0.9325}, ${w * 0.1375} ${w * 0.92}, ${w * 0.0875} ${w * 0.8825}
      C ${w * 0.05} ${w * 0.845}, ${w * 0.0375} ${w * 0.795}, ${w * 0.0375} ${w * 0.72}
      L ${w * 0.05} ${w * 0.245}
      C ${w * 0.05} ${w * 0.17}, ${w * 0.0625} ${w * 0.12}, ${w * 0.1125} ${w * 0.095} Z`;

    const borderPath2 = `M ${w * 0.125} ${w * 0.1}
      C ${w * 0.15} ${w * 0.075}, ${w * 0.2} ${w * 0.0625}, ${w * 0.25} ${w * 0.0625}
      L ${w * 0.7} ${w * 0.075}
      C ${w * 0.775} ${w * 0.075}, ${w * 0.85} ${w * 0.0875}, ${w * 0.9} ${w * 0.1125}
      C ${w * 0.9375} ${w * 0.1375}, ${w * 0.95} ${w * 0.1875}, ${w * 0.95} ${w * 0.2375}
      L ${w * 0.9375} ${w * 0.725}
      C ${w * 0.9375} ${w * 0.8}, ${w * 0.925} ${w * 0.85}, ${w * 0.8875} ${w * 0.8875}
      L ${w * 0.75} ${w * 0.925}
      C ${w * 0.675} ${w * 0.9375}, ${w * 0.6} ${w * 0.95}, ${w * 0.525} ${w * 0.95}
      L ${w * 0.3} ${w * 0.9375}
      C ${w * 0.225} ${w * 0.9375}, ${w * 0.15} ${w * 0.925}, ${w * 0.1} ${w * 0.8875}
      C ${w * 0.0625} ${w * 0.85}, ${w * 0.05} ${w * 0.775}, ${w * 0.05} ${w * 0.7}
      L ${w * 0.0625} ${w * 0.25}
      C ${w * 0.0625} ${w * 0.175}, ${w * 0.075} ${w * 0.125}, ${w * 0.125} ${w * 0.1} Z`;

    return (
      <label
        className={cn("sketch-checkbox", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          transform: disabled ? "rotate(-0.1deg)" : "rotate(-0.3deg)",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {/* Hidden native checkbox for accessibility */}
        <input
          ref={ref}
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          disabled={disabled}
          className="sr-only"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Custom checkbox visual */}
        <div style={{ position: "relative", display: "inline-block", width: `${w}px`, height: `${h}px` }}>
          <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: disabled
                ? "drop-shadow(1px 1px 0px rgba(0,0,0,0.06)) grayscale(0.3) opacity(0.7)"
                : isHovered
                  ? 'drop-shadow(2px 2px 0px rgba(0,0,0,0.15)) drop-shadow(3px 4px 6px rgba(0,0,0,0.08))'
                  : 'drop-shadow(1px 1px 0px rgba(0,0,0,0.1)) drop-shadow(2px 3px 4px rgba(0,0,0,0.06))',
              transition: 'filter 0.3s ease',
            }}
          >
            <SketchPaper d={bgPath} w={w} h={h}
              bg={finalColors.bg} overlay={finalColors.bgOverlay}
              overlayOpacity={disabled ? "0.3" : "0.6"} noiseOpacity={0.12} />

            {/* Focus ring */}
            {isFocused && !disabled && (
              <path d={bgPath} fill="none" stroke={finalColors.stroke}
                strokeWidth="2.5" strokeDasharray="3,2.5" opacity="0.45"
                strokeLinecap="round" />
            )}

            <SketchBorder d1={borderPath1} d2={borderPath2} stroke={finalColors.stroke}
              w1={isFocused ? 3 : (isHovered || isChecked ? 2.5 : 2)}
              o1={disabled ? 0.3 : (isFocused || isHovered || isChecked ? 0.9 : 0.75)}
              o2={disabled ? 0.15 : 0.25} show={showBorder}
              style={{ transition: 'all 0.3s ease' }} />

            {/* Hover state: Light pencil pressure mark */}
            {isHovered && !isChecked && !disabled && (
              <ellipse
                cx={w * 0.5}
                cy={h * 0.5}
                rx={w * 0.3}
                ry={h * 0.3}
                fill={finalColors.stroke}
                opacity="0.025"
                style={{
                  transition: 'opacity 0.3s ease',
                }}
              />
            )}

            {/* Checked state: Hand-drawn checkmark */}
            {isChecked && (
              <g style={{ animation: 'checkDraw 0.4s ease' }}>
                <path
                  d={`M ${w * 0.25} ${h * 0.475} 
                     L ${w * 0.275} ${h * 0.5}
                     L ${w * 0.3} ${h * 0.5375}
                     L ${w * 0.3375} ${h * 0.575}
                     L ${w * 0.375} ${h * 0.6}
                     L ${w * 0.4125} ${h * 0.625}
                     L ${w * 0.45} ${h * 0.6}
                     L ${w * 0.5} ${h * 0.55}
                     L ${w * 0.55} ${h * 0.4875}
                     L ${w * 0.6} ${h * 0.425}
                     L ${w * 0.65} ${h * 0.3625}
                     L ${w * 0.7} ${h * 0.3}
                     L ${w * 0.7375} ${h * 0.2625}
                     L ${w * 0.75} ${h * 0.25}`}
                  stroke={finalColors.check}
                  strokeWidth="2.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={disabled ? 0.5 : 0.85}
                />

                <path
                  d={`M ${w * 0.2625} ${h * 0.4875} 
                     L ${w * 0.2875} ${h * 0.5125}
                     L ${w * 0.325} ${h * 0.55}
                     L ${w * 0.35} ${h * 0.5875}
                     L ${w * 0.3875} ${h * 0.6125}
                     L ${w * 0.425} ${h * 0.6375}
                     L ${w * 0.4625} ${h * 0.6125}
                     L ${w * 0.5125} ${h * 0.5625}
                     L ${w * 0.5625} ${h * 0.5}
                     L ${w * 0.6125} ${h * 0.4375}
                     L ${w * 0.6625} ${h * 0.375}
                     L ${w * 0.7125} ${h * 0.3125}
                     L ${w * 0.75} ${h * 0.275}
                     L ${w * 0.7625} ${h * 0.2625}`}
                  stroke={finalColors.check}
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={disabled ? 0.25 : 0.4}
                />

                <circle cx={w * 0.375} cy={h * 0.6} r="1.5" fill={finalColors.check} opacity={disabled ? 0.08 : 0.15} />
                <circle cx={w * 0.75} cy={h * 0.25} r="1.5" fill={finalColors.check} opacity={disabled ? 0.08 : 0.15} />
              </g>
            )}

            {/* Small doodle accent */}
            <g opacity={disabled ? 0.2 : 0.4}>
              <line
                x1={w * 0.875}
                y1={h * 0.075}
                x2={w * 0.925}
                y2={h * 0.075}
                stroke={finalColors.stroke}
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>

        {/* Label text */}
        {label && (
          <span
            style={{
              fontFamily: checkboxTypography.fontFamily,
              fontSize: checkboxTypography.fontSize,
              fontWeight: checkboxTypography.fontWeight,
              color: finalColors.text,
              userSelect: 'none',
              transform: isHovered && !disabled ? 'translateX(2px)' : 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            {label}
          </span>
        )}

      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };