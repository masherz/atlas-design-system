import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { InterchangeableIconName } from "../Icon";

export type IconButtonVariant = "no-border" | "with-border" | "background-no-border";
export type IconButtonSize = "32" | "28" | "24";

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  /**
   * Visual treatment mapped from Figma: No Border, With Border, Background No Border.
   */
  variant?: IconButtonVariant;
  /**
   * Fixed square sizes from Figma. 32px is the default.
   */
  size?: IconButtonSize;
  /**
   * Icon name from the interchangeable icon set, or a custom decorative icon node.
   */
  icon: InterchangeableIconName | ReactNode;
  /**
   * Active/pressed visual state for toggle-like icon actions.
   */
  active?: boolean;
};
