import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A hand-drawn loading spinner with four distinct animation variants. Features authentic sketchy appearance and customizable speed.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Spinner } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  return <Spinner />;
}
\`\`\`

## Variants

\`\`\`tsx
<Spinner variant="circle" />
<Spinner variant="spiral" />
<Spinner variant="hourglass" />
<Spinner variant="dots" />
\`\`\`

## Sizes

\`\`\`tsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
\`\`\`

## Custom Speed

\`\`\`tsx
<Spinner speed={0.5} />  {/* Slower */}
<Spinner speed={1} />    {/* Normal */}
<Spinner speed={2} />    {/* Faster */}
\`\`\`

## Custom Color

\`\`\`tsx
<Spinner colors={{ stroke: "#e74c3c" }} />
\`\`\`

## Disabled State

\`\`\`tsx
<Spinner disabled />
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`variant\` | \`"circle" \\| "spiral" \\| "hourglass" \\| "dots"\` | \`"circle"\` | Animation style |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Spinner size (24px/36px/48px) |
| \`speed\` | \`number\` | \`1\` | Animation speed multiplier |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.stroke\` | \`string\` | - | Stroke color |
| \`label\` | \`string\` | \`"Loading"\` | Accessibility label |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |
| \`className\` | \`string\` | - | Additional CSS classes |
| \`style\` | \`CSSProperties\` | - | Inline styles |

Plus all standard HTML div attributes.

## Variant Details

- **circle**: Rotating 270° arc with ghost track
- **spiral**: Expanding doodle drawn from center
- **hourglass**: Flipping sand timer animation
- **dots**: Three pulsing wobbly circles

## Important Notes

- All animations use CSS for smooth performance
- Speed prop multiplies animation duration (0.5 = slower, 2 = faster)
- Disabled state applies grayscale colors
- Includes proper ARIA role="status" for accessibility
- SVG-based for crisp rendering at any scale
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["circle", "spiral", "hourglass", "dots"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    speed: { control: { type: "range", min: 0.25, max: 3, step: 0.25 } },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────── */

export const Default: Story = {
  args: { size: "lg" },
  parameters: {
    docs: {
      description: { story: "Default circle spinner at large size." },
    },
  },
};

/* ── All four variants side by side ──────────────────────────── */

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
      {(["circle", "spiral", "hourglass", "dots"] as const).map((v) => (
        <div key={v} style={{ textAlign: "center" }}>
          <Spinner variant={v} size="lg" />
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 18,
              marginTop: 8,
              color: "#2a2a2a",
            }}
          >
            {v}
          </p>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "All four animation variants: circle (arc rotation), spiral (draw-on doodle), hourglass (flipping sand timer), and dots (pulsing blobs)." },
    },
  },
};

/* ── Sizes ────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s} style={{ textAlign: "center" }}>
          <Spinner size={s} />
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 16,
              marginTop: 6,
              color: "#2a2a2a",
            }}
          >
            {s}
          </p>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Three size presets: sm (24 px), md (36 px), and lg (48 px)." },
    },
  },
};

/* ── Custom colour ────────────────────────────────────────────── */

export const CustomColor: Story = {
  args: {
    colors: { stroke: "#e74c3c" },
    size: "lg",
  },
  parameters: {
    docs: {
      description: { story: "Override the stroke colour via the `colors` prop." },
    },
  },
};

/* ── Speed control ────────────────────────────────────────────── */

export const SpeedComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
      {[0.4, 1, 2.5].map((sp) => (
        <div key={sp} style={{ textAlign: "center" }}>
          <Spinner size="lg" speed={sp} />
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 16,
              marginTop: 6,
              color: "#2a2a2a",
            }}
          >
            {sp}×
          </p>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "The `speed` prop multiplies animation speed — 0.4× (slow), 1× (default), 2.5× (fast)." },
    },
  },
};

/* ── Disabled ─────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { disabled: true, size: "lg" },
  parameters: {
    docs: {
      description: { story: "Greyed-out disabled state using `SK_DISABLED` colours." },
    },
  },
};

/* ── Full matrix: every variant × every size ─────────────────── */

export const AllVariantsAllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {(["circle", "spiral", "hourglass", "dots"] as const).map((v) => (
        <div
          key={v}
          style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
        >
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 18,
              width: 90,
              color: "#2a2a2a",
            }}
          >
            {v}
          </span>
          <Spinner variant={v} size="sm" />
          <Spinner variant={v} size="md" />
          <Spinner variant={v} size="lg" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Full matrix of every variant at every size." },
    },
  },
};
