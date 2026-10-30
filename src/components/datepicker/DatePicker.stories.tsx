import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn sketchy date picker with responsive sizing, keyboard navigation, and customizable styling.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { DatePicker } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="Select date..."
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    showBorder: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Pick a date...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Due Date",
    placeholder: "Choose deadline...",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Appointment",
    defaultValue: new Date(),
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "flex-start",
        padding: "2rem",
      }}
    >
      <DatePicker {...args} size="sm" placeholder="Small (sm)" label="Small" />
      <DatePicker {...args} size="md" placeholder="Medium (md)" label="Medium" />
      <DatePicker {...args} size="lg" placeholder="Large (lg)" label="Large" />
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledDatePicker() {
    const [selected, setSelected] = useState<Date | null>(new Date());

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <DatePicker
          label="Selected Date"
          value={selected}
          onChange={setSelected}
        />
        <div style={{ fontFamily: "Caveat, cursive", fontSize: "1.2rem" }}>
          Current value: {selected ? selected.toLocaleDateString() : "None"}
        </div>
      </div>
    );
  },
};

export const DateBounds: Story = {
  render: function DateBoundsDemo() {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 5);
    const maxDate = new Date(today.getFullYear(), today.getMonth(), 25);

    return (
      <DatePicker
        label="Select (5th - 25th of month)"
        minDate={minDate}
        maxDate={maxDate}
        placeholder="Bounded selection..."
      />
    );
  },
};

export const CustomFormatting: Story = {
  args: {
    label: "ISO Format",
    defaultValue: new Date(),
    formatDate: (d: Date) => d.toISOString().split("T")[0],
  },
};

export const CustomColors: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "flex-start",
        padding: "2rem",
      }}
    >
      <DatePicker
        {...args}
        label="Rose Theme"
        colors={{
          bg: "#fff1f2",
          bgOverlay: "#ffe4e6",
          stroke: "#e11d48",
          text: "#9f1239",
          label: "#e11d48",
          hoverBg: "#fecdd3",
          selectedBg: "#e11d48",
          selectedText: "#ffffff",
          todayDot: "#be123c",
        }}
      />
      <DatePicker
        {...args}
        label="Indigo Theme"
        colors={{
          bg: "#eef2ff",
          bgOverlay: "#e0e7ff",
          stroke: "#4f46e5",
          text: "#3730a3",
          label: "#4f46e5",
          hoverBg: "#c7d2fe",
          selectedBg: "#4f46e5",
          selectedText: "#ffffff",
          todayDot: "#4338ca",
        }}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled Picker",
    disabled: true,
    defaultValue: new Date(),
  },
};

export const FixedSixWeeks: Story = {
  args: {
    label: "Always 6 rows (fixedWeeks)",
    fixedWeeks: true,
    defaultValue: new Date(2027, 1, 1),
  },
};
