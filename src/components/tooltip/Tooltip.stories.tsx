import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../button/Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn sketch-style tooltip that appears as a speech bubble with a wobbly tail. Perfect for contextual hints and help text.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Tooltip, Button } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  return (
    <Tooltip content="Helpful hint!" placement="top">
      <Button>Hover me</Button>
    </Tooltip>
  );
}
\`\`\`

## Placements

\`\`\`tsx
<Tooltip content="Top bubble" placement="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Bottom bubble" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left note" placement="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="Right note" placement="right">
  <Button>Right</Button>
</Tooltip>
\`\`\`

## Controlled Mode

\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<Tooltip content="Controlled tooltip" open={isOpen}>
  <Button onClick={() => setIsOpen(!isOpen)}>
    Toggle
  </Button>
</Tooltip>
\`\`\`

## Disabled State

\`\`\`tsx
<Tooltip content="You won't see me" disabled>
  <Button>Disabled tooltip</Button>
</Tooltip>
\`\`\`

## Custom Colors

\`\`\`tsx
<Tooltip
  content="Blue pencil note"
  colors={{
    bg: "#e8f4fd",
    bgOverlay: "#d1e8fa",
    stroke: "#1a6fb5",
    text: "#1a6fb5"
  }}
>
  <Button>Hover</Button>
</Tooltip>
\`\`\`

## Custom Typography

\`\`\`tsx
<Tooltip
  content="Custom styled"
  typography={{
    fontSize: "1rem",
    fontWeight: 600,
    fontFamily: "Arial"
  }}
>
  <Button>Hover</Button>
</Tooltip>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`content\` | \`React.ReactNode\` | required | Content to display in tooltip |
| \`placement\` | \`"top" \\| "bottom" \\| "left" \\| "right"\` | \`"top"\` | Position relative to trigger |
| \`openDelay\` | \`number\` | \`200\` | Delay in ms before showing |
| \`closeDelay\` | \`number\` | \`100\` | Delay in ms before hiding |
| \`disabled\` | \`boolean\` | \`false\` | Disable tooltip |
| \`open\` | \`boolean\` | - | Controlled visibility state |
| \`showBorder\` | \`boolean\` | \`true\` | Show sketch border |
| \`colors\` | \`object\` | - | Custom color palette |
| \`colors.bg\` | \`string\` | \`"#faf9f6"\` | Background color |
| \`colors.bgOverlay\` | \`string\` | \`"#f5f3ed"\` | Overlay tint color |
| \`colors.stroke\` | \`string\` | \`"#2d2d2d"\` | Border stroke color |
| \`colors.text\` | \`string\` | \`"#2d2d2d"\` | Text color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | \`"1.15rem"\` | Font size |
| \`typography.fontWeight\` | \`string \\| number\` | \`500\` | Font weight |
| \`typography.fontFamily\` | \`string\` | \`"Caveat"\` | Font family |
| \`children\` | \`React.ReactElement\` | required | Trigger element (single element) |
| \`className\` | \`string\` | - | Additional CSS classes |

Plus all standard HTML div attributes.

## Important Note

The \`children\` prop must be a single React element (not text or multiple elements).
        `,
      },
    },
  },
  argTypes: {
    placement: {
      control: { type: "radio" },
      options: ["top", "bottom", "left", "right"],
    },
    disabled: { control: { type: "boolean" } },
    showBorder: { control: { type: "boolean" } },
    openDelay: { control: { type: "number" } },
    closeDelay: { control: { type: "number" } },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "6rem", display: "flex", justifyContent: "center" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ────────────────────────────────── */

export const Default: Story = {
  args: {
    content: "Hey, I'm a tooltip!",
    placement: "top",
    children: <Button size="sm">Hover me</Button>,
  },
};

/* ── Placements ─────────────────────────────── */

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Tooltip content="Top bubble" placement="top">
        <Button size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom bubble" placement="bottom">
        <Button size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left note" placement="left">
        <Button size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Right note" placement="right">
        <Button size="sm">Right</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "All four placement directions." },
    },
  },
};

/* ── Custom Colors ──────────────────────────── */

export const CustomColors: Story = {
  args: {
    content: "Blue pencil note",
    placement: "top",
    colors: {
      bg: "#e8f4fd",
      bgOverlay: "#d1e8fa",
      stroke: "#1a6fb5",
      text: "#1a6fb5",
    },
    children: <Button size="sm" colors={{ bg: "#e8f4fd", bgOverlay: "#d1e8fa", stroke: "#1a6fb5", text: "#1a6fb5" }}>Hover</Button>,
  },
  parameters: {
    docs: {
      description: { story: "Fully customised colour palette." },
    },
  },
};

/* ── Always Open (controlled) ───────────────── */

export const AlwaysOpen: Story = {
  args: {
    content: "Pinned open!",
    placement: "top",
    open: true,
    children: <Button size="sm">Always visible</Button>,
  },
  parameters: {
    docs: {
      description: { story: "Controlled mode with `open={true}` — always visible." },
    },
  },
};

/* ── Disabled ───────────────────────────────── */

export const Disabled: Story = {
  args: {
    content: "You won't see me",
    disabled: true,
    children: <Button size="sm">Disabled tooltip</Button>,
  },
  parameters: {
    docs: {
      description: { story: "Tooltip disabled — never appears." },
    },
  },
};

/* ── On plain text ──────────────────────────── */

export const OnText: Story = {
  render: () => (
    <p style={{ fontFamily: "'Caveat', cursive", fontSize: "1.5rem" }}>
      Hover over the{" "}
      <Tooltip content="Surprise!" placement="top">
        <span style={{ textDecoration: "underline wavy", cursor: "help" }}>
          underlined word
        </span>
      </Tooltip>{" "}
      to see the tooltip.
    </p>
  ),
  parameters: {
    docs: {
      description: { story: "Tooltip attached to an inline text span." },
    },
  },
};

/* ── Long Content ───────────────────────────── */

export const LongContent: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        alignItems: "center",
      }}
    >
      <Tooltip
        content="This is a much longer tooltip message to show how the bubble expands!"
        placement="top"
      >
        <Button size="sm">Long top</Button>
      </Tooltip>
      <Tooltip
        content="Another lengthy pencil note that keeps on going and going"
        placement="bottom"
      >
        <Button size="sm">Long bottom</Button>
      </Tooltip>
      <Tooltip
        content="Expanded sideways tooltip"
        placement="right"
      >
        <Button size="sm">Long right</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Longer content to demonstrate how the speech bubble grows to fit." },
    },
  },
};
