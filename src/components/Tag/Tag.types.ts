import type { HTMLAttributes, ReactNode } from "react";
import type { InterchangeableIconName } from "../Icon";

export type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  /**
   * Short category label. Figma guidance recommends easy-scanning labels.
   */
  label: ReactNode;
  /**
   * Optional leading icon. Defaults to the Figma-style eye icon when true.
   */
  leftIcon?: boolean | InterchangeableIconName | ReactNode;
  /**
   * Optional count indicator rendered as the small number pill.
   */
  count?: ReactNode;
  /**
   * Shows the remove affordance.
   */
  removable?: boolean;
  /**
   * Called when the remove affordance is activated.
   */
  onRemove?: () => void;
  /**
   * Accessible name for the remove button.
   */
  removeLabel?: string;
  /**
   * Applies selected/pressed-like styling for filter chips or active categorization.
   */
  selected?: boolean;
};

export type TagCloudProps = HTMLAttributes<HTMLDivElement>;
