import type { HTMLAttributes } from "react";

export type InterchangeableIconName =
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "eye"
  | "pencil"
  | "plus"
  | "search"
  | "sort-asc"
  | "sort-desc"
  | "trash"
  | "x";

export type InterchangeableIconProps = HTMLAttributes<HTMLSpanElement> & {
  icon: InterchangeableIconName;
  size?: 12 | 14 | 16 | 18 | 20 | 24;
};
