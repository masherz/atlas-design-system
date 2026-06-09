import { forwardRef, isValidElement } from "react";
import { InterchangeableIcon } from "../Icon";
import type { InterchangeableIconName } from "../Icon";
import type { IconButtonProps } from "./IconButton.types";
import styles from "./IconButton.module.css";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const iconSizeByButtonSize = {
  "32": 24,
  "28": 20,
  "24": 16,
} as const;

const iconNames = new Set<string>([
  "check",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "eye",
  "pencil",
  "plus",
  "search",
  "sort-asc",
  "sort-desc",
  "trash",
  "x",
]);

function isInterchangeableIconName(icon: unknown): icon is InterchangeableIconName {
  return typeof icon === "string" && iconNames.has(icon);
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "no-border", size = "32", icon, active = false, type = "button", disabled = false, ...buttonProps }, ref) => {
    const iconNode =
      isInterchangeableIconName(icon) ? (
        <InterchangeableIcon icon={icon} size={iconSizeByButtonSize[size]} aria-hidden="true" />
      ) : isValidElement(icon) ? (
        icon
      ) : null;

    return (
      <button
        {...buttonProps}
        ref={ref}
        type={type}
        className={cx(styles.iconButton, className)}
        disabled={disabled}
        aria-pressed={active || undefined}
        data-variant={variant}
        data-size={size}
        data-active={active ? "true" : undefined}
      >
        <span className={styles.content} aria-hidden="true">
          {iconNode}
        </span>
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
