import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SketchRating } from "./SketchRating";

const meta: Meta<typeof SketchRating> = {
  title: "Components/SketchRating",
  component: SketchRating,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A sketchy star rating control with hover preview, keyboard support, and an optional custom icon.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { SketchRating } from "sketchbook-ui";

function App() {
  return <SketchRating label="Product rating" />;
}
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof SketchRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Product rating",
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState(3.5);

    return (
      <div style={{ maxWidth: 560, padding: "2rem" }}>
        <SketchRating
          label="Average rating"
          value={value}
          onChange={setValue}
          precision={0.5}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "A controlled rating example with half-step precision.",
      },
    },
  },
};
