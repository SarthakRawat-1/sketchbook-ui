import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { UsagePreviewDrawer } from "./UsagePreviewDrawer";
import { Button } from "../button/Button";
import { Card } from "../card/Card";
import { Badge } from "../badge/Badge";
import { Input } from "../input/Input";
import { Select } from "../select/Select";

const meta: Meta<typeof UsagePreviewDrawer> = {
  title: "Components/UsagePreviewDrawer",
  component: UsagePreviewDrawer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A side drawer that keeps a live component example, JSX usage, and a props reference in one place.

## Basic Usage

\`\`\`tsx
import { useState } from "react";
import { UsagePreviewDrawer, Button } from "sketchbook-ui";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <UsagePreviewDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Button usage"
        preview={<div>Live preview</div>}
        code="<Button>Save draft</Button>"
        propsReference={[]}
      />
    </>
  );
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UsagePreviewDrawer>;

function PlaygroundStory() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ minHeight: 320 }}>
      <Button onClick={() => setOpen(true)}>Open usage drawer</Button>
      <UsagePreviewDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Component usage preview"
        description="Compare the live preview, copy the snippet, and skim the prop reference without leaving the page."
        preview={
          <Card style={{ padding: 24, display: "grid", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Badge variant="info" size="sm">
                Live example
              </Badge>
              <Badge variant="success" size="sm">
                Ready to ship
              </Badge>
            </div>
            <h3 style={{ margin: 0, fontFamily: "'Caveat', cursive" }}>
              Publish a component snapshot
            </h3>
            <Input placeholder="Component name" />
            <Select
              placeholder="Choose a variant"
              options={[
                { label: "Paper", value: "paper" },
                { label: "Notebook", value: "notebook" },
                { label: "Sticky", value: "sticky" },
              ]}
            />
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button size="sm">Save draft</Button>
              <Button size="sm">Copy link</Button>
            </div>
          </Card>
        }
        code={`import { Button, Card, Badge, Input, Select } from "sketchbook-ui";

function UsageExample() {
  return (
    <Card style={{ padding: 24, display: "grid", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Badge variant="info" size="sm">Live example</Badge>
        <Badge variant="success" size="sm">Ready to ship</Badge>
      </div>
      <h3 style={{ margin: 0, fontFamily: "'Caveat', cursive" }}>
        Publish a component snapshot
      </h3>
      <Input placeholder="Component name" />
      <Select
        placeholder="Choose a variant"
        options={[
          { label: "Paper", value: "paper" },
          { label: "Notebook", value: "notebook" },
          { label: "Sticky", value: "sticky" },
        ]}
      />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button size="sm">Save draft</Button>
        <Button size="sm">Copy link</Button>
      </div>
    </Card>
  );
}`}
        propsReference={[
          {
            name: "isOpen",
            type: "boolean",
            description: "Controls whether the drawer is visible.",
            required: true,
          },
          {
            name: "preview",
            type: "ReactNode",
            description: "The live component example shown in the first tab.",
            required: true,
          },
          {
            name: "code",
            type: "string",
            description: "The JSX snippet shown in the code tab and copied to the clipboard.",
            required: true,
          },
        ]}
      />
    </div>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundStory />,
};
