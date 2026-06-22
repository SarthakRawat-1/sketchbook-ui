import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { Button } from "../button/Button";
import { Card } from "../card/Card";
import { Badge } from "../badge/Badge";
import { Input } from "../input/Input";
import { Switch } from "../switch/Switch";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn tabs component with keyboard navigation, controlled and uncontrolled modes, and accessible tab/panel wiring.

## Basic Usage

\`\`\`tsx
import { Tabs } from "sketchbook-ui";

function Example() {
  return (
    <Tabs defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">Account content</Tabs.Content>
      <Tabs.Content value="settings">Settings content</Tabs.Content>
    </Tabs>
  );
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  render: () => (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <Tabs defaultValue="overview">
        <Tabs.List style={{ marginBottom: 18 }}>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="details">Details</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="overview">
          <Card style={{ padding: 24, display: "grid", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Badge variant="info" size="sm">
                Active tab
              </Badge>
              <Badge variant="success" size="sm">
                Keyboard ready
              </Badge>
            </div>
            <h3 style={{ margin: 0, fontFamily: "'Caveat', cursive" }}>
              A calm place for grouped content
            </h3>
            <p style={{ margin: 0, lineHeight: 1.7 }}>
              Use tabs when users need to switch between a few related views
              without losing context. This sketch version keeps the shape of a
              familiar UI while staying on-brand.
            </p>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="details">
          <Card style={{ padding: 24, display: "grid", gap: 16 }}>
            <Input label="Project name" placeholder="Sketchbook UI" />
            <Input label="Team lead" placeholder="Sarthak" />
            <Button>Save details</Button>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="settings">
          <Card style={{ padding: 24, display: "grid", gap: 18 }}>
            <Switch label="Enable notifications" checked />
            <Switch label="Compact mode" />
            <Switch label="Auto-save drafts" checked />
          </Card>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};
