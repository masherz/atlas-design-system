import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "tertiary" | "danger";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> & {
  /**
   * Visual treatment that maps to enterprise action hierarchy.
   */
  variant?: ButtonVariant;
  /**
   * Density-aware sizing for toolbar, form, and page-level actions.
   */
  size?: ButtonSize;
  /**
   * Uses native disabled behavior and exposes aria-busy while preserving the button label.
   */
  loading?: boolean;
  /**
   * Optional accessible status label while loading. The visible children remain mounted.
   */
  loadingLabel?: string;
  /**
   * Expands the button to fill the available inline space.
   */
  fullWidth?: boolean;
  /**
   * Optional icon rendered before the label.
   */
  leadingIcon?: ReactNode;
  /**
   * Optional icon rendered after the label.
   */
  trailingIcon?: ReactNode;
  disabled?: boolean;
};
