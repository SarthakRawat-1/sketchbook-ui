import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn dropdown menu component with customizable triggers, icons, and virtualized scrolling for large lists.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Dropdown } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

const items = [
  { label: 'Edit', icon: 'edit', onClick: () => console.log('Edit') },
  { label: 'Duplicate', icon: 'duplicate', onClick: () => console.log('Duplicate') },
  { label: 'Delete', icon: 'delete', onClick: () => console.log('Delete'), danger: true },
];

function App() {
  return <Dropdown items={items} triggerIcon="dots" />;
}
\`\`\`

## Trigger Types

\`\`\`tsx
{/* Icon triggers */}
<Dropdown items={items} triggerIcon="dots" />
<Dropdown items={items} triggerIcon="menu" />
<Dropdown items={items} triggerIcon="gear" />

{/* Text trigger */}
<Dropdown items={items} triggerText="Menu" />

{/* Emoji trigger */}
<Dropdown items={items} triggerEmoji="😊" />

{/* Custom trigger */}
<Dropdown 
  items={items}
  customTrigger={<button>Custom</button>}
/>
\`\`\`

## Sizes

\`\`\`tsx
<Dropdown items={items} size="sm" />
<Dropdown items={items} size="md" />
<Dropdown items={items} size="lg" />
\`\`\`

## Disabled State

\`\`\`tsx
<Dropdown items={items} disabled />
\`\`\`

## Custom Colors

\`\`\`tsx
<Dropdown 
  items={items}
  colors={{ 
    bg: "#fee2e2", 
    bgOverlay: "#fecaca", 
    stroke: "#dc2626", 
    text: "#dc2626",
    hoverBg: "#fef2f2",
    dangerText: "#b91c1c"
  }}
/>
\`\`\`

## Custom Typography

\`\`\`tsx
<Dropdown 
  items={items}
  typography={{ 
    fontSize: "1.2rem", 
    fontWeight: "bold",
    fontFamily: "serif"
  }}
/>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`items\` | \`DropdownItem[]\` | required | Array of menu items |
| \`triggerIcon\` | \`"dots" \\| "menu" \\| "gear" \\| "plus" \\| "user" \\| "bell" \\| "chevron"\` | \`"dots"\` | Icon for trigger button |
| \`triggerText\` | \`string\` | - | Custom text for trigger |
| \`triggerEmoji\` | \`string\` | - | Custom emoji for trigger |
| \`customTrigger\` | \`ReactNode\` | - | Custom trigger element |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Button size |
| \`disabled\` | \`boolean\` | \`false\` | Disabled state |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Text color |
| \`colors.hoverBg\` | \`string\` | - | Hover background color |
| \`colors.dangerText\` | \`string\` | - | Danger item text color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Font weight |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`showBorder\` | \`boolean\` | \`true\` | Show sketchy border |
| \`className\` | \`string\` | - | Additional CSS classes |

### DropdownItem Interface

\`\`\`tsx
interface DropdownItem {
  label: string;
  icon?: 'edit' | 'duplicate' | 'delete' | 'settings' | 'share';
  onClick?: () => void;
  danger?: boolean;
}
\`\`\`

Plus all standard HTML div attributes.

## Important Notes

- Dropdown automatically closes when clicking outside
- Keyboard navigation: Arrow keys to navigate, Enter to select, Escape to close
- Text/emoji triggers automatically adjust button width
- Virtualized scrolling for large lists (350px max height)
        `,
      },
    },
  },
  argTypes: {
    triggerIcon: {
      control: { type: 'radio' },
      options: ['dots', 'menu', 'gear', 'plus', 'user', 'bell', 'chevron'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { label: 'Edit', icon: 'edit' as const, onClick: () => console.log('Edit clicked') },
  { label: 'Duplicate', icon: 'duplicate' as const, onClick: () => console.log('Duplicate clicked') },
  { label: 'Settings', icon: 'settings' as const, onClick: () => console.log('Settings clicked') },
  { label: 'Share', icon: 'share' as const, onClick: () => console.log('Share clicked') },
  { label: 'Delete', icon: 'delete' as const, onClick: () => console.log('Delete clicked'), danger: true },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    triggerIcon: 'dots',
  },
};

export const Disabled: Story = {
  args: {
    items: sampleItems,
    disabled: true,
    triggerIcon: 'dots',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <Dropdown {...args} size="sm" />
      <Dropdown {...args} size="md" />
      <Dropdown {...args} size="lg" />
    </div>
  ),
  args: {
    items: sampleItems,
    triggerIcon: 'dots',
  },
};

export const TriggerIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerIcon="dots" />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>dots</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerIcon="menu" />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>menu</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerIcon="gear" />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>gear</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerIcon="plus" />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>plus</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerIcon="user" />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>user</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerIcon="bell" />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>bell</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerIcon="chevron" />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>chevron</span>
      </div>
    </div>
  ),
  args: {
    items: sampleItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Different trigger icon options for various use cases.',
      },
    },
  },
};

export const TextAndEmojiTriggers: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerText="Menu" typography={{ fontSize: "1.4rem" }} />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>text</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerText="Actions" typography={{ fontSize: "1.2rem" }} />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>longer text</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerEmoji="😊" typography={{ fontSize: "1.6rem" }} />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>emoji</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerEmoji="🔥" typography={{ fontSize: "1.8rem" }} />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>larger emoji</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Dropdown {...args} triggerEmoji="⭐" typography={{ fontSize: "1.4rem" }} />
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>star emoji</span>
      </div>
    </div>
  ),
  args: {
    items: sampleItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use custom text or emoji as triggers. Button size adjusts automatically.',
      },
    },
  },
};

export const Customization: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Dropdown {...args} triggerIcon="dots" />
        <Dropdown 
          {...args} 
          triggerIcon="dots"
          colors={{ bg: "#fee2e2", bgOverlay: "#fecaca", stroke: "#dc2626", text: "#dc2626", hoverBg: "#fef2f2", dangerText: "#b91c1c" }}
        />
        <Dropdown 
          {...args} 
          triggerIcon="dots"
          colors={{ bg: "#dbeafe", bgOverlay: "#bfdbfe", stroke: "#2563eb", text: "#2563eb", hoverBg: "#eff6ff", dangerText: "#dc2626" }}
        />
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Dropdown 
          {...args} 
          triggerIcon="dots"
          typography={{ fontSize: "1.2rem", fontWeight: "bold" }}
        />
        <Dropdown 
          {...args} 
          triggerIcon="dots"
          typography={{ fontFamily: "serif", fontSize: "1.3rem" }}
        />
        <Dropdown 
          {...args} 
          triggerIcon="dots"
          showBorder={false}
        />
      </div>
    </div>
  ),
  args: {
    items: sampleItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Customize colors, typography, and border visibility to match your design needs.',
      },
    },
  },
};

export const SimpleActions: Story = {
  args: {
    items: [
      { label: 'Profile', onClick: () => console.log('Profile clicked') },
      { label: 'Settings', onClick: () => console.log('Settings clicked') },
      { label: 'Help', onClick: () => console.log('Help clicked') },
      { label: 'Sign out', onClick: () => console.log('Sign out clicked'), danger: true },
    ],
    triggerIcon: 'user',
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple text-only menu items without icons.',
      },
    },
  },
};
