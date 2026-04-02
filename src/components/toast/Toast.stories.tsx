import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, ToastContainer, useToast } from './Toast';
import type { ToastPosition } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn sketch-style toast notification system with automatic dismissal, multiple variants, and flexible positioning.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { ToastContainer, useToast } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  const { toasts, showToast, dismissToast } = useToast();

  return (
    <div>
      <button onClick={() => showToast('Success!', 'success')}>
        Show Toast
      </button>
      
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
        position="top-right"
      />
    </div>
  );
}
\`\`\`

## Variants

\`\`\`tsx
showToast('Operation completed!', 'success');
showToast('Please check your input.', 'warning');
showToast('Something went wrong.', 'error');
showToast('Here is some info.', 'info');
\`\`\`

## Positioning

\`\`\`tsx
<ToastContainer
  toasts={toasts}
  onDismiss={dismissToast}
  position="top-right"    // or top-left, top-center
                          // bottom-right, bottom-left, bottom-center
/>
\`\`\`

## Sizes

\`\`\`tsx
<ToastContainer
  toasts={toasts}
  onDismiss={dismissToast}
  size="sm"  // or "md" (default), "lg"
/>
\`\`\`

## Custom Colors

\`\`\`tsx
<ToastContainer
  toasts={toasts}
  onDismiss={dismissToast}
  colors={{
    success: { bg: '#f0fdf4', border: '#2d7a4f', tape: '#2d7a4f' },
    error: { bg: '#fff1f2', border: '#c2410c', tape: '#c2410c' }
  }}
/>
\`\`\`

## Custom Typography

\`\`\`tsx
<ToastContainer
  toasts={toasts}
  onDismiss={dismissToast}
  typography={{
    fontSize: '1.2rem',
    fontWeight: 600,
    fontFamily: 'Arial'
  }}
/>
\`\`\`

## Props

### Toast Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`toast\` | \`ToastOptions\` | required | Toast data object |
| \`onDismiss\` | \`(id: string) => void\` | required | Dismiss callback |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Preset size |
| \`width\` | \`number\` | varies | Custom width in pixels |
| \`height\` | \`number\` | varies | Custom height in pixels |
| \`colors\` | \`object\` | - | Custom colors per variant |
| \`typography\` | \`object\` | - | Custom typography |
| \`showBorder\` | \`boolean\` | \`true\` | Show sketch border |
| \`showIcon\` | \`boolean\` | \`true\` | Show variant icon |
| \`className\` | \`string\` | - | Additional CSS classes |

### ToastContainer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`toasts\` | \`ToastOptions[]\` | required | Array of toasts |
| \`onDismiss\` | \`(id: string) => void\` | required | Dismiss callback |
| \`position\` | \`ToastPosition\` | \`"top-right"\` | Screen position |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Size for all toasts |
| \`width\` | \`number\` | - | Custom width |
| \`height\` | \`number\` | - | Custom height |
| \`colors\` | \`object\` | - | Custom colors |
| \`typography\` | \`object\` | - | Custom typography |
| \`showBorder\` | \`boolean\` | \`true\` | Show borders |
| \`showIcon\` | \`boolean\` | \`true\` | Show icons |
| \`className\` | \`string\` | - | Additional CSS classes |

### useToast Hook

\`\`\`tsx
const { toasts, showToast, dismissToast, clearAllToasts } = useToast();

// Show toast (auto-dismisses after 5 seconds)
showToast('Message', 'success', 5000);

// Manually dismiss
dismissToast(toastId);

// Clear all
clearAllToasts();
\`\`\`

Plus all standard HTML div attributes.
        `,
      },
    },
  },
  argTypes: {
    showBorder: {
      control: { type: 'boolean' },
    },
    showIcon: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleToast = {
  id: 'sample-1',
  message: 'This is a sample toast message!',
  variant: 'success' as const,
};

export const Default: Story = {
  args: {
    toast: sampleToast,
    onDismiss: () => { },
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <Toast
        {...args}
        toast={{ id: '1', message: 'Operation completed successfully!', variant: 'success' }}
        onDismiss={() => { }}
      />
      <Toast
        {...args}
        toast={{ id: '2', message: 'Please check your input and try again.', variant: 'warning' }}
        onDismiss={() => { }}
      />
      <Toast
        {...args}
        toast={{ id: '3', message: 'Something went wrong. Please contact support.', variant: 'error' }}
        onDismiss={() => { }}
      />
      <Toast
        {...args}
        toast={{ id: '4', message: 'Here is some helpful information for you.', variant: 'info' }}
        onDismiss={() => { }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast supports four variants: success (green), warning (orange), error (red), and info (blue).',
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <Toast
        {...args}
        toast={{ id: '1', message: 'Small toast message', variant: 'success' }}
        size="sm"
        onDismiss={() => { }}
      />
      <Toast
        {...args}
        toast={{ id: '2', message: 'Medium toast message with a bit more content', variant: 'info' }}
        size="md"
        onDismiss={() => { }}
      />
      <Toast
        {...args}
        toast={{ id: '3', message: 'Large toast message with even more content to showcase the larger size variant', variant: 'warning' }}
        size="lg"
        onDismiss={() => { }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast supports three size variants: sm (280px), md (340px), and lg (400px).',
      },
    },
  },
};

export const Customization: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <Toast
        {...args}
        toast={{ id: '1', message: 'Custom purple theme', variant: 'info' }}
        colors={{
          info: { bg: '#f3e8ff', border: '#7c3aed', tape: '#7c3aed' }
        }}
        onDismiss={() => { }}
      />
      <Toast
        {...args}
        toast={{ id: '2', message: 'Custom pink theme', variant: 'success' }}
        colors={{
          success: { bg: '#fdf2f8', border: '#ec4899', tape: '#ec4899' }
        }}
        onDismiss={() => { }}
      />
      <Toast
        {...args}
        toast={{ id: '3', message: 'Bold and larger text', variant: 'warning' }}
        typography={{ fontSize: '1.5rem', fontWeight: 'bold' }}
        onDismiss={() => { }}
      />
      <Toast
        {...args}
        toast={{ id: '4', message: 'No icon or border', variant: 'info' }}
        showIcon={false}
        showBorder={false}
        onDismiss={() => { }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customize colors, typography, and visibility of icons and borders.',
      },
    },
  },
};

const ToastHookDemo = ({ position = 'top-right' }: { position?: ToastPosition }) => {
  const { toasts, showToast, dismissToast } = useToast();

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => showToast('Success! Operation completed.', 'success')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Success
        </button>
        <button
          onClick={() => showToast('Warning: Please check your input.', 'warning')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Warning
        </button>
        <button
          onClick={() => showToast('Error: Something went wrong.', 'error')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Error
        </button>
        <button
          onClick={() => showToast('Info: Here is some helpful information.', 'info')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Info
        </button>
      </div>

      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
        position={position}
      />
    </div>
  );
};

export const InteractiveDemo: Story = {
  render: (args) => <ToastHookDemo position={(args as Record<string, unknown>).position as ToastPosition} />,
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'],
      description: 'Position of the toast container on screen',
    },
  } as Record<string, unknown>,
  args: {
    position: 'top-right',
  } as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing the useToast hook. Toasts auto-dismiss after 5 seconds or can be closed manually.',
      },
    },
  },
};
