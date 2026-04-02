import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn radio button group component with authentic sketchy design. Perfect for single-choice selections.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { RadioGroup } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  const [selected, setSelected] = React.useState('');
  
  const options = [
    { value: 'option1', label: 'First option' },
    { value: 'option2', label: 'Second option' },
    { value: 'option3', label: 'Third option' },
  ];
  
  return (
    <RadioGroup
      name="my-radio"
      options={options}
      value={selected}
      onChange={setSelected}
    />
  );
}
\`\`\`

## Uncontrolled (with defaultValue)

\`\`\`tsx
<RadioGroup
  name="my-radio"
  options={options}
  defaultValue="option1"
  onChange={(value) => console.log('Selected:', value)}
/>
\`\`\`

## Sizes

\`\`\`tsx
<RadioGroup name="small" size="sm" options={options} />
<RadioGroup name="medium" size="md" options={options} />
<RadioGroup name="large" size="lg" options={options} />
\`\`\`

## Disabled State

\`\`\`tsx
<RadioGroup
  name="disabled"
  options={options}
  defaultValue="option2"
  disabled
/>
\`\`\`

## Custom Colors

\`\`\`tsx
<RadioGroup
  name="custom"
  options={options}
  colors={{ 
    bg: "#fee2e2", 
    bgOverlay: "#fecaca", 
    stroke: "#dc2626", 
    text: "#dc2626",
    fill: "#dc2626"
  }}
/>
\`\`\`

## Custom Typography

\`\`\`tsx
<RadioGroup
  name="custom-font"
  options={options}
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
| \`name\` | \`string\` | - | Radio group name (required) |
| \`options\` | \`RadioOption[]\` | - | Array of options (required) |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Radio button size |
| \`value\` | \`string\` | - | Controlled selected value |
| \`defaultValue\` | \`string\` | - | Uncontrolled default value |
| \`onChange\` | \`(value: string) => void\` | - | Called when selection changes |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |
| \`showBorder\` | \`boolean\` | \`true\` | Show sketchy border |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Label text color |
| \`colors.fill\` | \`string\` | - | Selected dot fill color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Label font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Font weight |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`className\` | \`string\` | - | Additional CSS classes |

## RadioOption Type

\`\`\`tsx
interface RadioOption {
  value: string;
  label: string;
}
\`\`\`

## Important Notes

1. The \`name\` prop is required and must be unique for each radio group
2. The \`onChange\` prop receives the selected value directly (not an event):

\`\`\`tsx
// ✅ Correct
<RadioGroup onChange={(value) => setSelected(value)} />

// ❌ Wrong
<RadioGroup onChange={(e) => setSelected(e.target.value)} />
\`\`\`

3. Options are displayed vertically by default with proper spacing
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
    name: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: 'option1', label: 'First option' },
  { value: 'option2', label: 'Second option' },
  { value: 'option3', label: 'Third option' },
];

export const Default: Story = {
  args: {
    name: 'default-radio',
    options: defaultOptions,
    defaultValue: 'option1',
  },
};

export const Unselected: Story = {
  args: {
    name: 'unselected-radio',
    options: defaultOptions,
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled-radio',
    options: defaultOptions,
    defaultValue: 'option2',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'flex-start', padding: '2rem' }}>
      <div>
        <h4 style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#2a2a2a', margin: '0 0 1rem 0' }}>
          Small
        </h4>
        <RadioGroup 
          {...args} 
          name="small-radio"
          size="sm" 
          options={[
            { value: 'sm1', label: 'Small option 1' },
            { value: 'sm2', label: 'Small option 2' },
          ]}
          defaultValue="sm1"
        />
      </div>
      <div>
        <h4 style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#2a2a2a', margin: '0 0 1rem 0' }}>
          Medium
        </h4>
        <RadioGroup 
          {...args} 
          name="medium-radio"
          size="md" 
          options={[
            { value: 'md1', label: 'Medium option 1' },
            { value: 'md2', label: 'Medium option 2' },
          ]}
          defaultValue="md1"
        />
      </div>
      <div>
        <h4 style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#2a2a2a', margin: '0 0 1rem 0' }}>
          Large
        </h4>
        <RadioGroup 
          {...args} 
          name="large-radio"
          size="lg" 
          options={[
            { value: 'lg1', label: 'Large option 1' },
            { value: 'lg2', label: 'Large option 2' },
          ]}
          defaultValue="lg1"
        />
      </div>
    </div>
  ),
};

export const Customization: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'flex-start', padding: '2rem' }}>
      <div>
        <h4 style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#2a2a2a', margin: '0 0 1rem 0' }}>
          Default Theme
        </h4>
        <RadioGroup 
          {...args} 
          name="default-theme"
          options={[
            { value: 'def1', label: 'Default option 1' },
            { value: 'def2', label: 'Default option 2' },
          ]}
          defaultValue="def1"
        />
      </div>
      <div>
        <h4 style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#dc2626', margin: '0 0 1rem 0' }}>
          Red Theme
        </h4>
        <RadioGroup 
          {...args} 
          name="red-theme"
          options={[
            { value: 'red1', label: 'Red option 1' },
            { value: 'red2', label: 'Red option 2' },
          ]}
          defaultValue="red1"
          colors={{ 
            bg: "#fee2e2", 
            bgOverlay: "#fecaca", 
            stroke: "#dc2626", 
            text: "#dc2626",
            fill: "#dc2626"
          }}
        />
      </div>
      <div>
        <h4 style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#2563eb', margin: '0 0 1rem 0' }}>
          Blue Theme
        </h4>
        <RadioGroup 
          {...args} 
          name="blue-theme"
          options={[
            { value: 'blue1', label: 'Blue option 1' },
            { value: 'blue2', label: 'Blue option 2' },
          ]}
          defaultValue="blue1"
          colors={{ 
            bg: "#dbeafe", 
            bgOverlay: "#bfdbfe", 
            stroke: "#2563eb", 
            text: "#2563eb",
            fill: "#2563eb"
          }}
        />
      </div>
      <div>
        <h4 style={{ fontFamily: "serif", fontSize: '1.2rem', color: '#2a2a2a', margin: '0 0 1rem 0' }}>
          Custom Typography
        </h4>
        <RadioGroup 
          {...args} 
          name="custom-typo"
          options={[
            { value: 'typo1', label: 'Custom font option 1' },
            { value: 'typo2', label: 'Custom font option 2' },
          ]}
          defaultValue="typo1"
          typography={{ 
            fontFamily: "serif", 
            fontSize: "1.2rem",
            fontWeight: "bold"
          }}
        />
      </div>
      <div>
        <h4 style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#2a2a2a', margin: '0 0 1rem 0' }}>
          No Border
        </h4>
        <RadioGroup 
          {...args} 
          name="no-border"
          options={[
            { value: 'nb1', label: 'No border option 1' },
            { value: 'nb2', label: 'No border option 2' },
          ]}
          defaultValue="nb1"
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

