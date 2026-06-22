import type { Meta, StoryObj } from "@storybook/react";
import { CursorGlow } from "./CursorGlow";

const meta: Meta<typeof CursorGlow> = {
  title: "Components/CursorGlow",
  component: CursorGlow,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A subtle pointer-follow glow that adds a bit of motion without taking over the page. It is intentionally lightweight and can be wrapped around any sketchy layout.

## Usage

\`\`\`tsx
import { CursorGlow } from 'sketchbook-ui';

<CursorGlow>
  <App />
</CursorGlow>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`enabled\` | \`boolean\` | \`true\` | Toggle the glow effect |
| \`color\` | \`string\` | blue glow | Base glow color |
| \`size\` | \`number\` | \`220\` | Glow diameter in pixels |
| \`blur\` | \`number\` | \`80\` | Blur radius in pixels |
| \`opacity\` | \`number\` | \`1\` | Glow opacity multiplier |
        `,
      },
    },
  },
} satisfies Meta<typeof CursorGlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div
      style={{
        minHeight: 420,
        padding: 32,
        background: "#faf7f0",
        border: "2px dashed #e8e0d0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CursorGlow {...args}>
        <div style={{ maxWidth: 420 }}>
          <h3 style={{ marginTop: 0 }}>Move your pointer around this panel</h3>
          <p style={{ lineHeight: 1.75 }}>
            The glow stays soft and lightweight while following the cursor.
            This is meant to complement the hand-drawn look, not compete with it.
          </p>
        </div>
      </CursorGlow>
    </div>
  ),
};

export const WarmGlow: Story = {
  args: {
    color: "rgba(245, 158, 11, 0.35)",
    size: 260,
    blur: 92,
  },
  render: (args) => (
    <div
      style={{
        minHeight: 420,
        padding: 32,
        background: "#fff8ea",
        border: "2px dashed #e6d4b9",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CursorGlow {...args}>
        <div style={{ maxWidth: 420 }}>
          <h3 style={{ marginTop: 0 }}>Warm cursor glow</h3>
          <p style={{ lineHeight: 1.75 }}>
            A different glow tone for more amber-heavy layouts.
          </p>
        </div>
      </CursorGlow>
    </div>
  ),
};
