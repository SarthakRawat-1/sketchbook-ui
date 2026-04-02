import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn avatar component with support for images, initials, and fallback doodle faces. Features authentic sketchy borders and hover animations.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Avatar } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

// With initials
function App() {
  return <Avatar initials="JD" />;
}

// With image
function App() {
  return (
    <Avatar 
      src="https://example.com/avatar.jpg"
      alt="John Doe"
      initials="JD"
    />
  );
}

// Fallback doodle (no src, no initials)
function App() {
  return <Avatar alt="User" />;
}
\`\`\`

## Sizes

\`\`\`tsx
<Avatar size="sm" initials="SM" />
<Avatar size="md" initials="MD" />
<Avatar size="lg" initials="LG" />
\`\`\`

## Custom Width

\`\`\`tsx
<Avatar width={100} initials="CW" />
<Avatar width={150} initials="XL" />
\`\`\`

## Shapes

\`\`\`tsx
<Avatar shape="circle" initials="○" />
<Avatar shape="square" initials="□" />
\`\`\`

## Interactive

\`\`\`tsx
<Avatar 
  initials="CL"
  onClick={() => alert('Avatar clicked!')}
/>
\`\`\`

## Custom Colors

\`\`\`tsx
<Avatar 
  initials="AB"
  colors={{ 
    bg: "#fee2e2", 
    fallbackBg: "#fecaca", 
    stroke: "#dc2626", 
    text: "#dc2626" 
  }}
/>
\`\`\`

## Custom Typography

\`\`\`tsx
<Avatar 
  initials="EF"
  typography={{ 
    fontSize: "1.8rem", 
    fontWeight: "bold" 
  }}
/>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`src\` | \`string\` | - | Image URL |
| \`alt\` | \`string\` | \`"Avatar"\` | Alt text for accessibility |
| \`initials\` | \`string\` | - | Text to display (shows first character) |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Predefined size |
| \`width\` | \`number\` | - | Custom width in pixels (overrides size) |
| \`shape\` | \`"circle" \\| "square"\` | \`"circle"\` | Avatar shape |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.fallbackBg\` | \`string\` | - | Fallback background color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Text color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Font weight |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`showBorder\` | \`boolean\` | \`true\` | Show hand-drawn border |
| \`showShadow\` | \`boolean\` | \`true\` | Show shadow beneath avatar |
| \`onClick\` | \`() => void\` | - | Click handler (makes avatar interactive) |
| \`className\` | \`string\` | - | Additional CSS classes |

## Important Notes

- When \`width\` is provided, it overrides the \`size\` prop
- Font size and stroke width scale automatically with custom width
- Image fallback: If image fails to load, shows initials or doodle
- First character only: \`initials="JD"\` displays "J"
- Interactive avatars are keyboard accessible with Enter/Space keys
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: { type: 'radio' },
      options: ['circle', 'square'],
    },
    width: {
      control: { type: 'number', min: 20, max: 200, step: 5 },
    },
    showBorder: {
      control: { type: 'boolean' },
    },
    showShadow: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initials: 'JD',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    initials: 'JD',
  },
};

export const Fallback: Story = {
  args: {
    // No src, no initials - shows doodle face
    alt: 'Fallback Avatar',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <Avatar {...args} size="sm" initials="SM" />
      <Avatar {...args} size="md" initials="MD" />
      <Avatar {...args} size="lg" initials="LG" />
    </div>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <Avatar {...args} shape="circle" initials="○" />
      <Avatar {...args} shape="square" initials="□" />
    </div>
  ),
};

export const WithImages: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <Avatar 
        {...args} 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Person 1"
        initials="P1"
      />
      <Avatar 
        {...args} 
        src="https://images.unsplash.com/photo-1494790108755-2616b612e643?w=150&h=150&fit=crop&crop=face"
        alt="Person 2"
        initials="P2"
      />
      <Avatar 
        {...args} 
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="Person 3"
        initials="P3"
      />
    </div>
  ),
};

export const Customization: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Avatar {...args} initials="JD" />
        <Avatar 
          {...args} 
          initials="AB"
          colors={{ 
            bg: "#fee2e2", 
            fallbackBg: "#fecaca", 
            stroke: "#dc2626", 
            text: "#dc2626" 
          }}
        />
        <Avatar 
          {...args} 
          initials="CD"
          colors={{ 
            bg: "#dbeafe", 
            fallbackBg: "#bfdbfe", 
            stroke: "#2563eb", 
            text: "#2563eb" 
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Avatar 
          {...args} 
          initials="EF"
          typography={{ fontSize: "1.8rem", fontWeight: "bold" }}
        />
        <Avatar 
          {...args} 
          initials="GH"
          typography={{ fontFamily: "serif", fontSize: "2.2rem" }}
        />
        <Avatar 
          {...args} 
          initials="IJ"
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

export const Interactive: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <Avatar 
        {...args} 
        initials="CL"
        onClick={() => alert('Avatar clicked!')}
      />
      <Avatar 
        {...args} 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Clickable Avatar"
        initials="CA"
        onClick={() => alert('Image avatar clicked!')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars can be made interactive with onClick handlers. Hover to see the sketchy animation effect.',
      },
    },
  },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Avatar {...args} initials="AB" />
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>With Initials</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Avatar 
            {...args} 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="With Image"
            initials="WI"
          />
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>With Image</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Avatar {...args} />
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Fallback Doodle</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Avatar {...args} initials="NS" showShadow={false} />
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>No Shadow</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Avatar {...args} initials="NB" showBorder={false} />
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>No Border</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Avatar {...args} initials="SQ" shape="square" />
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Square Shape</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different avatar states and configurations showcasing the component flexibility.',
      },
    },
  },
};

export const CustomWidth: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar {...args} initials="CW" width={40} />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Custom Width: 40px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar {...args} initials="CW" width={75} />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Custom Width: 75px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar {...args} initials="CW" width={100} />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Custom Width: 100px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar {...args} initials="CW" width={150} />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Custom Width: 150px</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars with custom width instead of predefined sizes. Width property takes precedence over size prop when specified.',
      },
    },
  },
};