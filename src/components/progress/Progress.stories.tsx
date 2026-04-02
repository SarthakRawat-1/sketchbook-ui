import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn progress bar with five fill variants and smooth animations. Features authentic sketchy borders and customizable appearance.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Progress } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  return <Progress value={45} label="Loading..." />;
}
\`\`\`

## Variants

\`\`\`tsx
<Progress variant="scribble" value={60} label="Scribble" />
<Progress variant="hatching" value={60} label="Hatching" />
<Progress variant="crosshatch" value={60} label="Crosshatch" />
<Progress variant="dots" value={60} label="Dots" />
<Progress variant="solid" value={60} label="Solid" />
\`\`\`

## Sizes

\`\`\`tsx
<Progress size="sm" value={30} label="Small" />
<Progress size="md" value={55} label="Medium" />
<Progress size="lg" value={80} label="Large" />
\`\`\`

## Without Label or Percentage

\`\`\`tsx
<Progress value={65} showPercentage={false} />
<Progress value={75} label="Upload" showPercentage={false} />
\`\`\`

## Disabled State

\`\`\`tsx
<Progress value={50} label="Disabled" disabled />
\`\`\`

## Custom Colors

\`\`\`tsx
<Progress 
  value={70}
  label="Upload"
  colors={{
    bg: "#f0f8ff",
    bgOverlay: "#d6eaff",
    stroke: "#1a6fb5",
    label: "#1a6fb5",
    fill: "#1a6fb5"
  }}
/>
\`\`\`

## Animated

\`\`\`tsx
const [progress, setProgress] = useState(0);

<Progress value={progress} label="Transfer" animated />
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`number\` | required | Current progress value |
| \`max\` | \`number\` | \`100\` | Maximum value |
| \`label\` | \`string\` | - | Label text above bar |
| \`showPercentage\` | \`boolean\` | \`true\` | Show percentage text |
| \`variant\` | \`"solid" \\| "hatching" \\| "crosshatch" \\| "dots" \\| "scribble"\` | \`"scribble"\` | Fill pattern style |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Bar size |
| \`animated\` | \`boolean\` | \`true\` | Smooth transition animation |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Text color |
| \`colors.label\` | \`string\` | - | Label text color |
| \`colors.fill\` | \`string\` | - | Progress fill color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Font weight |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`typography.labelSize\` | \`string\` | - | Label font size |
| \`showBorder\` | \`boolean\` | \`true\` | Show hand-drawn border |
| \`className\` | \`string\` | - | Additional CSS classes |

Plus all standard HTML div attributes.

## Important Notes

- Progress bar width is responsive and adapts to container
- Percentage is calculated as (value / max) × 100
- Animated transitions use cubic-bezier easing for natural feel
- Disabled state applies grayscale effect
- Each variant uses different fill pattern (scribble, hatching, etc.)
        `,
      },
    },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    max: { control: { type: "number" } },
    variant: {
      control: { type: "radio" },
      options: ["scribble", "hatching", "crosshatch", "dots", "solid"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    showPercentage: { control: { type: "boolean" } },
    animated: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    showBorder: { control: { type: "boolean" } },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Basic ──────────────────────────────────── */

export const Default: Story = {
  args: {
    value: 45,
    label: "Loading…",
  },
};

/* ── Sizes ──────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", padding: "2rem", maxWidth: 420 }}>
      <Progress size="sm" value={30} label="Small" />
      <Progress size="md" value={55} label="Medium" />
      <Progress size="lg" value={80} label="Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Small, medium, and large progress bar sizes." },
    },
  },
};

/* ── Variants ───────────────────────────────── */

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", padding: "2rem", maxWidth: 420 }}>
      <Progress variant="scribble" value={60} label="Scribble" />
      <Progress variant="hatching" value={60} label="Hatching" />
      <Progress variant="crosshatch" value={60} label="Crosshatch" />
      <Progress variant="dots" value={60} label="Dots" />
      <Progress variant="solid" value={60} label="Solid" />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "All five fill-pattern variants at the same progress." },
    },
  },
};

/* ── Disabled ───────────────────────────────── */

export const Disabled: Story = {
  args: {
    value: 50,
    label: "Disabled",
    disabled: true,
  },
  parameters: {
    docs: {
      description: { story: "Greyed-out disabled state." },
    },
  },
};

/* ── Custom Colors ──────────────────────────── */

export const CustomColors: Story = {
  args: {
    value: 70,
    label: "Upload",
    colors: {
      bg: "#f0f8ff",
      bgOverlay: "#d6eaff",
      stroke: "#1a6fb5",
      label: "#1a6fb5",
      fill: "#1a6fb5",
    },
  },
  parameters: {
    docs: {
      description: { story: "Fully customised colour palette." },
    },
  },
};

/* ── No Label / No Percentage ───────────────── */

export const BarOnly: Story = {
  args: {
    value: 65,
    showPercentage: false,
  },
  parameters: {
    docs: {
      description: { story: "Progress bar without label or percentage text." },
    },
  },
};

/* ── Animated (interactive) ─────────────────── */

export const Animated: Story = {
  render: function AnimatedStory() {
    const [val, setVal] = useState(10);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "2rem", maxWidth: 420 }}>
        <Progress value={val} label="Transfer" animated />
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={() => setVal((v) => Math.max(0, v - 15))} style={{ cursor: "pointer" }}>
            − 15
          </button>
          <button onClick={() => setVal((v) => Math.min(100, v + 15))} style={{ cursor: "pointer" }}>
            + 15
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: "Click buttons to see the animated progress transition." },
    },
  },
};
