import type { Preview } from "@storybook/react";
import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "Atlas Dark",
      values: [
        {
          name: "Atlas Dark",
          value: "#111111",
        },
        {
          name: "Atlas Surface",
          value: "#1D1D1D",
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
