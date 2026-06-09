import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { TextInput } from "./TextInput";

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component:
          "TextInput is the first Atlas form component built on FieldWrapper. It uses native input semantics, tokenized control states, connected labels, aria-describedby for helper and error copy, and visible focus styles for enterprise SaaS forms.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    disabled: {
      control: "boolean",
    },
    readOnly: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
  args: {
    label: "Dataset name",
    placeholder: "Enter dataset name",
    helperText: "Use a name your team will recognize.",
    size: "medium",
    disabled: false,
    readOnly: false,
    required: false,
    fullWidth: false,
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

function FocusedTextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <TextInput ref={inputRef} label="Focused" defaultValue="Field value" />;
}

function FocusedSearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <TextInput ref={inputRef} aria-label="Search model runs" type="search" startIcon={<Search />} defaultValue="Typ" />;
}

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--atlas-space-md)", width: 360 }}>
      <TextInput label="Small field" size="small" defaultValue="Compact value" />
      <TextInput label="Medium field" size="medium" defaultValue="Default value" />
    </div>
  ),
};

export const Focus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The focus state uses the shared field focus token. Click into any TextInput or tab to it; this story also focuses the input on mount so the blue border is visible immediately.",
      },
    },
  },
  render: () => (
    <div style={{ width: 360 }}>
      <FocusedTextInput />
    </div>
  ),
};

export const Validation: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--atlas-space-md)", width: 360 }}>
      <TextInput label="Provider name" required placeholder="OpenAI" helperText="Required for deployment logs." />
      <TextInput
        label="API key"
        required
        defaultValue=""
        errorText="API key is required before this workflow can run."
        helperText="Paste the key from your provider settings."
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--atlas-space-md)", width: 360 }}>
      <TextInput label="Default" defaultValue="Model evaluation" />
      <TextInput label="Disabled" defaultValue="Locked value" disabled helperText="Disabled fields are skipped by keyboard navigation." />
      <TextInput label="Read-only" defaultValue="Production workspace" readOnly helperText="Read-only fields can be selected but not edited." />
    </div>
  ),
};

export const SpecMatrix: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Spec matrix based on the supplied design reference: with label, no label, 32px medium, 28px small, default, focus, error, read-only, disabled, required, empty, placeholder, subtext, and search states.",
      },
    },
  },
  render: () => (
    <div style={{ display: "grid", gap: "var(--atlas-space-xl)" }}>
      <section>
        <h3 style={{ margin: "0 0 var(--atlas-space-md)", fontSize: 16 }}>With label</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--atlas-space-lg)", maxWidth: 760 }}>
          <div style={{ display: "grid", gap: "var(--atlas-space-md)" }}>
            <TextInput label="Label Text" size="medium" defaultValue="Field value" />
            <FocusedTextInput />
            <TextInput label="Label Text" size="medium" defaultValue="Field value" errorText="Error text goes here" />
            <TextInput label="Label Text" size="medium" defaultValue="Field value" readOnly />
            <TextInput label="Label Text" size="medium" defaultValue="Field value" disabled />
            <TextInput label="Label Text" size="medium" placeholder="Placeholder" required />
            <TextInput label="Label Text" size="medium" />
            <TextInput label="Label Text" size="medium" placeholder="Placeholder" />
            <TextInput label="Label Text" size="medium" placeholder="Placeholder" helperText="Subtext goes here" />
          </div>
          <div style={{ display: "grid", gap: "var(--atlas-space-md)" }}>
            <TextInput label="Label Text" size="small" defaultValue="Field value" />
            <TextInput label="Label Text" size="small" defaultValue="Field value" />
            <TextInput label="Label Text" size="small" defaultValue="Field value" errorText="Error text goes here" />
            <TextInput label="Label Text" size="small" defaultValue="Field value" readOnly />
            <TextInput label="Label Text" size="small" defaultValue="Field value" disabled />
            <TextInput label="Label Text" size="small" placeholder="Placeholder" required />
            <TextInput label="Label Text" size="small" />
            <TextInput label="Label Text" size="small" placeholder="Placeholder" />
            <TextInput label="Label Text" size="small" placeholder="Placeholder" helperText="Subtext goes here" />
          </div>
        </div>
      </section>
      <section>
        <h3 style={{ margin: "0 0 var(--atlas-space-md)", fontSize: 16 }}>No label</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--atlas-space-lg)", maxWidth: 760 }}>
          <div style={{ display: "grid", gap: "var(--atlas-space-md)" }}>
            <TextInput aria-label="Default medium input" size="medium" defaultValue="Field value" />
            <TextInput aria-label="Focused medium input" size="medium" defaultValue="Field value" autoFocus />
            <TextInput aria-label="Disabled medium input" size="medium" defaultValue="Field value" disabled />
            <TextInput aria-label="Search medium input" type="search" size="medium" placeholder="Search..." startIcon={<Search />} />
            <FocusedSearchInput />
            <TextInput aria-label="Empty medium input" size="medium" />
            <TextInput aria-label="Placeholder medium input" size="medium" placeholder="Placeholder text" />
          </div>
          <div style={{ display: "grid", gap: "var(--atlas-space-md)" }}>
            <TextInput aria-label="Default small input" size="small" defaultValue="Field value" />
            <TextInput aria-label="Focused small input" size="small" defaultValue="Field value" />
            <TextInput aria-label="Disabled small input" size="small" defaultValue="Field value" disabled />
            <TextInput aria-label="Search small input" type="search" size="small" placeholder="Search..." startIcon={<Search />} />
            <TextInput aria-label="Focused small search input" type="search" size="small" startIcon={<Search />} defaultValue="Typ" />
            <TextInput aria-label="Empty small input" size="small" />
            <TextInput aria-label="Placeholder small input" size="small" placeholder="Placeholder text" />
          </div>
        </div>
      </section>
    </div>
  ),
};

export const SearchInput: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <TextInput
        aria-label="Search model runs"
        type="search"
        placeholder="Search..."
        startIcon={<Search />}
        helperText="No visible label requires an accessible name."
        fullWidth
      />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: 520 }}>
      <TextInput label="Experiment description" placeholder="Short description" fullWidth />
    </div>
  ),
};
