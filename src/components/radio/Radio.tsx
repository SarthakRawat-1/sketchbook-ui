import React, { useState } from "react";
import { cn, SketchBorder, noiseUrl, SK, SK_DISABLED } from "../../lib";


interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  size?: "sm" | "md" | "lg";
  // Customization props
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    fill?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
  };
  showBorder?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  rotation?: number;
  size?: "sm" | "md" | "lg";
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    fill?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
  };
  showBorder?: boolean;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      options,
      size = "md",
      colors,
      typography,
      showBorder = true,
      defaultValue,
      value: controlledValue,
      onChange,
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || "");

    // Use controlled value if provided, otherwise use internal state
    const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;

    const handleChange = (value: string) => {
      if (disabled) return;

      if (controlledValue === undefined) {
        setInternalValue(value);
      }
      onChange?.(value);
    };

    return (
      <div 
        ref={ref} 
        className={cn("sketch-radio-group", className)} 
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        {...props}
      >
        {options.map((option, index) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
            rotation={index % 2 === 0 ? -0.2 : 0.2}
            size={size}
            colors={colors}
            typography={typography}
            showBorder={showBorder}
            disabled={disabled}
          />
        ))}
      </div>
    );
  }
);

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      name,
      value,
      label,
      checked,
      onChange,
      rotation = -0.3,
      size = "md",
      colors,
      typography,
      showBorder = true,
      disabled = false,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

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

    // Size configurations
    const sizeConfig = {
      sm: { width: 32, height: 32, fontSize: "1.1rem" },
      md: { width: 40, height: 40, fontSize: "1.35rem" },
      lg: { width: 48, height: 48, fontSize: "1.6rem" }
    };

    const config = sizeConfig[size];

    // Default colors with customization support
    const radioColors = {
      bg: colors?.bg || SK.bg,
      bgOverlay: colors?.bgOverlay || SK.bgOverlay,
      stroke: colors?.stroke || SK.stroke,
      text: colors?.text || SK.text,
      fill: colors?.fill || SK.text,
    };

    // Default typography with customization support
    const radioTypography = {
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
      fill: SK_DISABLED.text,
    } : radioColors;

    const w = config.width;
    const h = config.height;

    return (
      <label
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          gap: "0.75rem",
          transform: disabled ? "rotate(-0.1deg)" : `rotate(${rotation}deg)`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hidden native radio for accessibility */}
        <input
          ref={ref}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Custom radio visual */}
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
            {/* Paper background - circular */}
            <circle cx={w * 0.5} cy={h * 0.5} r={w * 0.45} fill={finalColors.bg} stroke="none" />
            <circle cx={w * 0.5} cy={h * 0.5} r={w * 0.45} fill={finalColors.bgOverlay} opacity={disabled ? "0.3" : "0.6"} />
            <rect x="0" y="0" width={w} height={h} fill={noiseUrl()} opacity={0.12} />

            {/* Focus ring */}
            {isFocused && !disabled && (
              <circle cx={w * 0.5} cy={h * 0.5} r={w * 0.45}
                fill="none" stroke={finalColors.stroke}
                strokeWidth="2.5" strokeDasharray="3,2.5" opacity="0.45"
                strokeLinecap="round" />
            )}

            <SketchBorder
              d1={`M ${w * 0.075} ${h * 0.5}
                C ${w * 0.075} ${h * 0.25}, ${w * 0.2} ${w * 0.08}, ${w * 0.5} ${w * 0.08}
                C ${w * 0.8} ${w * 0.08}, ${w * 0.925} ${h * 0.25}, ${w * 0.925} ${h * 0.5}
                C ${w * 0.925} ${h * 0.75}, ${w * 0.8} ${w * 0.92}, ${w * 0.5} ${w * 0.92}
                C ${w * 0.2} ${w * 0.92}, ${w * 0.075} ${h * 0.75}, ${w * 0.075} ${h * 0.5} Z`}
              d2={`M ${w * 0.1} ${h * 0.5}
                C ${w * 0.1} ${h * 0.275}, ${w * 0.225} ${w * 0.105}, ${w * 0.5} ${w * 0.105}
                C ${w * 0.775} ${w * 0.105}, ${w * 0.9} ${h * 0.275}, ${w * 0.9} ${h * 0.5}
                C ${w * 0.9} ${h * 0.725}, ${w * 0.775} ${w * 0.895}, ${w * 0.5} ${w * 0.895}
                C ${w * 0.225} ${w * 0.895}, ${w * 0.1} ${h * 0.725}, ${w * 0.1} ${h * 0.5} Z`}
              stroke={finalColors.stroke}
              w1={isFocused ? 3 : (isHovered || checked ? 2.5 : 2)}
              o1={disabled ? 0.3 : (isFocused || isHovered || checked ? 0.9 : 0.75)}
              o2={disabled ? 0.15 : 0.25} show={showBorder}
              style={{ transition: 'all 0.3s ease' }} />

            {/* Hover state: Light pencil pressure mark */}
            {isHovered && !checked && !disabled && (
              <circle cx={w * 0.5} cy={h * 0.5} r={w * 0.3}
                fill={finalColors.stroke} opacity="0.025"
                style={{ transition: 'opacity 0.3s ease' }} />
            )}

            {/* Checked state: Hand-drawn filled dot */}
            {checked && (
              <g style={{ animation: 'radioDotAppear 0.4s ease', transformOrigin: 'center' }}>
                <circle cx={w * 0.5} cy={h * 0.5} r={w * 0.2125}
                  fill={finalColors.fill} opacity={disabled ? 0.4 : 0.7} />
                <path d={`M ${w * 0.35} ${h * 0.5} L ${w * 0.65} ${h * 0.5}`}
                  stroke={finalColors.fill} strokeWidth="1.5" opacity={disabled ? 0.2 : 0.4} strokeLinecap="round" />
                <path d={`M ${w * 0.375} ${h * 0.45} L ${w * 0.625} ${h * 0.45}`}
                  stroke={finalColors.fill} strokeWidth="1.5" opacity={disabled ? 0.18 : 0.35} strokeLinecap="round" />
                <path d={`M ${w * 0.375} ${h * 0.55} L ${w * 0.625} ${h * 0.55}`}
                  stroke={finalColors.fill} strokeWidth="1.5" opacity={disabled ? 0.18 : 0.35} strokeLinecap="round" />
                <path d={`M ${w * 0.4} ${h * 0.4} L ${w * 0.6} ${h * 0.4}`}
                  stroke={finalColors.fill} strokeWidth="1.3" opacity={disabled ? 0.15 : 0.3} strokeLinecap="round" />
                <path d={`M ${w * 0.4} ${h * 0.6} L ${w * 0.6} ${h * 0.6}`}
                  stroke={finalColors.fill} strokeWidth="1.3" opacity={disabled ? 0.15 : 0.3} strokeLinecap="round" />
                <path d={`M ${w * 0.4} ${h * 0.425} L ${w * 0.6} ${h * 0.625}`}
                  stroke={finalColors.fill} strokeWidth="1" opacity={disabled ? 0.1 : 0.2} strokeLinecap="round" />
                <path d={`M ${w * 0.6} ${h * 0.425} L ${w * 0.4} ${h * 0.625}`}
                  stroke={finalColors.fill} strokeWidth="1" opacity={disabled ? 0.1 : 0.2} strokeLinecap="round" />
                <circle cx={w * 0.5} cy={h * 0.5} r={w * 0.075}
                  fill={finalColors.fill} opacity={disabled ? 0.25 : 0.5} />
                <circle cx={w * 0.5} cy={h * 0.3} r="0.8" fill={finalColors.fill} opacity={disabled ? 0.15 : 0.3} />
                <circle cx={w * 0.7} cy={h * 0.5} r="0.8" fill={finalColors.fill} opacity={disabled ? 0.15 : 0.3} />
                <circle cx={w * 0.5} cy={h * 0.7} r="0.8" fill={finalColors.fill} opacity={disabled ? 0.15 : 0.3} />
                <circle cx={w * 0.3} cy={h * 0.5} r="0.8" fill={finalColors.fill} opacity={disabled ? 0.15 : 0.3} />
              </g>
            )}

            <g opacity={disabled ? 0.2 : 0.4}>
              <circle cx={w * 0.85} cy={h * 0.15} r="1.2"
                stroke={finalColors.stroke} strokeWidth="0.8" fill="none" />
            </g>
          </svg>
        </div>

        {/* Label text */}
        <span
          style={{
            fontFamily: radioTypography.fontFamily,
            fontSize: radioTypography.fontSize,
            fontWeight: radioTypography.fontWeight,
            color: finalColors.text,
            userSelect: 'none',
            transform: isHovered && !disabled ? 'translateX(2px)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          {label}
        </span>

      </label>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
Radio.displayName = "Radio";

export { RadioGroup, Radio };