import { useState, useEffect, useCallback, useMemo } from "react";

export interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

export interface UseCalendarOptions {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  fixedWeeks?: boolean;
}

export function isSameDay(d1?: Date | null, d2?: Date | null): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function useCalendar({
  value: controlledValue,
  defaultValue = null,
  onChange,
  minDate,
  maxDate,
  fixedWeeks = false,
}: UseCalendarOptions = {}) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue);
  const selectedDate = isControlled ? controlledValue : internalValue;

  const [viewDate, setViewDate] = useState<Date>(
    () => selectedDate || new Date(),
  );

  useEffect(() => {
    if (selectedDate) {
      setViewDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }
  }, [selectedDate]);

  const selectDate = useCallback(
    (date: Date) => {
      if (!isControlled) {
        setInternalValue(date);
      }
      onChange?.(date);
    },
    [isControlled, onChange],
  );

  const clearDate = useCallback(() => {
    if (!isControlled) {
      setInternalValue(null);
    }
    onChange?.(null);
  }, [isControlled, onChange]);

  const goToToday = useCallback(() => {
    const today = new Date();
    selectDate(today);
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
  }, [selectDate]);

  const prevMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const nextMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const { calendarCells, numRows } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const today = new Date();

    const cells: CalendarCell[] = [];

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, daysInPrevMonth - i);
      cells.push({
        date: d,
        isCurrentMonth: false,
        isToday: isSameDay(d, today),
        isSelected: isSameDay(d, selectedDate),
        isDisabled: Boolean((minDate && d < minDate) || (maxDate && d > maxDate)),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      cells.push({
        date: d,
        isCurrentMonth: true,
        isToday: isSameDay(d, today),
        isSelected: isSameDay(d, selectedDate),
        isDisabled: Boolean((minDate && d < minDate) || (maxDate && d > maxDate)),
      });
    }

    // Next month padding to fill complete rows of 7
    const remaining = (7 - (cells.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      cells.push({
        date: d,
        isCurrentMonth: false,
        isToday: isSameDay(d, today),
        isSelected: isSameDay(d, selectedDate),
        isDisabled: Boolean((minDate && d < minDate) || (maxDate && d > maxDate)),
      });
    }

    if (fixedWeeks) {
      let nextDay = remaining + 1;
      while (cells.length < 42) {
        const d = new Date(year, month + 1, nextDay++);
        cells.push({
          date: d,
          isCurrentMonth: false,
          isToday: isSameDay(d, today),
          isSelected: isSameDay(d, selectedDate),
          isDisabled: Boolean((minDate && d < minDate) || (maxDate && d > maxDate)),
        });
      }
    }

    return {
      calendarCells: cells,
      numRows: Math.ceil(cells.length / 7),
    };
  }, [viewDate, selectedDate, minDate, maxDate, fixedWeeks]);

  return {
    selectedDate,
    viewDate,
    setViewDate,
    calendarCells,
    numRows,
    prevMonth,
    nextMonth,
    goToToday,
    selectDate,
    clearDate,
  };
}
