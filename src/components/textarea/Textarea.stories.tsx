import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn multi-line text input that looks like torn notebook paper, complete with ruling lines and a red margin.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Textarea } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  const [value, setValue] = React.useState('');
  
  return (
    <Textarea
      label="Notes"
      placeholder="Write your thoughts here..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={6}
    />
  );
}
\`\`\`

## Uncontrolled (with defaultValue)

\`\`\`tsx
<Textarea
  label="Journal Entry"
  defaultValue="Today was a good day..."
  onChange={(e) => console.log(e.target.value)}
/>
\`\`\`

## Sizes

\`\`\`tsx
<Textarea size="sm" label="Small" placeholder="Quick note..." />
<Textarea size="md" label="Medium" placeholder="Write something..." />
<Textarea size="lg" label="Large" placeholder="Tell us everything..." />
\`\`\`

## Without Lines or Margin

\`\`\`tsx
<Textarea 
  showLines={false} 
  showMargin={false}
  placeholder="Plain paper style..."
/>
\`\`\`

## Disabled State

\`\`\`tsx
<Textarea
  label="Locked"
  defaultValue="This content cannot be edited."
  disabled
/>
\`\`\`

## Custom Colors

\`\`\`tsx
<Textarea
  label="Blue theme"
  colors={{
    stroke: "#3498db",
    text: "#2980b9",
    label: "#2980b9",
    lineColor: "#bcd4e6",
    marginColor: "#7ec8e3",
  }}
/>
\`\`\`

## Custom Typography

\`\`\`tsx
<Textarea
  label="Custom Font"
  typography={{
    fontFamily: "serif",
    fontSize: "1.2rem",
    fontWeight: "bold",
    labelSize: "1.4rem"
  }}
/>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Textarea size |
| \`label\` | \`string\` | - | Label text above textarea |
| \`placeholder\` | \`string\` | \`"Write your thoughts..."\` | Placeholder text |
| \`value\` | \`string\` | - | Controlled value |
| \`defaultValue\` | \`string\` | - | Uncontrolled default value |
| \`onChange\` | \`(e: ChangeEvent) => void\` | - | Change event handler |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |
| \`showLines\` | \`boolean\` | \`true\` | Show notebook ruling lines |
| \`showMargin\` | \`boolean\` | \`true\` | Show red margin line |
| \`showBorder\` | \`boolean\` | \`true\` | Show sketchy border |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Text color |
| \`colors.label\` | \`string\` | - | Label text color |
| \`colors.lineColor\` | \`string\` | - | Ruling lines color |
| \`colors.marginColor\` | \`string\` | - | Margin line color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Text font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Font weight |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`typography.labelSize\` | \`string\` | - | Label font size |
| \`className\` | \`string\` | - | Additional CSS classes |

Plus all standard HTML textarea attributes (\`rows\`, \`cols\`, \`maxLength\`, \`required\`, etc.)

## Features

- 📝 Authentic notebook paper appearance
- 📏 Ruling lines that match text line height
- 📍 Red margin line (like real notebooks)
- 🎨 Fully customizable colors
- 📐 Dynamic width sizing
- ♿ Accessible with proper labels

## Important Note

The \`onChange\` prop receives the standard React change event:
\`\`\`tsx
// ✅ Correct
<Textarea onChange={(e) => setValue(e.target.value)} />

// ❌ Wrong
<Textarea onChange={(value) => setValue(value)} />
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
    disabled: { control: { type: "boolean" } },
    showLines: { control: { type: "boolean" } },
    showMargin: { control: { type: "boolean" } },
    showBorder: { control: { type: "boolean" } },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Basic ──────────────────────────────────── */

export const Default: Story = {
  args: {
    label: "Notes",
    placeholder: "Write your thoughts here...",
  },
};

/* ── Sizes ──────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem", maxWidth: 500 }}>
      <Textarea size="sm" label="Small" placeholder="Quick note..." />
      <Textarea size="md" label="Medium" placeholder="Write something..." />
      <Textarea size="lg" label="Large" placeholder="Tell us everything..." />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Small, medium, and large textarea sizes with proportional ruling height." },
    },
  },
};

/* ── Disabled ───────────────────────────────── */

export const Disabled: Story = {
  args: {
    label: "Locked",
    defaultValue: "This content cannot be edited.",
    disabled: true,
  },
};

/* ── No Lines / No Margin ───────────────────── */

export const NoLinesNoMargin: Story = {
  args: {
    label: "Plain paper",
    showLines: false,
    showMargin: false,
    placeholder: "No ruling or margin...",
  },
  parameters: {
    docs: {
      description: { story: "Textarea without notebook lines or the red margin line." },
    },
  },
};

/* ── Custom Colours ─────────────────────────── */

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem", maxWidth: 500 }}>
      <Textarea
        label="Blue theme"
        placeholder="Write with blue ink..."
        colors={{
          stroke: "#3498db",
          text: "#2980b9",
          label: "#2980b9",
          lineColor: "#bcd4e6",
          marginColor: "#7ec8e3",
        }}
      />
      <Textarea
        label="Sepia theme"
        placeholder="Old journal style..."
        colors={{
          bg: "#f5e6c8",
          bgOverlay: "#ecd9b0",
          stroke: "#6b4226",
          text: "#5a3620",
          label: "#6b4226",
          lineColor: "#c4a57b",
          marginColor: "#b07456",
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Textareas with custom colour themes." },
    },
  },
};

/* ── With Pre-filled Content ────────────────── */

export const PreFilled: Story = {
  args: {
    label: "Journal Entry",
    defaultValue:
      "Today I learned about sketch-style UI components.\nThey look like hand-drawn notebook pages.\nPretty neat, right?",
  },
};
