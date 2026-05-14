import React, { useId, useState } from "react";
import { cn, SK, useDispFilterId, noiseUrl } from "../../lib";

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "square";
  width?: number; // Custom width in pixels
  // Customization props
  colors?: {
    bg?: string;
    fallbackBg?: string;
    stroke?: string;
    text?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
  };
  showBorder?: boolean;
  showShadow?: boolean;
  onClick?: () => void;
  className?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "Avatar",
      initials,
      size = "md",
      shape = "circle",
      width,
      colors,
      typography,
      showBorder = true,
      showShadow = true,
      onClick,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    const uid = useId();
    const shadingId = `ps${uid}`;
    const clipId = `ac${uid}`;
    const dispAvatarId = useDispFilterId("dispAvatar");

    // Size configurations
    const sizeConfig = {
      sm: { width: 60, height: 60, fontSize: "1.4rem", strokeWidth: 3 },
      md: { width: 90, height: 90, fontSize: "2rem", strokeWidth: 4 },
      lg: { width: 120, height: 120, fontSize: "2.8rem", strokeWidth: 5 },
    };

    // Use custom width if provided, otherwise use size configuration
    const actualWidth = width || sizeConfig[size].width;
    const actualHeight = width ? width : sizeConfig[size].height; // Keep it square
    const config = {
      width: actualWidth,
      height: actualHeight,
      fontSize: width ? `${width / 30}rem` : sizeConfig[size].fontSize, // Scale font size based on custom width
      strokeWidth: width
        ? Math.max(1, Math.floor(width / 20))
        : sizeConfig[size].strokeWidth, // Scale stroke width based on custom width
    };

    const center = config.width / 2;
    const radius = center - 8;

    // Default colors with customization support
    const avatarColors = {
      bg: colors?.bg || SK.bg,
      fallbackBg: colors?.fallbackBg || "#e8e4dc",
      stroke: colors?.stroke || SK.stroke,
      text: colors?.text || SK.text,
    };

    // Default typography with customization support
    const avatarTypography = {
      fontSize: typography?.fontSize || config.fontSize,
      fontWeight: typography?.fontWeight || "500",
      fontFamily: typography?.fontFamily || SK.font,
    };

    // Determine what to display
    const showImage = src && !imageError;
    const displayInitials = initials || "?";
    const firstInitial = displayInitials.charAt(0).toUpperCase();

    // Generate wobbly circle path for hand-drawn effect
    const wobbleCirclePath = `
      M ${center + radius} ${center}
      C ${center + radius + 2} ${center - radius * 0.35},
        ${center + radius * 0.72} ${center - radius * 0.75},
        ${center + radius * 0.15} ${center - radius + 2}
      C ${center - radius * 0.4} ${center - radius - 1},
        ${center - radius + 1} ${center - radius * 0.65},
        ${center - radius - 2} ${center + radius * 0.1}
      C ${center - radius - 1} ${center + radius * 0.45},
        ${center - radius * 0.68} ${center + radius * 0.78},
        ${center - radius * 0.1} ${center + radius}
      C ${center + radius * 0.38} ${center + radius + 1},
        ${center + radius * 0.75} ${center + radius * 0.7},
        ${center + radius + 1} ${center}
    `;

    // Wobbly square path
    const wobbleSquarePath = `
      M ${center - radius + 3} ${center - radius - 2}
      L ${center + radius - 2} ${center - radius + 2}
      L ${center + radius + 2} ${center + radius - 3}
      L ${center - radius - 2} ${center + radius + 2}
      Z
    `;

    const borderPath = shape === "circle" ? wobbleCirclePath : wobbleSquarePath;

    return (
      <div
        ref={ref}
        className={cn("sketch-avatar", onClick && "cursor-pointer", className)}
        role={onClick ? "button" : "img"}
        aria-label={alt}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        style={{
          width: actualWidth,
          height: actualHeight,
          transform: isHovered
            ? "translate(-1px, -1px) rotate(-1deg)"
            : "rotate(0.5deg)",
          filter: isHovered
            ? "drop-shadow(3px 4px 0px rgba(0,0,0,0.12)) drop-shadow(4px 6px 8px rgba(0,0,0,0.1))"
            : "drop-shadow(2px 2px 0px rgba(0,0,0,0.1)) drop-shadow(2px 4px 6px rgba(0,0,0,0.08))",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        {...props}
      >
        <svg
          width={actualWidth}
          height={actualHeight}
          viewBox={`0 0 ${actualWidth} ${actualHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <defs>
            {/* Pencil shading pattern */}
            <pattern
              id={shadingId}
              x="0"
              y="0"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-45)"
            >
              <line
                x1="0"
                y1="3"
                x2="6"
                y2="3"
                stroke={avatarColors.stroke}
                strokeWidth="0.5"
                opacity="0.15"
              />
            </pattern>

            {/* Clip path for image/content */}
            <clipPath id={clipId}>
              {shape === "circle" ? (
                <circle cx={center} cy={center} r={radius - 4} />
              ) : (
                <rect
                  x={center - radius + 4}
                  y={center - radius + 4}
                  width={(radius - 4) * 2}
                  height={(radius - 4) * 2}
                  rx="3"
                />
              )}
            </clipPath>
          </defs>

          {/* Paper background */}
          <path d={borderPath} fill={avatarColors.bg} opacity="0.8" />

          <rect
            x="0"
            y="0"
            width={actualWidth}
            height={actualHeight}
            fill={noiseUrl()}
            opacity="0.15"
          />

          {/* Pencil shading layer */}
          <path d={borderPath} fill={`url(#${shadingId})`} opacity="0.15" />

          {/* Content: Image or Initials */}
          <g clipPath={`url(#${clipId})`}>
            {showImage ? (
              <image
                href={src}
                x={center - radius + 4}
                y={center - radius + 4}
                width={(radius - 4) * 2}
                height={(radius - 4) * 2}
                preserveAspectRatio="xMidYMid slice"
                onError={() => setImageError(true)}
              />
            ) : (
              <>
                {/* Fallback background */}
                <rect
                  x={center - radius + 4}
                  y={center - radius + 4}
                  width={(radius - 4) * 2}
                  height={(radius - 4) * 2}
                  fill={avatarColors.fallbackBg}
                />

                {/* Initials or fallback doodle */}
                {initials ? (
                  <text
                    x={center}
                    y={center}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                      fontFamily: avatarTypography.fontFamily,
                      fontSize: avatarTypography.fontSize,
                      fontWeight: avatarTypography.fontWeight,
                      fill: avatarColors.text,
                      opacity: 0.85,
                    }}
                  >
                    {firstInitial}
                  </text>
                ) : (
                  // Simple doodle face fallback
                  <g transform={`translate(${center}, ${center})`}>
                    {/* Face circle */}
                    <circle
                      cx="0"
                      cy="0"
                      r={radius * 0.5}
                      fill="none"
                      stroke={avatarColors.stroke}
                      strokeWidth="2"
                      opacity="0.6"
                      filter={`url(#${dispAvatarId})`}
                    />
                    {/* Left eye */}
                    <circle
                      cx={-radius * 0.18}
                      cy={-radius * 0.1}
                      r={radius * 0.08}
                      fill={avatarColors.stroke}
                      opacity="0.75"
                    />
                    {/* Right eye */}
                    <circle
                      cx={radius * 0.18}
                      cy={-radius * 0.1}
                      r={radius * 0.08}
                      fill={avatarColors.stroke}
                      opacity="0.75"
                    />
                    {/* Smile */}
                    <path
                      d={`M ${-radius * 0.22} ${radius * 0.15} Q 0 ${radius * 0.28} ${radius * 0.22} ${radius * 0.15}`}
                      fill="none"
                      stroke={avatarColors.stroke}
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.7"
                      filter={`url(#${dispAvatarId})`}
                    />
                  </g>
                )}
              </>
            )}
          </g>

          {/* Main sketchy border */}
          {showBorder && (
            <path
              d={borderPath}
              fill="none"
              stroke={avatarColors.stroke}
              strokeWidth={config.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
              filter={`url(#${dispAvatarId})`}
              strokeDasharray="1,0.3"
            />
          )}

          {/* Hover state: extra sketchy highlight */}
          {isHovered && (
            <path
              d={borderPath}
              fill="none"
              stroke={avatarColors.stroke}
              strokeWidth={config.strokeWidth + 1}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.15"
              transform="translate(1, 1)"
              filter={`url(#${dispAvatarId})`}
              style={{
                animation: "avatarGlow 0.6s ease-in-out infinite alternate",
              }}
            />
          )}

          {/* Shadow/smudge effect beneath */}
          {showShadow && (
            <ellipse
              cx={center + 2}
              cy={center + radius + 2}
              rx={radius * 0.6}
              ry={radius * 0.15}
              fill={avatarColors.stroke}
              opacity="0.08"
              filter={`url(#${dispAvatarId})`}
            />
          )}
        </svg>
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar };
