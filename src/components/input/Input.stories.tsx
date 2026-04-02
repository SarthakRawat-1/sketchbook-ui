import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn text input component with authentic sketchy borders and smooth animations. Supports labels, various input types, and full customization.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Input } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  const [value, setValue] = React.useState('');
  
  return (
    <Input
      label="Your name"
      placeholder="Enter your name..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
\`\`\`

## Without Label

\`\`\`tsx
<Input placeholder="Search..." />
\`\`\`

## Different Input Types

\`\`\`tsx
<Input label="Email" type="email" placeholder="your@email.com" />
<Input label="Password" type="password" placeholder="••••••••" />
<Input label="Phone" type="tel" placeholder="+1 (555) 123-4567" />
<Input label="Number" type="number" placeholder="42" />
\`\`\`

## Sizes

\`\`\`tsx
<Input size="sm" label="Small" placeholder="Small input..." />
<Input size="md" label="Medium" placeholder="Medium input..." />
<Input size="lg" label="Large" placeholder="Large input..." />
\`\`\`

## Disabled State

\`\`\`tsx
<Input 
  label="Disabled field" 
  disabled 
  defaultValue="Cannot edit this"
/>
\`\`\`

## Custom Colors

\`\`\`tsx
<Input 
  label="Red Theme"
  placeholder="Custom colors..."
  colors={{ 
    bg: "#fee2e2", 
    bgOverlay: "#fecaca", 
    stroke: "#dc2626", 
    text: "#dc2626",
    label: "#dc2626"
  }}
/>
\`\`\`

## Custom Typography

\`\`\`tsx
<Input 
  label="Custom Font"
  placeholder="Different typography..."
  typography={{ 
    fontFamily: "serif", 
    fontSize: "1.1rem",
    fontWeight: "bold",
    labelSize: "1.3rem"
  }}
/>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Input size |
| \`label\` | \`string\` | - | Label text above input |
| \`placeholder\` | \`string\` | - | Placeholder text |
| \`type\` | \`string\` | \`"text"\` | HTML input type |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |
| \`showBorder\` | \`boolean\` | \`true\` | Show sketchy border |
| \`value\` | \`string\` | - | Controlled value |
| \`defaultValue\` | \`string\` | - | Uncontrolled default value |
| \`onChange\` | \`function\` | - | Change handler |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Text color |
| \`colors.label\` | \`string\` | - | Label text color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Input font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Font weight |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`typography.labelSize\` | \`string\` | - | Label font size |
| \`className\` | \`string\` | - | Additional CSS classes |

Plus all standard HTML input attributes (\`name\`, \`required\`, \`pattern\`, \`maxLength\`, etc.)
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
    placeholder: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Your name',
    placeholder: 'Enter your name...',
  },
};

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Search something...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    placeholder: 'Cannot type here',
    disabled: true,
    defaultValue: 'Read only content',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <Input {...args} size="sm" label="Small Input" placeholder="Small size..." />
      <Input {...args} size="md" label="Medium Input" placeholder="Medium size..." />
      <Input {...args} size="lg" label="Large Input" placeholder="Large size..." />
    </div>
  ),
};

export const Customization: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
        <Input {...args} label="Default" placeholder="Default styling..." />
        <Input 
          {...args} 
          label="Red Theme" 
          placeholder="Custom red theme..." 
          colors={{ 
            bg: "#fee2e2", 
            bgOverlay: "#fecaca", 
            stroke: "#dc2626", 
            text: "#dc2626",
            label: "#dc2626"
          }} 
        />
        <Input 
          {...args} 
          label="Blue Theme" 
          placeholder="Custom blue theme..." 
          colors={{ 
            bg: "#dbeafe", 
            bgOverlay: "#bfdbfe", 
            stroke: "#2563eb", 
            text: "#2563eb",
            label: "#2563eb"
          }} 
        />
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
        <Input 
          {...args} 
          label="Custom Typography" 
          placeholder="Different font..." 
          typography={{ 
            fontFamily: "serif", 
            fontSize: "1.1rem",
            fontWeight: "bold",
            labelSize: "1.3rem"
          }} 
        />
        <Input 
          {...args} 
          label="No Border" 
          placeholder="Clean look..." 
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


export const FormExample: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start', padding: '2rem', maxWidth: '400px' }}>
      <Input {...args} label="First Name" placeholder="Enter your first name..." />
      <Input {...args} label="Last Name" placeholder="Enter your last name..." />
      <Input {...args} label="Email" type="email" placeholder="your.email@example.com" />
      <Input {...args} label="Phone" type="tel" placeholder="+1 (555) 123-4567" />
      <Input {...args} label="Message" placeholder="Tell us about yourself..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple inputs in a form layout.',
      },
    },
  },
};