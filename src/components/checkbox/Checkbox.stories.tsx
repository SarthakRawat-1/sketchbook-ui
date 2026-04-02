import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn checkbox component with authentic sketchy borders and smooth check animations. Perfect for forms and settings.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Checkbox } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  const [agreed, setAgreed] = React.useState(false);
  
  return (
    <Checkbox
      label="I agree to the terms and conditions"
      checked={agreed}
      onChange={setAgreed}
    />
  );
}
\`\`\`

## Uncontrolled (with defaultChecked)

\`\`\`tsx
<Checkbox 
  label="Remember me" 
  defaultChecked={true}
  onChange={(checked) => console.log('Checked:', checked)}
/>
\`\`\`

## Without Label

\`\`\`tsx
<Checkbox onChange={(checked) => console.log(checked)} />
\`\`\`

## Sizes

\`\`\`tsx
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />
\`\`\`

## Disabled State

\`\`\`tsx
<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled defaultChecked />
\`\`\`

## Custom Colors

\`\`\`tsx
<Checkbox 
  label="Red Theme"
  colors={{ 
    bg: "#fee2e2", 
    bgOverlay: "#fecaca", 
    stroke: "#dc2626", 
    text: "#dc2626",
    check: "#dc2626"
  }}
/>
\`\`\`

## Custom Typography

\`\`\`tsx
<Checkbox 
  label="Custom Font"
  typography={{ 
    fontFamily: "serif", 
    fontSize: "1.2rem",
    fontWeight: "bold"
  }}
/>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Checkbox size |
| \`label\` | \`string\` | - | Label text next to checkbox |
| \`checked\` | \`boolean\` | - | Controlled checked state |
| \`defaultChecked\` | \`boolean\` | \`false\` | Uncontrolled default state |
| \`onChange\` | \`(checked: boolean) => void\` | - | Called when checked state changes |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |
| \`showBorder\` | \`boolean\` | \`true\` | Show sketchy border |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Label text color |
| \`colors.check\` | \`string\` | - | Checkmark color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Label font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Font weight |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`className\` | \`string\` | - | Additional CSS classes |

Plus all standard HTML input attributes (\`name\`, \`value\`, \`required\`, etc.)

## Important Note

The \`onChange\` prop receives a boolean value directly, not an event:
\`\`\`tsx
// ✅ Correct
<Checkbox onChange={(checked) => setAgreed(checked)} />

// ❌ Wrong (this is for native inputs)
<Checkbox onChange={(e) => setAgreed(e.target.checked)} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    showBorder: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    checked: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'I agree to the terms',
  },
};

export const Checked: Story = {
  args: {
    label: 'Already checked',
    defaultChecked: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', padding: '2rem' }}>
      <Checkbox {...args} label="Disabled unchecked" disabled />
      <Checkbox {...args} label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <Checkbox {...args} size="sm" label="Small checkbox" />
      <Checkbox {...args} size="md" label="Medium checkbox" />
      <Checkbox {...args} size="lg" label="Large checkbox" />
    </div>
  ),
};

export const Customization: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Checkbox {...args} label="Default" />
        <Checkbox 
          {...args} 
          label="Red Theme" 
          colors={{ 
            bg: "#fee2e2", 
            bgOverlay: "#fecaca", 
            stroke: "#dc2626", 
            text: "#dc2626",
            check: "#dc2626"
          }} 
        />
        <Checkbox 
          {...args} 
          label="Blue Theme" 
          colors={{ 
            bg: "#dbeafe", 
            bgOverlay: "#bfdbfe", 
            stroke: "#2563eb", 
            text: "#2563eb",
            check: "#2563eb"
          }} 
        />
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Checkbox 
          {...args} 
          label="Custom Typography" 
          typography={{ 
            fontFamily: "serif", 
            fontSize: "1.2rem",
            fontWeight: "bold"
          }} 
        />
        <Checkbox 
          {...args} 
          label="No Border" 
          showBorder={false} 
        />
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

