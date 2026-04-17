import React, { useState } from "react";
import {
  cn,
  SketchPaper,
  SketchBorder,
  SK,
  SK_DISABLED,
  useSketchSize,
} from "../../lib";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
    fontFamily?: string;
  };
  showBorder?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "md",
      iconOnly = false,
      colors,
      typography,
      showBorder = true,
      children,
      className = "",
      disabled,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        setIsHovered(true);
        onMouseEnter?.(e);
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (!disabled) setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const sizeConfig = {
      sm: iconOnly
        ? { width: 70, height: 70, fontSize: "1.8rem" }
        : { width: 180, height: 70, fontSize: "1.4rem" },
      md: iconOnly
        ? { width: 90, height: 90, fontSize: "2.2rem" }
        : { width: 220, height: 90, fontSize: "1.75rem" },
      lg: iconOnly
        ? { width: 110, height: 110, fontSize: "2.6rem" }
        : { width: 260, height: 110, fontSize: "2rem" },
    };

    const config = sizeConfig[size];

    const buttonColors = {
      bg: colors?.bg || SK.bg,
      bgOverlay: colors?.bgOverlay || SK.bgOverlay,
      stroke: colors?.stroke || SK.stroke,
      text: colors?.text || SK.text,
    };

    const buttonTypography = {
      fontSize: typography?.fontSize || config.fontSize,
      fontWeight: typography?.fontWeight || "500",
      textTransform: typography?.textTransform || "none",
      fontFamily: typography?.fontFamily || SK.font,
    };

    const finalColors = disabled
      ? {
          bg: SK_DISABLED.bg,
          bgOverlay: SK_DISABLED.bgOverlay,
          stroke: SK_DISABLED.stroke,
          text: SK_DISABLED.text,
        }
      : buttonColors;

    // Dynamic sizing: measure content and grow beyond minimum if needed
    const hPad = 60; // horizontal padding inside the SVG for content
    const { ref: sizerRef, w: contentW } = useSketchSize<HTMLSpanElement>();
    const w = iconOnly ? config.width : Math.max(config.width, contentW + hPad);
    const h = config.height;

    const bgPath = `M ${w * 0.055} ${h * 0.089}
      C ${w * 0.064} ${h * 0.067}, ${w * 0.082} ${h * 0.056}, ${w * 0.1} ${h * 0.056}
      L ${w * 0.386} ${h * 0.044}
      C ${w * 0.418} ${h * 0.044}, ${w * 0.445} ${h * 0.05}, ${w * 0.477} ${h * 0.056}
      L ${w * 0.75} ${h * 0.067}
      C ${w * 0.782} ${h * 0.072}, ${w * 0.809} ${h * 0.078}, ${w * 0.841} ${h * 0.089}
      C ${w * 0.864} ${h * 0.1}, ${w * 0.886} ${h * 0.122}, ${w * 0.9} ${h * 0.167}
      L ${w * 0.932} ${h * 0.311}
      C ${w * 0.941} ${h * 0.389}, ${w * 0.945} ${h * 0.467}, ${w * 0.941} ${h * 0.533}
      L ${w * 0.936} ${h * 0.722}
      C ${w * 0.932} ${h * 0.778}, ${w * 0.923} ${h * 0.833}, ${w * 0.9} ${h * 0.867}
      L ${w * 0.841} ${h * 0.911}
      C ${w * 0.809} ${h * 0.928}, ${w * 0.773} ${h * 0.933}, ${w * 0.741} ${h * 0.933}
      L ${w * 0.445} ${h * 0.944}
      C ${w * 0.4} ${h * 0.944}, ${w * 0.355} ${h * 0.939}, ${w * 0.309} ${h * 0.933}
      L ${w * 0.127} ${h * 0.922}
      C ${w * 0.1} ${h * 0.917}, ${w * 0.073} ${h * 0.9}, ${w * 0.055} ${h * 0.867}
      C ${w * 0.036} ${h * 0.833}, ${w * 0.027} ${h * 0.778}, ${w * 0.023} ${h * 0.722}
      L ${w * 0.018} ${h * 0.533}
      C ${w * 0.016} ${h * 0.444}, ${w * 0.018} ${h * 0.356}, ${w * 0.023} ${h * 0.278}
      L ${w * 0.032} ${h * 0.167}
      C ${w * 0.036} ${h * 0.122}, ${w * 0.045} ${h * 0.1}, ${w * 0.055} ${h * 0.089} Z`;

    const borderPath1 = `M ${w * 0.05} ${h * 0.089}
      C ${w * 0.059} ${h * 0.061}, ${w * 0.077} ${h * 0.061}, ${w * 0.095} ${h * 0.058}
      L ${w * 0.382} ${h * 0.05}
      C ${w * 0.414} ${h * 0.047}, ${w * 0.441} ${h * 0.05}, ${w * 0.473} ${h * 0.058}
      L ${w * 0.745} ${h * 0.072}
      C ${w * 0.777} ${h * 0.078}, ${w * 0.805} ${h * 0.083}, ${w * 0.836} ${h * 0.094}
      C ${w * 0.859} ${h * 0.106}, ${w * 0.882} ${h * 0.128}, ${w * 0.895} ${h * 0.172}
      L ${w * 0.927} ${h * 0.317}
      C ${w * 0.936} ${h * 0.394}, ${w * 0.941} ${h * 0.472}, ${w * 0.936} ${h * 0.539}
      L ${w * 0.932} ${h * 0.728}
      C ${w * 0.927} ${h * 0.783}, ${w * 0.918} ${h * 0.839}, ${w * 0.895} ${h * 0.872}
      L ${w * 0.836} ${h * 0.917}
      C ${w * 0.805} ${h * 0.933}, ${w * 0.768} ${h * 0.939}, ${w * 0.736} ${h * 0.939}
      L ${w * 0.441} ${h * 0.95}
      C ${w * 0.395} ${h * 0.95}, ${w * 0.35} ${h * 0.944}, ${w * 0.305} ${h * 0.939}
      L ${w * 0.123} ${h * 0.928}
      C ${w * 0.095} ${h * 0.922}, ${w * 0.068} ${h * 0.906}, ${w * 0.05} ${h * 0.872}
      C ${w * 0.032} ${h * 0.839}, ${w * 0.025} ${h * 0.783}, ${w * 0.02} ${h * 0.728}
      L ${w * 0.016} ${h * 0.539}
      C ${w * 0.014} ${h * 0.45}, ${w * 0.016} ${h * 0.361}, ${w * 0.02} ${h * 0.283}
      L ${w * 0.029} ${h * 0.172}
      C ${w * 0.034} ${h * 0.128}, ${w * 0.043} ${h * 0.106}, ${w * 0.05} ${h * 0.089} Z`;

    const borderPath2 = `M ${w * 0.057} ${h * 0.094}
      C ${w * 0.066} ${h * 0.072}, ${w * 0.084} ${h * 0.064}, ${w * 0.102} ${h * 0.061}
      L ${w * 0.389} ${h * 0.053}
      C ${w * 0.42} ${h * 0.05}, ${w * 0.448} ${h * 0.056}, ${w * 0.48} ${h * 0.061}
      L ${w * 0.752} ${h * 0.078}
      C ${w * 0.784} ${h * 0.083}, ${w * 0.811} ${h * 0.089}, ${w * 0.843} ${h * 0.1}
      C ${w * 0.866} ${h * 0.111}, ${w * 0.889} ${h * 0.133}, ${w * 0.902} ${h * 0.178}
      L ${w * 0.934} ${h * 0.322}
      C ${w * 0.943} ${h * 0.4}, ${w * 0.948} ${h * 0.478}, ${w * 0.943} ${h * 0.544}
      L ${w * 0.939} ${h * 0.733}
      C ${w * 0.934} ${h * 0.789}, ${w * 0.925} ${h * 0.844}, ${w * 0.902} ${h * 0.878}
      L ${w * 0.843} ${h * 0.922}
      C ${w * 0.811} ${h * 0.939}, ${w * 0.775} ${h * 0.944}, ${w * 0.743} ${h * 0.944}
      L ${w * 0.448} ${h * 0.956}
      C ${w * 0.402} ${h * 0.956}, ${w * 0.357} ${h * 0.95}, ${w * 0.311} ${h * 0.944}
      L ${w * 0.129} ${h * 0.933}
      C ${w * 0.102} ${h * 0.928}, ${w * 0.075} ${h * 0.911}, ${w * 0.057} ${h * 0.878}
      C ${w * 0.039} ${h * 0.844}, ${w * 0.03} ${h * 0.789}, ${w * 0.025} ${h * 0.733}
      L ${w * 0.02} ${h * 0.544}
      C ${w * 0.018} ${h * 0.456}, ${w * 0.02} ${h * 0.367}, ${w * 0.025} ${h * 0.289}
      L ${w * 0.034} ${h * 0.178}
      C ${w * 0.039} ${h * 0.133}, ${w * 0.048} ${h * 0.111}, ${w * 0.057} ${h * 0.094} Z`;

    return (
      <button
        ref={ref}
        className={cn("sketch-button", className)}
        style={{
          transform: disabled
            ? "rotate(-0.3deg)"
            : isHovered
              ? "translate(-2px, -2px) rotate(-1.5deg)"
              : "rotate(-0.8deg)",
          filter: disabled
            ? "drop-shadow(1px 2px 0px rgba(0,0,0,0.06)) drop-shadow(2px 3px 4px rgba(0,0,0,0.04)) grayscale(0.3) opacity(0.7)"
            : isHovered
              ? "drop-shadow(4px 5px 0px rgba(0,0,0,0.15)) drop-shadow(6px 8px 10px rgba(0,0,0,0.1)) saturate(1.1)"
              : "drop-shadow(2px 3px 0px rgba(0,0,0,0.12)) drop-shadow(4px 6px 8px rgba(0,0,0,0.08))",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {/* Hidden sizer for content measurement */}
        {!iconOnly && (
          <span
            ref={sizerRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              visibility: "hidden",
              height: 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              fontSize: buttonTypography.fontSize,
              fontWeight: buttonTypography.fontWeight,
              fontFamily: buttonTypography.fontFamily,
            }}
          >
            {children}
          </span>
        )}
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          {/* Focus ring */}
          {isFocused && !disabled && (
            <path
              d={bgPath}
              fill="none"
              stroke={finalColors.stroke}
              strokeWidth="3"
              strokeDasharray="4,3"
              opacity="0.5"
              strokeLinecap="round"
            />
          )}

          <SketchPaper
            d={bgPath}
            w={w}
            h={h}
            fine
            bg={finalColors.bg}
            overlay={finalColors.bgOverlay}
            overlayOpacity={disabled ? "0.4" : "0.7"}
            noiseOpacity={0.15}
          />

          <SketchBorder
            d1={borderPath1}
            d2={borderPath2}
            stroke={finalColors.stroke}
            o1={disabled ? 0.3 : isFocused ? 1 : isHovered ? 0.95 : 0.85}
            w1={isFocused ? 3.5 : undefined}
            o2={disabled ? 0.15 : 0.3}
            show={showBorder}
          />

          {/* Hover effect: Ink smudge */}
          <ellipse
            cx={w * 0.5}
            cy={h * 0.5}
            rx={w * 0.227}
            ry={h * 0.278}
            fill={finalColors.stroke}
            opacity={isHovered ? 0.03 : 0}
            style={{ transition: "opacity 0.4s ease" }}
          />

          {/* Small star doodle */}
          <g opacity="0.65">
            <path
              d={`M ${w * 0.855} ${h * 0.222} L ${w * 0.864} ${h * 0.244} L ${w * 0.873} ${h * 0.222} L ${w * 0.866} ${h * 0.267} L ${w * 0.877} ${h * 0.278} L ${w * 0.864} ${h * 0.289} L ${w * 0.864} ${h * 0.322} L ${w * 0.855} ${h * 0.289} L ${w * 0.841} ${h * 0.3} L ${w * 0.85} ${h * 0.267} L ${w * 0.841} ${h * 0.244} Z`}
              stroke={finalColors.stroke}
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Hover effect: Extra scribble marks */}
          <g
            opacity={isHovered ? 0.4 : 0}
            style={{ transition: "opacity 0.3s ease" }}
          >
            <path
              d={`M ${w * 0.091} ${h * 0.2} Q ${w * 0.1} ${h * 0.178}, ${w * 0.114} ${h * 0.189}`}
              stroke={finalColors.stroke}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M ${w * 0.886} ${h * 0.778} Q ${w * 0.895} ${h * 0.8}, ${w * 0.909} ${h * 0.789}`}
              stroke={finalColors.stroke}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* Text overlay */}
        <div
          className="sketch-button-text"
          style={{
            fontSize: buttonTypography.fontSize,
            fontWeight: buttonTypography.fontWeight,
            textTransform:
              buttonTypography.textTransform as React.CSSProperties["textTransform"],
            fontFamily: buttonTypography.fontFamily,
            transform: disabled
              ? "scale(1)"
              : isHovered
                ? "scale(1.02)"
                : "scale(1)",
            color: finalColors.text,
          }}
        >
          {children}
          {/* Hand-drawn underline */}
          <svg
            className="sketch-button-underline"
            style={{
              opacity: disabled ? 0 : isHovered ? 0.7 : 0.5,
              width: w * 0.45,
              height: h * 0.089,
            }}
            viewBox={`0 0 ${w * 0.45} ${h * 0.089}`}
            fill="none"
          >
            <path
              d={`M ${w * 0.014} ${h * 0.044} Q ${w * 0.054} ${h * 0.033}, ${w * 0.113} ${h * 0.044} Q ${w * 0.171} ${h * 0.056}, ${w * 0.225} ${h * 0.044} Q ${w * 0.279} ${h * 0.033}, ${w * 0.338} ${h * 0.05} Q ${w * 0.392} ${h * 0.056}, ${w * 0.437} ${h * 0.044}`}
              stroke={finalColors.stroke}
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d={`M ${w * 0.018} ${h * 0.056} Q ${w * 0.059} ${h * 0.05}, ${w * 0.117} ${h * 0.056} Q ${w * 0.176} ${h * 0.061}, ${w * 0.23} ${h * 0.056} Q ${w * 0.284} ${h * 0.05}, ${w * 0.342} ${h * 0.061} Q ${w * 0.396} ${h * 0.067}, ${w * 0.432} ${h * 0.056}`}
              stroke={finalColors.stroke}
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              opacity="0.25"
            />
          </svg>
        </div>
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
