import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag, TagCloud } from "./Tag";
import styles from "./TagStories.module.css";

const meta = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    docs: {
      description: {
        component:
          "Tags label, categorize, or organize items using short keywords. This implementation follows the Jam Design System dark theme: 20px height, 24px pill radius, 12px horizontal padding, 8px internal gap, optional left icon, count, and removable affordance.",
      },
    },
  },
  args: {
    label: "Super Long Label",
  },
  argTypes: {
    leftIcon: {
      control: "boolean",
      description: "Adds the 12px leading icon shown in Figma.",
    },
    count: {
      control: "text",
      description: "Adds the 16px number pill.",
    },
    removable: {
      control: "boolean",
      description: "Adds a remove button. Use onRemove for removable tags.",
    },
    selected: {
      control: "boolean",
      description: "Applies active/hover styling for selected filters or active categorization.",
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use default tags for passive categorization. Tags should be short and scannable; use buttons instead when the primary purpose is to trigger an action.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className={styles.stateGrid}>
      <span>Default</span>
      <span>Hover</span>
      <span>Focus / remove focus</span>
      <Tag label="Super Long Label" />
      <Tag className={styles.forceHover} label="Super Long Label" />
      <Tag className={styles.forceFocus} label="Super Long Label" removable removeLabel="Remove Super Long Label" />
      <Tag label="Super Long Label" removable />
      <Tag className={styles.forceHover} label="Super Long Label" removable />
      <Tag className={styles.forceRemoveHover} label="Super Long Label" removable />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Figma shows default, hover, hover-within-tag for the remove affordance, and focus. Keyboard focus is exposed on the remove button when the tag is removable.",
      },
    },
  },
};

export const Combinations: Story = {
  render: () => (
    <div className={styles.stack}>
      <div className={styles.row}>
        <Tag label="Super Long Label" removable count="16+" />
        <Tag label="Super Long Label" removable leftIcon />
        <Tag label="Super Long Label" removable count="16+" leftIcon />
        <Tag label="Super Long Label" count="16+" leftIcon />
      </div>
      <div className={styles.row}>
        <Tag label="Data privacy" count="8" />
        <Tag label="Security review" leftIcon />
        <Tag label="AI clause" removable />
        <Tag label="High priority" removable count="3" leftIcon />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Figma combinations include removable, number, left icon, removable plus number, removable plus left icon, and all three together.",
      },
    },
  },
};

export const TagCloudStory: Story = {
  name: "Tag Cloud",
  render: () => (
    <TagCloud className={styles.cloudExample} aria-label="Contract categories">
      <Tag label="Data processing" />
      <Tag label="AI terms" />
      <Tag label="Renewal" />
      <Tag label="Privacy" />
      <Tag label="Security" count="4" />
      <Tag label="Escalated" removable />
    </TagCloud>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Figma specifies that more than three tags should be placed in a tag cloud. The TagCloud helper uses flex-wrap and the 8px spacing token.",
      },
    },
  },
};

export const RemovableAccessibility: Story = {
  render: () => <Tag label="Security review" removable onRemove={() => undefined} removeLabel="Remove Security review tag" />,
  parameters: {
    docs: {
      description: {
        story:
          "Removable tags expose the remove affordance as a real button. Provide a specific removeLabel when the visible tag label is not enough context.",
      },
    },
  },
};
