import React, {
  createContext,
  useContext,
  useId,
  useState,
} from "react";

import {
  cn,
  SketchPaper,
  SketchBorder,
  SK,
  SK_DISABLED,
  useSketchSize,
} from "../../lib";



type TabsSize = "sm" | "md" | "lg";

interface ResolvedColors {
  bg: string;
  bgOverlay: string;
  stroke: string;
  text: string;
  activeBg: string;
  activeOverlay: string;
}

interface ResolvedTypography {
  fontSize: string;
  fontWeight: string | number;
  fontFamily: string;
}

interface TabsContextValue {
  value: string;

  setValue: (value: string) => void;

  size: TabsSize;

  colors: ResolvedColors;

  typography: ResolvedTypography;

  showBorder: boolean;

  baseId: string;

  tabs: string[];
}

export interface TabsProps {
  defaultValue: string;

  value?: string;

  onValueChange?: (
    value: string,
  ) => void;

  children: React.ReactNode;

  size?: TabsSize;

  showBorder?: boolean;

  className?: string;

  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    activeBg?: string;
    activeOverlay?: string;
  };

  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
  };
}

export interface TabsListProps {
  children: React.ReactNode;

  className?: string;
}

export interface TabsTriggerProps {
  value: string;

  children: React.ReactNode;

  disabled?: boolean;

  className?: string;
}

export interface TabsContentProps {
  value: string;

  children: React.ReactNode;

  className?: string;
}



const TabsContext =
  createContext<TabsContextValue | null>(
    null,
  );

function useTabsContext() {
  const ctx = useContext(TabsContext);

  if (!ctx) {
    throw new Error(
      "Tabs components must be used inside Tabs",
    );
  }

  return ctx;
}



const SIZE_CONFIG = {
  sm: {
    triggerHeight: 52,
    minWidth: 120,
    fontSize: "1rem",
    paddingX: 40,
  },

  md: {
    triggerHeight: 64,
    minWidth: 160,
    fontSize: "1.15rem",
    paddingX: 55,
  },

  lg: {
    triggerHeight: 78,
    minWidth: 220,
    fontSize: "1.3rem",
    paddingX: 70,
  },
} as const;



const Tabs = React.forwardRef<
  HTMLDivElement,
  TabsProps
