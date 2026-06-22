import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BackToTop } from "./BackToTop";

const meta = {
  title: "Navigation/BackToTop",
  component: BackToTop,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    threshold: 240,
    label: "Back to top",
  },
} satisfies Meta<typeof BackToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div
      style={{
        minHeight: "180vh",
        padding: 32,
        background: "#faf7f0",
        color: "#2a2a2a",
      }}
    >
      <h1
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: "3rem",
          margin: "0 0 16px",
        }}
      >
        Scroll a little way down to see the button appear.
      </h1>
      <p style={{ maxWidth: 640, lineHeight: 1.7 }}>
        This story keeps the viewport tall so you can preview the fixed
        BackToTop control and verify the smooth scroll behavior.
      </p>
      <div style={{ marginTop: "120vh" }}>
        <BackToTop {...args} />
      </div>
    </div>
  ),
};
