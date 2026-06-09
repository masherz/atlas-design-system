import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight } from "lucide-react";
import { Button } from "../Button";
import { TextInput } from "../TextInput";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          "Card groups related enterprise SaaS content into a bounded surface. Use it for dashboard panels, scoped forms, settings sections, and entity summaries. Avoid using cards as generic page sections or fake clickable divs.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "stroke"],
    },
    elevation: {
      control: "select",
      options: ["none", "small", "medium"],
    },
    padding: {
      control: "select",
      options: ["none", "medium", "large"],
    },
    interactive: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
  args: {
    variant: "default",
    elevation: "small",
    padding: "medium",
    interactive: false,
    fullWidth: false,
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const metricStyle = {
  display: "grid",
  gap: "var(--atlas-space-xs)",
} as const;

const metricValueStyle = {
  margin: 0,
  fontSize: 28,
  lineHeight: "2rem",
  fontWeight: 600,
} as const;

const mutedStyle = {
  margin: 0,
  color: "var(--atlas-color-text-secondary)",
  fontSize: 13,
  lineHeight: "1.25rem",
} as const;

export const DefaultCard: Story = {
  render: (args) => (
    <Card {...args} style={{ width: 360 }}>
      <CardHeader>
        <CardTitle>Evaluation summary</CardTitle>
        <CardDescription>Latest run across production prompts.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={metricStyle}>
          <p style={metricValueStyle}>94.8%</p>
          <p style={mutedStyle}>Pass rate across 1,248 test cases</p>
        </div>
      </CardContent>
    </Card>
  ),
};

export const InteractiveCard: Story = {
  render: () => (
    <Card interactive variant="stroke" elevation="none" style={{ width: 360 }} aria-label="Open model risk review">
      <CardHeader>
        <CardTitle>Risk review</CardTitle>
        <CardDescription>3 regressions need owner approval.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={mutedStyle}>Interactive styling is visual only. Use a real link or button for navigation in production.</p>
      </CardContent>
    </Card>
  ),
};

export const CardWithActions: Story = {
  render: () => (
    <Card variant="stroke" style={{ width: 420 }}>
      <CardHeader>
        <CardTitle>Deployment approval</CardTitle>
        <CardDescription>Approve the tuned assistant model for the support workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={mutedStyle}>Accuracy improved by 4.2%. Escalation false positives decreased by 18%.</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">View report</Button>
        <Button trailingIcon={<ArrowRight />}>Approve</Button>
      </CardFooter>
    </Card>
  ),
};

export const CardWithForm: Story = {
  render: () => (
    <Card variant="stroke" elevation="small" style={{ width: 420 }}>
      <CardHeader>
        <CardTitle>Create evaluation</CardTitle>
        <CardDescription>Configure a new prompt regression check.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gap: "var(--atlas-space-md)" }}>
          <TextInput label="Evaluation name" placeholder="Support escalation QA" fullWidth required />
          <TextInput label="Dataset" placeholder="Select or paste dataset ID" helperText="Use a stable dataset for comparable runs." fullWidth />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button>Create evaluation</Button>
      </CardFooter>
    </Card>
  ),
};
