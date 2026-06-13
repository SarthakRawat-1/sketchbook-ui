import React from "react";

import type {
  Meta,
  StoryObj,
} from "@storybook/react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
  docs: {
    description: {
      component: `
A hand-drawn sketch-style Tabs component with notebook-inspired visuals, SVG sketch borders, keyboard accessibility, and flexible controlled/uncontrolled state management.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "sketchbook-ui";

import "sketchbook-ui/style.css";

function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">
          Account
        </TabsTrigger>

        <TabsTrigger value="settings">
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        Account Content
      </TabsContent>

      <TabsContent value="settings">
        Settings Content
      </TabsContent>
    </Tabs>
  );
}
\`\`\`

## Features

- SVG-based sketch styling
- Controlled and uncontrolled modes
- Keyboard navigation support
- ARIA accessibility support
- Custom typography and colors
- Multiple size variants
- Disabled tab support

## Controlled Usage

\`\`\`tsx
const [tab, setTab] = useState("overview");

<Tabs
  value={tab}
  onValueChange={setTab}
  defaultValue="overview"
>
  ...
</Tabs>
\`\`\`

## Custom Styling

\`\`\`tsx
<Tabs
  defaultValue="notes"
  colors={{
    bg: "#fffef7",
    stroke: "#5b4636",
    activeBg: "#ffe7a3",
  }}
  typography={{
    fontFamily: "Patrick Hand, cursive",
    fontSize: "1.2rem",
  }}
>
  ...
</Tabs>
\`\`\`

## Accessibility

Supports:
- ArrowLeft / ArrowRight keyboard navigation
- Focus states
- Proper ARIA roles
- Screen reader compatibility

## Props

### Tabs Props

| Prop | Type | Default | Description |
|------|------|------|------|
| \`defaultValue\` | \`string\` | - | Initial active tab |
| \`value\` | \`string\` | - | Controlled active tab |
| \`onValueChange\` | \`(value: string) => void\` | - | Controlled state callback |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Size variant |
| \`showBorder\` | \`boolean\` | \`true\` | Toggle sketch borders |
| \`colors\` | \`object\` | - | Custom color configuration |
| \`typography\` | \`object\` | - | Typography customization |

### TabsTrigger Props

| Prop | Type | Default | Description |
|------|------|------|------|
| \`value\` | \`string\` | - | Associated tab value |
| \`disabled\` | \`boolean\` | \`false\` | Disable interaction |

### TabsContent Props

| Prop | Type | Description |
|------|------|------|
| \`value\` | \`string\` | Associated content panel value |
      `,
    },
  },
},
};

export default meta;

type Story = StoryObj<typeof Tabs>;

