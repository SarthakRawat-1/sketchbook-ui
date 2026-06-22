import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn, SK } from "../../lib";

export interface DatePickerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "defaultValue" | "value"
  > {
  label?: string;
  placeholder?: string;
  value?: Date | string | null;
  defaultValue?: Date | string | null;
  onChange?: (value: Date | null) => void;
  minDate?: Date | string;
  maxDate?: Date | string;
  disabled?: boolean;
  formatDate?: (date: Date) => string;
  className?: string;
}

type DayCell = {
  date: Date | null;
  key: string;
};

function toDate(value: Date | string | null | undefined) {
  if (!value) return null;
  if (value instanceof Date) return new Date(value.getTime());
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function sameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function endOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function buildDays(viewMonth: Date): DayCell[] {
  const firstDay = startOfMonth(viewMonth);
  const startOffset = firstDay.getDay();
  const monthEnd = endOfMonth(viewMonth).getDate();
  const cells: DayCell[] = [];
  const cursor = addDays(firstDay, -startOffset);

  for (let i = 0; i < 42; i += 1) {
    const insideMonth = cursor.getMonth() === viewMonth.getMonth();
    cells.push({
      date: insideMonth ? new Date(cursor) : null,
      key: `${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}-${i}`,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  if (monthEnd <= 28) {
    return cells.slice(0, 35);
  }

  return cells;
}

const MONTH_FORMATTER = new Intl.DateTimeFormat(undefined, {
  month: "long",
  year: "numeric",
});

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      label,
      placeholder = "Select a date…",
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disabled = false,
      formatDate = (date: Date) =>
        new Intl.DateTimeFormat(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(date),
      className,
      style: externalStyle,
      ...props
    },
    ref,
  ) => {
    const uid = useId();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const dayRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<Date | null>(
      toDate(defaultValue),
    );
    const [viewMonth, setViewMonth] = useState<Date>(
      startOfMonth(toDate(value) ?? toDate(defaultValue) ?? new Date()),
    );

    const controlledValue = toDate(value);
    const selectedValue = controlledValue ?? internalValue;
    const min = toDate(minDate);
    const max = toDate(maxDate);

    useEffect(() => {
      if (selectedValue) {
        setViewMonth(startOfMonth(selectedValue));
      }
    }, [selectedValue]);

    useEffect(() => {
      const handleOutside = (event: PointerEvent) => {
        if (
          rootRef.current &&
          !rootRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("pointerdown", handleOutside);
      }

      return () => document.removeEventListener("pointerdown", handleOutside);
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;
      const handler = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;
      const index = dayRefs.current.findIndex((button) =>
        button?.dataset.selected === "true",
      );
      const targetIndex = index >= 0 ? index : dayRefs.current.findIndex(Boolean);
      if (targetIndex >= 0) {
        window.setTimeout(() => dayRefs.current[targetIndex]?.focus(), 0);
      }
    }, [isOpen, viewMonth]);

    const displayValue = selectedValue ? formatDate(selectedValue) : "";
    const days = useMemo(() => buildDays(viewMonth), [viewMonth]);
    const monthLabel = MONTH_FORMATTER.format(viewMonth);
    const today = startOfDay(new Date());

    const setValue = useCallback(
      (next: Date | null) => {
        if (disabled) return;
        if (value === undefined) {
          setInternalValue(next);
        }
        onChange?.(next);
      },
      [disabled, onChange, value],
    );

    const selectDay = useCallback(
      (next: Date) => {
        setValue(next);
        setViewMonth(startOfMonth(next));
        setIsOpen(false);
      },
      [setValue],
    );

    const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    const handleDayKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement>,
      index: number,
      day: Date,
    ) => {
      const moveFocus = (offset: number) => {
        const next = dayRefs.current[index + offset];
        next?.focus();
      };

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          moveFocus(-1);
          break;
        case "ArrowRight":
          event.preventDefault();
          moveFocus(1);
          break;
        case "ArrowUp":
          event.preventDefault();
          moveFocus(-7);
          break;
        case "ArrowDown":
          event.preventDefault();
          moveFocus(7);
          break;
        case "Home":
          event.preventDefault();
          dayRefs.current
            .slice(Math.floor(index / 7) * 7, Math.floor(index / 7) * 7 + 7)
            .find(Boolean)
            ?.focus();
          break;
        case "End":
          event.preventDefault();
          dayRefs.current
            .slice(Math.floor(index / 7) * 7, Math.floor(index / 7) * 7 + 7)
            .filter(Boolean)
            .at(-1)
            ?.focus();
          break;
        case "PageUp":
          event.preventDefault();
          setViewMonth((current) => addMonths(current, -1));
          break;
        case "PageDown":
          event.preventDefault();
          setViewMonth((current) => addMonths(current, 1));
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          selectDay(day);
          break;
      }
    };

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn("sketch-date-picker", className)}
        style={{ position: "relative", ...externalStyle }}
        {...props}
      >
        {label && (
          <label
            htmlFor={`date-picker-trigger-${uid}`}
            style={{
              display: "block",
              margin: "0 0 8px 8px",
              fontFamily: SK.font,
              color: SK.text,
            }}
          >
            {label}
          </label>
        )}

        <button
          id={`date-picker-trigger-${uid}`}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          onKeyDown={onTriggerKeyDown}
          style={{
            width: "100%",
            minWidth: 300,
            padding: "16px 18px",
            borderRadius: 18,
            border: `2px solid ${SK.stroke}`,
            background: "#fffdf8",
            color: selectedValue ? SK.text : "#8a8078",
            textAlign: "left",
            fontFamily: SK.font,
            fontSize: "1.15rem",
            cursor: disabled ? "not-allowed" : "pointer",
            boxShadow: "0 4px 0 rgba(0, 0, 0, 0.08)",
          }}
        >
          {selectedValue ? displayValue : placeholder}
        </button>

        {isOpen && !disabled && (
          <div
            role="dialog"
            aria-label="Date picker calendar"
            style={{
              position: "absolute",
              zIndex: 40,
              marginTop: 12,
              width: "min(100%, 360px)",
            }}
          >
            <div
              style={{
                background: "#fffdf8",
                border: `2px solid ${SK.stroke}`,
                borderRadius: 20,
                padding: 16,
                boxShadow: "0 12px 0 rgba(0, 0, 0, 0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewMonth((current) => addMonths(current, -1))}
                  style={navButtonStyle}
                  aria-label="Previous month"
                >
                  ←
                </button>
                <div
                  style={{
                    fontFamily: SK.font,
                    fontSize: "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  {monthLabel}
                </div>
                <button
                  type="button"
                  onClick={() => setViewMonth((current) => addMonths(current, 1))}
                  style={navButtonStyle}
                  aria-label="Next month"
                >
                  →
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                  gap: 6,
                  marginBottom: 8,
                }}
                aria-hidden="true"
              >
                {WEEKDAYS.map((day) => (
                  <div
                    key={day}
                    style={{
                      textAlign: "center",
                      fontFamily: SK.font,
                      fontSize: "0.95rem",
                      color: "#6b6460",
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                  gap: 6,
                }}
              >
                {days.map((dayCell, index) => {
                  if (!dayCell.date) {
                    return <div key={dayCell.key} />;
                  }

                  const isSelected = sameDay(dayCell.date, selectedValue);
                  const isToday = sameDay(dayCell.date, today);
                  const isDisabled = Boolean(
                    (min && dayCell.date < startOfDay(min)) ||
                      (max && dayCell.date > endOfDay(max)),
                  );

                  return (
                    <button
                      key={dayCell.key}
                      ref={(node) => {
                        dayRefs.current[index] = node;
                      }}
                      type="button"
                      data-selected={isSelected}
                      aria-pressed={isSelected}
                      disabled={isDisabled}
                      onKeyDown={(event) =>
                        handleDayKeyDown(event, index, dayCell.date!)
                      }
                      onClick={() => selectDay(dayCell.date!)}
                      style={{
                        minHeight: 44,
                        borderRadius: 14,
                        border: `2px solid ${
                          isSelected ? SK.stroke : "rgba(42, 42, 42, 0.2)"
                        }`,
                        background: isSelected
                          ? "#f7ebd9"
                          : isToday
                            ? "#eef7ff"
                            : "#fffdf8",
                        color: isDisabled ? "#b7b0a8" : SK.text,
                        fontFamily: SK.font,
                        fontSize: "1rem",
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        boxShadow: isSelected
                          ? "0 4px 0 rgba(0, 0, 0, 0.08)"
                          : "0 2px 0 rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      {dayCell.date.getDate()}
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 14,
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    const next = startOfDay(new Date());
                    setValue(next);
                    setViewMonth(startOfMonth(next));
                  }}
                  style={textButtonStyle}
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setValue(null);
                    setIsOpen(false);
                  }}
                  style={textButtonStyle}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

const navButtonStyle: React.CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: 999,
  border: `2px solid ${SK.stroke}`,
  background: "#fffdf8",
  fontFamily: SK.font,
  fontSize: "1.2rem",
  cursor: "pointer",
  boxShadow: "0 3px 0 rgba(0, 0, 0, 0.08)",
};

const textButtonStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#5a5248",
  fontFamily: SK.font,
  fontSize: "1rem",
  cursor: "pointer",
  padding: 0,
};

DatePicker.displayName = "DatePicker";

export { DatePicker };
