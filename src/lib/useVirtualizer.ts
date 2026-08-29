import { useState, useEffect, useRef, useCallback } from "react";

export interface UseVirtualizerOptions {
  count: number;
  itemHeight: number;
  containerRef: React.RefObject<HTMLElement | null>;
  overscan?: number;
}

export interface VirtualItem {
  index: number;
  offsetTop: number;
}

export function useVirtualizer({
  count,
  itemHeight,
  containerRef,
  overscan = 3,
}: UseVirtualizerOptions) {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const rafId = useRef(0);

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      (containerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      setContainer(node);
    },
    [containerRef],
  );

  // Re-run whenever the container element changes (e.g. conditional rendering)
  useEffect(() => {
    if (!container) return;

    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setScrollTop(container.scrollTop);
      });
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    observer.observe(container);
    container.addEventListener("scroll", handleScroll, { passive: true });

    setContainerHeight(container.clientHeight);
    setScrollTop(container.scrollTop);

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [count, itemHeight, container, overscan]);

  const totalHeight = count * itemHeight;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    count - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan,
  );

  const virtualItems: VirtualItem[] = [];
  for (let i = startIndex; i <= endIndex; i++) {
    if (i < count) {
      virtualItems.push({
        index: i,
        offsetTop: i * itemHeight,
      });
    }
  }

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const targetTop = index * itemHeight;
    const targetBottom = targetTop + itemHeight;
    if (targetTop < container.scrollTop) {
      container.scrollTop = targetTop;
    } else if (targetBottom > container.scrollTop + container.clientHeight) {
      container.scrollTop = targetBottom - container.clientHeight;
    }
  };

  return {
    virtualItems,
    totalHeight,
    scrollToIndex,
    setRef,
  };
}
