import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn, SketchPaper, SketchBorder, SK } from "../../lib";

export type ToastVariant = "success" | "warning" | "error" | "info";

export interface ToastOptions {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

export interface ToastProps {
  toast: ToastOptions;
  onDismiss: (id: string) => void;
  // Size and dimensions
  size?: "sm" | "md" | "lg";
  width?: number;
  height?: number;
  // Customization props
  colors?: {
    success?: { bg?: string; border?: string; tape?: string };
    warning?: { bg?: string; border?: string; tape?: string };
    error?: { bg?: string; border?: string; tape?: string };
    info?: { bg?: string; border?: string; tape?: string };
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string | number;
    fontFamily?: string;
  };
  showBorder?: boolean;
  showIcon?: boolean;
  className?: string;
}

// --- Global Toast Store for shared state ---
type SubscribeFn = (toasts: ToastOptions[]) => void;
let globalToasts: ToastOptions[] = [];
const listeners: Set<SubscribeFn> = new Set();

const addToast = (toast: ToastOptions) => {
  globalToasts = [...globalToasts, toast];
  listeners.forEach((listener) => listener(globalToasts));
};

const removeToast = (id: string) => {
  globalToasts = globalToasts.filter((t) => t.id !== id);
  listeners.forEach((listener) => listener(globalToasts));
};

const clearToasts = () => {
  globalToasts = [];
  listeners.forEach((listener) => listener(globalToasts));
};

// Hand-drawn doodle icons as SVG components
const CheckmarkIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M 5 12 Q 7 14, 9 16 L 10 17 Q 13 13, 16 9 L 19 6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="1, 0.5"
    />
    <path
      d="M 5.5 12.5 Q 7.5 14.5, 9.5 16.5 L 10.5 17.5 Q 13.5 13.5, 16.5 9.5 L 19.5 6.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.4"
    />
  </svg>
);

const WarningIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M 12 3 L 21 19 L 3 19 Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="1.5, 0.5"
    />
    <line
      x1="12"
      y1="9"
      x2="12"
      y2="14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16.5" r="1" fill={color} />
  </svg>
);

const ErrorIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <line
      x1="6"
      y1="6"
      x2="18"
      y2="18"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="1, 0.3"
    />
    <line
      x1="18"
      y1="6"
      x2="6"
      y2="18"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="1, 0.3"
    />
    <line
      x1="6.5"
      y1="6.5"
      x2="18.5"
      y2="18.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.3"
    />
    <line
      x1="18.5"
      y1="6.5"
      x2="6.5"
      y2="18.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.3"
    />
  </svg>
);

const InfoIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeDasharray="1.5, 0.5"
    />
    <line
      x1="12"
      y1="11"
      x2="12"
      y2="17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="8" r="1" fill={color} />
  </svg>
);

