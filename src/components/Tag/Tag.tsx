import { isValidElement } from "react";
import { InterchangeableIcon } from "../Icon";
import type { InterchangeableIconName } from "../Icon";
import styles from "./Tag.module.css";
import type { TagCloudProps, TagProps } from "./Tag.types";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

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

export function Tag({
  className,
  label,
  leftIcon = false,
  count,
  removable = false,
  onRemove,
  removeLabel,
  selected = false,
  ...props
}: TagProps) {
  const iconNode =
    leftIcon === true ? (
      <InterchangeableIcon icon="eye" size={12} aria-hidden="true" />
    ) : isInterchangeableIconName(leftIcon) ? (
      <InterchangeableIcon icon={leftIcon} size={12} aria-hidden="true" />
    ) : isValidElement(leftIcon) ? (
      leftIcon
    ) : null;

  const labelText = typeof label === "string" ? label : "tag";

  return (
    <span {...props} className={cx(styles.tag, className)} data-selected={selected ? "true" : undefined}>
      {iconNode ? <span className={styles.leftIcon}>{iconNode}</span> : null}
      <span className={styles.label}>{label}</span>
      {count !== undefined && count !== null ? <span className={styles.count}>{count}</span> : null}
      {removable ? (
        <button type="button" className={styles.removeButton} onClick={onRemove} aria-label={removeLabel ?? `Remove ${labelText}`}>
          <InterchangeableIcon icon="x" size={14} aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
}

export function TagCloud({ className, ...props }: TagCloudProps) {
  return <div {...props} className={cx(styles.cloud, className)} />;
}
