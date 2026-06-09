import type { Meta, StoryObj } from "@storybook/react";
import { FieldWrapper } from "./FieldWrapper";

const meta = {
  title: "Foundations/Field",
  parameters: {
    docs: {
      description: {
        component:
          "Field provides the shared form layout and accessibility wiring for Atlas form controls. Components such as TextInput, TextArea, Select, Combobox, and DatePicker should compose through this foundation instead of duplicating label, helper, error, and required behavior.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Anatomy: Story = {
  render: () => (
    <FieldWrapper
      id="model-name"
      label="Model name"
      helperText="Use a short, recognizable name for this model."
      required
      fullWidth
    >
      {({ inputId, describedBy }) => (
        <div
          style={{
            minHeight: "var(--atlas-field-control-height-md)",
            padding: "var(--atlas-field-control-padding-y) var(--atlas-field-control-padding-x)",
            color: "var(--atlas-color-text-secondary)",
            background: "var(--atlas-field-control-background)",
            border: "1px solid var(--atlas-field-control-border)",
            borderRadius: "var(--atlas-field-control-radius)",
          }}
        >
          Control receives id <code>{inputId}</code> and aria-describedby <code>{describedBy}</code>
        </div>
      )}
    </FieldWrapper>
  ),
};

export const WithError: Story = {
  render: () => (
    <FieldWrapper
      id="api-key"
      label="API key"
      helperText="Paste the key from your provider settings."
      errorText="API key is required."
      required
      fullWidth
    >
      {({ inputId, describedBy, invalid }) => (
        <div
          aria-invalid={invalid}
          aria-describedby={describedBy}
          id={inputId}
          style={{
            minHeight: "var(--atlas-field-control-height-md)",
            padding: "var(--atlas-field-control-padding-y) var(--atlas-field-control-padding-x)",
            background: "var(--atlas-field-control-background)",
            border: "1px solid var(--atlas-field-control-border-error)",
            borderRadius: "var(--atlas-field-control-radius)",
          }}
        >
          Invalid control example
        </div>
      )}
    </FieldWrapper>
  ),
};
