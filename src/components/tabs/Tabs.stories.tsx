import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A hand-drawn tabs component with folder, underline, and pills tab triggers, paired with paper, notebook, or sticky note content cards.

## Installation

\`\`\`bash
npm install sketchbook-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'sketchbook-ui';
import 'sketchbook-ui/style.css';

function App() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="specs">Specs</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content...</TabsContent>
      <TabsContent value="specs">Specifications...</TabsContent>
    </Tabs>
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["folder", "underline", "pills"],
    },
    contentVariant: {
      control: { type: "radio" },
      options: ["paper", "notebook", "sticky", "clean"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    showBorder: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="specs">Specs</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <h3 style={{ fontFamily: "Caveat, cursive", fontSize: "1.8rem", margin: "0 0 8px" }}>
          Project Overview
        </h3>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Hand-drawn user interfaces bring warmth and tactile craft back to web applications.
        </p>
      </TabsContent>
      <TabsContent value="specs">
        <h3 style={{ fontFamily: "Caveat, cursive", fontSize: "1.8rem", margin: "0 0 8px" }}>
          Technical Specifications
        </h3>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Zero runtime dependencies beyond React. Built with scalable SVG filters and CSS transforms.
        </p>
      </TabsContent>
      <TabsContent value="reviews">
        <h3 style={{ fontFamily: "Caveat, cursive", fontSize: "1.8rem", margin: "0 0 8px" }}>
          Community Reviews
        </h3>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Everything feels like it was sketched right out of a designer notebook.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const NotebookStyle: Story = {
  render: () => (
    <Tabs defaultValue="notes">
      <TabsList>
        <TabsTrigger value="notes">Notebook Page</TabsTrigger>
        <TabsTrigger value="plain">Plain Paper</TabsTrigger>
      </TabsList>
      <TabsContent value="notes" variant="notebook">
        <h4 style={{ fontFamily: "Caveat, cursive", fontSize: "1.7rem", margin: "0 0 10px" }}>
          Authentic Notebook Page
        </h4>
        <p style={{ margin: 0, lineHeight: 1.8 }}>
          Includes genuine spiral binding holes, a vertical red margin line, and blue horizontal ruled lines with indented text.
        </p>
      </TabsContent>
      <TabsContent value="plain" variant="paper">
        <h4 style={{ fontFamily: "Caveat, cursive", fontSize: "1.7rem", margin: "0 0 10px" }}>
          Plain Sketchbook Page
        </h4>
        <p style={{ margin: 0, lineHeight: 1.8 }}>
          Clean sketchbook paper surface with organic hand-drawn borders and warm texture.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const UnderlineVariant: Story = {
  render: (args) => (
    <Tabs {...args} variant="underline" defaultValue="daily">
      <TabsList>
        <TabsTrigger value="daily">Daily</TabsTrigger>
        <TabsTrigger value="weekly">Weekly</TabsTrigger>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
      </TabsList>
      <TabsContent value="daily">
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Daily review logs and daily habit tracker enclosed in sketchbook paper.
        </p>
      </TabsContent>
      <TabsContent value="weekly">
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Weekly summaries, retrospective, and milestones archive.
        </p>
      </TabsContent>
      <TabsContent value="monthly">
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Monthly roadmap and deliverables archive.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const PillsVariant: Story = {
  render: (args) => (
    <Tabs {...args} variant="pills" defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="unread">Unread</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Showing all entries in your sketchbook repository.
        </p>
      </TabsContent>
      <TabsContent value="unread">
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Showing only unread notes and comments.
        </p>
      </TabsContent>
      <TabsContent value="archived">
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Showing archived projects and references.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const StickyNoteStyle: Story = {
  render: () => (
    <Tabs defaultValue="urgent" contentVariant="sticky">
      <TabsList>
        <TabsTrigger value="urgent">Urgent</TabsTrigger>
        <TabsTrigger value="ideas">Ideas</TabsTrigger>
      </TabsList>
      <TabsContent value="urgent">
        <h4 style={{ fontFamily: "Caveat, cursive", fontSize: "1.6rem", margin: "0 0 8px" }}>
          Remember to test Storybook!
        </h4>
        <p style={{ margin: 0 }}>Sticky note tab with top tape and drop shadow.</p>
      </TabsContent>
      <TabsContent value="ideas">
        <p style={{ margin: 0 }}>Brainstorming notes and quick ideas.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const CleanUnboxed: Story = {
  render: () => (
    <Tabs defaultValue="tab1" contentVariant="clean">
      <TabsList>
        <TabsTrigger value="tab1">Simple 1</TabsTrigger>
        <TabsTrigger value="tab2">Simple 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p style={{ margin: 0 }}>Uncontained text content without an enclosing card.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p style={{ margin: 0 }}>Second panel without border or paper card.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div>
        <span style={{ fontFamily: "Caveat, cursive", fontSize: "1.3rem", color: "#666", display: "block", marginBottom: "8px" }}>
          Small (sm) - Compact tab triggers (32px) and concise card
        </span>
        <Tabs size="sm" defaultValue="one" maxWidth="400px">
          <TabsList>
            <TabsTrigger value="one">First</TabsTrigger>
            <TabsTrigger value="two">Second</TabsTrigger>
          </TabsList>
          <TabsContent value="one">
            Small size compact content area scaled proportionately.
          </TabsContent>
          <TabsContent value="two">Second tab content in small scale.</TabsContent>
        </Tabs>
      </div>

      <div>
        <span style={{ fontFamily: "Caveat, cursive", fontSize: "1.3rem", color: "#666", display: "block", marginBottom: "8px" }}>
          Medium (md) - Standard notebook tab triggers (46px)
        </span>
        <Tabs size="md" defaultValue="one" maxWidth="580px">
          <TabsList>
            <TabsTrigger value="one">First</TabsTrigger>
            <TabsTrigger value="two">Second</TabsTrigger>
          </TabsList>
          <TabsContent value="one">
            Medium size content area with balanced default padding and font sizing.
          </TabsContent>
          <TabsContent value="two">Second tab content in standard medium scale.</TabsContent>
        </Tabs>
      </div>

      <div>
        <span style={{ fontFamily: "Caveat, cursive", fontSize: "1.3rem", color: "#666", display: "block", marginBottom: "8px" }}>
          Large (lg) - Bold tab triggers (62px) and expansive card
        </span>
        <Tabs size="lg" defaultValue="one" maxWidth="760px">
          <TabsList>
            <TabsTrigger value="one">First</TabsTrigger>
            <TabsTrigger value="two">Second</TabsTrigger>
          </TabsList>
          <TabsContent value="one">
            Large size content area with generous padding, bolder strokes, and large handwritten typography.
          </TabsContent>
          <TabsContent value="two">Second tab content in expansive large scale.</TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledDemo() {
    const [tab, setTab] = useState("draft");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setTab("draft")}
            style={{
              padding: "4px 12px",
              fontFamily: "Caveat, cursive",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            Select Draft
          </button>
          <button
            type="button"
            onClick={() => setTab("published")}
            style={{
              padding: "4px 12px",
              fontFamily: "Caveat, cursive",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            Select Published
          </button>
          <span style={{ fontFamily: "Caveat, cursive", fontSize: "1.2rem" }}>
            Active tab: {tab}
          </span>
        </div>

        <Tabs value={tab} onChange={setTab}>
          <TabsList>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>
          <TabsContent value="draft">Draft items are listed here inside the card.</TabsContent>
          <TabsContent value="published">Published items are listed here inside the card.</TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Available</TabsTrigger>
        <TabsTrigger value="locked" disabled>
          Locked (Disabled)
        </TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="active">Active panel content.</TabsContent>
      <TabsContent value="locked">Cannot view locked panel.</TabsContent>
      <TabsContent value="history">History log panel.</TabsContent>
    </Tabs>
  ),
};
