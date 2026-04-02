import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn sketch-style divider for separating content with artistic flair. Perfect for adding visual breaks in your layouts.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Divider } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  return (
    <div>
      <section>Content above</section>
      <Divider />
      <section>Content below</section>
    </div>
  );
}
\`\`\`

## Variants

\`\`\`tsx
<Divider variant="scribble" />
<Divider variant="dashed" />
<Divider variant="dots" />
<Divider variant="zigzag" />
\`\`\`

## Vertical Orientation

\`\`\`tsx
<div style={{ display: 'flex', height: '300px' }}>
  <section>Left content</section>
  <Divider orientation="vertical" variant="dashed" />
  <section>Right content</section>
</div>
\`\`\`

## Custom Colors

\`\`\`tsx
<Divider color="#e74c3c" variant="scribble" />
<Divider color="#3498db" variant="dashed" />
<Divider color="#2ecc71" variant="dots" />
\`\`\`

## Custom Stroke Width

\`\`\`tsx
<Divider strokeWidth={1} variant="scribble" />
<Divider strokeWidth={3} variant="scribble" />
<Divider strokeWidth={5} variant="scribble" />
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`orientation\` | \`"horizontal" \\| "vertical"\` | \`"horizontal"\` | Divider orientation |
| \`variant\` | \`"scribble" \\| "dashed" \\| "dots" \\| "zigzag"\` | \`"scribble"\` | Visual style variant |
| \`color\` | \`string\` | \`"#2d2d2d"\` | Stroke/fill color |
| \`strokeWidth\` | \`number\` | \`2\` | Width of the stroke in pixels |
| \`className\` | \`string\` | - | Additional CSS classes |

Plus all standard HTML div attributes.

## Variant Details

- **scribble**: Loopy spring-like scribble (default)
- **dashed**: Irregular dashed line
- **dots**: Hand-drawn dot pattern
- **zigzag**: Sharp, erratic zigzag

## Dimensions

- **Horizontal**: 100% width, 40px height
- **Vertical**: 40px width, 100% height
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['scribble', 'dashed', 'dots', 'zigzag'],
    },
    color: {
      control: { type: 'color' },
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 6, step: 0.5 },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Scribble: Story = {
  args: { variant: 'scribble' },
};

export const Dashed: Story = {
  args: { variant: 'dashed' },
};

export const Dots: Story = {
  args: { variant: 'dots' },
};

export const Zigzag: Story = {
  args: { variant: 'zigzag' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', width: '100%' }}>
      <div>
        <p style={{ fontFamily: "'Caveat', cursive", marginBottom: '0.5rem' }}>Scribble</p>
        <Divider variant="scribble" />
      </div>
      <div>
        <p style={{ fontFamily: "'Caveat', cursive", marginBottom: '0.5rem' }}>Dashed</p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p style={{ fontFamily: "'Caveat', cursive", marginBottom: '0.5rem' }}>Dots</p>
        <Divider variant="dots" />
      </div>
      <div>
        <p style={{ fontFamily: "'Caveat', cursive", marginBottom: '0.5rem' }}>Zigzag</p>
        <Divider variant="zigzag" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All four divider variants side by side.',
      },
    },
  },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', height: '300px' }}>
      <Divider orientation="vertical" variant="scribble" />
      <Divider orientation="vertical" variant="dashed" />
      <Divider orientation="vertical" variant="dots" />
      <Divider orientation="vertical" variant="zigzag" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical dividers — useful for separating side-by-side content.',
      },
    },
  },
};

export const Customization: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem', width: '100%' }}>
      <Divider color="#e74c3c" variant="scribble" />
      <Divider color="#3498db" variant="dashed" />
      <Divider color="#2ecc71" variant="dots" />
      <Divider color="#9b59b6" variant="zigzag" />
      <Divider strokeWidth={1} variant="scribble" />
      <Divider strokeWidth={4} variant="scribble" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dividers with custom colors and stroke widths.',
      },
    },
  },
};
