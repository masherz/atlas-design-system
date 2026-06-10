import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Buttons communicate and trigger actions. Atlas buttons use semantic and component tokens, native button semantics, visible focus styles, and loading states that preserve an accessible name.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "tertiary", "danger"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
  args: {
    children: "Run evaluation",
    variant: "primary",
    size: "medium",
    loading: false,
    disabled: false,
    fullWidth: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--atlas-space-md)", alignItems: "center" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--atlas-space-md)", alignItems: "center" }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--atlas-space-md)", alignItems: "center" }}>
      <Button loading>Primary</Button>
      <Button variant="secondary" loading>
        Secondary
      </Button>
      <Button variant="ghost" loading>
        Ghost
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--atlas-space-md)", alignItems: "center" }}>
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--atlas-space-md)", alignItems: "center" }}>
      <Button leadingIcon={<Search />}>Search runs</Button>
      <Button variant="secondary" trailingIcon={<ArrowRight />}>
        View details
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Button fullWidth>Approve deployment</Button>
    </div>
  ),
};
