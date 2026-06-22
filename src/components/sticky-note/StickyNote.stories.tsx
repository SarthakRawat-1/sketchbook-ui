import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { StickyNote } from "./StickyNote";

const meta: Meta<typeof StickyNote> = {
  title: "Components/StickyNote",
  component: StickyNote,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A notebook-style sticky note component for reminders, quick thoughts, and dashboard annotations. It keeps the Sketchbook UI paper feel without making consumers build the note shape themselves.

## Example

\`\`\`tsx
import { StickyNote } from 'sketchbook-ui';

<StickyNote title="Reminder" pinned>
  Ship the review before lunch.
</StickyNote>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`title\` | \`string\` | - | Optional heading for the note |
| \`pinned\` | \`boolean\` | \`false\` | Adds a pushpin accent |
| \`tone\` | \`"yellow" \\| "pink" \\| "blue" \\| "mint" \\| "lavender"\` | \`"yellow"\` | Paper tone |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Spacing and typography scale |
| \`showBorder\` | \`boolean\` | \`true\` | Show the sketchy outer border |
        `,
      },
    },
  },
} satisfies Meta<typeof StickyNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Today",
    pinned: true,
    tone: "yellow",
    children: "Review the PR notes, then merge the clean lane before the day ends.",
  },
};

export const ToDo: Story = {
  render: () => (
    <div style={{ maxWidth: 420, padding: 24 }}>
      <StickyNote title="To-do" pinned tone="mint">
        {"\u2610"} Finish review comments
        {"\n"}{"\u2610"} Push the next issue fix
        {"\n"}{"\u2610"} Check CI one more time
      </StickyNote>
    </div>
  ),
};

export const Colorways: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
        padding: 24,
      }}
    >
      {(["yellow", "pink", "blue", "mint", "lavender"] as const).map((tone) => (
        <StickyNote key={tone} title={tone} tone={tone}>
          A quick reminder note in the {tone} palette.
        </StickyNote>
      ))}
    </div>
  ),
};
