import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn range slider with draggable wobbly thumb and smooth animations. Features keyboard navigation and full customization.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Slider } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  return <Slider label="Volume" defaultValue={40} />;
}
\`\`\`

## Controlled

\`\`\`tsx
const [volume, setVolume] = useState(50);

<Slider 
  label="Volume" 
  value={volume} 
  onChange={setVolume} 
/>
\`\`\`

## Sizes

\`\`\`tsx
<Slider size="sm" label="Small" defaultValue={25} />
<Slider size="md" label="Medium" defaultValue={50} />
<Slider size="lg" label="Large" defaultValue={75} />
\`\`\`

## Custom Range and Step

\`\`\`tsx
<Slider 
  label="Rating" 
  min={0} 
  max={10} 
  step={1} 
  defaultValue={5} 
/>

<Slider 
  label="Price" 
  min={0} 
  max={1000} 
  step={50} 
  defaultValue={250} 
/>
\`\`\`

## Disabled State

\`\`\`tsx
<Slider label="Locked" defaultValue={60} disabled />
\`\`\`

## Custom Colors

\`\`\`tsx
<Slider 
  label="Red theme"
  defaultValue={30}
  colors={{ 
    track: "#e74c3c", 
    trackFill: "#e74c3c", 
    thumb: "#e74c3c", 
    text: "#c0392b" 
  }}
/>
\`\`\`

## Without Label

\`\`\`tsx
<Slider defaultValue={50} />
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`min\` | \`number\` | \`0\` | Minimum value |
| \`max\` | \`number\` | \`100\` | Maximum value |
| \`step\` | \`number\` | \`1\` | Step increment |
| \`defaultValue\` | \`number\` | \`50\` | Initial value (uncontrolled) |
| \`value\` | \`number\` | - | Current value (controlled) |
| \`onChange\` | \`(value: number) => void\` | - | Value change handler |
| \`label\` | \`string\` | - | Label text above slider |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Slider size |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.track\` | \`string\` | - | Track line color |
| \`colors.trackFill\` | \`string\` | - | Filled track color |
| \`colors.thumb\` | \`string\` | - | Thumb outline color |
| \`colors.thumbBg\` | \`string\` | - | Thumb background color |
| \`colors.stroke\` | \`string\` | - | General stroke color |
| \`colors.text\` | \`string\` | - | Label text color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Font weight |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`className\` | \`string\` | - | Additional CSS classes |

Plus all standard HTML div attributes.

## Important Notes

- Supports both controlled and uncontrolled modes
- Keyboard accessible: Arrow keys to adjust value, Home/End for min/max
- Mouse drag and touch support for thumb interaction
- Hidden native range input for accessibility
- Thumb scales on hover and drag for visual feedback
- Value snaps to nearest step increment
- Disabled state prevents all interactions
        `,
      },
    },
  },
  argTypes: {
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    defaultValue: { control: { type: "number" } },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    disabled: { control: { type: "boolean" } },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Basic ──────────────────────────────────── */

export const Default: Story = {
  args: {
    label: "Volume",
    defaultValue: 40,
  },
};

/* ── Sizes ──────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", padding: "2rem", maxWidth: 420 }}>
      <Slider size="sm" label="Small" defaultValue={25} />
      <Slider size="md" label="Medium" defaultValue={50} />
      <Slider size="lg" label="Large" defaultValue={75} />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Small, medium, and large slider sizes." },
    },
  },
};

/* ── Disabled ───────────────────────────────── */

export const Disabled: Story = {
  args: {
    label: "Locked",
    defaultValue: 60,
    disabled: true,
  },
  parameters: {
    docs: {
      description: { story: "Disabled state with muted colours and `not-allowed` cursor." },
    },
  },
};

/* ── Custom Step ────────────────────────────── */

export const CustomStep: Story = {
  args: {
    label: "Rating",
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 5,
  },
  parameters: {
    docs: {
      description: { story: "Integer-only slider (step = 1, 0–10)." },
    },
  },
};

/* ── Custom Colours ─────────────────────────── */

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem", maxWidth: 420 }}>
      <Slider
        label="Red theme"
        defaultValue={30}
        colors={{ track: "#e74c3c", trackFill: "#e74c3c", thumb: "#e74c3c", text: "#c0392b" }}
      />
      <Slider
        label="Blue theme"
        defaultValue={65}
        colors={{ track: "#3498db", trackFill: "#3498db", thumb: "#3498db", text: "#2980b9" }}
      />
      <Slider
        label="Green theme"
        defaultValue={80}
        colors={{ track: "#2ecc71", trackFill: "#2ecc71", thumb: "#2ecc71", text: "#27ae60" }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Sliders with custom colour themes." },
    },
  },
};

/* ── No Label ───────────────────────────────── */

export const NoLabel: Story = {
  args: {
    defaultValue: 50,
  },
  parameters: {
    docs: {
      description: { story: "Slider without a visible label (still has an aria-label)." },
    },
  },
};
