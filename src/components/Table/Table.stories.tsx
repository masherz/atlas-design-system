import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { InterchangeableIcon } from "../Icon";
import { TextInput } from "../TextInput";
import {
  SortableTableHead,
  Table,
  TableActionButton,
  TableBody,
  TableCell,
  TableEmptyState,
  TableErrorState,
  TableHead,
  TableHeader,
  TableLoadingState,
  TablePagination,
  TableRow,
  TableRowActions,
  TableStatusBadge,
  TableTag,
  TableToolbar,
  TableToolbarButton,
} from "./Table";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          "Atlas Table translates the Jam Design System Figma Table into semantic HTML for dense enterprise SaaS workflows. It preserves the documented dark table styling: base01 cells, base02 headers, base03 active sort headers, 16px cell padding, 28px toolbar controls, large/small densities, row dividers, selection, sortable headers, action cells, status indicators, tags, state rows, and pagination.",
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

type Contract = {
  id: string;
  name: string;
  company: string;
  status: "In review" | "Approved" | "Needs changes" | "Blocked";
  risk: "Low" | "Medium" | "High" | "Critical";
  owner: string;
  updated: string;
};

const contracts: Contract[] = [
  {
    id: "msa-acme",
    name: "Master Services Agreement",
    company: "Acme Robotics",
    status: "In review",
    risk: "Medium",
    owner: "Maya Chen",
    updated: "Today, 9:42 AM",
  },
  {
    id: "dpa-northstar",
    name: "Data Processing Addendum",
    company: "Northstar Health",
    status: "Needs changes",
    risk: "High",
    owner: "Luis Ortega",
    updated: "Yesterday",
  },
  {
    id: "vendor-horizon",
    name: "Vendor Security Addendum",
    company: "Horizon Bank",
    status: "Approved",
    risk: "Low",
    owner: "Priya Shah",
    updated: "Jun 7, 2026",
  },
  {
    id: "sow-quantum",
    name: "Statement of Work",
    company: "Quantum Freight",
    status: "Blocked",
    risk: "Critical",
    owner: "Jordan Lee",
    updated: "Jun 5, 2026",
  },
];

const riskTone = {
  Low: "success",
  Medium: "warning",
  High: "warning",
  Critical: "danger",
} as const;

const statusTone = {
  "In review": "info",
  Approved: "success",
  "Needs changes": "warning",
  Blocked: "danger",
} as const;

function Actions({ name }: { name: string }) {
  return (
    <TableRowActions>
      <TableActionButton aria-label={`Edit ${name}`}>
        <InterchangeableIcon icon="pencil" size={16} aria-hidden="true" />
      </TableActionButton>
      <TableActionButton aria-label={`Delete ${name}`}>
        <InterchangeableIcon icon="trash" size={16} aria-hidden="true" />
      </TableActionButton>
    </TableRowActions>
  );
}

function ContractRows({ selected = false }: { selected?: boolean }) {
  return (
    <>
      {contracts.map((contract, index) => (
        <TableRow key={contract.id} selected={selected && index === 1}>
          <TableCell>
            <Checkbox aria-label={`Select ${contract.name}`} defaultChecked={selected && index === 1} />
          </TableCell>
          <TableCell>
            <a href="#" style={{ color: "var(--atlas-color-text-link)", fontWeight: 700, textDecoration: "none" }}>
              {contract.name}
            </a>
            <div style={{ color: "var(--atlas-color-text-secondary)", fontSize: 12 }}>{contract.id}</div>
          </TableCell>
          <TableCell>{contract.company}</TableCell>
          <TableCell>
            <TableStatusBadge tone={statusTone[contract.status]}>{contract.status}</TableStatusBadge>
          </TableCell>
          <TableCell>
            <TableTag tone={riskTone[contract.risk]}>{contract.risk}</TableTag>
          </TableCell>
          <TableCell>{contract.owner}</TableCell>
          <TableCell>{contract.updated}</TableCell>
          <TableCell align="end">
            <Actions name={contract.name} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

function ContractTable({ sortable = false, selected = false }: { sortable?: boolean; selected?: boolean }) {
  return (
    <Table caption="Contract review queue">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox aria-label="Select all contracts" indeterminate={selected} />
          </TableHead>
          {sortable ? (
            <SortableTableHead sortDirection="ascending" onSort={() => undefined}>
              Contract name
            </SortableTableHead>
          ) : (
            <TableHead>Contract name</TableHead>
          )}
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Risk level</TableHead>
          <TableHead>Owner</TableHead>
          {sortable ? (
            <SortableTableHead sortDirection="descending" onSort={() => undefined}>
              Last updated
            </SortableTableHead>
          ) : (
            <TableHead>Last updated</TableHead>
          )}
          <TableHead align="end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <ContractRows selected={selected} />
      </TableBody>
    </Table>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the default table for dense read-only datasets where users need to scan records and compare columns. This maps to the Figma table example with large-format 42px headers, 61px two-line rows, dividers, link cells, tags, status indicators, and icon actions.",
      },
    },
  },
  render: () => <ContractTable />,
};

export const SortableColumns: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Sortable headers use aria-sort on the active column and a real button inside the header cell. The active sort treatment matches the stronger Figma header background.",
      },
    },
  },
  render: () => <ContractTable sortable />,
};