>(
  (
    {
      defaultValue,
      value,
      onValueChange,
      children,
      size = "md",
      showBorder = true,
      className,
      colors,
      typography,
    },
    ref,
  ) => {
    const [
      internalValue,
      setInternalValue,
    ] = useState(defaultValue);

    const currentValue =
      value !== undefined
        ? value
        : internalValue;

    const setValue = (v: string) => {
      if (value === undefined) {
        setInternalValue(v);
      }

      onValueChange?.(v);
    };

    const resolvedColors: ResolvedColors =
      {
        bg: colors?.bg ?? SK.bg,

        bgOverlay:
          colors?.bgOverlay ??
          SK.bgOverlay,

        stroke:
          colors?.stroke ??
          SK.stroke,

        text:
          colors?.text ??
          SK.text,

        activeBg:
          colors?.activeBg ??
          "#fff4e6",

        activeOverlay:
          colors?.activeOverlay ??
          "#ffe8cc",
      };

    const resolvedTypography: ResolvedTypography =
      {
        fontSize:
          typography?.fontSize ??
          SIZE_CONFIG[size].fontSize,

        fontWeight:
          typography?.fontWeight ??
          500,

        fontFamily:
          typography?.fontFamily ??
          SK.font,
      };

    const baseId = useId();

    const tabs: string[] = [];

    React.Children.forEach(
      children,
      (child) => {
        if (
          React.isValidElement(child) &&
          child.type === TabsList
        ) {
          const childProps =
            child.props as {
              children?: React.ReactNode;
            };

          React.Children.forEach(
            childProps.children,
            (nestedChild) => {
              if (
                React.isValidElement(
                  nestedChild,
                )
              ) {
                const nestedProps =
                  nestedChild.props as {
                    value?: string;
                  };

                if (
                  nestedProps.value &&
                  !tabs.includes(
                    nestedProps.value,
                  )
                ) {
                  tabs.push(
                    nestedProps.value,
                  );
                }
              }
            },
          );
        }
      },
    );

    return (
      <TabsContext.Provider
        value={{
          value: currentValue,

          setValue,

          size,

          colors: resolvedColors,

          typography:
            resolvedTypography,

          showBorder,

          baseId,

          tabs,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "sketch-tabs",
            className,
          )}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = "Tabs";


const TabsList = React.forwardRef<
  HTMLDivElement,
  TabsListProps
>(
  (
    {
      children,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          "sketch-tabs-list",
          className,
        )}
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    );
  },
);

TabsList.displayName = "TabsList";



const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(
  (
    {
      value,
      children,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const {
      value: activeValue,

      setValue,

      size,

      colors,

      typography,

      showBorder,

      baseId,

      tabs,
    } = useTabsContext();

    const config =
      SIZE_CONFIG[size];

    const isActive =
      activeValue === value;

    const [isHovered, setIsHovered] =
      useState(false);

    const [isFocused, setIsFocused] =
      useState(false);

    const [isPressed, setIsPressed] =
      useState(false);

    const {
      ref: sizerRef,
      w: contentW,
    } =
      useSketchSize<HTMLSpanElement>();

    const width = Math.max(
      config.minWidth,
      contentW + config.paddingX,
    );

    const height =
      config.triggerHeight;

    const finalColors = disabled
      ? {
          bg: SK_DISABLED.bg,

          bgOverlay:
            SK_DISABLED.bgOverlay,

          stroke:
            SK_DISABLED.stroke,

          text: SK_DISABLED.text,

          activeBg:
            SK_DISABLED.bg,

          activeOverlay:
            SK_DISABLED.bgOverlay,
        }
      : colors;

    const bgPath = `
      M 12 8
      C 20 5, 40 4, 60 4
      L ${width - 60} 4
      C ${width - 35} 5,
        ${width - 18} 8,
        ${width - 10} 16
      L ${width - 6} ${
        height - 18
      }
      C ${width - 10} ${
        height - 8
      },
        ${width - 28} ${
          height - 4
        },
        ${width - 60} ${
          height - 4
        }
      L 60 ${height - 4}
      C 35 ${height - 4},
        20 ${height - 8},
        10 ${height - 18}
      L 6 16
      C 6 12, 8 10, 12 8 Z
    `;

    const borderPath = `
      M 13 9
      C 20 6, 40 5, 60 5
      L ${width - 60} 5
      C ${width - 35} 6,
        ${width - 18} 9,
        ${width - 11} 16
      L ${width - 7} ${
        height - 18
      }
      C ${width - 11} ${
        height - 9
      },
        ${width - 28} ${
          height - 5
        },
        ${width - 60} ${
          height - 5
        }
      L 60 ${height - 5}
      C 35 ${height - 5},
        20 ${height - 9},
        11 ${height - 18}
      L 7 16
      C 7 12, 9 10, 13 9 Z
    `;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        disabled={disabled}
        id={`${baseId}-tab-${value}`}
        aria-selected={isActive}
        aria-controls={`${baseId}-panel-${value}`}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          "sketch-tabs-trigger",
          className,
        )}
        onClick={() => {
          if (!disabled) {
            setValue(value);
          }
        }}
        onMouseEnter={() =>
          !disabled &&
          setIsHovered(true)
        }
        onMouseLeave={() =>
          setIsHovered(false)
        }
        onFocus={() =>
          setIsFocused(true)
        }
        onBlur={() =>
          setIsFocused(false)
        }
        onKeyDown={(e) => {
          const currentIndex =
            tabs.indexOf(value);

          if (e.key === "ArrowRight") {
            e.preventDefault();

            setIsPressed(true);

            const nextIndex =
              (currentIndex + 1) %
              tabs.length;

            const nextTab =
              tabs[nextIndex];

            setValue(nextTab);

            requestAnimationFrame(() => {
              const nextElement =
                document.getElementById(
                  `${baseId}-tab-${nextTab}`,
                );

              (
                nextElement as HTMLButtonElement | null
              )?.focus();
            });
          }

          if (e.key === "ArrowLeft") {
            e.preventDefault();

            setIsPressed(true);

            const prevIndex =
              (currentIndex -
                1 +
                tabs.length) %
              tabs.length;

            const prevTab =
              tabs[prevIndex];

            setValue(prevTab);

            requestAnimationFrame(() => {
              const prevElement =
                document.getElementById(
                  `${baseId}-tab-${prevTab}`,
                );

              (
                prevElement as HTMLButtonElement | null
              )?.focus();
            });
          }
        }}
        onKeyUp={() => {
          setTimeout(() => {
            setIsPressed(false);
          }, 120);
        }}
        style={{
          width,
          height,

          background:
            "transparent",

          border: "none",

          padding: 0,

          cursor: disabled
            ? "not-allowed"
            : "pointer",

          transform: disabled
            ? "rotate(-0.2deg)"
            : isHovered
              ? "rotate(1deg) scale(1.03)"
              : isActive
                ? "rotate(-0.5deg)"
                : "rotate(0deg)",

          transition:
            "all 0.25s ease",
        }}
      >
        <span
          ref={sizerRef}
          aria-hidden="true"
          style={{
            position: "absolute",

            visibility: "hidden",

            whiteSpace: "nowrap",

            fontSize:
              typography.fontSize,

            fontWeight:
              typography.fontWeight,

            fontFamily:
              typography.fontFamily,
          }}
        >
          {children}
        </span>

        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "block",

            filter: disabled
              ? "grayscale(0.3) opacity(0.7)"
              : isHovered
                ? "drop-shadow(3px 4px 0px rgba(0,0,0,0.15)) drop-shadow(4px 6px 10px rgba(0,0,0,0.08))"
                : "drop-shadow(2px 3px 0px rgba(0,0,0,0.1)) drop-shadow(3px 4px 6px rgba(0,0,0,0.06))",
          }}
        >
          <SketchPaper
            d={bgPath}
            w={width}
            h={height}
            bg={
              isActive
                ? finalColors.activeBg
                : finalColors.bg
            }
            overlay={
              isActive
                ? finalColors.activeOverlay
                : finalColors.bgOverlay
            }
            overlayOpacity={0.6}
          />

          {isPressed && (
            <path
              d={bgPath}
              fill="#ffffff"
              opacity="0.05"
            />
          )}

          {showBorder && (
            <SketchBorder
              d1={borderPath}
              stroke={
                finalColors.stroke
              }
              w1={isActive ? 2.8 : 2}
              o1={0.85}
              dash="1.5,0.8"
            />
          )}

          {isFocused &&
            !disabled && (
              <path
                d={borderPath}
                fill="none"
                stroke={
                  finalColors.stroke
                }
                strokeWidth="3"
                opacity="0.3"
                strokeDasharray="4,3"
              />
            )}

          {isActive && (
            <path
              d={`
                M ${
                  width * 0.34
                } ${
                  height * 0.78
                }
                C ${
                  width * 0.40
                } ${
                  height * 0.84
                },
                  ${
                    width * 0.46
                  } ${
                    height * 0.73
                  },
                  ${
                    width * 0.52
                  } ${
                    height * 0.79
                  }
                C ${
                  width * 0.58
                } ${
                  height * 0.84
                },
                  ${
                    width * 0.64
                  } ${
                    height * 0.73
                  },
                  ${
                    width * 0.70
                  } ${
                    height * 0.78
                  }
              `}
              stroke={
                finalColors.stroke
              }
              strokeWidth={
                size === "sm"
                  ? 2.2
                  : 3
              }
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
          )}

          <foreignObject
            x="0"
            y="0"
            width={width}
            height={height}
          >
            <div
              style={{
                width: "100%",
                height: "100%",

                display: "flex",

                alignItems: "center",

                justifyContent:
                  "center",

                color:
                  finalColors.text,

                fontFamily:
                  typography.fontFamily,

                fontSize:
                  typography.fontSize,

                fontWeight:
                  typography.fontWeight,

                opacity: disabled
                  ? 0.5
                  : isActive
                    ? 1
                    : 0.85,

                userSelect: "none",
              }}
            >
              {children}
            </div>
          </foreignObject>
        </svg>
      </button>
    );
  },
);