function ControlledTabsExample() {
  const [activeTab, setActiveTab] =
    React.useState("overview");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      defaultValue="overview"
    >
      <TabsList>
        <TabsTrigger value="overview">
          Overview
        </TabsTrigger>

        <TabsTrigger value="analytics">
          Analytics
        </TabsTrigger>

        <TabsTrigger value="reports">
          Reports
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div
          style={{
            padding: "1rem",
            lineHeight: 1.7,
          }}
        >
          Overview dashboard metrics and
          quick summaries appear here.
        </div>
      </TabsContent>

      <TabsContent value="analytics">
        <div
          style={{
            padding: "1rem",
            lineHeight: 1.7,
          }}
        >
          Interactive analytics and chart
          visualizations would appear in
          this section.
        </div>
      </TabsContent>

      <TabsContent value="reports">
        <div
          style={{
            padding: "1rem",
            lineHeight: 1.7,
          }}
        >
          Reports, exported documents, and
          generated summaries are organized
          here.
        </div>
      </TabsContent>
    </Tabs>
  );
}

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">
          Account
        </TabsTrigger>

        <TabsTrigger value="settings">
          Settings
        </TabsTrigger>

        <TabsTrigger value="profile">
          Profile
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <div
          style={{
            padding: "1rem",
            fontSize: "1.1rem",
            lineHeight: 1.7,
          }}
        >
          Welcome to your account dashboard.
          Here you can manage profile
          details, subscriptions, and
          recent activity.
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <div
          style={{
            padding: "1rem",
            fontSize: "1.1rem",
            lineHeight: 1.7,
          }}
        >
          Configure notifications, themes,
          accessibility preferences, and
          interface customization settings.
        </div>
      </TabsContent>

      <TabsContent value="profile">
        <div
          style={{
            padding: "1rem",
            fontSize: "1.1rem",
            lineHeight: 1.7,
          }}
        >
          This section contains your public
          profile information, social links,
          and bio details.
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const NotebookStyle: Story = {
  render: () => (
    <Tabs
      defaultValue="design"
      size="lg"
      colors={{
        bg: "#fffef7",
        bgOverlay: "#f6f1e7",
        stroke: "#5b4636",
        text: "#3f3127",
        activeBg: "#ffe7a3",
        activeOverlay: "#fff1c7",
      }}
      typography={{
        fontFamily:
          "Patrick Hand, cursive",
        fontSize: "1.25rem",
        fontWeight: 600,
      }}
    >
      <TabsList>
        <TabsTrigger value="design">
          Design
        </TabsTrigger>

        <TabsTrigger value="development">
          Development
        </TabsTrigger>

        <TabsTrigger value="ideas">
          Ideas
        </TabsTrigger>
      </TabsList>

      <TabsContent value="design">
        <div
          style={{
            padding: "1.5rem",
            fontSize: "1.2rem",
            lineHeight: 1.9,
            transform: "rotate(-0.3deg)",
          }}
        >
          Sketchbook UI focuses on notebook
          inspired interfaces with paper
          textures, hand-drawn shapes, and
          expressive imperfect geometry.
        </div>
      </TabsContent>

      <TabsContent value="development">
        <div
          style={{
            padding: "1.5rem",
            fontSize: "1.2rem",
            lineHeight: 1.9,
            transform: "rotate(0.2deg)",
          }}
        >
          Components are built using React,
          TypeScript, SVG sketch primitives,
          accessibility support, and reusable
          architecture patterns.
        </div>
      </TabsContent>

      <TabsContent value="ideas">
        <div
          style={{
            padding: "1.5rem",
            fontSize: "1.2rem",
            lineHeight: 1.9,
            transform: "rotate(-0.2deg)",
          }}
        >
          Future improvements could include
          sticky-note variants, animated
          paper transitions, draggable tabs,
          and richer sketch interactions.
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const ControlledTabs: Story = {
  render: () => <ControlledTabsExample />,
};

export const DisabledTabs: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">
          Active
        </TabsTrigger>

        <TabsTrigger
          value="disabled"
          disabled
        >
          Disabled
        </TabsTrigger>

        <TabsTrigger value="available">
          Available
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <div
          style={{
            padding: "1rem",
            lineHeight: 1.7,
          }}
        >
          This tab is active and fully
          interactive.
        </div>
      </TabsContent>

      <TabsContent value="available">
        <div
          style={{
            padding: "1rem",
            lineHeight: 1.7,
          }}
        >
          This tab remains accessible while
          another tab is disabled.
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const SmallTabs: Story = {
  render: () => (
    <Tabs
      defaultValue="one"
      size="sm"
    >
      <TabsList>
        <TabsTrigger value="one">
          Notes
        </TabsTrigger>

        <TabsTrigger value="two">
          Tasks
        </TabsTrigger>

        <TabsTrigger value="three">
          Drafts
        </TabsTrigger>
      </TabsList>

      <TabsContent value="one">
        <div
          style={{
            padding: "0.8rem",
            lineHeight: 1.6,
          }}
        >
          Compact tabs for denser layouts.
        </div>
      </TabsContent>

      <TabsContent value="two">
        <div
          style={{
            padding: "0.8rem",
            lineHeight: 1.6,
          }}
        >
          Smaller variants fit dashboards
          and utility panels well.
        </div>
      </TabsContent>

      <TabsContent value="three">
        <div
          style={{
            padding: "0.8rem",
            lineHeight: 1.6,
          }}
        >
          The sketch styling still remains
          readable at smaller sizes.
        </div>
      </TabsContent>
    </Tabs>
  ),
};