export const RowActions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Row actions are real icon buttons with accessible labels. They should be reserved for common row-level tasks such as edit, delete, open, or review.",
      },
    },
  },
  render: () => <ContractTable />,
};

export const SelectedRows: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Selected rows use aria-selected plus a selected background. Selection controls remain real checkboxes so keyboard and screen reader behavior stay native.",
      },
    },
  },
  render: () => (
    <>
      <TableToolbar
        selectedCount={1}
        bulkActions={
          <TableToolbarButton>
            Bulk Actions
          </TableToolbarButton>
        }
      />
      <ContractTable selected />
    </>
  ),
};

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Empty states remain valid table markup by rendering a full-width row with one cell. Use this when filters or initial setup produce no rows.",
      },
    },
  },
  render: () => (
    <Table caption="Contract review queue">
      <TableHeader>
        <TableRow>
          <TableHead>Contract name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Risk level</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmptyState
          colSpan={4}
          title="No contracts found"
          description="Try clearing filters or upload a contract to start AI review."
          action={<Button size="small">Upload contract</Button>}
        />
      </TableBody>
    </Table>
  ),
};

export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Loading states use skeleton rows inside the table body and respect reduced-motion preferences. The first row carries an accessible loading label.",
      },
    },
  },
  render: () => (
    <Table caption="Loading contract review queue">
      <TableHeader>
        <TableRow>
          <TableHead>Contract name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Risk level</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableLoadingState colSpan={6} rows={6} />
      </TableBody>
    </Table>
  ),
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Error states communicate failure in text and color, not color alone. Keep retry actions inside the state cell so the table structure remains intact.",
      },
    },
  },
  render: () => (
    <Table caption="Contract review queue error">
      <TableHeader>
        <TableRow>
          <TableHead>Contract name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Risk level</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableErrorState
          colSpan={4}
          title="Contract review data failed to load"
          description="The AI review service returned an unavailable response."
          action={<Button size="small" variant="secondary">Retry</Button>}
        />
      </TableBody>
    </Table>
  ),
};

export const ContractReviewExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A realistic AI legal SaaS workflow. The toolbar, selected-count control, sort control, semantic table, risk tags, status dots, row actions, and pagination map directly to the Figma table documentation.",
      },
    },
  },
  render: () => (
    <section style={{ display: "grid", gap: "var(--atlas-space-md)" }}>
      <TableToolbar
        selectedCount={1}
        bulkActions={
          <TableToolbarButton>
            Bulk Actions
          </TableToolbarButton>
        }
        sortControl={
          <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--atlas-space-sm)" }}>
            <span style={{ color: "var(--atlas-color-text-secondary)" }}>Sort By:</span>
            <TableToolbarButton>
              Last Updated
            </TableToolbarButton>
          </div>
        }
      >
        <div style={{ width: 280 }}>
          <TextInput
            aria-label="Search contracts"
            type="search"
            placeholder="Search contracts..."
            startIcon={<InterchangeableIcon icon="search" size={16} aria-hidden="true" />}
            size="small"
            fullWidth
          />
        </div>
      </TableToolbar>
      <ContractTable sortable selected />
      <TablePagination page={1} pageSize={10} totalItems={20} />
    </section>
  ),
};
