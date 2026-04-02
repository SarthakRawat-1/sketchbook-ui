import React, { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { cn, SketchPaper, SketchBorder, SK } from "../../lib";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "paper" | "notebook" | "sticky";
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showBorder?: boolean;
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    backdrop?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
    titleSize?: string;
    titleWeight?: string | number;
  };
  className?: string;
}

const SIZE_CONFIG = {
  sm: { width: "400px", maxWidth: "90vw" },
  md: { width: "600px", maxWidth: "90vw" },
  lg: { width: "800px", maxWidth: "90vw" },
} as const;

/** Reference viewBox dimensions – the SVG stretches via preserveAspectRatio="none". */
const VB_W = 600;
const VB_H = 500;

const PAPER_BG = `M 15 10 C 20 6, 40 4, 80 3 L 300 2 C 400 1.5, 500 2, 520 3 L 565 4 C 578 5, 588 8, 593 14 L 595 485 C 594 492, 589 496, 582 497 L 540 498 C 500 498.5, 450 498, 400 497.5 L 200 497 C 150 497.5, 100 498, 50 497 L 20 496 C 12 494, 7 489, 5 482 L 4 18 C 5 12, 10 10, 15 10 Z`;

const PAPER_BD2 = `M 15.5 10.5 C 20.5 6.5, 40.5 4.5, 80.5 3.5 L 300.5 2.5 C 400.5 2, 500.5 2.5, 520.5 3.5 L 565.5 4.5 C 578.5 5.5, 588.5 8.5, 593.5 14.5 L 595.5 485.5 C 594.5 492.5, 589.5 496.5, 582.5 497.5 L 540.5 498.5 C 500.5 499, 450.5 498.5, 400.5 498 L 200.5 497.5 C 150.5 498, 100.5 498.5, 50.5 497.5 L 20.5 496.5 C 12.5 494.5, 7.5 489.5, 5.5 482.5 L 4.5 18.5 C 5.5 12.5, 10.5 10.5, 15.5 10.5 Z`;

const NB_BG = `M 15 8 C 20 5, 40 3, 80 2 L 300 1 C 400 0.5, 500 1, 520 2 L 565 3 C 578 4, 588 7, 593 13 L 595 487 C 594 493, 589 497, 582 498 L 540 499 C 500 499.5, 450 499, 400 498.5 L 200 498 C 150 498.5, 100 499, 50 498 L 20 497 C 12 495, 7 490, 5 483 L 4 17 C 5 11, 10 8, 15 8 Z`;

const NB_BD2 = `M 15.5 8.5 C 20.5 5.5, 40.5 3.5, 80.5 2.5 L 300.5 1.5 C 400.5 1, 500.5 1.5, 520.5 2.5 L 565.5 3.5 C 578.5 4.5, 588.5 7.5, 593.5 13.5 L 595.5 487.5 C 594.5 493.5, 589.5 497.5, 582.5 498.5 L 540.5 499.5 C 500.5 500, 450.5 499.5, 400.5 499 L 200.5 498.5 C 150.5 499, 100.5 499.5, 50.5 498.5 L 20.5 497.5 C 12.5 495.5, 7.5 490.5, 5.5 483.5 L 4.5 17.5 C 5.5 11.5, 10.5 8.5, 15.5 8.5 Z`;

const STICKY_BG = `M 12 15 L 10 25 C 8 35, 8 50, 10 70 L 12 480 C 14 488, 18 494, 24 496 L 570 498 C 580 497, 588 492, 592 485 L 594 25 C 593 18, 588 12, 581 10 L 25 8 C 18 9, 13 12, 12 15 Z`;

const STICKY_BD2 = `M 12.5 15.5 L 10.5 25.5 C 8.5 35.5, 8.5 50.5, 10.5 70.5 L 12.5 480.5 C 14.5 488.5, 18.5 494.5, 24.5 496.5 L 570.5 498.5 C 580.5 497.5, 588.5 492.5, 592.5 485.5 L 594.5 25.5 C 593.5 18.5, 588.5 12.5, 581.5 10.5 L 25.5 8.5 C 18.5 9.5, 13.5 12.5, 12.5 15.5 Z`;

const VARIANT_DEFAULTS = {
  paper: { bg: SK.bg, bgOverlay: SK.bgOverlay },
  notebook: { bg: "#fffef8", bgOverlay: "#f9f7f0" },
  sticky: { bg: "#fff9c4", bgOverlay: "#fef5a8" },
} as const;

function CloseIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M 6 6 L 18 18"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1, 0.3"
      />
      <path
        d="M 18 6 L 6 18"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1, 0.3"
      />
      {/* Ghost stroke for hand-drawn feel */}
      <path
        d="M 6.5 6.5 L 18.5 18.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M 18.5 6.5 L 6.5 18.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      footer,
      size = "md",
      variant = "paper",
      showCloseButton = true,
      closeOnBackdrop = true,
      closeOnEscape = true,
      showBorder = true,
      colors,
      typography,
      className,
    },
    ref,
  ) => {
    const uid = useId();
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    /* ── Resolved colours ─────────────────────────────────── */
    const defaults = VARIANT_DEFAULTS[variant];
    const c = {
      bg: colors?.bg ?? defaults.bg,
      bgOverlay: colors?.bgOverlay ?? defaults.bgOverlay,
      stroke: colors?.stroke ?? SK.stroke,
      text: colors?.text ?? SK.text,
      backdrop: colors?.backdrop ?? "rgba(0, 0, 0, 0.4)",
    };

    const font = typography?.fontFamily ?? SK.font;
    const titleId = `modal-title-${uid}`;

    /* ── Body scroll lock ─────────────────────────────────── */
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    /* ── Escape key ───────────────────────────────────────── */
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [isOpen, closeOnEscape, onClose]);

    /* ── Focus management: save previous, auto-focus modal ── */
    useEffect(() => {
      if (!isOpen) return;
      previousFocusRef.current = document.activeElement as HTMLElement;

      const t = setTimeout(() => {
        const modal = modalRef.current;
        if (!modal) return;
        const closeBtn = modal.querySelector<HTMLElement>(".sketch-modal__close");
        if (closeBtn) closeBtn.focus();
        else modal.focus();
      }, 50);

      return () => {
        clearTimeout(t);
        previousFocusRef.current?.focus();
      };
    }, [isOpen]);

    /* ── Focus trap (Tab cycling) ─────────────────────────── */
    useEffect(() => {
      if (!isOpen) return;
      const modal = modalRef.current;
      if (!modal) return;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        const focusable = modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("keydown", handleTab);
      return () => document.removeEventListener("keydown", handleTab);
    }, [isOpen]);

    /* ── Backdrop click ───────────────────────────────────── */
    const handleBackdropClick = useCallback(
      (e: React.MouseEvent) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose();
      },
      [closeOnBackdrop, onClose],
    );

    /* ── Ref merge ────────────────────────────────────────── */
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        modalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    if (!isOpen) return null;
    if (typeof document === "undefined") return null;

    /* ── SVG filter shadow per variant ────────────────────── */
    const svgFilter =
      variant === "sticky"
        ? "drop-shadow(3px 5px 15px rgba(0,0,0,0.2))"
        : "drop-shadow(4px 6px 20px rgba(0,0,0,0.25))";

    /* ── Variant-specific SVG content ─────────────────────── */
    const renderVariantSvg = () => {
      switch (variant) {
        /* ── Paper ──────────────────────────────────────── */
        case "paper":
          return (
            <>
              <SketchPaper
                d={PAPER_BG} w={VB_W} h={VB_H}
                bg={c.bg} overlay={c.bgOverlay}
                overlayOpacity={0.5} noiseOpacity={0.12}
              />

              {/* Corner fold doodle */}
              <path d="M 565 4 L 580 4 L 580 20 Z" fill="#e8e4db" opacity="0.6" />

              <SketchBorder
                d1={PAPER_BG} d2={PAPER_BD2}
                stroke={c.stroke} show={showBorder}
                w1={2.5} o1={0.85} o2={0.3} dash="1,0.5"
              />
            </>
          );

        /* ── Notebook ──────────────────────────────────── */
        case "notebook":
          return (
            <>
              <SketchPaper
                d={NB_BG} w={VB_W} h={VB_H}
                bg={c.bg} overlay={c.bgOverlay}
                overlayOpacity={0.4} noiseOpacity={0.1}
              />

              {/* Spiral binding holes */}
              {Array.from({ length: 10 }, (_, i) => (
                <g key={i}>
                  <circle cx="30" cy={50 + i * 42} r="4" fill="#e8e4db" opacity="0.7" />
                  <circle
                    cx="30" cy={50 + i * 42} r="3"
                    fill="none" stroke={c.stroke} strokeWidth="1" opacity="0.4"
                  />
                </g>
              ))}

              {/* Red margin line */}
              <line x1="90" y1="20" x2="90" y2="480" stroke="#e85d75" strokeWidth="2" opacity="0.4" />
              <line x1="91" y1="20" x2="91" y2="480" stroke="#e85d75" strokeWidth="1" opacity="0.2" />

              {/* Blue ruled lines */}
              {Array.from({ length: 15 }, (_, i) => (
                <line
                  key={i}
                  x1="95" y1={60 + i * 30} x2="580" y2={60 + i * 30}
                  stroke="#a8d5e2" strokeWidth="1" opacity="0.3" strokeDasharray="2,1"
                />
              ))}

              <SketchBorder
                d1={NB_BG} d2={NB_BD2}
                stroke={c.stroke} show={showBorder}
                w1={2.5} o1={0.8} o2={0.25} dash="1,0.5"
              />
            </>
          );

        /* ── Sticky ────────────────────────────────────── */
        case "sticky":
          return (
            <>
              <SketchPaper
                d={STICKY_BG} w={VB_W} h={VB_H}
                bg={c.bg} overlay={c.bgOverlay}
                overlayOpacity={0.5} noiseOpacity={0.08}
              />

              {/* Decorative tape at top */}
              <g opacity="0.6">
                <rect x="260" y="-5" width="80" height="20" fill="#f5f5dc" rx="2" />
                <rect x="260" y="-5" width="80" height="20" fill="#e8e8d0" opacity="0.4" rx="2" />
                <line x1="265" y1="0" x2="335" y2="0" stroke="#d0d0b8" strokeWidth="0.5" opacity="0.5" />
                <line x1="265" y1="10" x2="335" y2="10" stroke="#d0d0b8" strokeWidth="0.5" opacity="0.5" />
              </g>

              <SketchBorder
                d1={STICKY_BG} d2={STICKY_BD2}
                stroke={c.stroke} show={showBorder}
                w1={2} o1={0.5} o2={0.2}
              />
            </>
          );
      }
    };

    const sizeStyles = SIZE_CONFIG[size];

    const modal = (
      <div
        className="sketch-modal-backdrop"
        onClick={handleBackdropClick}
      >
        {/* Backdrop overlay */}
        <div
          className="sketch-modal-backdrop__overlay"
          style={{ background: c.backdrop }}
        />

        {/* Modal dialog */}
        <div
          ref={setRefs}
          className={cn("sketch-modal", className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          tabIndex={-1}
          style={{ width: sizeStyles.width, maxWidth: sizeStyles.maxWidth }}
        >
          {/* SVG background – stretched behind content */}
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            className="sketch-modal__svg"
            style={{ filter: svgFilter }}
          >
            {renderVariantSvg()}
          </svg>

          {/* Content overlay */}
          <div
            className="sketch-modal__content"
            style={{
              fontFamily: font,
              color: c.text,
              paddingLeft: variant === "notebook" ? "calc(15% + 1rem)" : undefined,
            }}
          >
            {/* Close button */}
            {showCloseButton && (
              <button
                className="sketch-modal__close"
                onClick={onClose}
                aria-label="Close modal"
                style={{ color: c.stroke }}
              >
                <CloseIcon stroke={c.stroke} />
              </button>
            )}

            {/* Title */}
            {title && (
              <h2
                id={titleId}
                className="sketch-modal__title"
                style={{
                  fontFamily: font,
                  fontSize: typography?.titleSize ?? "2rem",
                  fontWeight: typography?.titleWeight ?? 600,
                  color: c.text,
                }}
              >
                {title}
              </h2>
            )}

            {/* Body */}
            <div
              className="sketch-modal__body"
              style={{
                fontFamily: font,
                fontSize: typography?.fontSize ?? "1.3rem",
                fontWeight: typography?.fontWeight ?? 400,
                color: c.text,
              }}
            >
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div
                className="sketch-modal__footer"
                style={{ borderTopColor: c.stroke + "33" }}
              >
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    );

    return createPortal(modal, document.body);
  },
);

Modal.displayName = "Modal";

export { Modal };
