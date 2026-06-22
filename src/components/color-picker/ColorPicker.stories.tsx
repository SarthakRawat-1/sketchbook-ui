import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ColorPicker } from "./ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn color picker with a live preview swatch, editable hex value, and preset sketchy swatches.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { ColorPicker } from "sketchbook-ui";

function App() {
  return <ColorPicker label="Brand color" />;
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string\` | - | Controlled hex value |
| \`defaultValue\` | \`string\` | \`"#F97316"\` | Initial color |
| \`onChange\` | \`(color: string) => void\` | - | Called when the color changes |
| \`label\` | \`string\` | - | Label shown above the picker |
| \`swatches\` | \`string[]\` | default palette | Preset color swatches |
| \`disabled\` | \`boolean\` | \`false\` | Disable editing |
| \`showBorder\` | \`boolean\` | \`true\` | Show the sketch card border |
        `,
      },
    },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Brand color",
  },
};

export const CustomPalette: Story = {
  render: function CustomPaletteStory() {
    const [value, setValue] = useState("#2563EB");

    return (
      <div style={{ maxWidth: 560, padding: "2rem" }}>
        <ColorPicker
          label="Accent color"
          value={value}
          onChange={setValue}
          swatches={["#0F766E", "#2563EB", "#7C3AED", "#DB2777", "#EA580C"]}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "A controlled picker with a custom palette.",
      },
    },
  },
};
