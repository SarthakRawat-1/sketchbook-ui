import React, { useId, useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { cn, SketchPaper, SketchBorder, SK, SK_DISABLED, useSketchSize, useVirtualizer, useListNavigation } from "../../lib";

export interface DropdownItem {
  label: string;
  icon?: "edit" | "duplicate" | "delete" | "settings" | "share";
  onClick?: () => void;
  danger?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  triggerIcon?: "dots" | "menu" | "gear" | "plus" | "user" | "bell" | "chevron";
  triggerText?: string;
  triggerEmoji?: string;
  customTrigger?: ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  // Customization props
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    hoverBg?: string;
    dangerText?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
  };
  showBorder?: boolean;
  className?: string;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      items,
      triggerIcon = "dots",
      triggerText,
      triggerEmoji,
      customTrigger,
      size = "md",
      disabled = false,
      colors,
      typography,
      showBorder = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [triggerHovered, setTriggerHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const mergedRef = (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    const scrollRef = useRef<HTMLDivElement>(null);
    const itemHeight = 60; // Increased from 52 for better spacing
    const { virtualItems, totalHeight, scrollToIndex } = useVirtualizer({
      count: items.length,
      itemHeight,
      containerRef: scrollRef,
      overscan: 2,
    });

    const { activeIndex, setActiveIndex, itemRefs, triggerRef, handleTriggerKeyDown, handleListKeyDown } = useListNavigation<HTMLElement>({
      isOpen,
      setIsOpen,
      itemCount: items.length,
      scrollToIndex,
    });

    // Size configurations
    const sizeConfig = {
      sm: { buttonSize: 40, iconScale: 0.8, fontSize: "1.2rem", padding: 12 },
      md: { buttonSize: 56, iconScale: 1, fontSize: "1.4rem", padding: 16 },
      lg: { buttonSize: 64, iconScale: 1.2, fontSize: "1.6rem", padding: 20 },
    };

    const config = sizeConfig[size];
    const uid = useId();
    const hoverId = `dh${uid}`;


    // Default colors with customization support
    const dropdownColors = {
      bg: colors?.bg || SK.bg,
      bgOverlay: colors?.bgOverlay || SK.bgOverlay,
      stroke: colors?.stroke || SK.stroke,
      text: colors?.text || SK.text,
      hoverBg: colors?.hoverBg || "#fff4e6",
      dangerText: colors?.dangerText || "#c74444",
    };

    // Default typography with customization support
    const dropdownTypography = {
      fontSize: typography?.fontSize || config.fontSize,
      fontWeight: typography?.fontWeight || "500",
      fontFamily: typography?.fontFamily || SK.font,
    };

    // Dynamic sizing: measure trigger content and grow beyond default if needed
    const isTextOrEmoji = triggerText || triggerEmoji;
    const { ref: triggerSizerRef, w: triggerContentW } = useSketchSize<HTMLSpanElement>();
    const hPad = config.padding * 2;
    const dynamicButtonWidth = isTextOrEmoji
      ? Math.max(config.buttonSize, triggerContentW + hPad)
      : config.buttonSize;

    // Disabled state overrides
    const finalColors = disabled
      ? {
        bg: SK_DISABLED.bg,
        bgOverlay: SK_DISABLED.bgOverlay,
        stroke: SK_DISABLED.stroke,
        text: SK_DISABLED.text,
        hoverBg: SK_DISABLED.bg,
        dangerText: SK_DISABLED.text,
      }
      : dropdownColors;

    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleItemClick = (item: DropdownItem) => {
      if (disabled) return;
      item.onClick?.();
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    const handleToggle = () => {
      if (disabled) return;
      setIsOpen(!isOpen);
    };

    return (
      <div
        ref={mergedRef}
        className={cn("sketch-dropdown", className)}
        {...props}
      >
        {/* Trigger Button */}
        {customTrigger ? (
          <div
            ref={triggerRef as React.RefObject<HTMLDivElement>}
            role="button"
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={handleToggle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(); }
              else handleTriggerKeyDown(e);
            }}
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          >
            {customTrigger}
          </div>
        ) : (
          <button
            ref={triggerRef as React.RefObject<HTMLButtonElement>}
            onClick={handleToggle}
            disabled={disabled}
            aria-haspopup="true"
            aria-expanded={isOpen}
            onKeyDown={handleTriggerKeyDown}
            onMouseEnter={() => setTriggerHovered(true)}
            onMouseLeave={() => setTriggerHovered(false)}
            className="sketch-dropdown-trigger"
            style={{
              width: `${dynamicButtonWidth}px`,
              height: `${config.buttonSize}px`,
              transform: disabled
                ? "rotate(-0.1deg)"
                : triggerHovered
                  ? "rotate(1deg) scale(1.05)"
                  : "rotate(0.5deg)",
            }}
          >
            {/* Hidden sizer for trigger content measurement */}
            {isTextOrEmoji && (
              <span
                ref={triggerSizerRef}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  visibility: "hidden",
                  height: 0,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  fontSize: dropdownTypography.fontSize,
                  fontWeight: dropdownTypography.fontWeight,
                  fontFamily: triggerEmoji ? "system-ui, -apple-system, sans-serif" : dropdownTypography.fontFamily,
                }}
              >
                {triggerText || triggerEmoji}
              </span>
            )}
            {/* Trigger Button SVG */}
            <svg
              width={dynamicButtonWidth}
              height={config.buttonSize}
              viewBox={`0 0 ${dynamicButtonWidth} ${config.buttonSize}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: disabled
                  ? "drop-shadow(1px 2px 0px rgba(0,0,0,0.06)) drop-shadow(2px 3px 4px rgba(0,0,0,0.04)) grayscale(0.3) opacity(0.7)"
                  : triggerHovered
                    ? "drop-shadow(3px 4px 0px rgba(0,0,0,0.15)) drop-shadow(4px 6px 10px rgba(0,0,0,0.1)) saturate(1.1)"
                    : "drop-shadow(2px 3px 0px rgba(0,0,0,0.12)) drop-shadow(3px 4px 8px rgba(0,0,0,0.08))",
                transition: "filter 0.3s ease",
              }}
            >
              {(() => {
                const bw = dynamicButtonWidth, bs = config.buttonSize;
                const btnPath = `M ${bw * 0.107} ${bs * 0.143} C ${bw * 0.125} ${bs * 0.107}, ${bw * 0.161} ${bs * 0.089}, ${bw * 0.196} ${bs * 0.089} L ${bw * 0.304} ${bs * 0.081} C ${bw * 0.375} ${bs * 0.081}, ${bw * 0.625} ${bs * 0.081}, ${bw * 0.696} ${bs * 0.089} L ${bw * 0.804} ${bs * 0.107} C ${bw * 0.839} ${bs * 0.116}, ${bw * 0.875} ${bs * 0.143}, ${bw * 0.893} ${bs * 0.179} C ${bw * 0.911} ${bs * 0.214}, ${bw * 0.92} ${bs * 0.25}, ${bw * 0.92} ${bs * 0.286} L ${bw * 0.92} ${bs * 0.714} C ${bw * 0.92} ${bs * 0.75}, ${bw * 0.911} ${bs * 0.786}, ${bw * 0.893} ${bs * 0.821} C ${bw * 0.875} ${bs * 0.857}, ${bw * 0.839} ${bs * 0.884}, ${bw * 0.804} ${bs * 0.893} L ${bw * 0.696} ${bs * 0.911} C ${bw * 0.625} ${bs * 0.92}, ${bw * 0.375} ${bs * 0.92}, ${bw * 0.304} ${bs * 0.92} L ${bw * 0.196} ${bs * 0.911} C ${bw * 0.161} ${bs * 0.911}, ${bw * 0.125} ${bs * 0.893}, ${bw * 0.107} ${bs * 0.857} C ${bw * 0.089} ${bs * 0.821}, ${bw * 0.08} ${bs * 0.786}, ${bw * 0.08} ${bs * 0.714} L ${bw * 0.08} ${bs * 0.286} C ${bw * 0.08} ${bs * 0.25}, ${bw * 0.089} ${bs * 0.214}, ${bw * 0.107} ${bs * 0.143} Z`;
                return (
                  <SketchPaper d={btnPath} w={bw} h={bs} fine
                    bg={finalColors.bg} overlay={finalColors.bgOverlay}
                    overlayOpacity={disabled ? 0.4 : 0.6} />
                );
              })()}

              {/* Button border */}
              {showBorder && (() => {
                const bw = dynamicButtonWidth, bs = config.buttonSize;
                return (
                  <path
                    d={`M ${bw * 0.105} ${bs * 0.147} C ${bw * 0.123} ${bs * 0.111}, ${bw * 0.159} ${bs * 0.093}, ${bw * 0.194} ${bs * 0.093} L ${bw * 0.302} ${bs * 0.085} C ${bw * 0.373} ${bs * 0.085}, ${bw * 0.627} ${bs * 0.085}, ${bw * 0.698} ${bs * 0.093} L ${bw * 0.806} ${bs * 0.111} C ${bw * 0.841} ${bs * 0.12}, ${bw * 0.877} ${bs * 0.147}, ${bw * 0.895} ${bs * 0.183} C ${bw * 0.913} ${bs * 0.218}, ${bw * 0.922} ${bs * 0.254}, ${bw * 0.922} ${bs * 0.29} L ${bw * 0.922} ${bs * 0.718} C ${bw * 0.922} ${bs * 0.754}, ${bw * 0.913} ${bs * 0.79}, ${bw * 0.895} ${bs * 0.825} C ${bw * 0.877} ${bs * 0.861}, ${bw * 0.841} ${bs * 0.888}, ${bw * 0.806} ${bs * 0.897} L ${bw * 0.698} ${bs * 0.915} C ${bw * 0.627} ${bs * 0.924}, ${bw * 0.373} ${bs * 0.924}, ${bw * 0.302} ${bs * 0.924} L ${bw * 0.194} ${bs * 0.915} C ${bw * 0.159} ${bs * 0.915}, ${bw * 0.123} ${bs * 0.897}, ${bw * 0.105} ${bs * 0.861} C ${bw * 0.087} ${bs * 0.825}, ${bw * 0.078} ${bs * 0.79}, ${bw * 0.078} ${bs * 0.718} L ${bw * 0.078} ${bs * 0.29} C ${bw * 0.078} ${bs * 0.254}, ${bw * 0.087} ${bs * 0.218}, ${bw * 0.105} ${bs * 0.147} Z`}
                    stroke={finalColors.stroke}
                    strokeWidth={triggerHovered ? "3" : "2.2"}
                    fill="none" strokeLinecap="round" strokeLinejoin="round"
                    opacity={disabled ? 0.3 : triggerHovered ? 0.9 : 0.85}
                    strokeDasharray="1.5,0.8"
                    style={{ transition: "all 0.3s ease" }}
                  />
                );
              })()}

              {/* Icon, Text, or Emoji based on trigger type */}
              {triggerText ? (
                <text
                  x={dynamicButtonWidth / 2}
                  y={config.buttonSize / 2 + 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={finalColors.text}
                  style={{
                    fontFamily: dropdownTypography.fontFamily,
                    fontSize: dropdownTypography.fontSize,
                    fontWeight: dropdownTypography.fontWeight,
                    opacity: disabled ? 0.4 : 0.85,
                  }}
                >
                  {triggerText}
                </text>
              ) : triggerEmoji ? (
                <foreignObject
                  x={0}
                  y={0}
                  width={dynamicButtonWidth}
                  height={config.buttonSize}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: dropdownTypography.fontSize,
                      opacity: disabled ? 0.4 : 1,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {triggerEmoji}
                  </div>
                </foreignObject>
              ) : (
                <g
                  style={{
                    transform: `scale(${config.iconScale})`,
                    transformOrigin: `${dynamicButtonWidth / 2}px ${config.buttonSize / 2
                      }px`,
                  }}
                >
                  {triggerIcon === "dots" ? (
                    <g>
                      <circle
                        cx={dynamicButtonWidth / 2}
                        cy={config.buttonSize * 0.32}
                        r="2.5"
                        fill={finalColors.stroke}
                        opacity={disabled ? 0.4 : 0.75}
                      />
                      <circle
                        cx={dynamicButtonWidth / 2}
                        cy={config.buttonSize * 0.5}
                        r="2.5"
                        fill={finalColors.stroke}
                        opacity={disabled ? 0.4 : 0.75}
                      />
                      <circle
                        cx={dynamicButtonWidth / 2}
                        cy={config.buttonSize * 0.68}
                        r="2.5"
                        fill={finalColors.stroke}
                        opacity={disabled ? 0.4 : 0.75}
                      />
                    </g>
                  ) : triggerIcon === "menu" ? (
                    <g>
                      <path
                        d={`M ${config.buttonSize * 0.25} ${config.buttonSize * 0.357
                          } L ${config.buttonSize * 0.75} ${config.buttonSize * 0.357
                          }`}
                        stroke={finalColors.stroke}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                      <path
                        d={`M ${config.buttonSize * 0.25} ${config.buttonSize * 0.5
                          } L ${config.buttonSize * 0.75} ${config.buttonSize * 0.5
                          }`}
                        stroke={finalColors.stroke}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                      <path
                        d={`M ${config.buttonSize * 0.25} ${config.buttonSize * 0.643
                          } L ${config.buttonSize * 0.75} ${config.buttonSize * 0.643
                          }`}
                        stroke={finalColors.stroke}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                    </g>
                  ) : triggerIcon === "plus" ? (
                    <g>
                      <path
                        d={`M ${config.buttonSize / 2} ${config.buttonSize * 0.25
                          } L ${config.buttonSize / 2} ${config.buttonSize * 0.75
                          }`}
                        stroke={finalColors.stroke}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                      <path
                        d={`M ${config.buttonSize * 0.25} ${config.buttonSize / 2
                          } L ${config.buttonSize * 0.75} ${config.buttonSize / 2
                          }`}
                        stroke={finalColors.stroke}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                    </g>
                  ) : triggerIcon === "user" ? (
                    <g>
                      <circle
                        cx={config.buttonSize / 2}
                        cy={config.buttonSize * 0.393}
                        r="6"
                        stroke={finalColors.stroke}
                        strokeWidth="2"
                        fill="none"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                      <path
                        d={`M ${config.buttonSize * 0.286} ${config.buttonSize * 0.714
                          } C ${config.buttonSize * 0.286} ${config.buttonSize * 0.643
                          }, ${config.buttonSize * 0.357} ${config.buttonSize * 0.571
                          }, ${config.buttonSize * 0.5} ${config.buttonSize * 0.571
                          } C ${config.buttonSize * 0.643} ${config.buttonSize * 0.571
                          }, ${config.buttonSize * 0.714} ${config.buttonSize * 0.643
                          }, ${config.buttonSize * 0.714} ${config.buttonSize * 0.714
                          }`}
                        stroke={finalColors.stroke}
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                    </g>
                  ) : triggerIcon === "gear" ? (
                    <g>
                      <circle
                        cx={config.buttonSize / 2}
                        cy={config.buttonSize / 2}
                        r="3"
                        fill={finalColors.stroke}
                        opacity={disabled ? 0.4 : 0.75}
                      />
                      <path
                        d={`M ${config.buttonSize / 2} ${config.buttonSize * 0.25
                          } L ${config.buttonSize / 2} ${config.buttonSize * 0.357
                          }`}
                        stroke={finalColors.stroke}
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                      <path
                        d={`M ${config.buttonSize / 2} ${config.buttonSize * 0.643
                          } L ${config.buttonSize / 2} ${config.buttonSize * 0.75
                          }`}
                        stroke={finalColors.stroke}
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                      <path
                        d={`M ${config.buttonSize * 0.75} ${config.buttonSize / 2
                          } L ${config.buttonSize * 0.643} ${config.buttonSize / 2
                          }`}
                        stroke={finalColors.stroke}
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                      <path
                        d={`M ${config.buttonSize * 0.357} ${config.buttonSize / 2
                          } L ${config.buttonSize * 0.25} ${config.buttonSize / 2
                          }`}
                        stroke={finalColors.stroke}
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                    </g>
                  ) : triggerIcon === "chevron" ? (
                    <path
                      d={`M ${config.buttonSize * 0.357} ${config.buttonSize * 0.429
                        } L ${config.buttonSize / 2} ${config.buttonSize * 0.571
                        } L ${config.buttonSize * 0.643} ${config.buttonSize * 0.429
                        }`}
                      stroke={finalColors.stroke}
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={disabled ? 0.4 : 0.75}
                    />
                  ) : triggerIcon === "bell" ? (
                    <g>
                      <path
                        d={`M ${config.buttonSize * 0.357} ${config.buttonSize * 0.464
                          } C ${config.buttonSize * 0.357} ${config.buttonSize * 0.393
                          }, ${config.buttonSize * 0.429} ${config.buttonSize * 0.321
                          }, ${config.buttonSize / 2} ${config.buttonSize * 0.321
                          } C ${config.buttonSize * 0.571} ${config.buttonSize * 0.321
                          }, ${config.buttonSize * 0.643} ${config.buttonSize * 0.393
                          }, ${config.buttonSize * 0.643} ${config.buttonSize * 0.464
                          } L ${config.buttonSize * 0.643} ${config.buttonSize * 0.571
                          } L ${config.buttonSize * 0.357} ${config.buttonSize * 0.571
                          } L ${config.buttonSize * 0.357} ${config.buttonSize * 0.464
                          } Z`}
                        stroke={finalColors.stroke}
                        strokeWidth="2"
                        fill="none"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                      <path
                        d={`M ${config.buttonSize * 0.464} ${config.buttonSize * 0.679
                          } C ${config.buttonSize * 0.464} ${config.buttonSize * 0.714
                          }, ${config.buttonSize * 0.482} ${config.buttonSize * 0.714
                          }, ${config.buttonSize / 2} ${config.buttonSize * 0.714
                          } C ${config.buttonSize * 0.518} ${config.buttonSize * 0.714
                          }, ${config.buttonSize * 0.536} ${config.buttonSize * 0.714
                          }, ${config.buttonSize * 0.536} ${config.buttonSize * 0.679
                          }`}
                        stroke={finalColors.stroke}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        opacity={disabled ? 0.4 : 0.75}
                      />
                    </g>
                  ) : (
                    <circle
                      cx={config.buttonSize / 2}
                      cy={config.buttonSize / 2}
                      r="3"
                      fill={finalColors.stroke}
                      opacity={disabled ? 0.4 : 0.75}
                    />
                  )}
                </g>
              )}
            </svg>
          </button>
        )}

        {/* Dropdown Panel */}
        {isOpen && !disabled && (
          <div
            className="sketch-dropdown-panel"
            style={{
              width: "220px",
              height: `${Math.min(items.length * itemHeight + 16, 350)}px`,
              transform: "translateX(-50%) rotate(0.5deg)",
              position: "absolute",
              zIndex: 50,
            }}
          >
            <svg
              width="220"
              height={Math.min(items.length * itemHeight + 16, 350)}
              viewBox={`0 0 220 ${Math.min(items.length * itemHeight + 16, 350)}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "drop-shadow(4px 5px 0px rgba(0,0,0,0.3)) drop-shadow(6px 8px 12px rgba(0,0,0,0.1))", position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              <defs>
                <pattern id={hoverId} x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                  <rect width="4" height="4" fill={finalColors.hoverBg} opacity="0.6" />
                  <circle cx="2" cy="2" r="0.5" fill={finalColors.stroke} opacity="0.2" />
                </pattern>
              </defs>

              {(() => {
                const ph = Math.min(items.length * itemHeight + 16, 350);
                const panelPath = `M 8 4 C 10 2, 15 1, 20 1 L 80 0.5 C 100 0.5, 120 0.5, 140 1 L 200 2 C 210 3, 216 4, 218 6 C 219 8, 220 10, 220 12 L 220 ${ph - 12} C 219.5 ${ph - 9}, 217 ${ph - 6}, 212 ${ph - 4} L 200 ${ph - 2.5} C 180 ${ph - 2}, 160 ${ph - 2}, 140 ${ph - 2} L 80 ${ph - 2.5} C 60 ${ph - 2.5}, 40 ${ph - 3}, 20 ${ph - 3.5} L 15 ${ph - 4} C 10 ${ph - 5}, 6 ${ph - 7}, 4 ${ph - 10} L 3 6 C 3.5 4, 5 3, 8 4 Z`;
                const borderPath = `M 7.5 4.2 C 9.5 2.2, 14.5 1.2, 19.5 1.2 L 79 0.8 C 99 0.8, 119 0.8, 139 1.2 L 199 2.2 C 209 3.2, 215 4.2, 217 6.2 C 218 8.2, 219 10.2, 219 12.2 L 219 ${ph - 11.8} C 218.5 ${ph - 8.8}, 216 ${ph - 5.8}, 211 ${ph - 3.8} L 199 ${ph - 2.2} C 179 ${ph - 1.8}, 159 ${ph - 1.8}, 139 ${ph - 1.8} L 79 ${ph - 2.2} C 59 ${ph - 2.2}, 39 ${ph - 2.8}, 19 ${ph - 3.2} L 14.5 ${ph - 3.8} C 9.5 ${ph - 4.8}, 5.5 ${ph - 6.8}, 3.5 ${ph - 9.8} L 2.5 6.2 C 3 4.2, 4.5 3.2, 7.5 4.2 Z`;
                return (
                  <>
                    <SketchPaper d={panelPath} w={220} h={ph} fine
                      bg={finalColors.bg} overlay={finalColors.bgOverlay} overlayOpacity={0.7} />
                    <SketchBorder d1={borderPath} stroke={finalColors.stroke}
                      w1={2.5} o1={0.85} dash="1.8,1" show={showBorder} />
                  </>
                );
              })()}

              <g opacity="0.3">
                <path
                  d="M 200 8 L 208 8 L 208 16"
                  stroke={finalColors.stroke}
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>

              {/* Small decorative scribble */}
              <g opacity="0.4">
                <path
                  d="M 210 10 Q 212 8 214 10 Q 216 12 214 14"
                  stroke={finalColors.stroke}
                  strokeWidth="0.8"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            </svg>

            {/* Scrollable Container and Virtual Text/Icon overlay */}
            <div
              ref={scrollRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${Math.min(items.length * itemHeight + 16, 350)}px`,
                overflowY: "auto",
                overflowX: "hidden",
              }}
              role="menu"
              onKeyDown={handleListKeyDown}
            >
              <div style={{ height: totalHeight + 16, position: "relative", width: "100%" }}>
                {virtualItems.map(({ index: i, offsetTop }) => {
                  const item = items[i];
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        top: offsetTop + 8,
                        left: 0,
                        width: "100%",
                        height: itemHeight,
                      }}
                    >
                      {/* Item hover backgrounds (Moved from SVG panel) */}
                      {activeIndex === i && (
                        <svg
                          width="220"
                          height={itemHeight}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            pointerEvents: "none",
                          }}
                        >
                          <defs>
                            <pattern id={`${hoverId}-${i}`} x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                              <rect width="4" height="4" fill={finalColors.hoverBg} opacity="0.6" />
                              <circle cx="2" cy="2" r="0.5" fill={finalColors.stroke} opacity="0.2" />
                            </pattern>
                          </defs>
                          <rect x="12" y="0" width="196" height={itemHeight - 12} fill={`url(#${hoverId}-${i})`} opacity="0.9" rx="6" />
                        </svg>
                      )}

                      {/* Separator lines between items (Moved from SVG panel) */}
                      {i < items.length - 1 && (
                        <svg
                          width="220"
                          height={itemHeight}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            pointerEvents: "none",
                          }}
                          opacity="0.25"
                        >
                          <path d={`M 20 ${itemHeight} L 200 ${itemHeight}`} stroke={finalColors.stroke} strokeWidth="1" strokeDasharray="4,3" strokeLinecap="round" />
                        </svg>
                      )}

                      <button
                        ref={el => { itemRefs.current[i] = el; }}
                        role="menuitem"
                        tabIndex={-1}
                        onClick={() => handleItemClick(item)}
                        onMouseEnter={() => setActiveIndex(i)}
                        onMouseLeave={() => setActiveIndex(null)}
                        className="sketch-dropdown-item"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: `${itemHeight}px`,
                          margin: 0,
                          fontFamily: dropdownTypography.fontFamily,
                          fontSize: dropdownTypography.fontSize,
                          fontWeight: dropdownTypography.fontWeight,
                          color: item.danger
                            ? finalColors.dangerText
                            : finalColors.text,
                        }}
                      >
                        {/* Item icon */}
                        {item.icon && (
                          <div className="sketch-dropdown-item-icon">
                            <span
                              style={{
                                fontSize: "12px",
                                opacity: 0.7,
                                lineHeight: 1,
                                display: "block",
                              }}
                            >
                              {item.icon === "edit"
                                ? "✏️"
                                : item.icon === "duplicate"
                                  ? "📄"
                                  : item.icon === "delete"
                                    ? "🗑️"
                                    : item.icon === "settings"
                                      ? "⚙️"
                                      : item.icon === "share"
                                        ? "📤"
                                        : "●"}
                            </span>
                          </div>
                        )}

                        {/* Item label */}
                        <span style={{ flex: 1 }}>{item.label}</span>

                        {/* Hover indicator */}
                        {activeIndex === i && (
                          <div className="sketch-dropdown-item-checkmark">
                            <span style={{ fontSize: "12px", opacity: 0.5 }}>→</span>
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export { Dropdown };
