import React, { useId, useState } from "react";
import {
  cn,
  SketchPaper,
  SketchBorder,
  noiseUrl,
  SK,
  SK_DISABLED,
} from "../../lib";

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  size?: "sm" | "md" | "lg";
  label?: string;
  // Customization props
  colors?: {
    track?: string;
    trackChecked?: string;
    thumb?: string;
    thumbChecked?: string;
    stroke?: string;
    strokeChecked?: string;
    text?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
    fontFamily?: string;
  };
  showLabel?: boolean;
  showBorder?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = "md",
      label = "Toggle",
      colors,
      typography,
      showLabel = true,
      showBorder = true,
      className = "",
      disabled,
      checked,
      defaultChecked,
      onChange,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [internalChecked, setInternalChecked] = useState(
      defaultChecked || false,
    );
    const [isFocused, setIsFocused] = useState(false);

    // Use controlled value if provided, otherwise use internal state
    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const newValue = e.target.checked;
      if (checked === undefined) {
        setInternalChecked(newValue);
      }
      onChange?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLLabelElement>) => {
      if (!disabled) {
        setIsHovered(true);
      }
      onMouseEnter?.(e as unknown as React.MouseEvent<HTMLInputElement>);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLLabelElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e as unknown as React.MouseEvent<HTMLInputElement>);
    };

    // Size configurations
    const sizeConfig = {
      sm: {
        trackWidth: 60,
        trackHeight: 32,
        thumbSize: 24,
        fontSize: "0.875rem",
        gap: "0.5rem",
      },
      md: {
        trackWidth: 80,
        trackHeight: 42,
        thumbSize: 32,
        fontSize: "1rem",
        gap: "0.75rem",
      },
      lg: {
        trackWidth: 100,
        trackHeight: 52,
        thumbSize: 40,
        fontSize: "1.125rem",
        gap: "1rem",
      },
    };

    const config = sizeConfig[size];

    const w = config.trackWidth;
    const h = config.trackHeight;
    const sx = w / 80;
    const sy = h / 46;
    const uid = useId();
    const fillId = `mf${uid}`;

    // Default colors - darker and more visible
    const defaultColors = {
      track: SK.bg,
      trackChecked: "#b8e6c9",
      thumb: SK.bg,
      thumbChecked: "#ffffff",
      stroke: SK.stroke,
      strokeChecked: "#7cb89d",
      text: SK.text,
    };

    const finalColors = { ...defaultColors, ...colors };

    // Default typography
    const defaultTypography = {
      fontSize: config.fontSize,
      fontWeight: 500,
      textTransform: "none" as const,
      fontFamily: SK.font,
    };

    const finalTypography = { ...defaultTypography, ...typography };

    return (
      <label
        className={cn(
          "sketch-switch",
          `sketch-switch-${size}`,
          disabled && "opacity-50",
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: disabled
            ? "rotate(0deg)"
            : isHovered
              ? "rotate(-0.4deg) translate(-1px, -1px)"
              : "rotate(-0.2deg)",
          transition: "transform 0.3s ease, filter 0.3s ease",
          filter: disabled
            ? "grayscale(0.5) opacity(0.7)"
            : isHovered
              ? "drop-shadow(2px 3px 0px rgba(0,0,0,0.15)) drop-shadow(3px 4px 6px rgba(0,0,0,0.1)) saturate(1.05)"
              : "drop-shadow(1px 2px 0px rgba(0,0,0,0.12)) drop-shadow(2px 3px 4px rgba(0,0,0,0.08))",
          gap: config.gap,
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

        {/* SVG-based Switch with authentic sketchy design - using exact Figma coordinates */}
        <div style={{ position: "relative", width: w, height: h }}>
          <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: disabled
                ? "grayscale(0.5) opacity(0.7)"
                : isHovered
                  ? "drop-shadow(2px 2px 0px rgba(0,0,0,0.15)) drop-shadow(3px 4px 6px rgba(0,0,0,0.08))"
                  : "drop-shadow(1px 1px 0px rgba(0,0,0,0.1)) drop-shadow(2px 3px 4px rgba(0,0,0,0.06))",
              transition: "filter 0.4s ease",
            }}
          >
            <defs>
              <pattern
                id={fillId}
                x="0"
                y="0"
                width="4"
                height="4"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  width="4"
                  height="4"
                  fill={finalColors.trackChecked}
                  opacity="0.3"
                />
                <line
                  x1="0"
                  y1="2"
                  x2="4"
                  y2="2"
                  stroke={finalColors.strokeChecked}
                  strokeWidth="0.5"
                  opacity="0.4"
                />
              </pattern>
            </defs>

            {/* Track background with paper texture */}
            {(() => {
              const trackPath = `M ${25 * sx} ${4 * sy} C ${18 * sx} ${4 * sy}, ${12 * sx} ${5 * sy}, ${8 * sx} ${8 * sy} C ${4 * sx} ${11 * sy}, ${3 * sx} ${15 * sy}, ${3 * sx} ${20 * sy} L ${3 * sx} ${26 * sy} C ${3 * sx} ${31 * sy}, ${4 * sx} ${35 * sy}, ${8 * sx} ${38 * sy} C ${12 * sx} ${41 * sy}, ${18 * sx} ${42 * sy}, ${25 * sx} ${42 * sy} L ${55 * sx} ${42 * sy} C ${62 * sx} ${42 * sy}, ${68 * sx} ${41 * sy}, ${72 * sx} ${38 * sy} C ${76 * sx} ${35 * sy}, ${77 * sx} ${31 * sy}, ${77 * sx} ${26 * sy} L ${77 * sx} ${20 * sy} C ${77 * sx} ${15 * sy}, ${76 * sx} ${11 * sy}, ${72 * sx} ${8 * sy} C ${68 * sx} ${5 * sy}, ${62 * sx} ${4 * sy}, ${55 * sx} ${4 * sy} L ${25 * sx} ${4 * sy} Z`;
              return (
                <>
                  <SketchPaper
                    d={trackPath}
                    w={w}
                    h={h}
                    bg={finalColors.track}
                    overlay={SK.bgOverlay}
                    noiseOpacity={0.08}
                  />

                  {/* Focus ring */}
                  {isFocused && !disabled && (
                    <path
                      d={trackPath}
                      fill="none"
                      stroke={finalColors.stroke}
                      strokeWidth="2.5"
                      strokeDasharray="3,2.5"
                      opacity="0.45"
                      strokeLinecap="round"
                    />
                  )}
                </>
              );
            })()}

            {/* OFF state: Gray shaded fill */}
            <path
              d={`M ${25 * sx} ${5 * sy} C ${18.5 * sx} ${5 * sy}, ${12.5 * sx} ${6 * sy}, ${8.5 * sx} ${9 * sy} C ${4.5 * sx} ${12 * sy}, ${4 * sx} ${15.5 * sy}, ${4 * sx} ${20 * sy} L ${4 * sx} ${26 * sy} C ${4 * sx} ${30.5 * sy}, ${4.5 * sx} ${34 * sy}, ${8.5 * sx} ${37 * sy} C ${12.5 * sx} ${40 * sy}, ${18.5 * sx} ${41 * sy}, ${25 * sx} ${41 * sy} L ${55 * sx} ${41 * sy} C ${61.5 * sx} ${41 * sy}, ${67.5 * sx} ${40 * sy}, ${71.5 * sx} ${37 * sy} C ${75.5 * sx} ${34 * sy}, ${76 * sx} ${30.5 * sy}, ${76 * sx} ${26 * sy} L ${76 * sx} ${20 * sy} C ${76 * sx} ${15.5 * sy}, ${75.5 * sx} ${12 * sy}, ${71.5 * sx} ${9 * sy} C ${67.5 * sx} ${6 * sy}, ${61.5 * sx} ${5 * sy}, ${55 * sx} ${5 * sy} L ${25 * sx} ${5 * sy} Z`}
              fill={isChecked ? `url(#${fillId})` : "#e8e8e8"}
              opacity={isChecked ? 0.8 : 0.6}
              style={{ transition: "all 0.4s ease" }}
            />

            {/* ON state: Marker-like highlight fill with pencil shading */}
            {isChecked && (
              <g style={{ animation: "fillIn 0.4s ease" }}>
                <path
                  d={`M ${25 * sx} ${6 * sy} C ${19 * sx} ${6 * sy}, ${13 * sx} ${7 * sy}, ${9 * sx} ${10 * sy} C ${5 * sx} ${13 * sy}, ${5 * sx} ${16 * sy}, ${5 * sx} ${20 * sy} L ${5 * sx} ${26 * sy} C ${5 * sx} ${30 * sy}, ${5 * sx} ${33 * sy}, ${9 * sx} ${36 * sy} C ${13 * sx} ${39 * sy}, ${19 * sx} ${40 * sy}, ${25 * sx} ${40 * sy} L ${55 * sx} ${40 * sy} C ${61 * sx} ${40 * sy}, ${67 * sx} ${39 * sy}, ${71 * sx} ${36 * sy} C ${75 * sx} ${33 * sy}, ${75 * sx} ${30 * sy}, ${75 * sx} ${26 * sy} L ${75 * sx} ${20 * sy} C ${75 * sx} ${16 * sy}, ${75 * sx} ${13 * sy}, ${71 * sx} ${10 * sy} C ${67 * sx} ${7 * sy}, ${61 * sx} ${6 * sy}, ${55 * sx} ${6 * sy} L ${25 * sx} ${6 * sy} Z`}
                  fill={finalColors.trackChecked}
                  opacity="0.6"
                />
                <line
                  x1={10 * sx}
                  y1={15 * sy}
                  x2={70 * sx}
                  y2={15 * sy}
                  stroke={finalColors.strokeChecked}
                  strokeWidth="1"
                  opacity="0.25"
                  strokeLinecap="round"
                />
                <line
                  x1={10 * sx}
                  y1={20 * sy}
                  x2={70 * sx}
                  y2={20 * sy}
                  stroke={finalColors.strokeChecked}
                  strokeWidth="1"
                  opacity="0.3"
                  strokeLinecap="round"
                />
                <line
                  x1={10 * sx}
                  y1={25 * sy}
                  x2={70 * sx}
                  y2={25 * sy}
                  stroke={finalColors.strokeChecked}
                  strokeWidth="1"
                  opacity="0.25"
                  strokeLinecap="round"
                />
                <line
                  x1={10 * sx}
                  y1={30 * sy}
                  x2={70 * sx}
                  y2={30 * sy}
                  stroke={finalColors.strokeChecked}
                  strokeWidth="1"
                  opacity="0.2"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Track border */}
            <SketchBorder
              d1={`M ${25 * sx} ${4.5 * sy} C ${18.5 * sx} ${4.5 * sy}, ${12.5 * sx} ${5.5 * sy}, ${8.5 * sx} ${8.5 * sy} C ${4.5 * sx} ${11.5 * sy}, ${3.5 * sx} ${15.5 * sy}, ${3.5 * sx} ${20 * sy} L ${3.5 * sx} ${26 * sy} C ${3.5 * sx} ${30.5 * sy}, ${4.5 * sx} ${34.5 * sy}, ${8.5 * sx} ${37.5 * sy} C ${12.5 * sx} ${40.5 * sy}, ${18.5 * sx} ${41.5 * sy}, ${25 * sx} ${41.5 * sy} L ${55 * sx} ${41.5 * sy} C ${61.5 * sx} ${41.5 * sy}, ${67.5 * sx} ${40.5 * sy}, ${71.5 * sx} ${37.5 * sy} C ${75.5 * sx} ${34.5 * sy}, ${76.5 * sx} ${30.5 * sy}, ${76.5 * sx} ${26 * sy} L ${76.5 * sx} ${20 * sy} C ${76.5 * sx} ${15.5 * sy}, ${75.5 * sx} ${11.5 * sy}, ${71.5 * sx} ${8.5 * sy} C ${67.5 * sx} ${5.5 * sy}, ${61.5 * sx} ${4.5 * sy}, ${55 * sx} ${4.5 * sy} L ${25 * sx} ${4.5 * sy} Z`}
              d2={`M ${25 * sx} ${5 * sy} C ${19 * sx} ${5 * sy}, ${13 * sx} ${6 * sy}, ${9 * sx} ${9 * sy} C ${5 * sx} ${12 * sy}, ${4 * sx} ${16 * sy}, ${4 * sx} ${20 * sy} L ${4 * sx} ${26 * sy} C ${4 * sx} ${30 * sy}, ${5 * sx} ${34 * sy}, ${9 * sx} ${37 * sy} C ${13 * sx} ${40 * sy}, ${19 * sx} ${41 * sy}, ${25 * sx} ${41 * sy} L ${55 * sx} ${41 * sy} C ${61 * sx} ${41 * sy}, ${67 * sx} ${40 * sy}, ${71 * sx} ${37 * sy} C ${75 * sx} ${34 * sy}, ${76 * sx} ${30 * sy}, ${76 * sx} ${26 * sy} L ${76 * sx} ${20 * sy} C ${76 * sx} ${16 * sy}, ${75 * sx} ${12 * sy}, ${71 * sx} ${9 * sy} C ${67 * sx} ${6 * sy}, ${61 * sx} ${5 * sy}, ${55 * sx} ${5 * sy} L ${25 * sx} ${5 * sy} Z`}
              stroke={finalColors.stroke}
              w1={isFocused ? 3 : isHovered || isChecked ? 2.5 : 2}
              dash="1.5,0.8"
              o1={isFocused || isHovered || isChecked ? 0.9 : 0.75}
              show={showBorder}
              style={{ transition: "all 0.4s ease" }}
            />

            {/* Thumb/handle */}
            <g
              style={{
                transform: isChecked
                  ? `translateX(${40 * sx}px) rotate(2deg)`
                  : "translateX(0) rotate(-1deg)",
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {(() => {
                const tc = 23 * sx,
                  tcy = 23 * sy,
                  tr = 16 * Math.min(sx, sy);
                return (
                  <>
                    <circle cx={tc} cy={tcy} r={tr} fill={finalColors.thumb} />
                    <circle
                      cx={tc}
                      cy={tcy}
                      r={tr}
                      fill={SK.bgOverlay}
                      opacity="0.7"
                    />
                    <circle
                      cx={tc}
                      cy={tcy}
                      r={tr}
                      fill={noiseUrl()}
                      opacity="0.15"
                    />
                  </>
                );
              })()}

              {/* Thumb borders */}
              <SketchBorder
                d1={`M ${23 * sx} ${7 * sy} C ${26 * sx} ${7.2 * sy}, ${29 * sx} ${8 * sy}, ${32 * sx} ${10 * sy} C ${35 * sx} ${12 * sy}, ${37 * sx} ${15 * sy}, ${38 * sx} ${18 * sy} C ${38.5 * sx} ${21 * sy}, ${39 * sx} ${24 * sy}, ${38.5 * sx} ${27 * sy} C ${38 * sx} ${30 * sy}, ${36 * sx} ${33 * sy}, ${33 * sx} ${35 * sy} C ${30 * sx} ${37 * sy}, ${27 * sx} ${38 * sy}, ${24 * sx} ${38.5 * sy} C ${21 * sx} ${39 * sy}, ${18 * sx} ${38.5 * sy}, ${15 * sx} ${37 * sy} C ${12 * sx} ${35 * sy}, ${9 * sx} ${32 * sy}, ${8 * sx} ${29 * sy} C ${7 * sx} ${26 * sy}, ${7 * sx} ${23 * sy}, ${7.5 * sx} ${20 * sy} C ${8 * sx} ${17 * sy}, ${9.5 * sx} ${14 * sy}, ${12 * sx} ${11 * sy} C ${14.5 * sx} ${8.5 * sy}, ${18 * sx} ${7 * sy}, ${23 * sx} ${7 * sy} Z`}
                d2={`M ${23 * sx} ${7.5 * sy} C ${26 * sx} ${7.7 * sy}, ${29 * sx} ${8.5 * sy}, ${32 * sx} ${10.5 * sy} C ${35 * sx} ${12.5 * sy}, ${37 * sx} ${15.5 * sy}, ${38 * sx} ${18.5 * sy} C ${38.5 * sx} ${21.5 * sy}, ${39 * sx} ${24.5 * sy}, ${38.5 * sx} ${27.5 * sy} C ${38 * sx} ${30.5 * sy}, ${36 * sx} ${33.5 * sy}, ${33 * sx} ${35.5 * sy} C ${30 * sx} ${37.5 * sy}, ${27 * sx} ${38.5 * sy}, ${24 * sx} ${39 * sy} C ${21 * sx} ${39.5 * sy}, ${18 * sx} ${39 * sy}, ${15 * sx} ${37.5 * sy} C ${12 * sx} ${35.5 * sy}, ${9 * sx} ${32.5 * sy}, ${8 * sx} ${29.5 * sy} C ${7 * sx} ${26.5 * sy}, ${7 * sx} ${23.5 * sy}, ${7.5 * sx} ${20.5 * sy} C ${8 * sx} ${17.5 * sy}, ${9.5 * sx} ${14.5 * sy}, ${12 * sx} ${11.5 * sy} C ${14.5 * sx} ${9 * sy}, ${18 * sx} ${7.5 * sy}, ${23 * sx} ${7.5 * sy} Z`}
                stroke={finalColors.stroke}
                dash="1.2,0.6"
                show={showBorder}
              />

              {/* Cross-hatching */}
              <g opacity="0.15">
                <line
                  x1={15 * sx}
                  y1={18 * sy}
                  x2={31 * sx}
                  y2={28 * sy}
                  stroke={SK.stroke}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <line
                  x1={15 * sx}
                  y1={22 * sy}
                  x2={31 * sx}
                  y2={32 * sy}
                  stroke={SK.stroke}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <line
                  x1={31 * sx}
                  y1={18 * sy}
                  x2={15 * sx}
                  y2={28 * sy}
                  stroke={SK.stroke}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <line
                  x1={31 * sx}
                  y1={22 * sy}
                  x2={15 * sx}
                  y2={32 * sy}
                  stroke={SK.stroke}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </g>

              {/* Doodle accent on thumb */}
              <g opacity="0.5">
                <circle
                  cx={28 * sx}
                  cy={18 * sy}
                  r={1.5 * Math.min(sx, sy)}
                  stroke={finalColors.stroke}
                  strokeWidth="0.8"
                  fill="none"
                />
              </g>
            </g>

            {/* Track doodle accent */}
            <g opacity="0.4">
              <line
                x1={73 * sx}
                y1={10 * sy}
                x2={75 * sx}
                y2={10 * sy}
                stroke={finalColors.stroke}
                strokeWidth="1"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>

        {/* Label */}
        {showLabel && label && (
          <span
            style={{
              fontSize: finalTypography.fontSize,
              fontWeight: finalTypography.fontWeight,
              textTransform: finalTypography.textTransform,
              fontFamily: finalTypography.fontFamily,
              color: disabled ? SK_DISABLED.text : finalColors.text,
              transition: "all 0.3s ease",
              transform: isHovered && !disabled ? "scale(1.01)" : "scale(1)",
              userSelect: "none",
            }}
          >
            {label}
          </span>
        )}
      </label>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
