import type { HTMLAttributes } from "react";
import { Checkbox } from "../Checkbox";
import { InterchangeableIcon } from "../Icon";
import { IconButton } from "../IconButton";
import styles from "./Table.module.css";
import type {
  SortableTableHeadProps,
  TableBodyProps,
  TableCellProps,
  TableHeadProps,
  TableHeaderProps,
  TableLoadingStateProps,
  TablePaginationProps,
  TableProps,
  TableActionButtonProps,
  TableToolbarButtonProps,
  TableRowActionsProps,
  TableRowProps,
  TableStateProps,
  TableStatusBadgeProps,
  TableToolbarProps,
  StatusBadgeProps,
} from "./Table.types";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export function Table({ className, caption, density = "large", children, ...props }: TableProps) {
  return (
    <div className={styles.tableRoot}>
      <table {...props} className={cx(styles.table, className)} data-density={density}>
        {caption ? <TableCaption>{caption}</TableCaption> : null}
        {children}
      </table>
    </div>
  );
}

export function TableCaption({ className, ...props }: HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption {...props} className={cx(styles.caption, className)} />;
}

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead {...props} className={cx(styles.header, className)} />;
}

export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody {...props} className={cx(styles.body, className)} />;
}

export function TableRow({ className, selected = false, rowHeight = "two-line", ...props }: TableRowProps) {
  return (
    <tr
      {...props}
      className={cx(styles.row, className)}
      data-selected={selected ? "true" : undefined}
      data-row-height={rowHeight}
      aria-selected={selected || undefined}
    />
  );
}

export function TableHead({ className, active = false, align = "start", scope = "col", ...props }: TableHeadProps) {
  return <th {...props} scope={scope} className={cx(styles.head, className)} data-active={active ? "true" : undefined} data-align={align} />;
}

export function SortableTableHead({ children, sortDirection = "none", onSort, active, ...props }: SortableTableHeadProps) {
  const ariaSort = sortDirection === "none" ? undefined : sortDirection;

  return (
    <TableHead {...props} active={active ?? sortDirection !== "none"} aria-sort={ariaSort}>
      <button type="button" className={styles.sortButton} onClick={onSort}>
        <span className={styles.truncate}>{children}</span>
        {sortDirection === "ascending" ? <InterchangeableIcon icon="sort-asc" size={16} aria-hidden="true" /> : null}
        {sortDirection === "descending" ? <InterchangeableIcon icon="sort-desc" size={16} aria-hidden="true" /> : null}
      </button>
    </TableHead>
  );
}

export function TableCell({ className, align = "start", ...props }: TableCellProps) {
  return <td {...props} className={cx(styles.cell, className)} data-align={align} />;
}

export function TableEmptyState({ colSpan, title, description, action }: TableStateProps) {
  return <TableState colSpan={colSpan} title={title} description={description} action={action} />;
}

export function TableErrorState({ colSpan, title, description, action }: TableStateProps) {
  return <TableState colSpan={colSpan} title={title} description={description} action={action} tone="danger" />;
}

function TableState({ colSpan, title, description, action, tone = "neutral" }: TableStateProps & { tone?: "neutral" | "danger" }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className={styles.stateCell}>
        <div className={styles.stateContent} data-tone={tone}>
          <p className={styles.stateTitle}>{title}</p>
          {description ? <p className={styles.stateDescription}>{description}</p> : null}
          {action ? <div>{action}</div> : null}
        </div>
      </TableCell>
    </TableRow>
  );
}

export function TableLoadingState({ colSpan, rows = 5, label = "Loading table data" }: TableLoadingStateProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} aria-label={rowIndex === 0 ? label : undefined}>
          {Array.from({ length: colSpan }).map((__, cellIndex) => (
            <TableCell key={cellIndex}>
              <span className={styles.skeleton} style={{ width: `${cellIndex === 0 ? 78 : 52 + ((rowIndex + cellIndex) % 4) * 10}%` }} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function TableToolbar({ className, selectedCount = 0, bulkActions, sortControl, children, ...props }: TableToolbarProps) {
  return (
    <div {...props} className={cx(styles.toolbar, className)}>
      <div className={styles.toolbarGroup}>
        {selectedCount > 0 ? (
          <div className={styles.bulkSelect}>
            <Checkbox aria-label="Select all visible rows" indeterminate />
            {selectedCount} Selected
            <InterchangeableIcon icon="chevron-down" size={14} aria-hidden="true" />
          </div>
        ) : null}
        {bulkActions}
        {children}
      </div>
      {sortControl ? <div className={styles.toolbarGroup}>{sortControl}</div> : null}
    </div>
  );
}

export function TableToolbarButton({ className, type = "button", ...props }: TableToolbarButtonProps) {
  return <button {...props} type={type} className={cx(styles.toolbarButton, className)} />;
}

export function TablePagination({ className, page, pageSize, totalItems, onPrevious, onNext, ...props }: TablePaginationProps) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div {...props} className={cx(styles.pagination, className)}>
      <IconButton size="28" icon="chevron-left" onClick={onPrevious} disabled={page <= 1} aria-label="Previous page" />
      <span>
        {start}-{end} of {totalItems}
      </span>
      <IconButton size="28" icon="chevron-right" onClick={onNext} disabled={end >= totalItems} aria-label="Next page" />
      <TableToolbarButton aria-label={`Rows per page: ${pageSize}`}>
        {pageSize}
        <InterchangeableIcon icon="chevron-down" size={14} aria-hidden="true" />
      </TableToolbarButton>
    </div>
  );
}

export function TableRowActions({ className, children, ...props }: TableRowActionsProps) {
  return <div {...props} className={cx(styles.rowActions, className)}>{children}</div>;
}

export function TableActionButton({ className, children, icon, type = "button", ...props }: TableActionButtonProps) {
  return <IconButton {...props} type={type} className={className} size="28" icon={icon ?? children} />;
}

export function TableStatusBadge({ className, tone = "neutral", children, ...props }: TableStatusBadgeProps) {
  return (
    <span {...props} className={cx(styles.statusBadge, className)} data-tone={tone}>
      <span className={styles.statusDot} aria-hidden="true" />
      {children}
    </span>
  );
}

export function TableTag({ className, tone = "neutral", children, ...props }: StatusBadgeProps) {
  return (
    <span {...props} className={cx(styles.tag, className)} data-tone={tone}>
      {children}
    </span>
  );
}
