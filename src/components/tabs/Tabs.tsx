import React, {
  createContext,
  useContext,
  useId,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import {
  cn,
  SketchPaper,
  SketchBorder,
  SK,
  SK_DISABLED,
  useSketchSize,
  useTabs,
} from "../../lib";
import { Card } from "../card";

export type TabsVariant = "folder" | "underline" | "pills";
export type TabContentVariant = "paper" | "notebook" | "sticky" | "clean";
export type TabsSize = "sm" | "md" | "lg";
export type TabsOrientation = "horizontal" | "vertical";

export interface TabsColors {
  bg?: string;
  bgOverlay?: string;
  stroke?: string;
  text?: string;
  activeBg?: string;
  activeStroke?: string;
  activeText?: string;
  hoverBg?: string;
  contentBg?: string;
  contentStroke?: string;
}

export interface TabsTypography {
  fontSize?: string;
  fontWeight?: string | number;
  fontFamily?: string;
}

export interface TabItem {
  value: string;
  label: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
}

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (val: string) => void;
  registerTab: (value: string, node: HTMLButtonElement | null) => void;
  handleKeyDown: (
    e: KeyboardEvent,
    tabValues: string[],
    disabledTabs?: Set<string>,
  ) => void;
  variant: TabsVariant;
  contentVariant: TabContentVariant;
  size: TabsSize;
  orientation: TabsOrientation;
  colors: Required<TabsColors>;
  typography: TabsTypography;
  showBorder: boolean;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be rendered within a <Tabs /> provider.");
  }
  return context;
};

const SIZE_CONFIG = {
  sm: {
    height: 32,
    fontSize: "1.05rem",
    contentMinHeight: "90px",
    minTabWidth: 75,
    hPad: 24,
    strokeWidth: 1.6,
  },
  md: {
    height: 46,
    fontSize: "1.35rem",
    contentMinHeight: "140px",
    minTabWidth: 110,
    hPad: 36,
    strokeWidth: 2.2,
  },
  lg: {
    height: 62,
    fontSize: "1.75rem",
    contentMinHeight: "200px",
    minTabWidth: 150,
    hPad: 50,
    strokeWidth: 2.8,
  },
} as const;

// Proportional path generator helpers for tabs
const getFolderPaths = (w: number, h: number) => ({
  bg: `M 4 ${h} C 6 ${h * 0.75}, 8 ${h * 0.35}, 14 5 C 17 2, 22 2, 28 2 L ${w - 28} 2 C ${w - 22} 2, ${w - 17} 2, ${w - 14} 5 C ${w - 8} ${h * 0.35}, ${w - 6} ${h * 0.75}, ${w - 4} ${h} Z`,
  bd1: `M 3.5 ${h} C 5.5 ${h * 0.74}, 7.5 ${h * 0.34}, 13.5 4.8 C 16.5 1.8, 21.5 1.8, 27.5 1.8 L ${w - 27.5} 1.8 C ${w - 21.5} 1.8, ${w - 16.5} 1.8, ${w - 13.5} 4.8 C ${w - 7.5} ${h * 0.34}, ${w - 5.5} ${h * 0.74}, ${w - 3.5} ${h}`,
  bd2: `M 4.2 ${h} C 6.2 ${h * 0.76}, 8.2 ${h * 0.36}, 14.2 5.2 C 17.2 2.2, 22.2 2.2, 28.2 2.2 L ${w - 28.2} 2.2 C ${w - 22.2} 2.2, ${w - 17.2} 2.2, ${w - 14.2} 5.2 C ${w - 8.2} ${h * 0.36}, ${w - 6.2} ${h * 0.76}, ${w - 4.2} ${h}`,
});

