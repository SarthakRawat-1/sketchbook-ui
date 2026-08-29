import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export interface UseListNavigationOptions {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  itemCount: number;
  scrollToIndex?: (index: number) => void;
}

/**
 * Shared keyboard navigation hook for list-like popups (Select, Dropdown).
 * Handles Arrow up/down, Home, End, Escape, and focus management.
 */
export function useListNavigation<
  TriggerElement extends HTMLElement = HTMLButtonElement,
>({ isOpen, setIsOpen, itemCount, scrollToIndex }: UseListNavigationOptions) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const triggerRef = useRef<TriggerElement>(null);
  const rafRef = useRef(0);

  const focusItem = (index: number) => {
    scrollToIndex?.(index);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      itemRefs.current[index]?.focus();
    });
  };

  // Focus first item when list opens, reset when closed
  useEffect(() => {
    if (isOpen && itemCount > 0) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setActiveIndex(0);
        focusItem(0);
      });
    } else {
      setActiveIndex(null);
    }
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, itemCount]);

  const handleTriggerKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) setIsOpen(true);
    }
  };

  const handleListKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const next =
          activeIndex === null ? 0 : Math.min(activeIndex + 1, itemCount - 1);
        setActiveIndex(next);
        focusItem(next);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prev = activeIndex === null ? 0 : Math.max(activeIndex - 1, 0);
        setActiveIndex(prev);
        focusItem(prev);
        break;
      }
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        focusItem(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(itemCount - 1);
        focusItem(itemCount - 1);
        break;
    }
  };

  return {
    activeIndex,
    setActiveIndex,
    itemRefs,
    triggerRef,
    handleTriggerKeyDown,
    handleListKeyDown,
  };
}
