import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectOption, SelectSeparator, SelectTrigger, SearchableCombobox } from "./Select";
import styles from "./SelectStories.module.css";

const options = [
  { value: "option-1", label: "Option 1" },
  { value: "option-2", label: "Option 2" },
  { value: "option-3", label: "Option 3" },
  { value: "option-4", label: "Option 4" },
  { value: "option-5", label: "Option 5" },
];

const meta = {
  title: "Components/Select",
  component: Select,
  args: {
    children: null,
  },
  parameters: {
    docs: {
      description: {
        component:
          "Select follows the ThreatConnect dark theme dropdown. It uses FieldWrapper for labels, helper text, error text, and aria-describedby, while the popup uses listbox semantics for single-select, multi-select, and searchable combobox behavior.",
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicOptions() {
  return (
    <SelectContent>
      {options.map((option) => (
        <SelectOption key={option.value} value={option.value}>
          {option.label}
        </SelectOption>
      ))}
    </SelectContent>
  );
}

export const Default: Story = {
  render: () => (
    <Select label="Dropdown Label" placeholder="Select" defaultValue="option-1">
      <SelectTrigger />
      <BasicOptions />
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default maps to Figma's selected state: 32px trigger, 13px label/text, 4px radius, #1D1D1D trigger background, and #3E3F45 border.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Select label="Dropdown Label" placeholder="Select" disabled>
      <SelectTrigger />
      <BasicOptions />
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Disabled uses native button disabled behavior on the trigger, preventing pointer and keyboard interaction while preserving the field label.",
      },
    },
  },
};

export const Error: Story = {
  render: () => (
    <Select label="Dropdown Label" placeholder="Select" errorText="Select an owner before continuing." required>
      <SelectTrigger />
      <BasicOptions />
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Error wiring comes from FieldWrapper: the trigger receives aria-invalid and is described by the error text.",
      },
    },
  },
};

export const WithHelperText: Story = {
  render: () => (
    <Select label="Dropdown Label" helperText="Choose one organization for this assignment." placeholder="Select">
      <SelectTrigger />
      <BasicOptions />
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Helper text is associated with the trigger through aria-describedby using the shared form foundation.",
      },
    },
  },
};

export const LongOptionList: Story = {
  render: () => (
    <Select label="Dropdown Label" placeholder="Select">
      <SelectTrigger />
      <SelectContent className={styles.longList}>
        {Array.from({ length: 14 }, (_, index) => (
          <SelectOption key={index} value={`contract-${index + 1}`}>
            Contract review queue {index + 1}
          </SelectOption>
        ))}
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Long menus should preserve the Figma menu shell and become scrollable rather than growing beyond the viewport.",
      },
    },
  },
};

export const SearchableExample: Story = {
  render: () => (
    <SearchableCombobox label="Dropdown Label" placeholder="Select" defaultValue="org-2">
      <SelectTrigger />
      <SelectContent>
        <SelectOption value="select-all">Select all</SelectOption>
        <SelectLabel>Assign to select org(s):</SelectLabel>
        <SelectOption value="org-1">Org 1</SelectOption>
        <SelectOption value="org-2">Org 2</SelectOption>
        <SelectOption value="org-3">Org 3</SelectOption>
      </SelectContent>
    </SearchableCombobox>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Searchable Combobox shares the Select popup architecture and adds the 28px no-label search input shown in Figma.",
      },
    },
  },
};

export const MultiStateExample: Story = {
  render: () => (
    <div className={styles.examples}>
      <Select label="Default dropdown" placeholder="Select">
        <SelectTrigger />
        <BasicOptions />
      </Select>
      <Select label="Multi selected" multiple defaultValue={["user-1", "user-2"]}>
        <SelectTrigger />
        <SelectContent>
          <SelectOption value="user-1">User 1</SelectOption>
          <SelectOption value="user-2">User 2</SelectOption>
          <SelectOption value="user-3">User 3</SelectOption>
          <SelectOption value="user-4">User 4</SelectOption>
        </SelectContent>
      </Select>
      <Select label="Sections" multiple defaultValue={["user-1", "user-2"]}>
        <SelectTrigger />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category 1</SelectLabel>
            <SelectOption value="user-1">User 1</SelectOption>
            <SelectOption value="user-2">User 2</SelectOption>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Category 2</SelectLabel>
            <SelectOption value="user-3">User 3</SelectOption>
            <SelectOption value="user-4">User 4</SelectOption>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "This mirrors the Figma page's multi-state coverage: inactive, multi-selected, and sectioned multi-select. Multi-select options remain in the menu after selection.",
      },
    },
  },
};
