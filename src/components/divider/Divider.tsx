import React from "react";
import { cn, SK, DISP_DIVIDER_ID } from "../../lib";

export interface DividerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  orientation?: "horizontal" | "vertical";
  variant?: "scribble" | "dashed" | "dots" | "zigzag";
  /** Stroke / dot fill color. Defaults to the sketch theme stroke color. */
  color?: string;
  strokeWidth?: number;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      variant = "scribble",
      color = SK.stroke,
      strokeWidth = 2,
      className = "",
      ...props
    },
    ref
  ) => {
    // Dimensions based on orientation
    const width = orientation === "horizontal" ? 600 : 40;
    const height = orientation === "horizontal" ? 40 : 600;

    // Base paths
    const getPath = (
      v: "scribble" | "dashed" | "dots" | "zigzag",
      o: "horizontal" | "vertical"
    ) => {
      if (o === "horizontal") {
        switch (v) {
          case "scribble":
            // Loopy spring-like scribble
            return `M 0 20 
                  C 10 5, 15 5, 20 20 
                  C 25 35, 30 35, 35 20
                  C 40 5, 45 5, 50 20
                  C 55 35, 60 35, 65 20
                  C 70 8, 75 8, 80 20
                  C 85 32, 90 32, 95 20
                  C 100 5, 105 5, 110 20
                  C 115 38, 120 38, 125 20
                  C 130 2, 135 2, 140 20
                  C 145 35, 150 35, 155 20
                  C 160 10, 165 10, 170 20
                  C 175 30, 180 30, 185 20
                  C 190 5, 195 5, 200 20
                  C 205 35, 210 35, 215 20
                  C 220 5, 225 5, 230 20
                  C 235 35, 240 35, 245 20
                  C 250 8, 255 8, 260 20
                  C 265 32, 270 32, 275 20
                  C 280 5, 285 5, 290 20
                  C 295 38, 300 38, 305 20
                  C 310 2, 315 2, 320 20
                  C 325 35, 330 35, 335 20
                  C 340 10, 345 10, 350 20
                  C 355 30, 360 30, 365 20
                  C 370 5, 375 5, 380 20
                  C 385 35, 390 35, 395 20
                  C 400 5, 405 5, 410 20
                  C 415 35, 420 35, 425 20
                  C 430 8, 435 8, 440 20
                  C 445 32, 450 32, 455 20
                  C 460 5, 465 5, 470 20
                  C 475 38, 480 38, 485 20
                  C 490 2, 495 2, 500 20
                  C 505 35, 510 35, 515 20
                  C 520 10, 525 10, 530 20
                  C 535 30, 540 30, 545 20
                  C 550 5, 555 5, 560 20
                  C 565 35, 570 35, 575 20
                  C 580 5, 585 5, 590 20
                  L 600 20`;
          case "dashed":
            // Irregular dashed line
            return `M 0 20 L 25 18 M 35 22 L 60 20 M 75 19 L 100 21 M 110 20 L 135 18 M 150 22 L 175 20 M 185 19 L 210 21 
                  M 225 20 L 250 18 M 265 22 L 290 20 M 300 19 L 325 21 M 340 20 L 365 18 M 375 22 L 400 20 
                  M 415 19 L 440 21 M 450 20 L 475 18 M 490 22 L 515 20 M 525 19 L 550 21 M 565 20 L 590 18 L 600 20`;
          case "dots": {
            // Deterministic dot pattern (avoids Math.random for SSR/hydration safety)
            let dots = "";
            for (let i = 10; i < 600; i += 30) {
              const y = 20 + ((i % 7) - 3);
              const r = 3 + (i % 3);
              dots += `M ${i - r} ${y} 
                     C ${i - r} ${y - r}, ${i + r} ${y - r}, ${i + r} ${y} 
                     C ${i + r} ${y + r}, ${i - r} ${y + r}, ${i - r} ${y} Z `;
            }
            return dots;
          }
          case "zigzag":
            // Sharp, erratic zigzag
            return `M 0 20 
                  L 15 5 L 30 35 L 45 10 L 60 25 
                  L 75 5 L 90 30 L 105 15 L 120 35 
                  L 135 5 L 150 25 L 165 10 L 180 30 
                  L 195 5 L 210 35 L 225 15 L 240 25 
                  L 255 5 L 270 30 L 285 10 L 300 35
                  L 315 5 L 330 25 L 345 15 L 360 30
                  L 375 5 L 390 35 L 405 10 L 420 25
                  L 435 5 L 450 30 L 465 15 L 480 35
                  L 495 5 L 510 25 L 525 10 L 540 30
                  L 555 5 L 570 35 L 585 15 L 600 20`;
        }
      } else {
        // Vertical — swapped X and Y logic
        switch (v) {
          case "scribble":
            return `M 20 0 
                  C 5 10, 5 15, 20 20 
                  C 35 25, 35 30, 20 35
                  C 5 40, 5 45, 20 50
                  C 35 55, 35 60, 20 65
                  C 8 70, 8 75, 20 80
                  C 32 85, 32 90, 20 95
                  C 5 100, 5 105, 20 110
                  C 38 115, 38 120, 20 125
                  C 2 130, 2 135, 20 140
                  C 35 145, 35 150, 20 155
                  C 10 160, 10 165, 20 170
                  C 30 175, 30 180, 20 185
                  C 5 190, 5 195, 20 200
                  C 35 205, 35 210, 20 215
                  C 5 220, 5 225, 20 230
                  C 35 235, 35 240, 20 245
                  C 8 250, 8 255, 20 260
                  C 32 265, 32 270, 20 275
                  C 5 280, 5 285, 20 290
                  C 38 295, 38 300, 20 305
                  C 2 310, 2 315, 20 320
                  C 35 325, 35 330, 20 335
                  C 10 340, 10 345, 20 350
                  C 30 355, 30 360, 20 365
                  C 5 370, 5 375, 20 380
                  C 35 385, 35 390, 20 395
                  C 5 400, 5 405, 20 410
                  C 35 415, 35 420, 20 425
                  C 8 430, 8 435, 20 440
                  C 32 445, 32 450, 20 455
                  C 5 460, 5 465, 20 470
                  C 38 475, 38 480, 20 485
                  C 2 490, 2 495, 20 500
                  C 35 505, 35 510, 20 515
                  C 10 520, 10 525, 20 530
                  C 30 535, 30 540, 20 545
                  C 5 550, 5 555, 20 560
                  C 35 565, 35 570, 20 575
                  C 5 580, 5 585, 20 590
                  L 20 600`;
          case "dashed":
            return `M 20 0 L 18 25 M 22 35 L 20 60 M 19 75 L 21 100 M 20 110 L 18 135 M 22 150 L 20 175 M 19 185 L 21 210 
                  M 20 225 L 18 250 M 22 265 L 20 290 M 19 300 L 21 325 M 20 340 L 18 365 M 22 375 L 20 400 
                  M 19 415 L 21 440 M 20 450 L 18 475 M 22 490 L 20 515 M 19 525 L 21 550 M 20 565 L 18 590 L 20 600`;
          case "dots": {
            let dots = "";
            for (let i = 10; i < 600; i += 30) {
              const x = 20 + ((i % 5) - 2.5);
              const r = 3 + (i % 3);
              dots += `M ${x} ${i - r} 
                      C ${x - r} ${i - r}, ${x - r} ${i + r}, ${x} ${i + r} 
                      C ${x + r} ${i + r}, ${x + r} ${i - r}, ${x} ${i - r} Z `;
            }
            return dots;
          }
          case "zigzag":
            return `M 20 0 
                  L 5 15 L 35 30 L 10 45 L 25 60 
                  L 5 75 L 30 90 L 15 105 L 35 120 
                  L 5 135 L 25 150 L 10 165 L 30 180 
                  L 5 195 L 35 210 L 15 225 L 25 240 
                  L 5 255 L 30 270 L 10 285 L 35 300
                  L 5 315 L 25 330 L 15 345 L 30 360
                  L 5 375 L 35 390 L 10 405 L 25 420
                  L 5 435 L 30 450 L 15 465 L 35 480
                  L 5 495 L 25 510 L 10 525 L 30 540
                  L 5 555 L 35 570 L 15 585 L 20 600`;
        }
      }
      return "";
    };

    const mainPath = getPath(variant, orientation);

    return (
      <div
        ref={ref}
        className={cn("sketch-divider", className)}
        role="separator"
        aria-orientation={orientation}
        {...props}
        style={{
          ...props.style,
          width: orientation === "horizontal" ? "100%" : "40px",
          height: orientation === "horizontal" ? "40px" : "100%",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
          aria-hidden="true"
        >
          {/* Primary Stroke */}
          <path
            d={mainPath}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
            strokeDasharray={variant === "dashed" ? undefined : "1,0.5"}
            fill={variant === "dots" ? color : "none"}
            filter={`url(#${DISP_DIVIDER_ID})`}
          />

          {/* Secondary Stroke — offset shadow for hand-drawn depth */}
          {variant !== "dots" && (
            <path
              d={mainPath}
              stroke={color}
              strokeWidth={strokeWidth * 0.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.2"
              transform="translate(1, 1)"
              filter={`url(#${DISP_DIVIDER_ID})`}
            />
          )}
        </svg>
      </div>
    );
  }
);

Divider.displayName = "Divider";

export { Divider };
