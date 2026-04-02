import React, { useId, useState, useRef, useEffect } from "react";
import { cn, SketchPaper, SketchBorder, SK, SK_DISABLED, useSketchSize, useVirtualizer, useListNavigation } from "../../lib";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    hoverBg?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
  };
  showBorder?: boolean;
  className?: string;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      defaultValue,
      placeholder = "Choose an option...",
      onChange,
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
    const [selectedValue, setSelectedValue] = useState(defaultValue || "");
    const containerRef = useRef<HTMLDivElement>(null);
    const mergedRef = (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    const selectedOption = options.find((opt) => opt.value === selectedValue);

    // Size configurations
    const sizeConfig = {
      sm: { width: 220, height: 48, fontSize: "1.2rem", optionHeight: 40 },
      md: { width: 280, height: 56, fontSize: "1.35rem", optionHeight: 48 },
      lg: { width: 340, height: 64, fontSize: "1.5rem", optionHeight: 56 }
    };

    const config = sizeConfig[size];

    // Dynamic sizing: measure trigger wrapper and grow beyond default if needed
    const { ref: triggerSizeRef, w: measuredW } = useSketchSize<HTMLDivElement>(config.width, config.height);
    const w = measuredW;
    const h = config.height;
    const uid = useId();
    const hoverId = `hm${uid}`;

    const scrollRef = useRef<HTMLDivElement>(null);
    const { virtualItems, totalHeight, scrollToIndex } = useVirtualizer({
      count: options.length,
      itemHeight: config.optionHeight,
      containerRef: scrollRef,
      overscan: 2,
    });

    const { activeIndex, setActiveIndex, itemRefs, triggerRef, handleTriggerKeyDown, handleListKeyDown } = useListNavigation({
      isOpen,
      setIsOpen,
      itemCount: options.length,
      scrollToIndex,
    });

    // Default colors with customization support
    const selectColors = {
      bg: colors?.bg || SK.bg,
      bgOverlay: colors?.bgOverlay || SK.bgOverlay,
      stroke: colors?.stroke || SK.stroke,
      text: colors?.text || SK.text,
      hoverBg: colors?.hoverBg || "#fff4e6",
    };

    // Default typography with customization support
    const selectTypography = {
      fontSize: typography?.fontSize || config.fontSize,
      fontWeight: typography?.fontWeight || "500",
      fontFamily: typography?.fontFamily || SK.font,
    };

    // Disabled state overrides
    const finalColors = disabled ? {
      bg: SK_DISABLED.bg,
      bgOverlay: SK_DISABLED.bgOverlay,
      stroke: SK_DISABLED.stroke,
      text: SK_DISABLED.text,
      hoverBg: SK_DISABLED.bg,
    } : selectColors;

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

    const handleSelect = (value: string) => {
      if (disabled) return;
      setSelectedValue(value);
      onChange?.(value);
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
        className={cn("sketch-select", className)}
        {...props}
      >
        {/* Trigger Button */}
        <button
          ref={triggerRef}
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onKeyDown={handleTriggerKeyDown}
          className="sketch-select-trigger"
          style={{
            transform: disabled ? "rotate(-0.1deg)" : "rotate(-0.3deg)",
          }}
        >
          <div
            ref={triggerSizeRef}
            style={{
              position: "relative",
              minWidth: `${config.width}px`,
              height: `${h}px`,
            }}
          >
            {/* SVG Background */}
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
                  ? "drop-shadow(1px 2px 0px rgba(0,0,0,0.06)) drop-shadow(2px 3px 4px rgba(0,0,0,0.04)) grayscale(0.3) opacity(0.7)"
                  : isOpen
                    ? "drop-shadow(2px 3px 0px rgba(0,0,0,0.12)) drop-shadow(3px 5px 8px rgba(0,0,0,0.08))"
                    : "drop-shadow(1px 2px 0px rgba(0,0,0,0.08)) drop-shadow(2px 3px 6px rgba(0,0,0,0.05))",
                transition: "filter 0.3s ease",
              }}
            >
              {(() => {
                const bgPath = `M ${w * 0.029} ${h * 0.089} C ${w * 0.036} ${h * 0.063}, ${w * 0.054} ${h * 0.054}, ${w * 0.071} ${h * 0.054} L ${w * 0.357} ${h * 0.045} C ${w * 0.429} ${h * 0.045}, ${w * 0.5} ${h * 0.045}, ${w * 0.571} ${h * 0.054} L ${w * 0.857} ${h * 0.063} C ${w * 0.893} ${h * 0.071}, ${w * 0.921} ${h * 0.089}, ${w * 0.943} ${h * 0.125} C ${w * 0.964} ${h * 0.161}, ${w * 0.975} ${h * 0.196}, ${w * 0.975} ${h * 0.286} L ${w * 0.975} ${h * 0.714} C ${w * 0.975} ${h * 0.804}, ${w * 0.964} ${h * 0.839}, ${w * 0.943} ${h * 0.875} C ${w * 0.921} ${h * 0.911}, ${w * 0.893} ${h * 0.929}, ${w * 0.857} ${h * 0.937} L ${w * 0.571} ${h * 0.946} C ${w * 0.5} ${h * 0.955}, ${w * 0.429} ${h * 0.955}, ${w * 0.357} ${h * 0.955} L ${w * 0.071} ${h * 0.946} C ${w * 0.054} ${h * 0.946}, ${w * 0.036} ${h * 0.937}, ${w * 0.029} ${h * 0.911} C ${w * 0.021} ${h * 0.875}, ${w * 0.011} ${h * 0.839}, ${w * 0.011} ${h * 0.714} L ${w * 0.011} ${h * 0.286} C ${w * 0.011} ${h * 0.196}, ${w * 0.021} ${h * 0.161}, ${w * 0.029} ${h * 0.089} Z`;
                return (
                  <SketchPaper d={bgPath} w={w} h={h} fine
                    bg={finalColors.bg} overlay={finalColors.bgOverlay}
                    overlayOpacity={disabled ? 0.4 : 0.6} />
                );
              })()}

              {/* Main border */}
              {showBorder && (
                <path
                  d={`M ${w * 0.027} ${h * 0.093} C ${w * 0.034} ${h * 0.068}, ${w * 0.052} ${h * 0.057}, ${w * 0.07} ${h * 0.057} L ${w * 0.354} ${h * 0.05} C ${w * 0.425} ${h * 0.05}, ${w * 0.496} ${h * 0.05}, ${w * 0.568} ${h * 0.057} L ${w * 0.854} ${h * 0.068} C ${w * 0.89} ${h * 0.075}, ${w * 0.918} ${h * 0.093}, ${w * 0.939} ${h * 0.129} C ${w * 0.961} ${h * 0.164}, ${w * 0.971} ${h * 0.2}, ${w * 0.971} ${h * 0.289} L ${w * 0.971} ${h * 0.718} C ${w * 0.971} ${h * 0.807}, ${w * 0.961} ${h * 0.843}, ${w * 0.939} ${h * 0.879} C ${w * 0.918} ${h * 0.914}, ${w * 0.89} ${h * 0.932}, ${w * 0.854} ${h * 0.939} L ${w * 0.568} ${h * 0.95} C ${w * 0.496} ${h * 0.957}, ${w * 0.425} ${h * 0.957}, ${w * 0.354} ${h * 0.957} L ${w * 0.07} ${h * 0.95} C ${w * 0.052} ${h * 0.95}, ${w * 0.034} ${h * 0.939}, ${w * 0.027} ${h * 0.914} C ${w * 0.018} ${h * 0.879}, ${w * 0.009} ${h * 0.843}, ${w * 0.009} ${h * 0.718} L ${w * 0.009} ${h * 0.289} C ${w * 0.009} ${h * 0.2}, ${w * 0.018} ${h * 0.164}, ${w * 0.027} ${h * 0.093} Z`}
                  stroke={finalColors.stroke}
                  strokeWidth={isOpen ? "3" : "2.2"}
                  fill="none" strokeLinecap="round" strokeLinejoin="round"
                  opacity={disabled ? 0.3 : (isOpen ? 0.9 : 0.75)}
                  strokeDasharray="1.5,0.8"
                  style={{ transition: "all 0.3s ease" }}
                />
              )}

              {/* Hand-drawn arrow icon */}
              <g style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transformOrigin: `${w * 0.9}px ${h * 0.5}px`,
                transition: "transform 0.3s ease",
              }}>
                <path
                  d={`M ${w * 0.879} ${h * 0.411} L ${w * 0.9} ${h * 0.536} L ${w * 0.921} ${h * 0.411}`}
                  stroke={finalColors.stroke} strokeWidth="2.5"
                  fill="none" strokeLinecap="round" strokeLinejoin="round"
                  opacity={disabled ? 0.4 : 0.7}
                />
              </g>
            </svg>

            {/* Text overlay */}
            <div
              className="sketch-select-text"
              style={{
                fontFamily: selectTypography.fontFamily,
                fontSize: selectTypography.fontSize,
                fontWeight: selectTypography.fontWeight,
                color: finalColors.text,
                opacity: disabled ? 0.6 : 1,
              }}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </div>
          </div>
        </button>

        {/* Dropdown Panel with Sketchy Styling */}
        {isOpen && !disabled && (
          <div
            className="sketch-select-dropdown"
            style={{
              width: `${w}px`,
              height: `${Math.min(options.length * config.optionHeight + 16, 350)}px`,
              transform: "rotate(-0.2deg)",
              position: "absolute",
              zIndex: 50,
            }}
          >
            {(() => {
              const dh = Math.min(options.length * config.optionHeight + 16, 350);
              const panelPath = `M 8 3 C 10 1.5, 15 1, 20 1 L 100 0.5 C 120 0.5, 140 0.5, 160 1 L 240 1.5 C 250 2, 258 3, 264 5 C 268 7, 271 9, 272 11 L 273 ${dh - 11} C 272.5 ${dh - 8}, 270 ${dh - 5}, 265 ${dh - 3} L 240 ${dh - 1.5} C 220 ${dh - 1}, 200 ${dh - 1}, 180 ${dh - 1} L 80 ${dh - 1.5} C 60 ${dh - 1.5}, 40 ${dh - 2}, 20 ${dh - 2.5} L 15 ${dh - 3} C 10 ${dh - 4}, 6 ${dh - 6}, 4 ${dh - 9} L 3 5 C 3.5 3, 5 2, 8 3 Z`;
              const borderPath = `M 7.5 3.2 C 9.5 1.8, 14.5 1.2, 19.5 1.2 L 99 0.8 C 119 0.8, 139 0.8, 159 1.2 L 239 1.8 C 249 2.2, 257 3.2, 263 5.2 C 267 7.2, 270 9.2, 271 11.2 L 272 ${dh - 10.8} C 271.5 ${dh - 7.8}, 269 ${dh - 4.8}, 264 ${dh - 2.8} L 239 ${dh - 1.2} C 219 ${dh - 0.8}, 199 ${dh - 0.8}, 179 ${dh - 0.8} L 79 ${dh - 1.2} C 59 ${dh - 1.2}, 39 ${dh - 1.8}, 19 ${dh - 2.2} L 14.5 ${dh - 2.8} C 9.5 ${dh - 3.8}, 5.5 ${dh - 5.8}, 3.5 ${dh - 8.8} L 2.5 5.2 C 3 3.2, 4.5 2.2, 7.5 3.2 Z`;
              return (
                <svg
                  width={w}
                  height={dh}
                  viewBox={`0 0 ${w} ${dh}`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ filter: "drop-shadow(3px 4px 0px rgba(0,0,0,0.15)) drop-shadow(4px 6px 12px rgba(0,0,0,0.1))", position: "absolute", inset: 0, pointerEvents: "none" }}
                >
                  <defs>
                    <pattern id={hoverId} x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                      <rect width="3" height="3" fill={finalColors.hoverBg} opacity="0.4" />
                      <line x1="0" y1="1.5" x2="3" y2="1.5" stroke={finalColors.stroke} strokeWidth="0.5" opacity="0.3" />
                    </pattern>
                  </defs>

                  <SketchPaper d={panelPath} w={w} h={dh} fine
                    bg={finalColors.bg} overlay={finalColors.bgOverlay} overlayOpacity={0.7} />

                  <SketchBorder d1={borderPath} stroke={finalColors.stroke}
                    w1={2.5} o1={0.85} dash="1.5,0.8" show={showBorder} />
                  {/* Corner fold accent */}
                  <g opacity="0.4">
                    <path d="M 260 8 L 268 8 L 268 16" stroke={finalColors.stroke} strokeWidth="1" fill="none" strokeLinecap="round" />
                  </g>
                </svg>
              );
            })()}

            {/* Scrollable Container and Virtual Option text overlay */}
            <div
              ref={scrollRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${Math.min(options.length * config.optionHeight + 16, 350)}px`,
                overflowY: "auto",
                overflowX: "hidden",
              }}
              role="listbox"
              onKeyDown={handleListKeyDown}
            >
              <div style={{ height: totalHeight + 16, position: "relative", width: "100%" }}>
                {virtualItems.map(({ index: i, offsetTop }) => {
                  const option = options[i];
                  return (
                    <div
                      key={option.value}
                      style={{
                        position: "absolute",
                        top: offsetTop + 8,
                        left: 0,
                        width: "100%",
                        height: config.optionHeight,
                      }}
                    >
                      {/* Option hover backgrounds */}
                      {activeIndex === i && (
                        <svg
                          width={w}
                          height={config.optionHeight}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            pointerEvents: "none",
                          }}
                        >
                          <defs>
                            <pattern id={`${hoverId}-${i}`} x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                              <rect width="3" height="3" fill={finalColors.hoverBg} opacity="0.4" />
                              <line x1="0" y1="1.5" x2="3" y2="1.5" stroke={finalColors.stroke} strokeWidth="0.5" opacity="0.3" />
                            </pattern>
                          </defs>
                          <rect x="10" y="-2" width={w - 20} height={config.optionHeight - 4} fill={`url(#${hoverId}-${i})`} opacity="0.8" rx="4" />
                        </svg>
                      )}

                      {/* Separator lines between options (dashed) */}
                      {i < options.length - 1 && (
                        <svg
                          width={w}
                          height={config.optionHeight}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            pointerEvents: "none",
                          }}
                          opacity="0.3"
                        >
                          <path d={`M 15 ${config.optionHeight} L ${w - 15} ${config.optionHeight}`} stroke={finalColors.stroke} strokeWidth="1" strokeDasharray="3,2" strokeLinecap="round" />
                        </svg>
                      )}

                      <button
                        ref={el => { itemRefs.current[i] = el; }}
                        role="option"
                        tabIndex={-1}
                        aria-selected={selectedValue === option.value}
                        onClick={() => handleSelect(option.value)}
                        onMouseEnter={() => setActiveIndex(i)}
                        onMouseLeave={() => setActiveIndex(null)}
                        className="sketch-select-option"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: `${config.optionHeight}px`,
                          margin: 0,
                          padding: "12px 20px",
                          fontFamily: selectTypography.fontFamily,
                          fontSize: selectTypography.fontSize,
                          fontWeight: selectTypography.fontWeight,
                          color: finalColors.text,
                        }}
                      >
                        {option.label}
                        {selectedValue === option.value && (
                          <span className="sketch-select-checkmark">
                            &#x2713;
                          </span>
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

Select.displayName = "Select";

export { Select };