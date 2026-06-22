import React, { useEffect, useState } from "react";
import {
  cn,
  SketchPaper,
  SK,
  SK_DISABLED,
  useSketchAssetIds,
  useSketchSize,
} from "../../lib";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
  // Custom size props
  width?: number;
  height?: number;
  // Customization props
  colors?: {
    bg?: string;
    bgOverlay?: string;
    text?: string;
    stroke?: string;
    /** @deprecated Use `stroke` instead */
    border?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
  };
  showShadow?: boolean;
  disabled?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      className = "",
      width,
      height,
      colors,
      typography,
      showShadow = true,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const ids = useSketchAssetIds();
    const usesLegacyBorderProp = colors?.border !== undefined;

    useEffect(() => {
      if (import.meta.env.DEV && usesLegacyBorderProp) {
        console.warn(
          "Badge colors.border is deprecated. Please use colors.stroke instead.",
        );
      }
    }, [usesLegacyBorderProp]);

    // Default variant color mappings
    const defaultVariants = {
      default: { bg: SK.bg, text: SK.text, border: SK.stroke },
      success: { bg: "#e8f5e9", text: "#2d5016", border: "#2d5016" },
      warning: { bg: "#fff9e6", text: "#6b4e00", border: "#6b4e00" },
      error: { bg: "#ffeaea", text: "#6b1515", border: "#6b1515" },
      info: { bg: "#e3f2fd", text: "#0d3c61", border: "#0d3c61" },
    };

    // Merge custom colors with defaults
    const variantColors = defaultVariants[variant];
    const finalColors = {
      bg: colors?.bg || variantColors.bg,
      bgOverlay: colors?.bgOverlay || variantColors.bg,
      text: colors?.text || variantColors.text,
      stroke: colors?.stroke || colors?.border || variantColors.border,
    };

    // Default typography with customization support
    const badgeTypography = {
      fontSize:
        typography?.fontSize ||
        (size === "sm" ? "1.1rem" : size === "md" ? "1.4rem" : "1.7rem"),
      fontWeight: typography?.fontWeight || "600",
      fontFamily: typography?.fontFamily || SK.font,
    };

    // Disabled state overrides
    const disabledColors = disabled
      ? {
          bg: SK_DISABLED.bg,
          bgOverlay: SK_DISABLED.bg,
          text: SK_DISABLED.text,
          stroke: "#cccccc",
        }
      : finalColors;

    // --- Dynamic sizing: measure content and grow beyond minimum ---
    const defaultSizes = {
      sm: { width: 70, height: 60 },
      md: { width: 90, height: 78 },
      lg: { width: 110, height: 96 },
    };
    const baseW = width || defaultSizes[size].width;
    const baseH = height || defaultSizes[size].height;
    const hPad = 36; // horizontal padding inside the hexagon for content
    const { ref: sizerRef, w: contentW } = useSketchSize<HTMLSpanElement>();
    const finalWidth = Math.max(baseW, contentW + hPad);
    const finalHeight = baseH;

    const w = finalWidth;
    const h = finalHeight;
    const cx = w / 2;

    const irregularOffset = Math.min(w, h) * 0.05;
    const wo = [
      0.3, -0.4, 0.2, -0.3, 0.4, -0.2, 0.1, -0.35, 0.25, -0.15, 0.35, -0.45,
    ];

    // Top point
    const p1x = cx + wo[0] * irregularOffset;
    const p1y = h * 0.08 + wo[1] * irregularOffset;
    // Top right
    const p2x = w * 0.85 + wo[2] * irregularOffset;
    const p2y = h * 0.25 + wo[3] * irregularOffset;
    // Bottom right
    const p3x = w * 0.88 + wo[4] * irregularOffset;
    const p3y = h * 0.75 + wo[5] * irregularOffset;
    // Bottom point
    const p4x = cx + wo[6] * irregularOffset;
    const p4y = h * 0.92 + wo[7] * irregularOffset;
    // Bottom left
    const p5x = w * 0.12 + wo[8] * irregularOffset;
    const p5y = h * 0.75 + wo[9] * irregularOffset;
    // Top left
    const p6x = w * 0.15 + wo[10] * irregularOffset;
    const p6y = h * 0.25 + wo[11] * irregularOffset;

    const mainPath = `M ${p1x} ${p1y} L ${p2x} ${p2y} L ${p3x} ${p3y} L ${p4x} ${p4y} L ${p5x} ${p5y} L ${p6x} ${p6y} Z`;
    const offset = 1;
    const secondPath = `M ${p1x + offset} ${p1y + offset} L ${p2x + offset} ${p2y + offset} L ${p3x + offset} ${p3y + offset} L ${p4x + offset} ${p4y + offset} L ${p5x + offset} ${p5y + offset} L ${p6x + offset} ${p6y + offset} Z`;
    const viewBox = `0 0 ${w} ${h}`;

    // Calculate stroke width based on actual size
    const getStrokeWidth = (multiplier: number = 1) => {
      const baseStroke = Math.min(finalWidth, finalHeight) * 0.03; // 3% of smallest dimension
      return Math.max(1.5, baseStroke * multiplier); // Minimum 1.5px
    };

    return (
      <span
        ref={ref}
        className={cn("sketch-badge", className)}
        style={{
          transform: disabled
            ? "rotate(-0.2deg)"
            : isHovered
              ? "rotate(1.5deg) scale(1.05)"
              : "rotate(-0.8deg)",
          cursor: disabled ? "not-allowed" : "default",
        }}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        {...props}
      >
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
            fontSize: badgeTypography.fontSize,
            fontWeight: badgeTypography.fontWeight,
            fontFamily: badgeTypography.fontFamily,
          }}
        >
          {children}
        </span>
        <svg
          width={finalWidth}
          height={finalHeight}
          viewBox={viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "block",
            filter: disabled ? "grayscale(0.3) opacity(0.7)" : "none",
          }}
        >
          <SketchPaper
            d={mainPath}
            w={finalWidth}
            h={finalHeight}
            bg={disabledColors.bg}
            overlay={disabledColors.bgOverlay}
            overlayOpacity={0.5}
            noiseOpacity={0.15}
          />

          {/* Primary sketchy border - main thick stroke */}
          <path
            d={mainPath}
            fill="none"
            stroke={disabledColors.stroke}
            strokeWidth={getStrokeWidth(1.2)}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={disabled ? "0.4" : "0.85"}
            strokeDasharray="1,0.5"
            filter={`url(#${ids.dispBadgeId})`}
          />

          {/* Secondary sketchy border - offset thinner stroke */}
          <path
            d={secondPath}
            fill="none"
            stroke={disabledColors.stroke}
            strokeWidth={getStrokeWidth(0.7)}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={disabled ? "0.15" : "0.3"}
          />

          {/* Subtle shadow beneath */}
          {showShadow && (
            <ellipse
              cx={finalWidth / 2}
              cy={finalHeight - Math.max(2, finalHeight * 0.05)}
              rx={finalWidth * 0.35}
              ry={finalHeight * 0.12}
              fill="#2a2a2a"
              opacity={disabled ? "0.05" : "0.1"}
            />
          )}

          {/* Hover effect - subtle highlight */}
          {isHovered && !disabled && (
            <path d={mainPath} fill={disabledColors.stroke} opacity="0.04" />
          )}
        </svg>

        {/* Content overlay */}
        <span
          className="sketch-badge-content"
          style={{
            fontFamily: badgeTypography.fontFamily,
            fontSize: badgeTypography.fontSize,
            fontWeight: badgeTypography.fontWeight,
            color: disabledColors.text,
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {children}
        </span>
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
