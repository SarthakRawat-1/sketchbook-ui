import { useState, useCallback, useRef } from "react";
import type { KeyboardEvent } from "react";

export interface UseTabsOptions {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

export function useTabs({
  value: controlledValue,
  defaultValue = "",
  onChange,
  orientation = "horizontal",
}: UseTabsOptions = {}) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const activeTab = isControlled ? controlledValue : internalValue;

  const setActiveTab = useCallback(
    (val: string) => {
      if (!isControlled) {
        setInternalValue(val);
      }
      onChange?.(val);
    },
    [isControlled, onChange],
  );

  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  const registerTab = useCallback((value: string, node: HTMLButtonElement | null) => {
    if (node) {
      tabsRef.current.set(value, node);
    } else {
      tabsRef.current.delete(value);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, tabValues: string[], disabledTabs: Set<string> = new Set()) => {
      const enabledTabs = tabValues.filter((t) => !disabledTabs.has(t));
      if (enabledTabs.length === 0) return;

      const currentIndex = enabledTabs.indexOf(activeTab);
      let targetIndex = -1;

      const isHorizontal = orientation === "horizontal";
      const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
      const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";

      switch (e.key) {
        case nextKey:
          e.preventDefault();
          targetIndex = (currentIndex + 1) % enabledTabs.length;
          break;
        case prevKey:
          e.preventDefault();
          targetIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
          break;
        case "Home":
          e.preventDefault();
          targetIndex = 0;
          break;
        case "End":
          e.preventDefault();
          targetIndex = enabledTabs.length - 1;
          break;
        default:
          return;
      }

      if (targetIndex >= 0) {
        const nextValue = enabledTabs[targetIndex];
        setActiveTab(nextValue);
        const node = tabsRef.current.get(nextValue);
        node?.focus();
      }
    },
    [activeTab, orientation, setActiveTab],
  );

  return {
    activeTab,
    setActiveTab,
    registerTab,
    handleKeyDown,
  };
}
