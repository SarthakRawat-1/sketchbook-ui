import React, { useId, useState, useRef, useEffect, useCallback } from "react";
import {
  cn,
  SketchPaper,
  SketchBorder,
  SK,
  SK_DISABLED,
  useSketchSize,
  useCalendar,
} from "../../lib";

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fixedWeeks?: boolean;
  formatDate?: (date: Date) => string;
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    label?: string;
    hoverBg?: string;
    selectedBg?: string;
    selectedText?: string;
    todayDot?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
    labelSize?: string;
  };
  showBorder?: boolean;
  className?: string;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const defaultFormat = (date: Date): string => {
  const month = MONTH_NAMES[date.getMonth()].slice(0, 3);
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

const SIZE_CONFIG = {
  sm: {
    width: 220,
    height: 48,
    fontSize: "1.1rem",
    labelSize: "1.15rem",
    popoverWidth: 280,
    cellHeight: 28,
    popoverBaseHeight: 180,
    rowHeight: 31,
    iconSize: 20,
  },
  md: {
    width: 280,
    height: 56,
    fontSize: "1.3rem",
    labelSize: "1.25rem",
    popoverWidth: 320,
    cellHeight: 32,
    popoverBaseHeight: 195,
    rowHeight: 36,
    iconSize: 24,
  },
  lg: {
    width: 340,
    height: 64,
    fontSize: "1.5rem",
    labelSize: "1.4rem",
    popoverWidth: 360,
    cellHeight: 38,
    popoverBaseHeight: 220,
    rowHeight: 42,
    iconSize: 28,
  },
} as const;

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue = null,
      onChange,
      minDate,
      maxDate,
      placeholder = "Pick a date...",
      label,
      size = "md",
      disabled = false,
      fixedWeeks = false,
      formatDate = defaultFormat,
      colors,
      typography,
      showBorder = true,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerBtnRef = useRef<HTMLButtonElement>(null);
    const uid = useId();

    const {
      selectedDate,
      viewDate,
      calendarCells,
      numRows,
      prevMonth,
      nextMonth,
      goToToday,
      selectDate,
      clearDate,
    } = useCalendar({
      value: controlledValue,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      fixedWeeks,
    });

    const config = SIZE_CONFIG[size];

    const { ref: triggerSizerRef, w: measuredTriggerW } =
      useSketchSize<HTMLDivElement>(config.width, config.height);
    const triggerW = measuredTriggerW;
    const triggerH = config.height;

    const c = disabled
      ? {
          bg: SK_DISABLED.bg,
          bgOverlay: SK_DISABLED.bgOverlay,
          stroke: SK_DISABLED.stroke,
          text: SK_DISABLED.text,
          label: SK_DISABLED.text,
          hoverBg: SK_DISABLED.bg,
          selectedBg: SK_DISABLED.stroke,
          selectedText: "#ffffff",
          todayDot: SK_DISABLED.stroke,
        }
      : {
          bg: colors?.bg || SK.bg,
          bgOverlay: colors?.bgOverlay || SK.bgOverlay,
          stroke: colors?.stroke || SK.stroke,
          text: colors?.text || SK.text,
          label: colors?.label || SK.text,
          hoverBg: colors?.hoverBg || "#fff3e0",
          selectedBg: colors?.selectedBg || SK.stroke,
          selectedText: colors?.selectedText || "#ffffff",
          todayDot: colors?.todayDot || "#e65100",
        };

    const font = typography?.fontFamily || SK.font;
    const fontSize = typography?.fontSize || config.fontSize;
    const fontWeight = typography?.fontWeight || 500;
    const labelSize = typography?.labelSize || config.labelSize;

    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          e.preventDefault();
          setIsOpen(false);
          triggerBtnRef.current?.focus();
        }
      },
      [isOpen],
    );

    const handleDateSelect = (date: Date) => {
      if (disabled) return;
      selectDate(date);
      setIsOpen(false);
      triggerBtnRef.current?.focus();
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      clearDate();
    };

    const handleToday = () => {
      if (disabled) return;
      goToToday();
      setIsOpen(false);
      triggerBtnRef.current?.focus();
    };

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const popoverW = config.popoverWidth;
    const popoverH = config.popoverBaseHeight + numRows * config.rowHeight;

    const tw = triggerW;
    const th = triggerH;
    const triggerBgPath = `M ${tw * 0.029} ${th * 0.089} C ${tw * 0.036} ${th * 0.063}, ${tw * 0.054} ${th * 0.054}, ${tw * 0.071} ${th * 0.054} L ${tw * 0.357} ${th * 0.045} C ${tw * 0.429} ${th * 0.045}, ${tw * 0.5} ${th * 0.045}, ${tw * 0.571} ${th * 0.054} L ${tw * 0.857} ${th * 0.063} C ${tw * 0.893} ${th * 0.071}, ${tw * 0.921} ${th * 0.089}, ${tw * 0.943} ${th * 0.125} C ${tw * 0.964} ${th * 0.161}, ${tw * 0.975} ${th * 0.196}, ${tw * 0.975} ${th * 0.286} L ${tw * 0.975} ${th * 0.714} C ${tw * 0.975} ${th * 0.804}, ${tw * 0.964} ${th * 0.839}, ${tw * 0.943} ${th * 0.875} C ${tw * 0.921} ${th * 0.911}, ${tw * 0.893} ${th * 0.929}, ${tw * 0.857} ${th * 0.937} L ${tw * 0.571} ${th * 0.946} C ${tw * 0.5} ${th * 0.955}, ${tw * 0.429} ${th * 0.955}, ${tw * 0.357} ${th * 0.955} L ${tw * 0.071} ${th * 0.946} C ${tw * 0.054} ${th * 0.946}, ${tw * 0.036} ${th * 0.937}, ${tw * 0.029} ${th * 0.911} C ${tw * 0.021} ${th * 0.875}, ${tw * 0.011} ${th * 0.839}, ${tw * 0.011} ${th * 0.714} L ${tw * 0.011} ${th * 0.286} C ${tw * 0.011} ${th * 0.196}, ${tw * 0.021} ${th * 0.161}, ${tw * 0.029} ${th * 0.089} Z`;
    const triggerBdPath = `M ${tw * 0.027} ${th * 0.093} C ${tw * 0.034} ${th * 0.068}, ${tw * 0.052} ${th * 0.057}, ${tw * 0.07} ${th * 0.057} L ${tw * 0.354} ${th * 0.05} C ${tw * 0.425} ${th * 0.05}, ${tw * 0.496} ${th * 0.05}, ${tw * 0.568} ${th * 0.057} L ${tw * 0.854} ${th * 0.068} C ${tw * 0.89} ${th * 0.075}, ${tw * 0.918} ${th * 0.093}, ${tw * 0.939} ${th * 0.129} C ${tw * 0.961} ${th * 0.164}, ${tw * 0.971} ${th * 0.2}, ${tw * 0.971} ${th * 0.289} L ${tw * 0.971} ${th * 0.718} C ${tw * 0.971} ${th * 0.807}, ${tw * 0.961} ${th * 0.843}, ${tw * 0.939} ${th * 0.879} C ${tw * 0.918} ${th * 0.914}, ${tw * 0.89} ${th * 0.932}, ${tw * 0.854} ${th * 0.939} L ${tw * 0.568} ${th * 0.95} C ${tw * 0.496} ${th * 0.957}, ${tw * 0.425} ${th * 0.957}, ${tw * 0.354} ${th * 0.957} L ${tw * 0.07} ${th * 0.95} C ${tw * 0.052} ${th * 0.95}, ${tw * 0.034} ${th * 0.939}, ${tw * 0.027} ${th * 0.914} C ${tw * 0.018} ${th * 0.879}, ${tw * 0.009} ${th * 0.843}, ${tw * 0.009} ${th * 0.718} L ${tw * 0.009} ${th * 0.289} C ${tw * 0.009} ${th * 0.2}, ${tw * 0.018} ${th * 0.164}, ${tw * 0.027} ${th * 0.093} Z`;

    const pw = popoverW;
    const ph = popoverH;
    const popoverBgPath = `M 10 6 C 14 3, 20 2, 28 2 L ${pw * 0.4375} 1 C ${pw * 0.5625} 1, ${pw * 0.6875} 1.5, ${pw * 0.8125} 2 L ${pw * 0.9375} 3 C ${pw * 0.96875} 4, ${pw * 0.9875} 6, ${pw * 0.99375} 9 C ${pw * 0.996875} 12, ${pw} 15, ${pw} 18 L ${pw} ${ph - 15} C ${pw - 0.5} ${ph - 11}, ${pw - 3} ${ph - 7}, ${pw - 8} ${ph - 5} L ${pw * 0.8125} ${ph - 2} C ${pw * 0.6875} ${ph - 1}, ${pw * 0.5625} ${ph - 1}, ${pw * 0.4375} ${ph - 1} L ${pw * 0.25} ${ph - 2} C ${pw * 0.156} ${ph - 2.5}, ${pw * 0.093} ${ph - 3}, 18 ${ph - 4} L 12 ${ph - 5} C 7 ${ph - 7}, 4 ${ph - 10}, 3 ${ph - 14} L 3 14 C 3.5 10, 5 7, 10 6 Z`;
    const popoverBdPath = `M 9.5 6.2 C 13.5 3.2, 19.5 2.2, 27.5 2.2 L ${pw * 0.434} 1.2 C ${pw * 0.559} 1.2, ${pw * 0.684} 1.8, ${pw * 0.809} 2.2 L ${pw * 0.934} 3.2 C ${pw * 0.965} 4.2, ${pw * 0.984} 6.2, ${pw * 0.99} 9.2 C ${pw * 0.993} 12.2, ${pw - 1} 15.2, ${pw - 1} 18.2 L ${pw - 1} ${ph - 14.8} C ${pw - 1.5} ${ph - 10.8}, ${pw - 4} ${ph - 6.8}, ${pw - 9} ${ph - 4.8} L ${pw * 0.809} ${ph - 1.8} C ${pw * 0.684} ${ph - 0.8}, ${pw * 0.559} ${ph - 0.8}, ${pw * 0.434} ${ph - 0.8} L ${pw * 0.246} ${ph - 1.8} C ${pw * 0.153} ${ph - 2.2}, ${pw * 0.09} ${ph - 2.8}, 17.5 ${ph - 3.8} L 11.5 ${ph - 4.8} C 6.5 ${ph - 6.8}, 3.5 ${ph - 9.8}, 2.5 ${ph - 13.8} L 2.5 14.2 C 3 10.2, 4.5 7.2, 9.5 6.2 Z`;

    const hoverPatternId = `dph${uid}`;

    return (
      <div
        ref={ref}
        className={cn("sketch-datepicker", className)}
        style={{ position: "relative", display: "inline-block" }}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {label && (
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontFamily: font,
              fontSize: labelSize,
              color: c.label,
              marginLeft: "6px",
              transform: "rotate(-0.5deg)",
              width: "fit-content",
            }}
          >
            {label}
          </label>
        )}

        <div ref={containerRef} style={{ position: "relative" }}>
          <button
            ref={triggerBtnRef}
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            className="sketch-datepicker-trigger"
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: disabled ? "not-allowed" : "pointer",
              transform: disabled ? "rotate(0deg)" : "rotate(-0.3deg)",
              outline: "none",
            }}
          >
            <div
              ref={triggerSizerRef}
              style={{
                position: "relative",
                minWidth: `${config.width}px`,
                height: `${triggerH}px`,
              }}
            >
              <svg
                width={triggerW}
                height={triggerH}
                viewBox={`0 0 ${triggerW} ${triggerH}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  filter: disabled
                    ? "drop-shadow(1px 2px 0px rgba(0,0,0,0.06)) grayscale(0.3) opacity(0.7)"
                    : isOpen
                      ? "drop-shadow(2px 3px 0px rgba(0,0,0,0.12)) drop-shadow(3px 5px 8px rgba(0,0,0,0.08))"
                      : "drop-shadow(1px 2px 0px rgba(0,0,0,0.08)) drop-shadow(2px 3px 6px rgba(0,0,0,0.05))",
                  transition: "filter 0.3s ease",
                }}
              >
                <SketchPaper
                  d={triggerBgPath}
                  w={triggerW}
                  h={triggerH}
                  fine
                  bg={c.bg}
                  overlay={c.bgOverlay}
                  overlayOpacity={disabled ? 0.4 : 0.6}
                />
                <SketchBorder
                  d1={triggerBdPath}
                  stroke={c.stroke}
                  w1={isOpen ? 3 : 2.2}
                  dash="1.5,0.8"
                  o1={disabled ? 0.3 : isOpen ? 0.9 : 0.75}
                  show={showBorder}
                />
              </svg>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 18px",
                  pointerEvents: "none",
                  fontFamily: font,
                  fontSize,
                  fontWeight,
                  color: selectedDate ? c.text : `${c.text}88`,
                }}
              >
                <span>{selectedDate ? formatDate(selectedDate) : placeholder}</span>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {selectedDate && !disabled && (
                    <span
                      onClick={handleClear}
                      role="button"
                      aria-label="Clear date"
                      style={{
                        pointerEvents: "auto",
                        cursor: "pointer",
                        opacity: 0.5,
                        fontSize: "1.1rem",
                        padding: "0 4px",
                      }}
                    >
                      ×
                    </span>
                  )}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ opacity: disabled ? 0.35 : 0.75 }}
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="16"
                      rx="2"
                      stroke={c.stroke}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <line
                      x1="7"
                      y1="2"
                      x2="7"
                      y2="6"
                      stroke={c.stroke}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="17"
                      y1="2"
                      x2="17"
                      y2="6"
                      stroke={c.stroke}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 3 10 L 21 10"
                      stroke={c.stroke}
                      strokeWidth="1.2"
                      strokeDasharray="2 1.5"
                    />
                    <circle cx="7.5" cy="13.5" r="1" fill={c.stroke} />
                    <circle cx="12" cy="13.5" r="1" fill={c.stroke} />
                    <circle cx="16.5" cy="13.5" r="1" fill={c.stroke} />
                    <circle cx="7.5" cy="17" r="1" fill={c.stroke} />
                    <circle cx="12" cy="17" r="1" fill={c.stroke} />
                    <circle cx="16.5" cy="17" r="1" fill={c.stroke} />
                  </svg>
                </div>
              </div>
            </div>
          </button>

          {isOpen && !disabled && (
            <div
              className="sketch-datepicker-popover"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                width: `${popoverW}px`,
                height: `${popoverH}px`,
                zIndex: 60,
                transform: "rotate(0.3deg)",
                userSelect: "none",
                transition: "height 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <svg
                width={popoverW}
                height={popoverH}
                viewBox={`0 0 ${popoverW} ${popoverH}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  transition: "height 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  filter:
                    "drop-shadow(4px 6px 0px rgba(0,0,0,0.18)) drop-shadow(6px 10px 14px rgba(0,0,0,0.1))",
                }}
              >
                <defs>
                  <pattern
                    id={hoverPatternId}
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect width="4" height="4" fill={c.hoverBg} opacity="0.6" />
                    <line
                      x1="0"
                      y1="2"
                      x2="4"
                      y2="2"
                      stroke={c.stroke}
                      strokeWidth="0.5"
                      opacity="0.2"
                    />
                  </pattern>
                </defs>

                <SketchPaper
                  d={popoverBgPath}
                  w={popoverW}
                  h={popoverH}
                  fine
                  bg={c.bg}
                  overlay={c.bgOverlay}
                  overlayOpacity={0.8}
                />
                <SketchBorder
                  d1={popoverBdPath}
                  stroke={c.stroke}
                  w1={2.5}
                  dash="1.5,0.8"
                  o1={0.85}
                  show={showBorder}
                />

                {Array.from({ length: 6 }).map((_, i) => {
                  const lx = (pw / 7) * (i + 1);
                  return (
                    <g key={i}>
                      <circle cx={lx} cy="10" r="3" fill="#e8e4db" opacity="0.8" />
                      <line
                        x1={lx}
                        y1="2"
                        x2={lx}
                        y2="10"
                        stroke={c.stroke}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        opacity="0.65"
                      />
                    </g>
                  );
                })}
              </svg>

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  padding: "22px 20px 20px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <button
                    type="button"
                    onClick={prevMonth}
                    aria-label="Previous month"
                    className="sketch-datepicker-nav-btn"
                    style={{
                      background: "none",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      fontFamily: font,
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: c.stroke,
                      padding: "4px 8px",
                      lineHeight: 1,
                      borderRadius: "4px",
                    }}
                  >
                    ←
                  </button>

                  <span
                    style={{
                      fontFamily: font,
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: c.text,
                    }}
                  >
                    {MONTH_NAMES[month]} {year}
                  </span>

                  <button
                    type="button"
                    onClick={nextMonth}
                    aria-label="Next month"
                    className="sketch-datepicker-nav-btn"
                    style={{
                      background: "none",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      fontFamily: font,
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: c.stroke,
                      padding: "4px 8px",
                      lineHeight: 1,
                      borderRadius: "4px",
                    }}
                  >
                    →
                  </button>
                </div>

                {/* Weekday headers */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    fontFamily: font,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: `${c.text}99`,
                    marginBottom: "6px",
                    borderBottom: `1px dashed ${c.stroke}33`,
                    paddingBottom: "4px",
                  }}
                >
                  {WEEKDAYS.map((wd) => (
                    <div key={wd}>{wd}</div>
                  ))}
                </div>

                {/* Day cells grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gridAutoRows: `${config.cellHeight}px`,
                    gap: "3px",
                  }}
                >
                  {calendarCells.map((cell, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={cell.isDisabled || !cell.isCurrentMonth}
                      onClick={() => handleDateSelect(cell.date)}
                      style={{
                        background: cell.isSelected ? c.selectedBg : "transparent",
                        color: cell.isSelected
                          ? c.selectedText
                          : cell.isCurrentMonth
                            ? c.text
                            : `${c.text}33`,
                        border: "none",
                        borderRadius: "4px",
                        cursor:
                          cell.isDisabled || !cell.isCurrentMonth
                            ? "not-allowed"
                            : "pointer",
                        fontFamily: font,
                        fontSize: "1.15rem",
                        fontWeight: cell.isSelected || cell.isToday ? 700 : 500,
                        position: "relative",
                        height: `${config.cellHeight}px`,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: cell.isDisabled ? 0.3 : 1,
                        outline: "none",
                      }}
                    >
                      {cell.isSelected && (
                        <svg
                          style={{
                            position: "absolute",
                            inset: "-2px",
                            width: "calc(100% + 4px)",
                            height: "calc(100% + 4px)",
                            pointerEvents: "none",
                          }}
                          viewBox="0 0 40 32"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M 6 4 C 18 2, 28 3, 34 5 C 38 8, 38 24, 34 27 C 28 29, 14 30, 6 28 C 2 25, 2 8, 6 4 Z"
                            stroke={c.stroke}
                            strokeWidth="1.8"
                            fill="none"
                            strokeDasharray="2,1"
                          />
                        </svg>
                      )}

                      <span>{cell.date.getDate()}</span>

                      {cell.isToday && (
                        <span
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: cell.isSelected ? c.selectedText : c.todayDot,
                            marginTop: "-2px",
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Footer */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                    paddingTop: "8px",
                    borderTop: `1px dashed ${c.stroke}33`,
                  }}
                >
                  <button
                    type="button"
                    onClick={handleToday}
                    style={{
                      background: "none",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      fontFamily: font,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: c.stroke,
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      padding: "2px 4px",
                      lineHeight: 1.2,
                    }}
                  >
                    Today
                  </button>

                  {selectedDate && (
                    <button
                      type="button"
                      onClick={handleClear}
                      style={{
                        background: "none",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        fontFamily: font,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: `${c.text}99`,
                        padding: "2px 4px",
                        lineHeight: 1.2,
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
