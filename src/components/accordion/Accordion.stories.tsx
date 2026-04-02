import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn accordion component that mimics notebook paper with expandable sections. Features smooth animations, numbered items, and lined paper effects.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Accordion, AccordionItem } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  return (
    <Accordion>
      <AccordionItem title="Section 1" number={1}>
        Content for section 1
      </AccordionItem>
      <AccordionItem title="Section 2" number={2} defaultOpen>
        Content for section 2 (starts open)
      </AccordionItem>
      <AccordionItem title="Section 3" number={3}>
        Content for section 3
      </AccordionItem>
    </Accordion>
  );
}
\`\`\`

## Without Numbers

\`\`\`tsx
<Accordion>
  <AccordionItem title="Design" showNumber={false}>
    Content without section number
  </AccordionItem>
  <AccordionItem title="Development" showNumber={false}>
    Another section without number
  </AccordionItem>
</Accordion>
\`\`\`

## Custom Colors

\`\`\`tsx
<AccordionItem 
  title="Custom Theme" 
  number={1}
  colors={{
    bg: "#fee2e2",
    bgOverlay: "#fecaca", 
    stroke: "#dc2626",
    text: "#dc2626",
    numberColor: "#991b1b",
    lineColor: "#f87171"
  }}
>
  Content with custom red theme
</AccordionItem>
\`\`\`

## Custom Typography

\`\`\`tsx
<AccordionItem 
  title="Large Title" 
  typography={{
    titleSize: "1.8rem",
    titleWeight: "bold",
    contentSize: "1.1rem"
  }}
>
  Content with custom typography
</AccordionItem>
\`\`\`

## Without Lines or Border

\`\`\`tsx
<AccordionItem 
  title="Clean Look" 
  showBorder={false}
  showLines={false}
>
  Content without notebook lines or border
</AccordionItem>
\`\`\`

## Props

### Accordion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`children\` | \`ReactNode\` | required | AccordionItem components |
| \`maxWidth\` | \`string\` | \`"700px"\` | Maximum width of accordion |
| \`className\` | \`string\` | - | Additional CSS classes |

### AccordionItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`title\` | \`string\` | required | Item header text |
| \`children\` | \`ReactNode\` | required | Item content |
| \`number\` | \`number\` | - | Section number to display |
| \`defaultOpen\` | \`boolean\` | \`false\` | Start in open state |
| \`showNumber\` | \`boolean\` | \`true\` | Show section number |
| \`showBorder\` | \`boolean\` | \`true\` | Show hand-drawn border |
| \`showLines\` | \`boolean\` | \`true\` | Show notebook ruling lines |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Text color |
| \`colors.numberColor\` | \`string\` | - | Section number color |
| \`colors.lineColor\` | \`string\` | - | Ruling lines color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.titleSize\` | \`string\` | - | Title font size |
| \`typography.titleWeight\` | \`string \\| number\` | - | Title font weight |
| \`typography.contentSize\` | \`string\` | - | Content font size |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`className\` | \`string\` | - | Additional CSS classes |

## Important Notes

- Each AccordionItem manages its own open/close state independently
- Smooth grid-based animation for expand/collapse
- Header and content dimensions adapt dynamically to content
- Notebook variant adds left padding automatically for margin line
- Focus state adds thicker border for accessibility
- Arrow icon rotates 90° when item is open
        `,
      },
    },
  },
  argTypes: {
    maxWidth: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Getting Started" number={1}>
        Welcome to our sketchy component library! This accordion component mimics the feel of a hand-drawn notebook with wobbly lines and paper textures.
      </AccordionItem>
      <AccordionItem title="Installation Guide" number={2}>
        To install this component library, simply run npm install and import the components you need. Each component is designed with customization in mind.
      </AccordionItem>
      <AccordionItem title="Advanced Features" number={3} defaultOpen>
        You can customize colors, typography, borders, and even toggle the lined paper effect. The accordion supports smooth animations and maintains the sketchy aesthetic throughout.
      </AccordionItem>
    </Accordion>
  ),
};

export const WithoutNumbers: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Design Philosophy" showNumber={false}>
        Our design philosophy focuses on bringing the warmth and authenticity of hand-drawn sketches to digital interfaces.
      </AccordionItem>
      <AccordionItem title="User Experience" showNumber={false}>
        Every interaction feels natural and organic, with subtle animations that mimic real-world paper behavior.
      </AccordionItem>
      <AccordionItem title="Technical Details" showNumber={false} defaultOpen>
        Built with React, TypeScript, and SVG for crisp rendering at any scale while maintaining the sketchy aesthetic.
      </AccordionItem>
    </Accordion>
  ),
};

export const CustomStyling: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem 
        title="Custom Colors" 
        number={1}
        colors={{
          bg: "#fee2e2",
          bgOverlay: "#fecaca", 
          stroke: "#dc2626",
          text: "#dc2626",
          numberColor: "#991b1b",
          lineColor: "#f87171"
        }}
      >
        This accordion item uses a red color theme with custom background and text colors.
      </AccordionItem>
      <AccordionItem 
        title="Custom Typography" 
        number={2}
        typography={{
          titleSize: "1.8rem",
          titleWeight: "bold",
          contentSize: "1.1rem"
        }}
      >
        This item demonstrates custom typography with larger title and smaller content text.
      </AccordionItem>
      <AccordionItem 
        title="No Lines or Border" 
        number={3}
        showBorder={false}
        showLines={false}
        colors={{
          bg: "#faf7f0",
          bgOverlay: "#f5f1e8",
          stroke: "#2a2a2a",
          text: "#2a2a2a"
        }}
      >
        This item has no border or lined paper effect, showing a cleaner look while maintaining the sketchy shape and notebook colors.
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customize colors, typography, borders, and paper effects to match your design needs.',
      },
    },
  },
};

export const SingleItem: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem 
        title="Standalone Accordion Item" 
        defaultOpen
        showNumber={false}
        typography={{
          titleSize: "1.6rem",
          contentSize: "1.3rem"
        }}
      >
        This is a single accordion item that starts open. Perfect for FAQ sections or detailed explanations that need to be prominently displayed.
        
        You can include multiple paragraphs, lists, or any other content within the accordion body.
      </AccordionItem>
    </Accordion>
  ),
};

export const LongContent: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Short Content" number={1}>
        Brief explanation here.
      </AccordionItem>
      <AccordionItem title="Medium Content" number={2}>
        This accordion item contains a moderate amount of content to demonstrate how the component handles different content lengths. The paper texture and lined background adapt automatically.
      </AccordionItem>
      <AccordionItem title="Long Content" number={3} defaultOpen>
        This accordion item contains extensive content to show how the component handles longer text. 
        
        The beauty of this design is that it maintains the notebook aesthetic regardless of content length. The wobbly lines, paper texture, and hand-drawn borders all scale appropriately.
        
        Notice how the lined paper effect creates the feeling of writing in a real notebook, with the left margin line and horizontal guidelines. The content area has proper padding to respect the margin, just like you would when writing on real paper.
        
        The SVG-based design ensures crisp rendering at any zoom level while maintaining the organic, hand-drawn quality that makes this component library unique.
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The accordion adapts to different content lengths while maintaining the sketchy aesthetic.',
      },
    },
  },
};