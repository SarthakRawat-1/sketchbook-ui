import type { Preview } from "@storybook/react-vite";
import React from "react";
import { SketchProvider } from "../src/lib";
import "./storybook.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <SketchProvider>
        <Story />
      </SketchProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "error",
    },
  },
};

export default preview;
