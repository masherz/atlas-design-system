import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./IconButton";
import styles from "./IconButtonStories.module.css";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          "IconButton maps to the Jam Design System Icon Button component. It is for compact icon-only actions in enterprise toolbars, data tables, pagination, and dense SaaS workflows. Every icon-only button must have an accessible name with aria-label or aria-labelledby.",
      },
    },
  },
  args: {
    icon: "plus",
    "aria-label": "Add item",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["no-border", "with-border", "background-no-border"],
      description: "Maps to Figma Type: No Border, With Border, Background No Border.",
    },
    size: {
      control: "select",
      options: ["32", "28", "24"],
      description: "Maps to Figma sizes. Icon containers are 24px, 20px, and 16px respectively.",
    },
    active: {
      control: "boolean",
      description: "Applies active/pressed styling and aria-pressed.",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants = ["no-border", "with-border", "background-no-border"] as const;
const sizes = ["32", "28", "24"] as const;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default icon buttons are used when surrounding layout or table structure already communicates the action group. This maps to Figma's inactive/default state.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className={styles.stack}>
      {variants.map((variant) => (
        <section className={styles.group} key={variant}>
          <h3>{variant}</h3>
          <div className={styles.row}>
            {sizes.map((size) => (
              <IconButton key={`${variant}-${size}`} variant={variant} size={size} icon="plus" aria-label={`Add item, ${variant}, ${size}px`} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The component exposes the three Figma visual types and three fixed sizes: 32px, 28px, and 24px.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className={styles.stack}>
      {variants.map((variant) => (
        <section className={styles.group} key={variant}>
          <h3>{variant}</h3>
          <div className={styles.stateGrid}>
            <span>Default</span>
            <span>Hover</span>
            <span>Focus</span>
            <span>Disabled</span>
            <span>Active</span>
            <IconButton variant={variant} icon="plus" aria-label={`${variant} default`} />
            <IconButton className={styles.forceHover} variant={variant} icon="plus" aria-label={`${variant} hover preview`} />
            <IconButton className={styles.forceFocus} variant={variant} icon="plus" aria-label={`${variant} focus preview`} />
            <IconButton variant={variant} icon="plus" aria-label={`${variant} disabled`} disabled />
            <IconButton variant={variant} icon="plus" aria-label={`${variant} active`} active />
          </div>
        </section>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "State coverage follows Figma: default, hover, focus, disabled, and active. Focus is rendered with a visible blue ring for keyboard users.",
      },
    },
  },
};

export const TableActions: Story = {
  render: () => (
    <div className={styles.row}>
      <IconButton size="28" icon="eye" aria-label="View contract" />
      <IconButton size="28" icon="pencil" aria-label="Edit contract" />
      <IconButton size="28" icon="trash" aria-label="Delete contract" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use no-border icon buttons for dense row actions. Each action has a specific accessible name so screen reader users do not hear only the icon name.",
      },
    },
  },
};
