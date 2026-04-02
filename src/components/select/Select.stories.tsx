import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn dropdown select component with smooth animations, keyboard navigation, and virtualized rendering for large lists.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Select } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  const [value, setValue] = React.useState('');
  
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];
  
  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Choose a fruit..."
    />
  );
}
\`\`\`

## With Default Value

\`\`\`tsx
<Select
  options={options}
  defaultValue="banana"
  onChange={(value) => console.log('Selected:', value)}
/>
\`\`\`

## Sizes

\`\`\`tsx
<Select size="sm" options={options} placeholder="Small" />
<Select size="md" options={options} placeholder="Medium" />
<Select size="lg" options={options} placeholder="Large" />
\`\`\`

## Disabled State

\`\`\`tsx
<Select options={options} disabled placeholder="Disabled..." />
\`\`\`

## Custom Colors

\`\`\`tsx
<Select
  options={options}
  colors={{ 
    bg: "#fee2e2", 
    bgOverlay: "#fecaca", 
    stroke: "#dc2626", 
    text: "#dc2626",
    hoverBg: "#fef2f2"
  }}
/>
\`\`\`

## Custom Typography

\`\`\`tsx
<Select
  options={options}
  typography={{ 
    fontSize: "1.1rem", 
    fontWeight: "bold" 
  }}
/>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`options\` | \`SelectOption[]\` | - | Array of options (required) |
| \`defaultValue\` | \`string\` | - | Initial selected value |
| \`value\` | \`string\` | - | Controlled selected value |
| \`onChange\` | \`(value: string) => void\` | - | Called when selection changes |
| \`placeholder\` | \`string\` | \`"Choose an option..."\` | Placeholder text |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Select size |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |
| \`showBorder\` | \`boolean\` | \`true\` | Show sketchy border |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Text color |
| \`colors.hoverBg\` | \`string\` | - | Option hover background |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Font weight |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`className\` | \`string\` | - | Additional CSS classes |

## SelectOption Type

\`\`\`tsx
interface SelectOption {
  value: string;
  label: string;
}
\`\`\`

## Features

- ✨ Keyboard navigation (Arrow keys, Enter, Escape)
- 🚀 Virtualized rendering for large lists
- 🎯 Click outside to close
- ♿ Accessible with ARIA attributes
- 🎨 Fully customizable colors and typography

## Important Note

The \`onChange\` prop receives the selected value directly (not an event):
\`\`\`tsx
// ✅ Correct
<Select onChange={(value) => setSelected(value)} />

// ❌ Wrong
<Select onChange={(e) => setSelected(e.target.value)} />
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
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Choose a fruit...',
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: sampleOptions,
    defaultValue: 'banana',
    placeholder: 'Choose a fruit...',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <Select {...args} size="sm" placeholder="Small Select" />
      <Select {...args} size="md" placeholder="Medium Select" />
      <Select {...args} size="lg" placeholder="Large Select" />
    </div>
  ),
  args: {
    options: sampleOptions,
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    disabled: true,
    placeholder: 'Disabled select...',
  },
};

export const Customization: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <Select {...args} placeholder="Default" />
        <Select 
          {...args} 
          colors={{ bg: "#fee2e2", bgOverlay: "#fecaca", stroke: "#dc2626", text: "#dc2626", hoverBg: "#fef2f2" }}
          placeholder="Red Theme"
        />
        <Select 
          {...args} 
          colors={{ bg: "#dbeafe", bgOverlay: "#bfdbfe", stroke: "#2563eb", text: "#2563eb", hoverBg: "#eff6ff" }}
          placeholder="Blue Theme"
        />
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <Select 
          {...args} 
          typography={{ fontSize: "1.1rem", fontWeight: "bold" }}
          placeholder="Bold Text"
        />
        <Select 
          {...args} 
          typography={{ fontFamily: "serif", fontSize: "1.2rem" }}
          placeholder="Serif Font"
        />
        <Select 
          {...args} 
          showBorder={false}
          placeholder="No Border"
        />
      </div>
    </div>
  ),
  args: {
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story: 'Customize colors, typography, and border visibility to match your design needs.',
      },
    },
  },
};