const getPillPaths = (w: number, h: number) => ({
  bg: `M 8 4 C 18 2, ${w * 0.5} 1.5, ${w - 8} 4 C ${w - 2} 8, ${w - 2} ${h - 8}, ${w - 8} ${h - 4} C ${w * 0.5} ${h - 1.5}, 18 ${h - 2}, 8 ${h - 4} C 2 ${h - 8}, 2 8, 8 4 Z`,
  bd1: `M 7.5 3.8 C 17.5 1.8, ${w * 0.5} 1.3, ${w - 7.5} 3.8 C ${w - 1.8} 7.8, ${w - 1.8} ${h - 7.8}, ${w - 7.5} ${h - 3.8} C ${w * 0.5} ${h - 1.3}, 17.5 ${h - 1.8}, 7.5 ${h - 3.8} C 1.8 ${h - 7.8}, 1.8 7.8, 7.5 3.8 Z`,
  bd2: `M 8.2 4.4 C 18.2 2.4, ${w * 0.5} 1.9, ${w - 8.2} 4.4 C ${w - 2.4} 8.4, ${w - 2.4} ${h - 8.4}, ${w - 8.2} ${h - 4.4} C ${w * 0.5} ${h - 1.9}, 18.2 ${h - 2.4}, 8.2 ${h - 4.4} C 2.4 ${h - 8.4}, 2.4 8.4, 8.2 4.4 Z`,
});

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  contentVariant?: TabContentVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
  colors?: TabsColors;
  typography?: TabsTypography;
  showBorder?: boolean;
  maxWidth?: string;
  items?: TabItem[];
  children?: ReactNode;
  className?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      variant = "folder",
      contentVariant = "paper",
      size = "md",
      orientation = "horizontal",
      colors,
      typography,
      showBorder = true,
      maxWidth,
      items,
      children,
      className = "",
      style,
      ...props
    },
    ref,
  ) => {
    const baseId = useId();
    const resolvedDefault = defaultValue || (items && items[0]?.value) || "";

    const { activeTab, setActiveTab, registerTab, handleKeyDown } = useTabs({
      value: controlledValue,
      defaultValue: resolvedDefault,
      onChange,
      orientation,
    });

    const resolvedColors: Required<TabsColors> = {
      bg: colors?.bg || SK.bg,
      bgOverlay: colors?.bgOverlay || SK.bgOverlay,
      stroke: colors?.stroke || SK.stroke,
      text: colors?.text || SK.text,
      activeBg: colors?.activeBg || "#fef9f0",
      activeStroke: colors?.activeStroke || SK.stroke,
      activeText: colors?.activeText || SK.text,
      hoverBg: colors?.hoverBg || "#fff3e0",
      contentBg: colors?.contentBg || (contentVariant === "notebook" ? "#fffef8" : SK.bg),
      contentStroke: colors?.contentStroke || SK.stroke,
    };

    const resolvedTypography: TabsTypography = {
      fontSize: typography?.fontSize || SIZE_CONFIG[size].fontSize,
      fontWeight: typography?.fontWeight || 600,
      fontFamily: typography?.fontFamily || SK.font,
    };

    const contextValue: TabsContextValue = {
      activeTab,
      setActiveTab,
      registerTab,
      handleKeyDown,
      variant,
      contentVariant,
      size,
      orientation,
      colors: resolvedColors,
      typography: resolvedTypography,
      showBorder,
      baseId,
    };

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "sketch-tabs",
            `sketch-tabs--${orientation}`,
            `sketch-tabs--${size}`,
            className,
          )}
          style={{
            display: "flex",
            flexDirection: orientation === "horizontal" ? "column" : "row",
            gap: variant === "folder" ? "0px" : "10px",
            width: "100%",
            maxWidth: maxWidth || "100%",
            boxSizing: "border-box",
            ...style,
          }}
          {...props}
        >
          {items ? (
            <>
              <TabsList>
                {items.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {items.map((item) =>
                item.content ? (
                  <TabsContent key={item.value} value={item.value}>
                    {item.content}
                  </TabsContent>
                ) : null,
              )}
            </>
          ) : (
            children
          )}
        </div>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = "Tabs";

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className = "", style, ...props }, ref) => {
    const { orientation, handleKeyDown, variant, colors } = useTabsContext();

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const triggers = Array.from(
        e.currentTarget.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        ),
      );
      const tabValues = triggers.map((t) => t.getAttribute("data-tab-value") || "");
      const disabledTabs = new Set(
        triggers
          .filter((t) => t.disabled)
          .map((t) => t.getAttribute("data-tab-value") || ""),
      );
      handleKeyDown(e, tabValues, disabledTabs);
    };

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={onKeyDown}
        className={cn("sketch-tabs-list", className)}
        style={{
          display: "flex",
          flexDirection: orientation === "horizontal" ? "row" : "column",
          alignItems: orientation === "horizontal" ? "flex-end" : "stretch",
          position: "relative",
          zIndex: 2,
          gap: variant === "folder" ? "4px" : "8px",
          borderBottom:
            orientation === "horizontal" && variant === "underline"
              ? `2px dashed ${colors.stroke}33`
              : "none",
          borderRight:
            orientation === "vertical" && variant === "underline"
              ? `2px dashed ${colors.stroke}33`
              : "none",
          paddingLeft: variant === "folder" ? "16px" : "0",
          boxSizing: "border-box",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, children, className = "", style, ...props }, ref) => {
    const {
      activeTab,
      setActiveTab,
      registerTab,
      variant,
      size,
      colors,
      typography,
      showBorder,
      baseId,
    } = useTabsContext();

    const isActive = activeTab === value;
    const cfg = SIZE_CONFIG[size];
    const triggerId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    const { ref: sizerRef, w: contentW } = useSketchSize<HTMLSpanElement>();
    const w = Math.max(cfg.minTabWidth, contentW + cfg.hPad);
    const h = cfg.height;

    const folder = getFolderPaths(w, h);
    const pill = getPillPaths(w, h);

    const c = disabled
      ? {
          bg: SK_DISABLED.bg,
          bgOverlay: SK_DISABLED.bgOverlay,
          stroke: SK_DISABLED.stroke,
          text: SK_DISABLED.text,
        }
      : {
          bg: isActive ? colors.activeBg : colors.bg,
          bgOverlay: colors.bgOverlay,
          stroke: isActive ? colors.activeStroke : colors.stroke,
          text: isActive ? colors.activeText : colors.text,
        };

    const handleRef = (node: HTMLButtonElement | null) => {
      registerTab(value, node);
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    };

    return (
      <button
        ref={handleRef}
        type="button"
        role="tab"
        id={triggerId}
        aria-controls={panelId}
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        data-tab-value={value}
        onClick={() => !disabled && setActiveTab(value)}
        className={cn("sketch-tabs-trigger", className)}
        style={{
          position: "relative",
          background: "none",
          border: "none",
          outline: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          height: `${h}px`,
          width: `${w}px`,
          minWidth: `${cfg.minTabWidth}px`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: typography.fontFamily,
          fontSize: typography.fontSize,
          fontWeight: isActive ? 700 : typography.fontWeight,
          color: c.text,
          opacity: disabled ? 0.4 : isActive ? 1 : 0.75,
          transform: isActive ? "translateY(1px)" : "translateY(0)",
          transition: "transform 0.15s ease, opacity 0.15s ease",
          userSelect: "none",
          boxSizing: "border-box",
          padding: 0,
          zIndex: isActive ? 3 : 1,
          ...style,
        }}
        {...props}
      >
        {variant === "folder" && (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
              filter: isActive
                ? "drop-shadow(0px -2px 0px rgba(0,0,0,0.06))"
                : "none",
            }}
          >
            <SketchPaper
              d={folder.bg}
              w={w}
              h={h}
              fine
              bg={c.bg}
              overlay={c.bgOverlay}
              overlayOpacity={isActive ? 0.7 : 0.4}
            />
            <SketchBorder
              d1={folder.bd1}
              d2={folder.bd2}
              stroke={c.stroke}
              w1={isActive ? cfg.strokeWidth : cfg.strokeWidth * 0.75}
              w2={1.0}
              dash="1.5,0.8"
              o1={isActive ? 0.9 : 0.6}
              o2={0.25}
              show={showBorder}
            />
          </svg>
        )}

        {variant === "pills" && (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
              filter: isActive
                ? "drop-shadow(2px 3px 0px rgba(0,0,0,0.1))"
                : "none",
            }}
          >
            <SketchPaper
              d={pill.bg}
              w={w}
              h={h}
              fine
              bg={c.bg}
              overlay={c.bgOverlay}
              overlayOpacity={isActive ? 0.8 : 0.4}
            />
            <SketchBorder
              d1={pill.bd1}
              d2={pill.bd2}
              stroke={c.stroke}
              w1={isActive ? cfg.strokeWidth : cfg.strokeWidth * 0.75}
              w2={1.0}
              dash="1.5,0.8"
              o1={isActive ? 0.9 : 0.55}
              o2={0.25}
              show={showBorder}
            />
          </svg>
        )}

        {variant === "underline" && isActive && (
          <svg
            width="100%"
            height="10"
            viewBox={`0 0 ${w} 10`}
            fill="none"
            style={{
              position: "absolute",
              bottom: "-5px",
              left: 0,
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <path
              d={`M 4 5 C ${w * 0.25} 2, ${w * 0.5} 8, ${w * 0.75} 3 L ${w - 4} 5.5`}
              stroke={colors.activeStroke || colors.stroke}
              strokeWidth={cfg.strokeWidth * 1.2}
              strokeLinecap="round"
              strokeDasharray="2,1"
              opacity="0.85"
            />
          </svg>
        )}

        <span ref={sizerRef} style={{ position: "relative", zIndex: 1, padding: "0 6px" }}>
          {children}
        </span>
      </button>
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  variant?: TabContentVariant;
  children: ReactNode;
  className?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, variant, children, className = "", style, ...props }, ref) => {
    const {
      activeTab,
      variant: tabsVariant,
      contentVariant: defaultContentVariant,
      size,
      colors,
      typography,
      showBorder,
      baseId,
    } = useTabsContext();

    const isActive = activeTab === value;
    const cfg = SIZE_CONFIG[size];
    const triggerId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    if (!isActive) return null;

    const resolvedContentVariant = variant || defaultContentVariant;

    // Clean unboxed content rendering
    if (resolvedContentVariant === "clean") {
      return (
        <div
          ref={ref}
          role="tabpanel"
          id={panelId}
          aria-labelledby={triggerId}
          tabIndex={0}
          className={cn("sketch-tabs-content", className)}
          style={{
            position: "relative",
            width: "100%",
            padding: "16px 8px",
            outline: "none",
            boxSizing: "border-box",
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Enclosed sketchy card rendering (paper, notebook, sticky)
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={triggerId}
        tabIndex={0}
        className={cn("sketch-tabs-content", className)}
        style={{
          position: "relative",
          zIndex: 1,
          boxSizing: "border-box",
          width: "100%",
          outline: "none",
          marginTop: tabsVariant === "folder" ? "-2px" : "0",
          ...style,
        }}
        {...props}
      >
        <Card
          variant={resolvedContentVariant}
          showBorder={showBorder}
          colors={{
            bg: colors.contentBg,
            stroke: colors.contentStroke,
            text: colors.text,
          }}
          typography={{
            fontFamily: typography.fontFamily,
          }}
          style={{ width: "100%", minHeight: cfg.contentMinHeight }}
        >
          {children}
        </Card>
      </div>
    );
  },
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