const ToastIcon = ({
  variant,
  color,
}: {
  variant: ToastVariant;
  color: string;
}) => {
  switch (variant) {
    case "success":
      return <CheckmarkIcon color={color} />;
    case "warning":
      return <WarningIcon color={color} />;
    case "error":
      return <ErrorIcon color={color} />;
    case "info":
      return <InfoIcon color={color} />;
  }
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      toast,
      onDismiss,
      size = "md",
      width,
      height,
      colors,
      typography,
      showBorder = true,
      showIcon = true,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDismissing, setIsDismissing] = useState(false);

    const handleDismiss = () => {
      setIsDismissing(true);
      setTimeout(() => onDismiss(toast.id), 400);
    };

    // Size configurations
    const sizeConfig = {
      sm: {
        width: 280,
        minHeight: 80,
        fontSize: "1.2rem",
        padding: "16px 20px",
        iconSize: 20,
      },
      md: {
        width: 340,
        minHeight: 100,
        fontSize: "1.35rem",
        padding: "20px 24px",
        iconSize: 24,
      },
      lg: {
        width: 400,
        minHeight: 120,
        fontSize: "1.5rem",
        padding: "24px 28px",
        iconSize: 28,
      },
    };

    const config = sizeConfig[size];

    // Use provided dimensions or default config
    const toastWidth = width || config.width;
    const toastHeight = height || config.minHeight;

    // Default colors with customization support
    // Default colors with customization support
    const defaultTheme = {
      success: { bg: "#f0fdf4", border: "#2d7a4f", tape: "#2d7a4f" },
      warning: { bg: "#fffbeb", border: "#d97706", tape: "#d97706" },
      error: { bg: "#fff1f2", border: "#c2410c", tape: "#c2410c" },
      info: { bg: "#eff6ff", border: "#1e40af", tape: "#1e40af" },
    };

    const variantColors = {
      bg: colors?.[toast.variant]?.bg || defaultTheme[toast.variant].bg,
      border:
        colors?.[toast.variant]?.border || defaultTheme[toast.variant].border,
      tape: colors?.[toast.variant]?.tape || defaultTheme[toast.variant].tape,
    };

    // Default typography with customization support
    const toastTypography = {
      fontSize: typography?.fontSize || config.fontSize,
      fontWeight: typography?.fontWeight || "500",
      fontFamily: typography?.fontFamily || SK.font,
    };

    return (
      <div
        ref={ref}
        role={toast.variant === "error" ? "alert" : "status"}
        aria-live={toast.variant === "error" ? "assertive" : "polite"}
        className={cn(
          "sketch-toast",
          isDismissing && "sketch-toast-dismissing",
          className,
        )}
        style={{
          filter: isHovered
            ? "drop-shadow(3px 4px 0px rgba(0,0,0,0.12)) drop-shadow(5px 7px 10px rgba(0,0,0,0.08))"
            : "drop-shadow(2px 2px 0px rgba(0,0,0,0.1)) drop-shadow(3px 5px 8px rgba(0,0,0,0.06))",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* SVG Background */}
        <svg
          width={toastWidth}
          height={toastHeight}
          viewBox={`0 0 ${toastWidth} ${toastHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          {(() => {
            const tw = toastWidth,
              th = toastHeight;
            const bgPath = `M ${tw * 0.044} ${th * 0.091} C ${tw * 0.053} ${th * 0.073}, ${tw * 0.074} ${th * 0.064}, ${tw * 0.094} ${th * 0.064} L ${tw * 0.353} ${th * 0.055} C ${tw * 0.397} ${th * 0.055}, ${tw * 0.441} ${th * 0.059}, ${tw * 0.485} ${th * 0.064} L ${tw * 0.735} ${th * 0.073} C ${tw * 0.779} ${th * 0.077}, ${tw * 0.824} ${th * 0.082}, ${tw * 0.868} ${th * 0.091} C ${tw * 0.897} ${th * 0.1}, ${tw * 0.926} ${th * 0.118}, ${tw * 0.941} ${th * 0.164} L ${tw * 0.965} ${th * 0.318} C ${tw * 0.971} ${th * 0.409}, ${tw * 0.974} ${th * 0.5}, ${tw * 0.971} ${th * 0.591} L ${tw * 0.965} ${th * 0.773} C ${tw * 0.959} ${th * 0.836}, ${tw * 0.947} ${th * 0.891}, ${tw * 0.926} ${th * 0.918} L ${tw * 0.868} ${th * 0.955} C ${tw * 0.824} ${th * 0.973}, ${tw * 0.779} ${th * 0.982}, ${tw * 0.735} ${th * 0.973} L ${tw * 0.485} ${th * 0.982} C ${tw * 0.441} ${th * 0.982}, ${tw * 0.397} ${th * 0.977}, ${tw * 0.353} ${th * 0.973} L ${tw * 0.132} ${th * 0.964} C ${tw * 0.103} ${th * 0.959}, ${tw * 0.074} ${th * 0.945}, ${tw * 0.053} ${th * 0.918} C ${tw * 0.035} ${th * 0.891}, ${tw * 0.024} ${th * 0.845}, ${tw * 0.021} ${th * 0.791} L ${tw * 0.018} ${th * 0.591} C ${tw * 0.016} ${th * 0.5}, ${tw * 0.018} ${th * 0.409}, ${tw * 0.021} ${th * 0.318} L ${tw * 0.029} ${th * 0.182} C ${tw * 0.032} ${th * 0.127}, ${tw * 0.038} ${th * 0.1}, ${tw * 0.044} ${th * 0.091} Z`;
            const b1 = `M ${tw * 0.041} ${th * 0.091} C ${tw * 0.05} ${th * 0.077}, ${tw * 0.071} ${th * 0.068}, ${tw * 0.091} ${th * 0.068} L ${tw * 0.35} ${th * 0.059} C ${tw * 0.394} ${th * 0.059}, ${tw * 0.438} ${th * 0.064}, ${tw * 0.482} ${th * 0.068} L ${tw * 0.732} ${th * 0.077} C ${tw * 0.776} ${th * 0.082}, ${tw * 0.821} ${th * 0.086}, ${tw * 0.865} ${th * 0.095} C ${tw * 0.894} ${th * 0.105}, ${tw * 0.924} ${th * 0.123}, ${tw * 0.938} ${th * 0.168} L ${tw * 0.962} ${th * 0.323} C ${tw * 0.968} ${th * 0.414}, ${tw * 0.971} ${th * 0.505}, ${tw * 0.968} ${th * 0.595} L ${tw * 0.962} ${th * 0.777} C ${tw * 0.956} ${th * 0.841}, ${tw * 0.944} ${th * 0.895}, ${tw * 0.924} ${th * 0.923} L ${tw * 0.865} ${th * 0.959} C ${tw * 0.821} ${th * 0.973}, ${tw * 0.776} ${th * 0.977}, ${tw * 0.732} ${th * 0.977} L ${tw * 0.482} ${th * 0.986} C ${tw * 0.438} ${th * 0.986}, ${tw * 0.394} ${th * 0.982}, ${tw * 0.35} ${th * 0.977} L ${tw * 0.129} ${th * 0.968} C ${tw * 0.1} ${th * 0.964}, ${tw * 0.071} ${th * 0.95}, ${tw * 0.05} ${th * 0.923} C ${tw * 0.032} ${th * 0.895}, ${tw * 0.022} ${th * 0.85}, ${tw * 0.019} ${th * 0.795} L ${tw * 0.016} ${th * 0.595} C ${tw * 0.015} ${th * 0.505}, ${tw * 0.016} ${th * 0.414}, ${tw * 0.019} ${th * 0.323} L ${tw * 0.028} ${th * 0.186} C ${tw * 0.031} ${th * 0.132}, ${tw * 0.037} ${th * 0.105}, ${tw * 0.041} ${th * 0.091} Z`;
            const b2 = `M ${tw * 0.046} ${th * 0.1} C ${tw * 0.054} ${th * 0.082}, ${tw * 0.075} ${th * 0.073}, ${tw * 0.096} ${th * 0.073} L ${tw * 0.354} ${th * 0.064} C ${tw * 0.399} ${th * 0.064}, ${tw * 0.443} ${th * 0.068}, ${tw * 0.487} ${th * 0.073} L ${tw * 0.737} ${th * 0.082} C ${tw * 0.781} ${th * 0.086}, ${tw * 0.825} ${th * 0.091}, ${tw * 0.869} ${th * 0.1} C ${tw * 0.899} ${th * 0.109}, ${tw * 0.928} ${th * 0.127}, ${tw * 0.943} ${th * 0.173} L ${tw * 0.966} ${th * 0.327} C ${tw * 0.972} ${th * 0.418}, ${tw * 0.975} ${th * 0.509}, ${tw * 0.972} ${th * 0.6} L ${tw * 0.966} ${th * 0.782} C ${tw * 0.96} ${th * 0.845}, ${tw * 0.948} ${th * 0.9}, ${tw * 0.928} ${th * 0.927} L ${tw * 0.869} ${th * 0.964} C ${tw * 0.825} ${th * 0.977}, ${tw * 0.781} ${th * 0.982}, ${tw * 0.737} ${th * 0.982} L ${tw * 0.487} ${th * 0.991} C ${tw * 0.443} ${th * 0.991}, ${tw * 0.399} ${th * 0.986}, ${tw * 0.354} ${th * 0.991} L ${tw * 0.134} ${th * 0.973} C ${tw * 0.104} ${th * 0.968}, ${tw * 0.075} ${th * 0.955}, ${tw * 0.054} ${th * 0.927} C ${tw * 0.037} ${th * 0.9}, ${tw * 0.025} ${th * 0.855}, ${tw * 0.022} ${th * 0.8} L ${tw * 0.019} ${th * 0.6} C ${tw * 0.018} ${th * 0.509}, ${tw * 0.019} ${th * 0.418}, ${tw * 0.022} ${th * 0.327} L ${tw * 0.031} ${th * 0.191} C ${tw * 0.034} ${th * 0.136}, ${tw * 0.04} ${th * 0.109}, ${tw * 0.046} ${th * 0.1} Z`;
            return (
              <>
                <SketchPaper
                  d={bgPath}
                  w={tw}
                  h={th}
                  bg={SK.bg}
                  overlay={variantColors.bg}
                  overlayOpacity={0.85}
                />
                <SketchBorder
                  d1={b1}
                  d2={b2}
                  stroke={variantColors.border}
                  show={showBorder}
                  w1={2.5}
                  o1={0.8}
                  dash="1.5,0.5"
                  o2={0.25}
                />
              </>
            );
          })()}

          {/* Decorative tape strip at top */}
          <g opacity="0.3">
            <path
              d={`M ${toastWidth * 0.176} ${toastHeight * 0.018} L ${toastWidth * 0.412} ${toastHeight * 0.027} L ${toastWidth * 0.409} ${toastHeight * 0.091} L ${toastWidth * 0.179} ${toastHeight * 0.082} Z`}
              fill={variantColors.tape}
              opacity="0.2"
            />
            <path
              d={`M ${toastWidth * 0.176} ${toastHeight * 0.018} Q ${toastWidth * 0.294} ${toastHeight * 0.023}, ${toastWidth * 0.412} ${toastHeight * 0.027}`}
              stroke={variantColors.tape}
              strokeWidth="1"
              opacity="0.3"
              fill="none"
            />
          </g>

          {/* Small decorative doodle accent */}
          <g opacity="0.5">
            <path
              d={`M ${toastWidth * 0.912} ${toastHeight * 0.227} L ${toastWidth * 0.918} ${toastHeight * 0.245} L ${toastWidth * 0.924} ${toastHeight * 0.227} L ${toastWidth * 0.919} ${toastHeight * 0.264} L ${toastWidth * 0.926} ${toastHeight * 0.273} L ${toastWidth * 0.918} ${toastHeight * 0.282} L ${toastWidth * 0.918} ${toastHeight * 0.309} L ${toastWidth * 0.912} ${toastHeight * 0.282} L ${toastWidth * 0.903} ${toastHeight * 0.291} L ${toastWidth * 0.909} ${toastHeight * 0.264} L ${toastWidth * 0.903} ${toastHeight * 0.245} Z`}
              stroke={variantColors.border}
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>

        {/* Content overlay */}
        <div
          className="sketch-toast-content"
          style={{
            width: `${toastWidth}px`,
            height: `${toastHeight}px`,
            padding: config.padding,
          }}
        >
          {showIcon && (
            <div className="sketch-toast-icon">
              <div
                style={{
                  width: `${config.iconSize}px`,
                  height: `${config.iconSize}px`,
                }}
              >
                <ToastIcon
                  variant={toast.variant}
                  color={variantColors.border}
                />
              </div>
            </div>
          )}

          <div
            className="sketch-toast-message"
            style={{
              flex: 1,
              wordWrap: "break-word",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              hyphens: "auto",
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              maxWidth: showIcon
                ? `${toastWidth - config.iconSize - 80}px`
                : `${toastWidth - 80}px`,
              minWidth: 0, // Allow flex item to shrink
            }}
          >
            <p
              style={{
                fontFamily: toastTypography.fontFamily,
                fontSize: toastTypography.fontSize,
                fontWeight: toastTypography.fontWeight,
                color: SK.text,
                margin: 0,
                padding: 0,
                lineHeight: 1.4,
                wordWrap: "break-word",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {toast.message}
            </p>
          </div>

          {/* Hand-drawn X button */}
          <button
            onClick={handleDismiss}
            className="sketch-toast-close"
            aria-label="Dismiss"
            style={{
              width: `${config.iconSize}px`,
              height: `${config.iconSize}px`,
            }}
          >
            <svg
              width={config.iconSize}
              height={config.iconSize}
              viewBox={`0 0 ${config.iconSize} ${config.iconSize}`}
              fill="none"
            >
              <line
                x1={config.iconSize * 0.25}
                y1={config.iconSize * 0.25}
                x2={config.iconSize * 0.75}
                y2={config.iconSize * 0.75}
                stroke={SK.stroke}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="1, 0.3"
              />
              <line
                x1={config.iconSize * 0.75}
                y1={config.iconSize * 0.25}
                x2={config.iconSize * 0.25}
                y2={config.iconSize * 0.75}
                stroke={SK.stroke}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="1, 0.3"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  },
);

Toast.displayName = "Toast";

// Toast Container for displaying multiple toasts
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

const POSITION_STYLES: Record<ToastPosition, React.CSSProperties> = {
  "top-right": { top: 20, right: 20 },
  "top-left": { top: 20, left: 20 },
  "top-center": { top: 20, left: "50%", transform: "translateX(-50%)" },
  "bottom-right": { bottom: 20, right: 20 },
  "bottom-left": { bottom: 20, left: 20 },
  "bottom-center": { bottom: 20, left: "50%", transform: "translateX(-50%)" },
};

interface ToastContainerProps {
  toasts: ToastOptions[];
  onDismiss: (id: string) => void;
  position?: ToastPosition;
  size?: "sm" | "md" | "lg";
  width?: number;
  height?: number;
  colors?: ToastProps["colors"];
  typography?: ToastProps["typography"];
  showBorder?: boolean;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ToastContainer = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  (
    {
      toasts,
      onDismiss,
      position = "top-right",
      size = "md",
      width,
      height,
      colors,
      typography,
      showBorder = true,
      showIcon = true,
      className = "",
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("sketch-toast-container", className)}
        style={{ ...POSITION_STYLES[position], ...style }}
        {...props}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onDismiss={onDismiss}
            size={size}
            width={width}
            height={height}
            colors={colors}
            typography={typography}
            showBorder={showBorder}
            showIcon={showIcon}
          />
        ))}
      </div>
    );
  },
);

ToastContainer.displayName = "ToastContainer";

// Hook for managing toasts
// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>(globalToasts);
  const dismissingRef = useRef<Set<string>>(new Set());

  // Subscribe to global store changes
  useEffect(() => {
    const listener = (newToasts: ToastOptions[]) => setToasts(newToasts);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const dismissToast = useCallback((id: string) => {
    // Prevent double-dismiss
    if (dismissingRef.current.has(id)) return;
    dismissingRef.current.add(id);

    removeToast(id);
    dismissingRef.current.delete(id);
  }, []);

  const showToast = useCallback(
    (
      message: string,
      variant: ToastVariant = "info",
      duration: number = 5000,
    ) => {
      const id = Math.random().toString(36).substring(7);
      const newToast: ToastOptions = { id, message, variant, duration };

      addToast(newToast);

      // Auto dismiss after specified duration
      setTimeout(() => {
        dismissToast(id);
      }, duration);

      return id;
    },
    [dismissToast],
  );

  const clearAllToasts = useCallback(() => {
    clearToasts();
    dismissingRef.current.clear();
  }, []);

  return { toasts, showToast, dismissToast, clearAllToasts };
}

export { Toast, ToastContainer };
