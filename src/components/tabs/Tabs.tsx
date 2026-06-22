import React, {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";
import { cn, SK } from "../../lib";

type TabsValue = string;

type TabsContextValue = {
  value: TabsValue;
  setValue: (value: TabsValue) => void;
  listId: string;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`${componentName} must be used within <Tabs>`);
  }
  return context;
}

export interface TabsProps {
  children: React.ReactNode;
  defaultValue?: TabsValue;
  value?: TabsValue;
  onValueChange?: (value: TabsValue) => void;
  className?: string;
}

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: TabsValue;
  children: React.ReactNode;
}

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: TabsValue;
  children: React.ReactNode;
}

function focusTabButton(list: HTMLElement, direction: 1 | -1 | "start" | "end") {
  const tabs = Array.from(
    list.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
  ).filter((tab) => !tab.disabled);

  if (tabs.length === 0) return;

  const activeIndex = tabs.findIndex((tab) => tab === document.activeElement);

  if (direction === "start") {
    tabs[0].focus();
    return;
  }

  if (direction === "end") {
    tabs[tabs.length - 1].focus();
    return;
  }

  const nextIndex =
    activeIndex === -1
      ? 0
      : (activeIndex + direction + tabs.length) % tabs.length;
  tabs[nextIndex].focus();
}

const TabsRoot = ({
  children,
  defaultValue,
  value,
  onValueChange,
  className,
}: TabsProps) => {
  const baseId = useId();
  const listId = `${baseId}-list`;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const activeValue = value ?? internalValue;

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      value: activeValue,
      setValue: (nextValue: TabsValue) => {
        setInternalValue(nextValue);
        onValueChange?.(nextValue);
      },
      listId,
      baseId,
    }),
    [activeValue, baseId, listId, onValueChange],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("sketch-tabs", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, onKeyDown, ...props }, ref) => {
    const { listId } = useTabsContext("TabsList");

    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        id={listId}
        role="tablist"
        aria-orientation="horizontal"
        className={cn("sketch-tabs__list", className)}
        onKeyDown={(event) => {
          const target = event.currentTarget;
          if (event.key === "ArrowRight") {
            event.preventDefault();
            focusTabButton(target, 1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            focusTabButton(target, -1);
          } else if (event.key === "Home") {
            event.preventDefault();
            focusTabButton(target, "start");
          } else if (event.key === "End") {
            event.preventDefault();
            focusTabButton(target, "end");
          }
          onKeyDown?.(event);
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, className, onClick, onKeyDown, ...props }, ref) => {
    const { value: activeValue, setValue, baseId } = useTabsContext(
      "TabsTrigger",
    );
    const selected = activeValue === value;
    const panelId = `${baseId}-panel-${value}`;
    const tabId = `${baseId}-tab-${value}`;

    return (
      <button
        ref={ref}
        id={tabId}
        role="tab"
        type="button"
        aria-selected={selected}
        aria-controls={panelId}
        tabIndex={selected ? 0 : -1}
        className={cn("sketch-tabs__trigger", className)}
        style={{
          background: selected ? "#f7ebd9" : "#fffdf8",
          color: SK.text,
        }}
        onClick={(event) => {
          setValue(value);
          onClick?.(event);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setValue(value);
          }
          onKeyDown?.(event);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, className, ...props }, ref) => {
    const { value: activeValue, baseId } = useTabsContext("TabsContent");
    if (activeValue !== value) return null;

    const panelId = `${baseId}-panel-${value}`;
    const tabId = `${baseId}-tab-${value}`;

    return (
      <div
        ref={ref}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        className={cn("sketch-tabs__content", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
