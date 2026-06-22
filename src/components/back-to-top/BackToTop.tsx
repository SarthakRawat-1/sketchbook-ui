import React, { useEffect, useState } from "react";
import { Button } from "../button";

export interface BackToTopProps {
  threshold?: number;
  label?: string;
  className?: string;
  offset?: {
    bottom?: number;
    right?: number;
  };
}

const BackToTop = React.forwardRef<HTMLButtonElement, BackToTopProps>(
  (
    {
      threshold = 240,
      label = "Back to top",
      className = "",
      offset = { bottom: 24, right: 24 },
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsVisible(window.scrollY > threshold);
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!isVisible) return null;

    return (
      <div
        className={className}
        style={{
          position: "fixed",
          right: `${offset.right}px`,
          bottom: `${offset.bottom}px`,
          zIndex: 1000,
        }}
      >
        <Button
          ref={ref}
          iconOnly
          size="sm"
          aria-label={label}
          title={label}
          onClick={handleClick}
        >
          ↑
        </Button>
      </div>
    );
  },
);

BackToTop.displayName = "BackToTop";

export { BackToTop };
