import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonText, SkeletonCard } from "sketchbook-ui";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn sketch-style skeleton placeholder with shimmer animation. Perfect for loading states with a playful, artistic touch.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Skeleton, SkeletonText, SkeletonCard } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function LoadingProfile() {
  return (
    <div>
      <Skeleton variant="avatar" height={60} />
      <SkeletonText lines={3} />
    </div>
  );
}
\`\`\`

## Variants

\`\`\`tsx
<Skeleton variant="text" />
<Skeleton variant="rectangle" height={120} />
<Skeleton variant="circle" />
<Skeleton variant="avatar" />
\`\`\`

## Static (No Animation)

\`\`\`tsx
<Skeleton variant="rectangle" height={100} animated={false} />
\`\`\`

## Custom Colors

\`\`\`tsx
<Skeleton
  variant="rectangle"
  height={80}
  colors={{
    fill: "#d6eaff",
    fillAlt: "#b3d4f7",
    stroke: "#6ba3d6"
  }}
/>
\`\`\`

## SkeletonText Component

Multi-line text skeleton with automatic width variation on the last line:

\`\`\`tsx
<SkeletonText lines={4} />
\`\`\`

## SkeletonCard Component

Complete card skeleton with image, optional avatar row, and text lines:

\`\`\`tsx
<SkeletonCard />
<SkeletonCard showAvatar />
\`\`\`

## Props

### Skeleton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`variant\` | \`"text" \\| "rectangle" \\| "circle" \\| "avatar"\` | \`"text"\` | Shape variant |
| \`width\` | \`number \\| string\` | \`"100%"\` | Width (ignored for circle/avatar) |
| \`height\` | \`number \\| string\` | varies | Height (20 for text, 60 for circle/avatar, 120 for rectangle) |
| \`animated\` | \`boolean\` | \`true\` | Enable shimmer animation |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.fill\` | \`string\` | \`"#e0ddd5"\` | Primary fill color |
| \`colors.fillAlt\` | \`string\` | \`"#d5d1c8"\` | Alternate fill for shimmer |
| \`colors.stroke\` | \`string\` | \`"#a8a49b"\` | Border stroke color |
| \`className\` | \`string\` | - | Additional CSS classes |

### SkeletonText Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`lines\` | \`number\` | \`3\` | Number of text lines |
| \`animated\` | \`boolean\` | \`true\` | Enable shimmer animation |
| \`colors\` | \`object\` | - | Custom colors (same as Skeleton) |
| \`className\` | \`string\` | - | Additional CSS classes |

### SkeletonCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`animated\` | \`boolean\` | \`true\` | Enable shimmer animation |
| \`showAvatar\` | \`boolean\` | \`false\` | Show avatar row |
| \`colors\` | \`object\` | - | Custom colors (same as Skeleton) |
| \`className\` | \`string\` | - | Additional CSS classes |

Plus all standard HTML div attributes.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["text", "rectangle", "circle", "avatar"],
    },
    animated: { control: { type: "boolean" } },
    width: { control: { type: "text" } },
    height: { control: { type: "number" } },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ────────────────────────────────── */

export const Default: Story = {
  args: {
    variant: "text",
    width: "100%",
  },
};

/* ── All Variants ───────────────────────────── */

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem", maxWidth: 420 }}>
      <div>
        <p style={{ fontFamily: "'Caveat', cursive", marginBottom: 4 }}>text</p>
        <Skeleton variant="text" />
      </div>
      <div>
        <p style={{ fontFamily: "'Caveat', cursive", marginBottom: 4 }}>rectangle</p>
        <Skeleton variant="rectangle" height={120} />
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <p style={{ fontFamily: "'Caveat', cursive", marginBottom: 4 }}>circle</p>
          <Skeleton variant="circle" />
        </div>
        <div>
          <p style={{ fontFamily: "'Caveat', cursive", marginBottom: 4 }}>avatar</p>
          <Skeleton variant="avatar" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "All four shape variants: text, rectangle, circle, and avatar (with face doodle)." },
    },
  },
};

/* ── Static (no animation) ──────────────────── */

export const Static: Story = {
  args: {
    variant: "rectangle",
    height: 100,
    animated: false,
  },
  parameters: {
    docs: {
      description: { story: "Shimmer animation disabled." },
    },
  },
};

/* ── Custom Colors ──────────────────────────── */

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "2rem", maxWidth: 360 }}>
      <Skeleton
        variant="rectangle"
        height={80}
        colors={{ fill: "#d6eaff", fillAlt: "#b3d4f7", stroke: "#6ba3d6" }}
      />
      <Skeleton
        variant="circle"
        height={60}
        colors={{ fill: "#ffe0e0", fillAlt: "#f5c2c2", stroke: "#c97878" }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Fully customised shimmer and border colours." },
    },
  },
};

/* ═══════════════════════════════════════════════════════════════════════ */
/*  SkeletonText                                                           */
/* ═══════════════════════════════════════════════════════════════════════ */

export const TextBlock: Story = {
  render: () => (
    <div style={{ padding: "2rem", maxWidth: 400 }}>
      <SkeletonText lines={4} />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Multi-line text skeleton (last line shorter for realism)." },
    },
  },
};

/* ═══════════════════════════════════════════════════════════════════════ */
/*  SkeletonCard                                                           */
/* ═══════════════════════════════════════════════════════════════════════ */

export const Card: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <SkeletonCard />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Card skeleton with image placeholder and text lines." },
    },
  },
};

export const CardWithAvatar: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <SkeletonCard showAvatar />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Card skeleton with avatar row between image and text." },
    },
  },
};
