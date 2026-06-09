import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import type { InterchangeableIconName } from "../Icon";

export type SortDirection = "ascending" | "descending" | "none";
export type TableDensity = "large" | "small";
export type BadgeTone = "neutral" | "info" | "success" | "warning" | "danger";
export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  caption?: ReactNode;
  density?: TableDensity;
};

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
  rowHeight?: "single" | "two-line";
};

export type TableHeadProps = Omit<ThHTMLAttributes<HTMLTableCellElement>, "align"> & {
  active?: boolean;
  align?: "start" | "center" | "end";
};

export type TableCellProps = Omit<TdHTMLAttributes<HTMLTableCellElement>, "align"> & {
  align?: "start" | "center" | "end";
};

export type TableStateProps = {
  colSpan: number;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export type TableLoadingStateProps = {
  colSpan: number;
  rows?: number;
  label?: string;
};

export type StatusBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  children: ReactNode;
};

export type SortableTableHeadProps = Omit<TableHeadProps, "children"> & {
  children: ReactNode;
  sortDirection?: SortDirection;
  onSort?: () => void;
};

export type TableToolbarProps = HTMLAttributes<HTMLDivElement> & {
  selectedCount?: number;
  bulkActions?: ReactNode;
  sortControl?: ReactNode;
};

export type TableToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type TablePaginationProps = HTMLAttributes<HTMLDivElement> & {
  page: number;
  pageSize: number;
  totalItems: number;
  onPrevious?: () => void;
  onNext?: () => void;
};

export type TableRowActionsProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export type TableActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: InterchangeableIconName;
};

export type TableStatusBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: StatusTone;
  children: ReactNode;
};
