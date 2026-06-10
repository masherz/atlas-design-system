import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Select, SelectContent, SelectOption, SelectTrigger } from "../Select";
import { TextInput } from "../TextInput";
import {
  DestructiveDialog,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "./Dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dialog implements the ThreatConnect dark theme modal structure: 572px dark shell, top close row, title with divider, body content, and footer actions. Use it for blocking decisions, focused forms, and confirmations that require explicit user response.",
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj;

const paragraphStyle = {
  margin: 0,
  color: "var(--atlas-dialog-description-color)",
  fontSize: "var(--atlas-dialog-description-font-size)",
  lineHeight: "var(--atlas-dialog-description-line-height)",
} as const;

const fieldStackStyle = {
  display: "grid",
  gap: "var(--atlas-space-ml)",
} as const;

const riskRationaleNotes = [
  "The AI flagged a liability clause that is wearing a tiny mustache and pretending to be standard language. Legal should review the carve-out before this agreement gets anywhere near approval.",
  "A data processing section appears to grant vendor access to more systems than the deal actually requires. The model recommends tightening scope before the contract starts collecting permissions like souvenirs.",
  "The termination language is technically present, but it exits the room right before explaining what happens to retained customer data. Ask for a clearer wind-down path.",
  "Payment terms look calm on the surface, but the renewal language quietly turns into an auto-renewal treadmill. Procurement should confirm the notice window and cancellation mechanics.",
  "The confidentiality clause covers the basics, then takes a scenic detour around model training data. Add explicit language for AI-generated analysis, prompts, and extracted contract metadata.",
  "Overall risk is manageable, but the agreement has enough sharp edges to deserve a human pass. Treat the summary as a spotlight, not a rubber stamp.",
];

const closeRowStyle = {
  display: "flex",
  height: "var(--atlas-dialog-close-row-height)",
  alignItems: "center",
  justifyContent: "flex-end",
} as const;

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--atlas-dialog-section-gap)",
  padding: "0 var(--atlas-dialog-main-padding-x) var(--atlas-dialog-main-padding-bottom)",
} as const;

function DialogStoryFrame({
  triggerLabel,
  children,
  defaultOpen = false,
}: {
  triggerLabel: string;
  children: (close: () => void) => React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        {children(() => setOpen(false))}
      </Dialog>
    </>
  );
}

function StandardDialogContent({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <>
      <DialogOverlay />
      <DialogContent>
        <div style={closeRowStyle}>
          <DialogClose />
        </div>
        <div style={mainStyle}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogBody>{children}</DialogBody>
          {footer}
        </div>
      </DialogContent>
    </>
  );
}

export const DefaultModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the default modal for blocking text-based decisions or short explanations that require a response. The title maps to the Figma header, the body maps to middle content, and the footer uses the right-aligned secondary and primary actions shown in the modal examples.",
      },
    },
  },
  render: () => (
    <DialogStoryFrame triggerLabel="Open default modal">
      {(close) => (
        <StandardDialogContent
          title="Modal title"
          footer={
            <DialogFooter align="end">
              <Button variant="secondary" size="large" onClick={close}>
                Cancel
              </Button>
              <Button size="large" onClick={close}>
                Button
              </Button>
            </DialogFooter>
          }
        >
          <DialogDescription>
            Main modal text goes here and explains the decision the user needs to make. Keep this content concise so the modal
            remains focused and does not become a multi-step workflow.
          </DialogDescription>
        </StandardDialogContent>
      )}
    </DialogStoryFrame>
  ),
};

export const ConfirmationModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use confirmation modals when the user needs to approve a consequential action. Accessibility relies on role='dialog', aria-modal, labelled title text, described body copy, focus trapping, Escape handling, and focus restoration.",
      },
    },
  },
  render: () => (
    <DialogStoryFrame triggerLabel="Open confirmation modal">
      {(close) => (
        <StandardDialogContent
          title="Approve contract review"
          footer={
            <DialogFooter align="end">
              <Button variant="secondary" size="large" onClick={close}>
                Cancel
              </Button>
              <Button size="large" onClick={close}>
                Approve
              </Button>
            </DialogFooter>
          }
        >
          <DialogDescription>
            Approving this review will publish the AI-generated risk summary to the legal operations workspace.
          </DialogDescription>
        </StandardDialogContent>
      )}
    </DialogStoryFrame>
  ),
};

