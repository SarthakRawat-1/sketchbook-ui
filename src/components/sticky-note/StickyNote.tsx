import React from "react";
import { Card } from "../card";
import { cn, SK } from "../../lib";

export interface StickyNoteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children: React.ReactNode;
  title?: string;
  pinned?: boolean;
  tone?: "yellow" | "pink" | "blue" | "mint" | "lavender";
  showBorder?: boolean;
  size?: "sm" | "md" | "lg";
}

const TONES = {
  yellow: { bg: "#fff4a8", overlay: "#fff1c4", accent: "#b45309" },
  pink: { bg: "#ffd9e8", overlay: "#ffe8f1", accent: "#be185d" },
  blue: { bg: "#dbeafe", overlay: "#eaf3ff", accent: "#1d4ed8" },
  mint: { bg: "#d9fbe7", overlay: "#e9fff1", accent: "#047857" },
  lavender: { bg: "#ece5ff", overlay: "#f3efff", accent: "#6d28d9" },
} as const;

const SIZE_CONFIG = {
  sm: { padding: "18px 18px 16px", titleSize: "1.15rem", bodySize: "0.95rem" },
  md: { padding: "22px 22px 18px", titleSize: "1.3rem", bodySize: "1rem" },
  lg: { padding: "26px 26px 20px", titleSize: "1.45rem", bodySize: "1.05rem" },
} as const;

const StickyNote = React.forwardRef<HTMLDivElement, StickyNoteProps>(
  (
    {
      children,
      title,
      pinned = false,
      tone = "yellow",
      showBorder = true,
      size = "md",
      className = "",
      style,
      ...props
    },
    ref,
  ) => {
    const config = SIZE_CONFIG[size];
    const palette = TONES[tone];

    return (
      <Card
        ref={ref}
        variant="sticky"
        showBorder={showBorder}
        className={cn("sketch-sticky-note", className)}
        colors={{
          bg: palette.bg,
          bgOverlay: palette.overlay,
          stroke: palette.accent,
          text: SK.text,
        }}
        style={{
          ...style,
          transform: "rotate(-1.2deg)",
          overflow: "visible",
        }}
        {...props}
      >
        <div
          style={{
            position: "relative",
            padding: config.padding,
            minHeight: 120,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            color: SK.text,
            fontFamily: SK.font,
          }}
        >
          {pinned && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -8,
                right: 18,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#c2410c",
                border: `2px solid ${palette.accent}`,
                boxShadow: "0 3px 0 rgba(0, 0, 0, 0.14)",
                transform: "rotate(10deg)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "7px 11px 3px",
                  borderLeft: "2px solid rgba(255,255,255,0.8)",
                  transform: "rotate(-22deg)",
                }}
              />
            </div>
          )}

          {title && (
            <div
              style={{
                fontSize: config.titleSize,
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: 0,
                color: palette.accent,
                fontFamily: "'Caveat', cursive",
                width: "fit-content",
                transform: "rotate(-0.8deg)",
              }}
            >
              {title}
            </div>
          )}

          <div
            style={{
              fontSize: config.bodySize,
              lineHeight: 1.7,
              color: SK.text,
              whiteSpace: "pre-wrap",
            }}
          >
            {children}
          </div>
        </div>
      </Card>
    );
  },
);

StickyNote.displayName = "StickyNote";

export { StickyNote };
