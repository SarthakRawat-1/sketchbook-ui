import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { Card } from "../card/Card";
import { Badge } from "../badge/Badge";
import { Button } from "../button/Button";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A sketch-style date picker with a hand-drawn calendar popover, keyboard navigation, and controlled/uncontrolled support.

## Basic Usage

\`\`\`tsx
import { DatePicker } from "sketchbook-ui";

function Example() {
  return <DatePicker label="Launch date" />;
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

function PlaygroundStory() {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <Card style={{ padding: 28, display: "grid", gap: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Badge variant="info" size="sm">
            Controlled
          </Badge>
          <Badge variant="success" size="sm">
            Keyboard friendly
          </Badge>
        </div>
        <DatePicker
          label="Launch date"
          value={value}
          onChange={setValue}
          placeholder="Pick a launch date"
        />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button size="sm" onClick={() => setValue(new Date())}>
            Set today
          </Button>
          <Button size="sm" onClick={() => setValue(null)}>
            Clear
          </Button>
        </div>
      </Card>
    </div>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundStory />,
};