export const DestructiveActionModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use destructive dialogs for irreversible actions. The red action maps to the Figma destructive modal and must be paired with explicit consequence copy.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete review
        </Button>
        <DestructiveDialog
          open={open}
          onOpenChange={setOpen}
          title="Delete"
          description="Are you sure you want to delete Vendor MSA Review? This action can't be undone."
          cancelAction={{ label: "Cancel", onClick: () => setOpen(false) }}
          confirmAction={{ label: "Delete", onClick: () => setOpen(false) }}
        />
      </>
    );
  },
};

export const LongContentModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use a scrollable body only when the modal content can stay within one focused task. If the content becomes a workflow or a page, use a full page pattern instead of a modal.",
      },
    },
  },
  render: () => (
    <DialogStoryFrame triggerLabel="Open long content modal">
      {(close) => (
        <StandardDialogContent
          title="AI risk rationale"
          footer={
            <DialogFooter align="end">
              <Button variant="secondary" size="large" onClick={close}>
                Cancel
              </Button>
              <Button size="large" onClick={close}>
                Confirm
              </Button>
            </DialogFooter>
          }
        >
          <div style={{ maxHeight: "18rem", overflow: "auto", display: "grid", gap: "var(--atlas-space-md)" }}>
            {riskRationaleNotes.map((note, index) => (
              <p key={index} style={paragraphStyle}>
                {note}
              </p>
            ))}
          </div>
        </StandardDialogContent>
      )}
    </DialogStoryFrame>
  ),
};

export const FormModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use form modals for short, contained data entry. The form follows the Figma input modal: close affordance, title divider, two stacked fields, tertiary left action, and right-aligned secondary and primary actions.",
      },
    },
  },
  render: () => (
    <DialogStoryFrame triggerLabel="Open form modal">
      {(close) => (
        <StandardDialogContent
          title="Assign review owner"
          footer={
            <DialogFooter>
              <Button variant="tertiary" size="large">
                Tertiary
              </Button>
              <div style={{ display: "flex", gap: "var(--atlas-space-md)" }}>
                <Button variant="secondary" size="large" onClick={close}>
                  Cancel
                </Button>
                <Button size="large" onClick={close}>
                  Button
                </Button>
              </div>
            </DialogFooter>
          }
        >
          <div style={fieldStackStyle}>
            <TextInput label="Owner" defaultValue="Owner name" helperText="Helper text goes here" fullWidth />
            <Select label="Review queue" defaultValue="legal" placeholder="Select queue">
              <SelectTrigger />
              <SelectContent>
                <SelectOption value="legal">Legal operations</SelectOption>
                <SelectOption value="procurement">Procurement</SelectOption>
                <SelectOption value="security">Security review</SelectOption>
              </SelectContent>
            </Select>
          </div>
        </StandardDialogContent>
      )}
    </DialogStoryFrame>
  ),
};

export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use loading actions when the modal is waiting on a server-side operation. Keep focus inside the dialog and expose loading with aria-busy on the button while preventing duplicate submission.",
      },
    },
  },
  render: () => (
    <DialogStoryFrame triggerLabel="Open loading modal">
      {(close) => (
        <StandardDialogContent
          title="Create policy check"
          footer={
            <DialogFooter align="end">
              <Button variant="secondary" size="large" onClick={close} disabled>
                Cancel
              </Button>
              <Button size="large" loading loadingLabel="Creating policy check">
                Create
              </Button>
            </DialogFooter>
          }
        >
          <DialogDescription>Creating a policy check and connecting it to the selected contract workspace.</DialogDescription>
        </StandardDialogContent>
      )}
    </DialogStoryFrame>
  ),
};

export const ResponsiveMobileBehavior: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "On narrow screens, the same Figma modal shell becomes a bottom-aligned sheet with full-width actions. This is the one responsive extension added because the Figma frame only documents desktop sizing.",
      },
    },
  },
  render: () => (
    <DialogStoryFrame triggerLabel="Open mobile modal">
      {(close) => (
        <StandardDialogContent
          title="Escalate review"
          footer={
            <DialogFooter align="end">
              <Button variant="secondary" size="large" onClick={close} fullWidth>
                Cancel
              </Button>
              <Button size="large" onClick={close} fullWidth>
                Escalate
              </Button>
            </DialogFooter>
          }
        >
          <DialogDescription>
            Send this contract to senior counsel with the generated risk findings and supporting clause evidence.
          </DialogDescription>
        </StandardDialogContent>
      )}
    </DialogStoryFrame>
  ),
};
