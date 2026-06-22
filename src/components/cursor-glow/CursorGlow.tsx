import React, { useEffect, useState } from "react";
import { cn } from "../../lib";

export interface CursorGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  enabled?: boolean;
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
}

const CursorGlow = React.forwardRef<HTMLDivElement, CursorGlowProps>(
  (
    {
      children,
      enabled = true,
      color = "rgba(59, 130, 246, 0.35)",
      size = 220,
      blur = 80,
      opacity = 1,
      className = "",
      style,
      ...props
    },
    ref,
  ) => {
    const [point, setPoint] = useState({ x: -9999, y: -9999, visible: false });

    useEffect(() => {
      if (!enabled) return;

      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") {
          setPoint((current) => ({ ...current, visible: false }));
          return;
        }

        setPoint({
          x: event.clientX,
          y: event.clientY,
          visible: true,
        });
      };

      const handlePointerLeave = () => {
        setPoint((current) => ({ ...current, visible: false }));
      };

      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      window.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
      };
    }, [enabled]);

    return (
      <div ref={ref} className={cn("sketch-cursor-glow", className)} style={{ position: "relative", ...style }} {...props}>
        {enabled && (
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              left: point.x,
              top: point.y,
              width: size,
              height: size,
              borderRadius: "50%",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)",
              opacity: point.visible ? opacity : 0,
              transition: "opacity 180ms ease",
              background: `radial-gradient(circle, ${color} 0%, rgba(59, 130, 246, 0.12) 42%, rgba(59, 130, 246, 0.04) 62%, transparent 74%)`,
              filter: `blur(${blur}px)`,
              mixBlendMode: "multiply",
              zIndex: 1,
            }}
          />
        )}
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </div>
    );
  },
);

CursorGlow.displayName = "CursorGlow";

export { CursorGlow };
