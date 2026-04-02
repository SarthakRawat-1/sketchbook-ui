import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn hexagonal badge component with semantic color variants and dynamic sizing. Features authentic sketchy borders and hover animations.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Badge } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  return <Badge>Default Badge</Badge>;
}
\`\`\`

## Variants

\`\`\`tsx
<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
\`\`\`

## Sizes

\`\`\`tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
\`\`\`

## Custom Dimensions

\`\`\`tsx
<Badge width={120} height={100}>Custom Size</Badge>
<Badge width={200} height={80}>Wide Badge</Badge>
\`\`\`

## Disabled State

\`\`\`tsx
<Badge disabled>Disabled Badge</Badge>
<Badge disabled variant="success">Disabled Success</Badge>
\`\`\`

## Custom Colors

\`\`\`tsx
<Badge 
  colors={{ 
    bg: "#fce7f3", 
    text: "#be185d", 
    stroke: "#be185d" 
  }}
>
  Custom Pink
</Badge>
\`\`\`

## Custom Typography

\`\`\`tsx
<Badge 
  typography={{ 
    fontSize: "1rem", 
    fontWeight: "bold" 
  }}
>
  Bold Text
</Badge>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`children\` | \`ReactNode\` | required | Badge content |
| \`variant\` | \`"default" \\| "success" \\| "warning" \\| "error" \\| "info"\` | \`"default"\` | Semantic color variant |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Predefined size |
| \`width\` | \`number\` | - | Custom width in pixels (overrides size) |
| \`height\` | \`number\` | - | Custom height in pixels (overrides size) |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.text\` | \`string\` | - | Text color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Font weight |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`showShadow\` | \`boolean\` | \`true\` | Show shadow beneath badge |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |
| \`className\` | \`string\` | - | Additional CSS classes |

## Important Notes

- Badge automatically adjusts width to fit content (minimum width based on size)
- Hexagonal shape scales proportionally with custom dimensions
- Stroke width scales automatically based on badge size
- Disabled state applies grayscale effect and reduces opacity
- Hover effect adds rotation and scale animation
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    showShadow: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '2rem', flexWrap: 'wrap' }}>
      <Badge {...args} variant="default">Default</Badge>
      <Badge {...args} variant="success">Success</Badge>
      <Badge {...args} variant="warning">Warning</Badge>
      <Badge {...args} variant="error">Error</Badge>
      <Badge {...args} variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different badge variants with semantic colors and meanings.',
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '2rem' }}>
      <Badge {...args} size="sm">Small</Badge>
      <Badge {...args} size="md">Medium</Badge>
      <Badge {...args} size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge sizes from small to large with responsive hexagonal shapes.',
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '2rem', flexWrap: 'wrap' }}>
      <Badge {...args} disabled>Disabled</Badge>
      <Badge {...args} disabled variant="success">Success</Badge>
      <Badge {...args} disabled variant="warning">Warning</Badge>
      <Badge {...args} disabled variant="error" size="lg">Error</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled badges with reduced opacity and grayscale effect.',
      },
    },
  },
};

export const CustomSizing: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Badge {...args} size="sm">Small (70x60)</Badge>
        <Badge {...args} size="md">Medium (90x78)</Badge>
        <Badge {...args} size="lg">Large (110x96)</Badge>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Badge {...args} width={60} height={50}>Tiny Custom</Badge>
        <Badge {...args} width={120} height={100}>Wide Custom</Badge>
        <Badge {...args} width={150} height={120} variant="success">Extra Large</Badge>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Badge {...args} width={200} height={80} variant="warning">Super Wide</Badge>
        <Badge {...args} width={80} height={140} variant="info">Super Tall</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom width and height dimensions with dynamic hexagon shapes that scale proportionally.',
      },
    },
  },
};

export const Customization: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Badge {...args}>Default</Badge>
        <Badge
          {...args}
          colors={{ bg: "#fce7f3", text: "#be185d", border: "#be185d" }}
        >
          Custom Pink
        </Badge>
        <Badge
          {...args}
          colors={{ bg: "#f0fdf4", text: "#166534", border: "#166534" }}
        >
          Custom Green
        </Badge>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Badge
          {...args}
          typography={{ fontSize: "1rem", fontWeight: "bold" }}
        >
          Bold Text
        </Badge>
        <Badge
          {...args}
          typography={{ fontFamily: "serif", fontSize: "1.1rem" }}
        >
          Serif Font
        </Badge>
        <Badge
          {...args}
          showShadow={false}
        >
          No Shadow
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customize colors, typography, and shadow to match your design needs.',
      },
    },
  },
};

export const UseCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'Caveat', fontSize: '1.2rem', marginRight: '0.5rem' }}>Status:</span>
        <Badge variant="success" size="sm">Online</Badge>
        <Badge variant="warning" size="sm">Pending</Badge>
        <Badge variant="error" size="sm">Offline</Badge>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'Caveat', fontSize: '1.2rem', marginRight: '0.5rem' }}>Categories:</span>
        <Badge variant="info">Design</Badge>
        <Badge variant="default">Development</Badge>
        <Badge variant="success">Marketing</Badge>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'Caveat', fontSize: '1.2rem', marginRight: '0.5rem' }}>Notifications:</span>
        <Badge variant="error" size="lg">5 New</Badge>
        <Badge variant="info">3 Messages</Badge>
        <Badge variant="warning">2 Reviews</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use cases for badges including status indicators, categories, and notifications.',
      },
    },
  },
};