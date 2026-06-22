import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ColorPicker } from "./ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn color picker with preset swatches and a live hex input. It keeps the Sketchbook UI feel while still letting people dial in exact colors quickly.

## Basic Usage

\`\`\`tsx
import { ColorPicker } from 'sketchbook-ui';

function App() {
  const [color, setColor] = React.useState('#3b82f6');

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      label="Accent color"
    />
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string\` | - | Controlled color value |
| \`defaultValue\` | \`string\` | \`"#3b82f6"\` | Initial color when uncontrolled |
| \`onChange\` | \`(value: string) => void\` | - | Called when the color changes |
| \`label\` | \`string\` | \`"Pick a color"\` | Label shown above the picker |
| \`swatches\` | \`string[]\` | preset palette | Preset swatches shown below the input |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Layout size |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |

## Features

- ✨ Hand-drawn panel, borders, and swatches
- 🎨 Preset swatches plus exact hex input
- ♿ Keyboard-friendly buttons and accessible labeling
- 🧩 Controlled or uncontrolled usage
        `,
      },
    },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const swatches = [
  "#111827",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

function Playground() {
  const [color, setColor] = useState("#3b82f6");

  return (
    <div style={{ maxWidth: 520, padding: 24 }}>
      <ColorPicker
        label="Accent color"
        value={color}
        onChange={setColor}
        swatches={swatches}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <Playground />,
};

export const Small: Story = {
  args: {
    label: "Small palette",
    size: "sm",
    defaultValue: "#ec4899",
    swatches,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled picker",
    defaultValue: "#3b82f6",
    swatches,
    disabled: true,
  },
};
