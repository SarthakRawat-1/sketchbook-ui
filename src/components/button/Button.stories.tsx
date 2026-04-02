import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn button component with a unique sketchy, notebook aesthetic. Features authentic hand-drawn borders, subtle animations, and customizable colors and typography.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Button } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  return (
    <Button onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}
\`\`\`

## Sizes

\`\`\`tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
\`\`\`

## Icon-Only Buttons

\`\`\`tsx
<Button iconOnly size="sm">+</Button>
<Button iconOnly size="md">→</Button>
<Button iconOnly size="lg">×</Button>
\`\`\`

## Disabled State

\`\`\`tsx
<Button disabled>Disabled Button</Button>
\`\`\`

## Custom Colors

\`\`\`tsx
<Button 
  colors={{ 
    bg: "#fee2e2", 
    bgOverlay: "#fecaca", 
    stroke: "#dc2626", 
    text: "#dc2626" 
  }}
>
  Red Theme
</Button>
\`\`\`

## Custom Typography

\`\`\`tsx
<Button 
  typography={{ 
    textTransform: "uppercase", 
    fontWeight: "bold" 
  }}
>
  BOLD CAPS
</Button>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Button size |
| \`iconOnly\` | \`boolean\` | \`false\` | Square button for icons |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |
| \`showBorder\` | \`boolean\` | \`true\` | Show sketchy border |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Text color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Font weight |
| \`typography.textTransform\` | \`string\` | - | Text transform |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`children\` | \`ReactNode\` | - | Button content |
| \`onClick\` | \`function\` | - | Click handler |
| \`className\` | \`string\` | - | Additional CSS classes |

Plus all standard HTML button attributes (\`type\`, \`form\`, \`name\`, etc.)
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    iconOnly: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <Button {...args} size="sm">Small Sketch</Button>
      <Button {...args} size="md">Medium Sketch</Button>
      <Button {...args} size="lg">Large Sketch</Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '2rem' }}>
      <Button {...args} iconOnly size="sm">^</Button>
      <Button {...args} iconOnly size="md">{">"}</Button>
      <Button {...args} iconOnly size="lg">+</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact square buttons perfect for icons, arrows, or single characters.',
      },
    },
  },
};

export const DisabledStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Button {...args}>Normal Button</Button>
        <Button {...args} disabled>Disabled Button</Button>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Button {...args} iconOnly>{">"}</Button>
        <Button {...args} iconOnly disabled>{">"}</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons have faded colors, reduced opacity, and no hover effects.',
      },
    },
  },
};

export const Customization: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Button {...args}>Default</Button>
        <Button {...args} colors={{ bg: "#fee2e2", bgOverlay: "#fecaca", stroke: "#dc2626", text: "#dc2626" }}>Red Theme</Button>
        <Button {...args} colors={{ bg: "#dbeafe", bgOverlay: "#bfdbfe", stroke: "#2563eb", text: "#2563eb" }}>Blue Theme</Button>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Button {...args} typography={{ textTransform: "uppercase", fontWeight: "bold" }}>BOLD CAPS</Button>
        <Button {...args} typography={{ fontSize: "1.2rem", fontFamily: "serif" }}>Custom Font</Button>
        <Button {...args} showBorder={false}>No Border</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customize colors, typography, and border visibility to match your design needs.',
      },
    },
  },
};