TabsTrigger.displayName =
  "TabsTrigger";



const TabsContent = React.forwardRef<
  HTMLDivElement,
  TabsContentProps
>(
  (
    {
      value,
      children,
      className,
    },
    ref,
  ) => {
    const {
      value: activeValue,

      colors,

      typography,

      baseId,

      showBorder,
    } = useTabsContext();

    const isActive =
      activeValue === value;

    if (!isActive) return null;

    const bgPath = `
      M 16 12
      C 24 6, 42 4, 70 4
      L 630 6
      C 660 8, 688 12, 700 24
      L 704 230
      C 700 250, 684 264, 658 268
      L 62 270
      C 34 268, 16 258, 10 242
      L 8 36
      C 10 22, 12 16, 16 12
      Z
    `;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${baseId}-panel-${value}`}
        aria-labelledby={`${baseId}-tab-${value}`}
        tabIndex={0}
        className={cn(
          "sketch-tabs-content",
          className,
        )}
        style={{
          position: "relative",

          marginTop: "1.5rem",

          minHeight: "260px",

          transform:
            "rotate(-0.2deg)",

          animation:
            "sketchTabsFade 0.25s ease",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 720 280`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",

            inset: 0,

            zIndex: 1,

            filter:
              "drop-shadow(3px 5px 0px rgba(0,0,0,0.08)) drop-shadow(4px 7px 12px rgba(0,0,0,0.06))",
          }}
        >
          <SketchPaper
            d={bgPath}
            w={720}
            h={280}
            bg={colors.bg}
            overlay={
              colors.bgOverlay
            }
            overlayOpacity={0.6}
          />

          {showBorder && (
            <>
              <SketchBorder
                d1={bgPath}
                stroke={
                  colors.stroke
                }
                w1={2.4}
                o1={0.85}
                dash="1.5,0.8"
              />

              <SketchBorder
                d1={bgPath}
                stroke={
                  colors.stroke
                }
                w1={1.2}
                o1={0.25}
              />
            </>
          )}

          {Array.from({
            length: 7,
          }).map((_, i) => (
            <line
              key={i}
              x1="36"
              x2="680"
              y1={56 + i * 28}
              y2={56 + i * 28}
              stroke="#d8d1c7"
              strokeWidth="1"
              opacity="0.45"
            />
          ))}

          <line
            x1="60"
            x2="60"
            y1="20"
            y2="250"
            stroke="#d67b7b"
            strokeWidth="2"
            opacity="0.4"
          />
        </svg>

        <div
          style={{
            position: "relative",

            zIndex: 2,

            padding:
              "2rem 2rem 2rem 5rem",

            color: colors.text,

            fontFamily:
              typography.fontFamily,

            fontSize:
              typography.fontSize,

            fontWeight:
              typography.fontWeight,

            lineHeight: 1.8,
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);

TabsContent.displayName =
  "TabsContent";



export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};