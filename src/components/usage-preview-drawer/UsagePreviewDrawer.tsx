import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn, SketchBorder, SketchPaper, SK } from "../../lib";

export interface UsagePreviewDrawerProp {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
}

export interface UsagePreviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  preview: React.ReactNode;
  code: string;
  propsReference: UsagePreviewDrawerProp[];
  initialTab?: "preview" | "code" | "props";
  codeLanguage?: string;
  variant?: "paper" | "notebook" | "sticky";
  showBorder?: boolean;
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    backdrop?: string;
  };
  typography?: {
    fontFamily?: string;
    titleSize?: string;
    bodySize?: string;
  };
  className?: string;
}

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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M 6 6 L 18 18"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1,0.5"
      />
      <path
        d="M 18 6 L 6 18"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1,0.5"
      />
    </svg>
  );
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

const UsagePreviewDrawer = React.forwardRef<
  HTMLDivElement,
  UsagePreviewDrawerProps
>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      preview,
      code,
      propsReference,
      initialTab = "preview",
      codeLanguage = "tsx",
      variant = "paper",
      showBorder = true,
      colors,
      typography,
      className,
    },
    ref,
  ) => {
    const uid = useId();
    const panelRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const [activeTab, setActiveTab] = useState<"preview" | "code" | "props">(
      initialTab,
    );
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      if (!isOpen) return;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;
      const timer = window.setTimeout(() => closeRef.current?.focus(), 40);
      return () => window.clearTimeout(timer);
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
          return;
        }

        if (e.key !== "Tab") return;
        const panel = panelRef.current;
        if (!panel) return;

        const focusable = panel.querySelectorAll<HTMLElement>(
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

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const defaults = VARIANT_DEFAULTS[variant];
    const c = {
      bg: colors?.bg ?? defaults.bg,
      bgOverlay: colors?.bgOverlay ?? defaults.bgOverlay,
      stroke: colors?.stroke ?? SK.stroke,
      text: colors?.text ?? SK.text,
      backdrop: colors?.backdrop ?? "rgba(17, 17, 17, 0.48)",
    };

    const font = typography?.fontFamily ?? SK.font;
    const titleId = `usage-preview-drawer-title-${uid}`;
    const descriptionId = `usage-preview-drawer-description-${uid}`;

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
      },
      [onClose],
    );

    const handleCopy = useCallback(async () => {
      await copyText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }, [code]);

    if (!isOpen || typeof document === "undefined") return null;

    const renderVariantSvg = () => {
      switch (variant) {
        case "paper":
          return (
            <>
              <SketchPaper
                d={PAPER_BG}
                w={VB_W}
                h={VB_H}
                bg={c.bg}
                overlay={c.bgOverlay}
                overlayOpacity={0.5}
                noiseOpacity={0.12}
              />
              <path
                d="M 565 4 L 580 4 L 580 20 Z"
                fill="#e8e4db"
                opacity="0.6"
              />
              <SketchBorder
                d1={PAPER_BG}
                d2={PAPER_BD2}
                stroke={c.stroke}
                show={showBorder}
                w1={2.5}
                o1={0.85}
                o2={0.3}
                dash="1,0.5"
              />
            </>
          );
        case "notebook":
          return (
            <>
              <SketchPaper
                d={NB_BG}
                w={VB_W}
                h={VB_H}
                bg={c.bg}
                overlay={c.bgOverlay}
                overlayOpacity={0.4}
                noiseOpacity={0.1}
              />
              {Array.from({ length: 10 }, (_, i) => (
                <g key={i}>
                  <circle
                    cx="30"
                    cy={50 + i * 42}
                    r="4"
                    fill="#e8e4db"
                    opacity="0.7"
                  />
                  <circle
                    cx="30"
                    cy={50 + i * 42}
                    r="3"
                    fill="none"
                    stroke={c.stroke}
                    strokeWidth="1"
                    opacity="0.4"
                  />
                </g>
              ))}
              {Array.from({ length: 15 }, (_, i) => (
                <line
                  key={i}
                  x1="95"
                  y1={60 + i * 30}
                  x2="580"
                  y2={60 + i * 30}
                  stroke="#a8d5e2"
                  strokeWidth="1"
                  opacity="0.3"
                  strokeDasharray="2,1"
                />
              ))}
              <SketchBorder
                d1={NB_BG}
                d2={NB_BD2}
                stroke={c.stroke}
                show={showBorder}
                w1={2.5}
                o1={0.8}
                o2={0.25}
                dash="1,0.5"
              />
            </>
          );
        case "sticky":
          return (
            <>
              <SketchPaper
                d={STICKY_BG}
                w={VB_W}
                h={VB_H}
                bg={c.bg}
                overlay={c.bgOverlay}
                overlayOpacity={0.5}
                noiseOpacity={0.08}
              />
              <g opacity="0.6">
                <rect
                  x="260"
                  y="-5"
                  width="80"
                  height="20"
                  fill="#f5f5dc"
                  rx="2"
                />
                <rect
                  x="260"
                  y="-5"
                  width="80"
                  height="20"
                  fill="#e8e8d0"
                  opacity="0.4"
                  rx="2"
                />
                <line
                  x1="265"
                  y1="0"
                  x2="335"
                  y2="0"
                  stroke="#d0d0b8"
                  strokeWidth="0.5"
                  opacity="0.5"
                />
                <line
                  x1="265"
                  y1="10"
                  x2="335"
                  y2="10"
                  stroke="#d0d0b8"
                  strokeWidth="0.5"
                  opacity="0.5"
                />
              </g>
              <SketchBorder
                d1={STICKY_BG}
                d2={STICKY_BD2}
                stroke={c.stroke}
                show={showBorder}
                w1={2}
                o1={0.5}
                o2={0.2}
              />
            </>
          );
      }
    };

    const drawer = (
      <div
        className="sketch-usage-drawer-backdrop"
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          justifyContent: "flex-end",
          background: c.backdrop,
          zIndex: 1300,
        }}
      >
        <div
          ref={(node) => {
            panelRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref)
              (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                node;
          }}
          className={cn("sketch-usage-drawer", className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          tabIndex={-1}
          style={{
            position: "relative",
            width: "min(560px, 100vw)",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "-16px 0 40px rgba(0, 0, 0, 0.18)",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            className="sketch-usage-drawer__svg"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              filter: "drop-shadow(-4px 6px 18px rgba(0,0,0,0.16))",
            }}
          >
            {renderVariantSvg()}
          </svg>

          <div
            className="sketch-usage-drawer__content"
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: "22px 22px 24px",
              fontFamily: font,
              color: c.text,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 14,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    margin: "0 0 6px",
                    fontFamily: "'Caveat', cursive",
                    fontSize: "1.1rem",
                    color: "#6b6460",
                    letterSpacing: 0,
                  }}
                >
                  Component preview
                </p>
                <h2
                  id={titleId}
                  style={{
                    margin: 0,
                    fontFamily: "'Caveat', cursive",
                    fontSize: typography?.titleSize ?? "2rem",
                    lineHeight: 1.05,
                  }}
                >
                  {title}
                </h2>
                {description && (
                  <p
                    id={descriptionId}
                    style={{
                      margin: "10px 0 0",
                      maxWidth: 440,
                      lineHeight: 1.7,
                      color: "#6b6460",
                      fontSize: typography?.bodySize ?? "0.98rem",
                    }}
                  >
                    {description}
                  </p>
                )}
              </div>

              <button
                ref={closeRef}
                type="button"
                aria-label="Close usage preview drawer"
                onClick={onClose}
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 6,
                  cursor: "pointer",
                  color: c.stroke,
                  flexShrink: 0,
                }}
              >
                <CloseIcon stroke={c.stroke} />
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 16,
              }}
              role="tablist"
              aria-label="Usage preview drawer tabs"
            >
              {[
                ["preview", "Live preview"],
                ["code", "JSX usage"],
                ["props", "Props reference"],
              ].map(([tab, label]) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() =>
                      setActiveTab(tab as "preview" | "code" | "props")
                    }
                    style={{
                      border: `2px solid ${c.stroke}`,
                      background: isActive ? "#f7ebd9" : "#fffdf8",
                      borderRadius: 999,
                      padding: "10px 16px",
                      fontFamily: "'Caveat', cursive",
                      fontSize: "1rem",
                      cursor: "pointer",
                      color: c.text,
                      boxShadow: isActive
                        ? "0 4px 0 rgba(0, 0, 0, 0.08)"
                        : "0 2px 0 rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                paddingRight: 6,
              }}
            >
              {activeTab === "preview" && (
                <div
                  role="tabpanel"
                  aria-label="Live preview"
                  style={{ display: "grid", gap: 16 }}
                >
                  {preview}
                </div>
              )}

              {activeTab === "code" && (
                <div
                  role="tabpanel"
                  aria-label="JSX usage"
                  style={{ display: "grid", gap: 14 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: "'Caveat', cursive",
                          fontSize: "1.1rem",
                        }}
                      >
                        {codeLanguage.toUpperCase()}
                      </p>
                      <p style={{ margin: "4px 0 0", color: "#6b6460" }}>
                        Copy the snippet and drop it into your app.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopy}
                      style={{
                        border: `2px solid ${c.stroke}`,
                        background: copied ? "#d6f5d6" : "#fffdf8",
                        borderRadius: 999,
                        padding: "10px 16px",
                        fontFamily: "'Caveat', cursive",
                        fontSize: "1rem",
                        cursor: "pointer",
                        color: c.text,
                      }}
                    >
                      {copied ? "Copied" : "Copy code"}
                    </button>
                  </div>

                  <pre
                    style={{
                      margin: 0,
                      overflowX: "auto",
                      whiteSpace: "pre",
                      background: "#fffaf2",
                      border: `2px solid ${c.stroke}22`,
                      borderRadius: 20,
                      padding: 18,
                      lineHeight: 1.7,
                      fontSize: "0.9rem",
                      color: "#2a2a2a",
                    }}
                  >
                    <code>{code}</code>
                  </pre>
                </div>
              )}

              {activeTab === "props" && (
                <div
                  role="tabpanel"
                  aria-label="Props reference"
                  style={{ display: "grid", gap: 14 }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "'Caveat', cursive",
                        fontSize: "1.1rem",
                      }}
                    >
                      Drawer API
                    </p>
                    <p style={{ margin: "4px 0 0", color: "#6b6460" }}>
                      These are the pieces that power the usage drawer demo.
                    </p>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.92rem",
                      }}
                    >
                      <thead>
                        <tr style={{ textAlign: "left", color: "#5a5248" }}>
                          <th style={{ padding: "10px 12px 10px 0" }}>
                            Prop
                          </th>
                          <th style={{ padding: "10px 12px" }}>Type</th>
                          <th style={{ padding: "10px 12px" }}>Details</th>
                          <th style={{ padding: "10px 0 10px 12px" }}>
                            Default
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "isOpen",
                            type: "boolean",
                            description: "Controls whether the drawer is visible.",
                            required: "required",
                            defaultValue: "false",
                          },
                          {
                            name: "onClose",
                            type: "() => void",
                            description: "Called when the user closes the drawer.",
                            required: "required",
                            defaultValue: "-",
                          },
                          {
                            name: "preview",
                            type: "ReactNode",
                            description: "Live component example shown in the first tab.",
                            required: "required",
                            defaultValue: "-",
                          },
                          {
                            name: "code",
                            type: "string",
                            description: "The JSX snippet users can copy from the drawer.",
                            required: "required",
                            defaultValue: "-",
                          },
                          {
                            name: "propsReference",
                            type: "UsagePreviewDrawerProp[]",
                            description: "Reference rows displayed in the props tab.",
                            required: "required",
                            defaultValue: "[]",
                          },
                          {
                            name: "initialTab",
                            type: '"preview" | "code" | "props"',
                            description: "Tab shown first when the drawer opens.",
                            required: "optional",
                            defaultValue: "preview",
                          },
                          {
                            name: "variant",
                            type: '"paper" | "notebook" | "sticky"',
                            description: "Sketch style used for the drawer shell.",
                            required: "optional",
                            defaultValue: "paper",
                          },
                        ].map((prop) => (
                          <tr
                            key={prop.name}
                            style={{
                              borderTop: "1px solid rgba(90, 82, 72, 0.18)",
                              verticalAlign: "top",
                            }}
                          >
                            <td
                              style={{
                                padding: "12px 12px 12px 0",
                                fontWeight: 600,
                              }}
                            >
                              <div>{prop.name}</div>
                              <div
                                style={{
                                  fontSize: "0.75rem",
                                  color: "#8a8078",
                                  marginTop: 4,
                                }}
                              >
                                {prop.required}
                              </div>
                            </td>
                            <td style={{ padding: 12, color: "#5a5248" }}>
                              <code>{prop.type}</code>
                            </td>
                            <td style={{ padding: 12, lineHeight: 1.65 }}>
                              {prop.description}
                            </td>
                            <td
                              style={{
                                padding: "12px 0 12px 12px",
                                color: "#5a5248",
                              }}
                            >
                              <code>{prop.defaultValue}</code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {propsReference.length > 0 && (
                    <div
                      style={{
                        borderTop: "1px dashed rgba(90, 82, 72, 0.25)",
                        paddingTop: 16,
                        display: "grid",
                        gap: 10,
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontFamily: "'Caveat', cursive",
                          fontSize: "1.1rem",
                        }}
                      >
                        Example references
                      </p>
                      <div style={{ display: "grid", gap: 10 }}>
                        {propsReference.map((prop) => (
                          <div
                            key={prop.name}
                            style={{
                              border: "1px solid rgba(90, 82, 72, 0.16)",
                              borderRadius: 18,
                              padding: 14,
                              background: "#fffdf8",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 12,
                              }}
                            >
                              <strong>{prop.name}</strong>
                              <code>{prop.type}</code>
                            </div>
                            <p style={{ margin: "8px 0 0", lineHeight: 1.6 }}>
                              {prop.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    return createPortal(drawer, document.body);
  },
);

UsagePreviewDrawer.displayName = "UsagePreviewDrawer";

export { UsagePreviewDrawer };
