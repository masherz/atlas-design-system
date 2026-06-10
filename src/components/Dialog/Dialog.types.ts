import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  RefObject,
} from "react";
import type { ButtonVariant } from "../Button";

export type DialogOpenChangeHandler = (open: boolean) => void;

export type DialogProps = {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: DialogOpenChangeHandler;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  restoreFocus?: boolean;
  initialFocusRef?: RefObject<HTMLElement>;
};

export type DialogOverlayProps = HTMLAttributes<HTMLDivElement>;

export type DialogContentSize = "default";

export type DialogContentProps = HTMLAttributes<HTMLDivElement> & {
  size?: DialogContentSize;
};

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;
export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type DialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type DialogBodyProps = HTMLAttributes<HTMLDivElement>;

export type DialogFooterProps = HTMLAttributes<HTMLDivElement> & {
  align?: "between" | "end";
};

export type DialogCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

export type ConfirmationDialogAction = {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: Extract<ButtonVariant, "primary" | "danger">;
};

export type ConfirmationDialogProps = Omit<DialogProps, "children"> & {
  title: string;
  description: ReactNode;
  confirmAction: ConfirmationDialogAction;
  cancelAction?: ConfirmationDialogAction;
};

export type DestructiveDialogProps = ConfirmationDialogProps;
