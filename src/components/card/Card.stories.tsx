import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "../button";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A hand-drawn card component with three distinct variants: paper, notebook, and sticky note. Features authentic sketchy borders and decorative elements.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Card } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  return (
    <Card style={{ width: 480 }}>
      <p>This is a sketch-style card component.</p>
    </Card>
  );
}
\`\`\`

## Variants

\`\`\`tsx
<Card variant="paper">Paper card</Card>
<Card variant="notebook">Notebook card with lines</Card>
<Card variant="sticky">Sticky note card</Card>
\`\`\`

## Custom Sizes

\`\`\`tsx
<Card style={{ width: 320 }}>Small card</Card>
<Card style={{ width: 480 }}>Medium card</Card>
<Card style={{ width: 640 }}>Large card</Card>

<Card style={{ width: 320, height: 400 }}>Tall card</Card>
\`\`\`

## Custom Colors

\`\`\`tsx
<Card 
  variant="paper"
  colors={{ 
    bg: "#e8f5e9", 
    bgOverlay: "#c8e6c9", 
    stroke: "#2e7d32", 
    text: "#1b5e20" 
  }}
>
  <p>Custom green theme</p>
</Card>
\`\`\`

## No Border

\`\`\`tsx
<Card showBorder={false}>
  <p>Card without border decoration</p>
</Card>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`children\` | \`ReactNode\` | required | Card content |
| \`variant\` | \`"paper" \\| "notebook" \\| "sticky"\` | \`"paper"\` | Card style variant |
| \`showBorder\` | \`boolean\` | \`true\` | Show hand-drawn border |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Text color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`className\` | \`string\` | - | Additional CSS classes |
| \`style\` | \`CSSProperties\` | - | Inline styles (use for width/height) |

Plus all standard HTML div attributes.

## Variant Details

- **paper**: Clean paper look with subtle corner fold
- **notebook**: Lined paper with hole punches and red margin line
- **sticky**: Yellow sticky note with tape at top

## Important Notes

- Use inline \`style\` prop to control card dimensions (width, height)
- SVG background stretches to fill container
- Notebook variant adds left padding automatically for margin line
- Card is a div element and accepts all standard div props
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["paper", "notebook", "sticky"],
    },
    showBorder: { control: "boolean" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ──────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    children: (
      <p style={{ lineHeight: 1.6 }}>
        This is a sketch-style card component. It shares the same hand-drawn
        look as the modal, but renders inline without any overlay behaviour.
      </p>
    ),
    style: { width: 480 },
  },
};

/* ── Variants ─────────────────────────────────────────────── */

export const Variants: Story = {
  args: { children: "" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {(["paper", "notebook", "sticky"] as const).map((v) => (
        <Card key={v} variant={v} style={{ width: 420 }}>
          <p style={{ margin: 0, textTransform: "capitalize" }}>{v} variant</p>
        </Card>
      ))}
    </div>
  ),
};



/* ── Custom Colours ───────────────────────────────────────── */

export const CustomColors: Story = {
  args: {
    variant: "paper",
    colors: { bg: "#e8f5e9", bgOverlay: "#c8e6c9", stroke: "#2e7d32", text: "#1b5e20" },
    children: <p>Operation completed successfully.</p>,
    style: { width: 420 },
  },
};

/* ── No Border ────────────────────────────────────────────── */

export const NoBorder: Story = {
  args: {
    showBorder: false,
    children: <p>This card has the border decoration disabled.</p>,
    style: { width: 420 },
  },
};

/* ── Card Grid ────────────────────────────────────────────── */

export const CardGrid: Story = {
  args: { children: "" },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 260px)",
        gap: 24,
      }}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <Card
          key={i}
          variant={(["paper", "notebook", "sticky"] as const)[i % 3]}
        >
          <h3 style={{ margin: "0 0 8px" }}>Card {i + 1}</h3>
          <p style={{ margin: 0, fontSize: "1.1rem" }}>
            A quick note or snippet of information.
          </p>
        </Card>
      ))}
    </div>
  ),
};

/* ── Product Card ─────────────────────────────────────────── */

export const ProductCard: Story = {
  args: { children: "" },
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
      {(["paper", "notebook"] as const).map((v) => (
        <Card key={v} variant={v} style={{ width: 320 }}>
          {/* Placeholder image */}
          <div
            style={{
              width: "100%",
              height: 180,
              background: "#e8e4db",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              fontSize: "1rem",
              color: "#8c8577",
              fontFamily: "'Caveat', cursive",
            }}
          >
            320 × 180
          </div>

          {/* Text */}
          <h3 style={{ margin: "0 0 8px" }}>Sketch Notebook ({v})</h3>
          <p style={{ margin: "0 0 16px", fontSize: "1.1rem", lineHeight: 1.5, opacity: 0.8 }}>
            A beautifully hand-drawn notebook for your daily sketches and notes.
          </p>

          {/* Button */}
          <Button size="sm">Add to cart</Button>
        </Card>
      ))}
    </div>
  ),
};

/* ── Sizes ────────────────────────────────────────────────── */

export const Sizes: Story = {
  args: { children: "" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {[320, 480, 640].map((w) => (
          <Card key={w} style={{ width: w }}>
            <p style={{ margin: 0 }}>Width: {w}px</p>
          </Card>
        ))}
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {[200, 300, 400].map((h) => (
          <Card key={h} style={{ width: 320, height: h }}>
            <p style={{ margin: 0 }}>Height: {h}px</p>
          </Card>
        ))}
      </div>
    </div>
  ),
};
