import styles from "./Icon.module.css";
import type { CSSProperties } from "react";
import type { InterchangeableIconName, InterchangeableIconProps } from "./Icon.types";
import checkIcon from "./assets/check.svg";
import chevronDownIcon from "./assets/chevron-down.svg";
import chevronLeftIcon from "./assets/chevron-left.svg";
import chevronRightIcon from "./assets/chevron-right.svg";
import chevronUpIcon from "./assets/chevron-up.svg";
import eyeIcon from "./assets/eye.svg";
import pencilIcon from "./assets/pencil.svg";
import plusIcon from "./assets/plus.svg";
import searchIcon from "./assets/search.svg";
import sortAscIcon from "./assets/sort-asc.svg";
import sortDescIcon from "./assets/sort-desc.svg";
import trashIcon from "./assets/trash.svg";
import xIcon from "./assets/x.svg";

const iconAssetByName: Record<InterchangeableIconName, string> = {
  check: checkIcon,
  "chevron-down": chevronDownIcon,
  "chevron-left": chevronLeftIcon,
  "chevron-right": chevronRightIcon,
  "chevron-up": chevronUpIcon,
  eye: eyeIcon,
  pencil: pencilIcon,
  plus: plusIcon,
  search: searchIcon,
  "sort-asc": sortAscIcon,
  "sort-desc": sortDescIcon,
  trash: trashIcon,
  x: xIcon,
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export function InterchangeableIcon({ icon, size = 24, className, style, ...props }: InterchangeableIconProps) {
  return (
    <span
      {...props}
      className={cx(styles.icon, className)}
      style={{ "--atlas-icon-size": `${size}px`, ...style } as CSSProperties}
      data-icon={icon}
    >
      <img src={iconAssetByName[icon]} alt="" aria-hidden="true" />
    </span>
  );
}
