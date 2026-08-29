import React, { type ReactNode, useId, useState } from "react";
import { cn, useSketchSize } from "../../lib";
import { SketchPaper, SketchBorder } from "../../lib/sketch-primitives";
import { SK } from "../../lib/sketch-styles";

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  number?: number;
  // Customization props
  colors?: {
    bg?: string;
    bgOverlay?: string;
    stroke?: string;
    text?: string;
    numberColor?: string;
    lineColor?: string;
  };
  typography?: {
    titleSize?: string;
    titleWeight?: string | number;
    contentSize?: string;
    fontFamily?: string;
  };
  showBorder?: boolean;
  showNumber?: boolean;
  showLines?: boolean;
  className?: string;
}

export interface AccordionProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      title,
      children,
      defaultOpen = false,
      number,
      colors,
      typography,
      showBorder = true,
      showNumber = true,
      showLines = true,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const uid = useId();
    const linesId = `lines${uid}`;
    const shadowId = `shadow${uid}`;
    const headerId = `ah${uid}`;
    const contentId = `ac${uid}`;

    // Dynamic sizing: measure header width and content dimensions
    const { ref: headerSizeRef, w: hdrW } = useSketchSize<SVGSVGElement>(300);
    const {
      ref: contentSizeRef,
      w: cntW,
      h: cntH,
    } = useSketchSize<HTMLDivElement>(300, 100);

    // Default colors with customization support
    const accordionColors = {
      bg: colors?.bg || (isOpen ? "#fef9f0" : SK.bg),
      bgOverlay: colors?.bgOverlay || SK.bgOverlay,
      stroke: colors?.stroke || SK.stroke,
      text: colors?.text || SK.text,
      numberColor: colors?.numberColor || "#666",
      lineColor: colors?.lineColor || "#d0c9bc",
    };

    // Default typography with customization support
    const accordionTypography = {
      titleSize: typography?.titleSize || "1.5rem",
      titleWeight: typography?.titleWeight || "700",
      contentSize: typography?.contentSize || "1.25rem",
      fontFamily: typography?.fontFamily || SK.font,
    };

    return (
      <div
        ref={ref}
        className={cn("sketch-accordion-item", className)}
        {...props}
      >
        {/* Header - clickable section */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="sketch-accordion-header"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          style={{
            transform: isHovered ? "rotate(0.4deg)" : "rotate(-0.2deg)",
            outline: "none",
          }}
        >
          {/* Header SVG Background — proportional paths driven by measured width */}
          <svg
            ref={headerSizeRef}
            width="100%"
            height="60"
            viewBox={`0 0 ${hdrW} 60`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sketch-accordion-header-svg"
          >
            {(() => {
              const w = hdrW;
              const hdrBg = `M ${w * 0.0133} 6 C ${w * 0.0167} 4.5, ${w * 0.025} 4, ${w * 0.0333} 4 L ${w * 0.25} 3.5 C ${w * 0.3333} 3.3, ${w * 0.4167} 3.5, ${w * 0.5} 3.8 L ${w * 0.75} 4.2 C ${w * 0.8333} 4.5, ${w * 0.9167} 5, ${w * 0.9667} 6 C ${w * 0.98} 7, ${w * 0.99} 9, ${w * 0.9933} 13 L ${w * 0.995} 47 C ${w * 0.9942} 51, ${w * 0.9883} 54, ${w * 0.98} 55 L ${w * 0.9333} 56 C ${w * 0.85} 56.5, ${w * 0.7667} 56.8, ${w * 0.6833} 56.5 L ${w * 0.3167} 56 C ${w * 0.2333} 55.8, ${w * 0.15} 55.5, ${w * 0.0667} 55 L ${w * 0.025} 54.5 C ${w * 0.0167} 54, ${w * 0.01} 52, ${w * 0.0067} 48 L ${w * 0.005} 12 C ${w * 0.0058} 8.5, ${w * 0.0083} 6.5, ${w * 0.0133} 6 Z`;
              const hdrBd1 = `M ${w * 0.0142} 6.5 C ${w * 0.0175} 5, ${w * 0.0258} 4.5, ${w * 0.0342} 4.5 L ${w * 0.2508} 4 C ${w * 0.3342} 3.8, ${w * 0.4175} 4, ${w * 0.5008} 4.3 L ${w * 0.7508} 4.7 C ${w * 0.8342} 5, ${w * 0.9175} 5.5, ${w * 0.9675} 6.5 C ${w * 0.9808} 7.5, ${w * 0.9908} 9.5, ${w * 0.9942} 13.5 L ${w * 0.9958} 47.5 C ${w * 0.995} 51.5, ${w * 0.9892} 54.5, ${w * 0.9808} 55.5 L ${w * 0.9342} 56.5 C ${w * 0.8508} 57, ${w * 0.7675} 57.3, ${w * 0.6842} 57 L ${w * 0.3175} 56.5 C ${w * 0.2342} 56.3, ${w * 0.1508} 56, ${w * 0.0675} 55.5 L ${w * 0.0258} 55 C ${w * 0.0175} 54.5, ${w * 0.0108} 52.5, ${w * 0.0075} 48.5 L ${w * 0.0058} 12.5 C ${w * 0.0067} 9, ${w * 0.0092} 7, ${w * 0.0142} 6.5 Z`;
              const hdrBd2 = `M ${w * 0.015} 7 C ${w * 0.0183} 5.5, ${w * 0.0267} 5, ${w * 0.035} 5 L ${w * 0.2517} 4.5 C ${w * 0.335} 4.3, ${w * 0.4183} 4.5, ${w * 0.5017} 4.8 L ${w * 0.7517} 5.2 C ${w * 0.835} 5.5, ${w * 0.9183} 6, ${w * 0.9683} 7 C ${w * 0.9817} 8, ${w * 0.9917} 10, ${w * 0.995} 14 L ${w * 0.9967} 48 C ${w * 0.9958} 52, ${w * 0.99} 55, ${w * 0.9817} 56 L ${w * 0.935} 57 C ${w * 0.8517} 57.5, ${w * 0.7683} 57.8, ${w * 0.685} 57.5 L ${w * 0.3183} 57 C ${w * 0.235} 56.8, ${w * 0.1517} 56.5, ${w * 0.0683} 56 L ${w * 0.0267} 55.5 C ${w * 0.0183} 55, ${w * 0.0117} 53, ${w * 0.0083} 49 L ${w * 0.0067} 13 C ${w * 0.0075} 9.5, ${w * 0.01} 7.5, ${w * 0.015} 7 Z`;
              return (
                <>
                  <SketchPaper
                    d={hdrBg}
                    w={w}
                    h={60}
                    bg={accordionColors.bg}
                    overlay={accordionColors.bgOverlay}
                  />
                  <SketchBorder
                    d1={hdrBd1}
                    d2={hdrBd2}
                    stroke={accordionColors.stroke}
                    show={showBorder}
                    dash="1,0.5"
                    w1={isFocused ? 3.5 : undefined}
                    o1={isFocused ? 1 : undefined}
                  />
                </>
              );
            })()}

            {/* Subtle shadow */}
            <ellipse
              cx={hdrW * 0.5}
              cy="58"
              rx={hdrW * 0.4833}
              ry="4"
              fill={accordionColors.stroke}
              opacity="0.08"
            />

            {/* Hover highlight */}
            {isHovered && (
              <rect
                x="0"
                y="0"
                width={hdrW}
                height="60"
                fill={accordionColors.stroke}
                opacity="0.02"
              />
            )}
          </svg>

          {/* Header Content */}
          <div className="sketch-accordion-header-content">
            <div className="sketch-accordion-title-section">
              {/* Section number */}
              {showNumber && number !== undefined && (
                <span
                  className="sketch-accordion-number"
                  style={{
                    fontFamily: accordionTypography.fontFamily,
                    color: accordionColors.numberColor,
                  }}
                >
                  {number}.
                </span>
              )}

              {/* Title text */}
              <span
                className="sketch-accordion-title"
                style={{
                  fontFamily: accordionTypography.fontFamily,
                  fontSize: accordionTypography.titleSize,
                  fontWeight: accordionTypography.titleWeight,
                  color: accordionColors.text,
                }}
              >
                {title}
              </span>
            </div>

            {/* Hand-drawn arrow icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sketch-accordion-arrow"
              style={{
                transform: isOpen
                  ? "rotate(90deg)"
                  : isHovered
                    ? "rotate(2deg)"
                    : "rotate(0deg)",
              }}
            >
              <path
                d="M 8 6
                   L 10.5 9
                   L 12.5 11
                   L 16 12
                   L 13 13.5
                   L 10.5 15.5
                   L 8 18"
                stroke={accordionColors.stroke}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />
              <path
                d="M 8.5 6.5
                   L 11 9.5
                   L 13 11.5
                   L 15.5 12
                   L 12.5 13.5
                   L 10 15.5
                   L 8.5 17.5"
                stroke={accordionColors.stroke}
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
            </svg>
          </div>
        </button>

        {/* Content panel - expandable section with smooth grid animation */}
        <div
          className="sketch-accordion-content-wrapper"
          id={contentId}
          role="region"
          aria-labelledby={headerId}
          style={{
            display: "grid",
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            transition:
              "grid-template-rows 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <div
              className="sketch-accordion-content"
              ref={contentSizeRef}
              style={{
                opacity: isOpen ? 1 : 0,
                transition: "opacity 0.3s ease",
                position: "relative",
              }}
            >
              {/* Content SVG container with paper texture — proportional paths */}
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${cntW} ${cntH}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sketch-accordion-content-svg"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                }}
              >
                {(() => {
                  const w = cntW;
                  const h = cntH;
                  const cntBg = `M ${w * 0.005} 0 L ${w * 0.25} ${h * 0.0025} C ${w * 0.3333} ${h * 0.004}, ${w * 0.4167} ${h * 0.0025}, ${w * 0.5} ${h * 0.0015} L ${w * 0.75} ${h * 0.004} C ${w * 0.8333} ${h * 0.005}, ${w * 0.9167} ${h * 0.0075}, ${w * 0.995} ${h * 0.01} L ${w * 0.9967} ${h * 0.65} C ${w * 0.9958} ${h * 0.75}, ${w * 0.995} ${h * 0.85}, ${w * 0.9933} ${h * 0.95} C ${w * 0.99} ${h * 0.97}, ${w * 0.9833} ${h * 0.985}, ${w * 0.975} ${h * 0.99} L ${w * 0.75} ${h * 0.995} C ${w * 0.6667} ${h * 0.9975}, ${w * 0.5833} ${h * 0.999}, ${w * 0.5} ${h * 0.9975} L ${w * 0.25} ${h * 0.995} C ${w * 0.1667} ${h * 0.994}, ${w * 0.0833} ${h * 0.9925}, ${w * 0.025} ${h * 0.99} C ${w * 0.0167} ${h * 0.9875}, ${w * 0.01} ${h * 0.975}, ${w * 0.0067} ${h * 0.955} L ${w * 0.005} ${h * 0.6} C ${w * 0.0042} ${h * 0.4}, ${w * 0.0047} ${h * 0.2}, ${w * 0.005} 0 Z`;
                  const cntBd1 = `M ${w * 0.0058} ${h * 0.005} L ${w * 0.2508} ${h * 0.0075} C ${w * 0.3342} ${h * 0.009}, ${w * 0.4175} ${h * 0.0075}, ${w * 0.5008} ${h * 0.0065} L ${w * 0.7508} ${h * 0.009} C ${w * 0.8342} ${h * 0.01}, ${w * 0.9175} ${h * 0.0125}, ${w * 0.9942} ${h * 0.015} L ${w * 0.9958} ${h * 0.6525} C ${w * 0.995} ${h * 0.7525}, ${w * 0.9942} ${h * 0.8525}, ${w * 0.9925} ${h * 0.9525} C ${w * 0.9892} ${h * 0.9725}, ${w * 0.9825} ${h * 0.9875}, ${w * 0.9742} ${h * 0.9925} L ${w * 0.7508} ${h * 0.9975} C ${w * 0.6675} ${h * 1}, ${w * 0.5842} ${h * 1.0015}, ${w * 0.5008} ${h * 1} L ${w * 0.2508} ${h * 0.9975} C ${w * 0.1675} ${h * 0.9965}, ${w * 0.0842} ${h * 0.995}, ${w * 0.0258} ${h * 0.9925} C ${w * 0.0175} ${h * 0.99}, ${w * 0.0108} ${h * 0.9775}, ${w * 0.0075} ${h * 0.9575} L ${w * 0.0058} ${h * 0.6025} C ${w * 0.005} ${h * 0.4025}, ${w * 0.0055} ${h * 0.2025}, ${w * 0.0058} ${h * 0.005} Z`;
                  const cntBd2 = `M ${w * 0.0067} ${h * 0.0075} L ${w * 0.2517} ${h * 0.01} C ${w * 0.335} ${h * 0.0115}, ${w * 0.4183} ${h * 0.01}, ${w * 0.5017} ${h * 0.009} L ${w * 0.7517} ${h * 0.0115} C ${w * 0.835} ${h * 0.0125}, ${w * 0.9183} ${h * 0.015}, ${w * 0.995} ${h * 0.0175} L ${w * 0.9967} ${h * 0.655} C ${w * 0.9958} ${h * 0.755}, ${w * 0.995} ${h * 0.855}, ${w * 0.9933} ${h * 0.955} C ${w * 0.99} ${h * 0.975}, ${w * 0.9833} ${h * 0.99}, ${w * 0.975} ${h * 0.995} L ${w * 0.7517} ${h * 1} C ${w * 0.6683} ${h * 1.0025}, ${w * 0.585} ${h * 1.004}, ${w * 0.5017} ${h * 1.0025} L ${w * 0.2517} ${h * 1} C ${w * 0.1683} ${h * 0.999}, ${w * 0.085} ${h * 0.9975}, ${w * 0.0267} ${h * 0.995} C ${w * 0.0183} ${h * 0.9925}, ${w * 0.0117} ${h * 0.98}, ${w * 0.0083} ${h * 0.96} L ${w * 0.0067} ${h * 0.605} C ${w * 0.0058} ${h * 0.405}, ${w * 0.0063} ${h * 0.205}, ${w * 0.0067} ${h * 0.0075} Z`;
                  return (
                    <>
                      <defs>
                        {showLines && (
                          <pattern
                            id={linesId}
                            x="0"
                            y="0"
                            width={w}
                            height="30"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d={`M 0 30 L ${w * 0.1667} 29.8 L ${w * 0.3333} 30.1 L ${w * 0.5} 29.9 L ${w * 0.6667} 30.2 L ${w * 0.8333} 29.7 L ${w} 30`}
                              stroke={accordionColors.lineColor}
                              strokeWidth="1"
                              opacity="0.35"
                              fill="none"
                              strokeLinecap="round"
                            />
                          </pattern>
                        )}
                        <linearGradient
                          id={shadowId}
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor={accordionColors.stroke}
                            stopOpacity="0.15"
                          />
                          <stop
                            offset="100%"
                            stopColor={accordionColors.stroke}
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <SketchPaper
                        d={cntBg}
                        w={w}
                        h={h}
                        bg="#fef9f0"
                        overlay={accordionColors.bgOverlay}
                        overlayOpacity={0.5}
                        noiseOpacity={0.15}
                      />

                      {showLines && (
                        <rect
                          x="0"
                          y="0"
                          width={w}
                          height={h}
                          fill={`url(#${linesId})`}
                        />
                      )}

                      {/* Left margin line */}
                      {showLines && (
                        <path
                          d={`M ${w * 0.0667} ${h * 0.04} L ${w * 0.0675} ${h * 0.2} L ${w * 0.0663} ${h * 0.35} L ${w * 0.0672} ${h * 0.5} L ${w * 0.0667} ${h * 0.65} L ${w * 0.0677} ${h * 0.8} L ${w * 0.0683} ${h * 0.96}`}
                          stroke="#e8a5a5"
                          strokeWidth="1.5"
                          opacity="0.4"
                          strokeLinecap="round"
                          strokeDasharray="3,1.5"
                        />
                      )}

                      <SketchBorder
                        d1={cntBd1}
                        d2={cntBd2}
                        stroke={accordionColors.stroke}
                        show={showBorder}
                        dash="1,0.5"
                      />

                      {/* Subtle inner shadow at top */}
                      <rect
                        x="0"
                        y="0"
                        width={w}
                        height={h * 0.1}
                        fill={`url(#${shadowId})`}
                        opacity="0.1"
                      />

                      {/* Subtle shadow beneath */}
                      <ellipse
                        cx={w * 0.5}
                        cy={h * 1.01}
                        rx={w * 0.4833}
                        ry={h * 0.02}
                        fill={accordionColors.stroke}
                        opacity="0.08"
                      />
                    </>
                  );
                })()}
              </svg>

              {/* Actual content text — flows naturally to determine height */}
              <div
                className="sketch-accordion-content-text"
                style={{
                  fontFamily: accordionTypography.fontFamily,
                  fontSize: accordionTypography.contentSize,
                  color: accordionColors.text,
                  position: "relative",
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, className = "", maxWidth = "700px", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("sketch-accordion", className)}
        style={{ maxWidth }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Accordion.displayName = "Accordion";

export { Accordion, AccordionItem };
