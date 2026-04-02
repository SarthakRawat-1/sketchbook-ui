import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Checkbox } from "../checkbox/Checkbox";
import { Select } from "../select/Select";
import { Switch } from "../switch/Switch";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn modal dialog with three distinct variants: paper, notebook, and sticky note. Features focus management, keyboard navigation, and customizable appearance.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { useState } from 'react';
import { Modal, Button } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Welcome!"
      >
        <p>This is a hand-drawn modal dialog.</p>
      </Modal>
    </>
  );
}
\`\`\`

## Variants

\`\`\`tsx
<Modal variant="paper" isOpen={isOpen} onClose={onClose} title="Paper">
  Classic paper look with folded corner
</Modal>

<Modal variant="notebook" isOpen={isOpen} onClose={onClose} title="Notebook">
  Ruled lines with spiral holes and red margin
</Modal>

<Modal variant="sticky" isOpen={isOpen} onClose={onClose} title="Sticky">
  Yellow sticky note with tape at top
</Modal>
\`\`\`

## Sizes

\`\`\`tsx
<Modal size="sm" isOpen={isOpen} onClose={onClose}>Small (400px)</Modal>
<Modal size="md" isOpen={isOpen} onClose={onClose}>Medium (600px)</Modal>
<Modal size="lg" isOpen={isOpen} onClose={onClose}>Large (800px)</Modal>
\`\`\`

## With Footer

\`\`\`tsx
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  title="Confirm Action"
  footer={
    <>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Are you sure?</p>
</Modal>
\`\`\`

## Custom Colors

\`\`\`tsx
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  colors={{
    bg: "#f0e6ff",
    bgOverlay: "#e0d0f5",
    stroke: "#5b21b6",
    text: "#3b0764",
    backdrop: "rgba(91, 33, 182, 0.3)"
  }}
>
  Custom purple theme
</Modal>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`isOpen\` | \`boolean\` | required | Controls modal visibility |
| \`onClose\` | \`() => void\` | required | Called when modal should close |
| \`title\` | \`string\` | - | Modal title text |
| \`children\` | \`ReactNode\` | required | Modal body content |
| \`footer\` | \`ReactNode\` | - | Footer content (buttons, etc.) |
| \`size\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Modal width (400px/600px/800px) |
| \`variant\` | \`"paper" \\| "notebook" \\| "sticky"\` | \`"paper"\` | Visual style variant |
| \`showCloseButton\` | \`boolean\` | \`true\` | Show X button in top-right |
| \`closeOnBackdrop\` | \`boolean\` | \`true\` | Close when clicking backdrop |
| \`closeOnEscape\` | \`boolean\` | \`true\` | Close when pressing Escape |
| \`showBorder\` | \`boolean\` | \`true\` | Show hand-drawn border |
| \`colors\` | \`object\` | - | Custom color scheme |
| \`colors.bg\` | \`string\` | - | Background color |
| \`colors.bgOverlay\` | \`string\` | - | Background overlay color |
| \`colors.stroke\` | \`string\` | - | Border stroke color |
| \`colors.text\` | \`string\` | - | Text color |
| \`colors.backdrop\` | \`string\` | - | Backdrop overlay color |
| \`typography\` | \`object\` | - | Custom typography |
| \`typography.fontSize\` | \`string\` | - | Body font size |
| \`typography.fontWeight\` | \`string \\| number\` | - | Body font weight |
| \`typography.fontFamily\` | \`string\` | - | Font family |
| \`typography.titleSize\` | \`string\` | - | Title font size |
| \`typography.titleWeight\` | \`string \\| number\` | - | Title font weight |
| \`className\` | \`string\` | - | Additional CSS classes |

## Important Notes

- Modal uses React Portal to render at document.body level
- Automatically locks body scroll when open
- Focus management: traps focus inside modal, restores on close
- Keyboard navigation: Tab cycles through focusable elements, Escape closes
- Notebook variant adds left padding automatically for margin line
- Long content makes body scrollable while header/footer stay fixed
- All sizes cap at 90vw on small screens for responsiveness
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: { type: "radio" },
      options: ["paper", "notebook", "sticky"],
    },
    showCloseButton: { control: "boolean" },
    closeOnBackdrop: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
    showBorder: { control: "boolean" },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Helper wrapper that manages open/close state ───────────────────── */

function ModalDemo(
  props: Omit<React.ComponentProps<typeof Modal>, "isOpen" | "onClose"> & {
    triggerLabel?: string;
  },
) {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerLabel = "Open Modal", ...modalProps } = props;

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{triggerLabel}</Button>
      <Modal {...modalProps} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Stories                                                              */
/* ────────────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => (
    <ModalDemo
      {...args}
      title="Welcome!"
    >
      <p>This is a hand-drawn paper modal with a sketchy border, noise texture, and wobbly edges.</p>
      <p>Click the X button, press Escape, or click the backdrop to close.</p>
    </ModalDemo>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", padding: "2rem" }}>
      <ModalDemo {...args} variant="paper" title="Paper Modal" triggerLabel="Paper">
        <p>The classic paper variant — a crumpled notebook page with a folded corner.</p>
      </ModalDemo>

      <ModalDemo {...args} variant="notebook" title="Notebook Modal" triggerLabel="Notebook">
        <p>Spiral-bound notebook page with ruled lines, a red margin, and binding holes.</p>
      </ModalDemo>

      <ModalDemo {...args} variant="sticky" title="Sticky Note" triggerLabel="Sticky">
        <p>A yellow sticky note held up with tape. Quick notes and reminders style!</p>
      </ModalDemo>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three visual variants: **paper** (classic parchment), **notebook** (ruled page with spiral holes), and **sticky** (yellow sticky note with tape).",
      },
    },
  },
};

export const WithFooter: Story = {
  render: (args) => (
    <ModalDemo
      {...args}
      title="Confirm Action"
      footer={
        <>
          <Button size="sm" colors={{ bg: "#ffeaea", stroke: "#c2410c", text: "#c2410c" }}>
            Cancel
          </Button>
          <Button size="sm" colors={{ bg: "#e8f5e9", stroke: "#2d5016", text: "#2d5016" }}>
            Confirm
          </Button>
        </>
      }
    >
      <p>Are you sure you want to continue? This action cannot be undone.</p>
    </ModalDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: "Footer slot accepts any content — here we use the library's own Button component for actions.",
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", padding: "2rem" }}>
      <ModalDemo {...args} size="sm" title="Small" triggerLabel="Small">
        <p>A compact 400px-wide modal for quick confirmations.</p>
      </ModalDemo>

      <ModalDemo {...args} size="md" title="Medium" triggerLabel="Medium">
        <p>The default 600px width — good for forms and informational dialogs.</p>
      </ModalDemo>

      <ModalDemo {...args} size="lg" title="Large" triggerLabel="Large">
        <p>An 800px-wide modal for complex content, tables, or lengthy forms.</p>
      </ModalDemo>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three size presets: **sm** (400px), **md** (600px), and **lg** (800px). All cap at 90vw on small screens.",
      },
    },
  },
};

export const CustomColors: Story = {
  render: (args) => (
    <ModalDemo
      {...args}
      title="Custom Palette"
      colors={{
        bg: "#f0e6ff",
        bgOverlay: "#e0d0f5",
        stroke: "#5b21b6",
        text: "#3b0764",
      }}
    >
      <p>Colours are fully customisable — background, overlay, stroke, text, and even the backdrop.</p>
    </ModalDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: "Override individual colours via the `colors` prop to match your brand or theme.",
      },
    },
  },
};

export const LongContent: Story = {
  render: (args) => (
    <ModalDemo {...args} title="Scrollable Content" variant="notebook">
      {Array.from({ length: 12 }, (_, i) => (
        <p key={i} style={{ marginBottom: "0.75rem" }}>
          Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.
        </p>
      ))}
    </ModalDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: "When the body content exceeds the viewport, the modal body becomes scrollable while the header and footer stay pinned.",
      },
    },
  },
};

export const NoBorder: Story = {
  render: (args) => (
    <ModalDemo {...args} title="Clean Look" showBorder={false}>
      <p>With <code>showBorder=false</code> the double-stroke border is hidden, leaving just the paper texture and drop-shadow.</p>
    </ModalDemo>
  ),
};

export const WithFormControls: Story = {
  render: (args) => <FormModalDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Modals can host any content — inputs, selects, checkboxes, switches, and action buttons all work inside the modal body and footer.",
      },
    },
  },
};

function FormModalDemo(props: Record<string, unknown>) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [remember, setRemember] = useState(false);
  const [notify, setNotify] = useState(true);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
      <Modal
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
        size="lg"
        footer={
          <>
            <Button
              size="sm"
              colors={{ bg: "#ffeaea", stroke: "#c2410c", text: "#c2410c" }}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              colors={{ bg: "#e8f5e9", stroke: "#2d5016", text: "#2d5016" }}
              onClick={() => {
                alert(`Saved!\nName: ${name}\nRemember: ${remember}\nNotify: ${notify}`);
                setIsOpen(false);
              }}
            >
              Save Changes
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>
              Display Name
            </label>
            <Input
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>
              Role
            </label>
            <Select
              options={[
                { value: "admin", label: "Admin" },
                { value: "editor", label: "Editor" },
                { value: "viewer", label: "Viewer" },
              ]}
              placeholder="Select a role..."
            />
          </div>

          <Checkbox
            checked={remember}
            onChange={setRemember}
            label="Remember my preferences"
          />

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} />
            <span>Email notifications</span>
          </div>
        </div>
      </Modal>
    </>
  );
}
