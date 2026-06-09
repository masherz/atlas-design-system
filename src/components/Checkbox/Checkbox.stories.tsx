import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox follows the Jam Design System dark theme: 16px control, 2px radius, 1px border, 8px label spacing, unchecked/checked/indeterminate types, default/hover/focus/disabled/error states, optional label, required marker, and subtext.",
      },
    },
  },
  args: {
    label: "Checkbox",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: "Required checkbox",
  },
};

export const WithSubtext: Story = {
  args: {
    label: "Enable AI review",
    subtext: "Runs contract extraction after upload.",
  },
};

export const Error: Story = {
  args: {
    label: "Accept review policy",
    required: true,
    errorText: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const NoLabel: Story = {
  args: {
    "aria-label": "Select row",
    label: undefined,
  },
};

export const StateMatrix: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "State matrix maps to the Figma documentation: unchecked, checked, and indeterminate states with label/no-label, disabled, required, error, and subtext examples.",
      },
    },
  },
  render: () => (
    <div style={{ display: "grid", gap: "var(--atlas-space-lg)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(160px, 1fr))", gap: "var(--atlas-space-md)" }}>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(160px, 1fr))", gap: "var(--atlas-space-md)" }}>
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled checked" defaultChecked disabled />
        <Checkbox label="Disabled mixed" indeterminate disabled />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(160px, 1fr))", gap: "var(--atlas-space-md)" }}>
        <Checkbox label="Required" required />
        <Checkbox label="With subtext" subtext="Subtext goes here" />
        <Checkbox label="Error" errorText="This field is required" />
      </div>
      <div style={{ display: "flex", gap: "var(--atlas-space-md)", alignItems: "center" }}>
        <Checkbox aria-label="No label unchecked" />
        <Checkbox aria-label="No label checked" defaultChecked />
        <Checkbox aria-label="No label indeterminate" indeterminate />
      </div>
    </div>
  ),
};
