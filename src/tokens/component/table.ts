export const tableTokens = {
  background: "var(--atlas-table-background)",
  headerBackground: "var(--atlas-table-header-background)",
  rowHoverBackground: "var(--atlas-table-row-background-hover)",
  rowSelectedBackground: "var(--atlas-table-row-background-selected)",
  border: "var(--atlas-table-border)",
  text: "var(--atlas-table-text)",
  secondaryText: "var(--atlas-table-text-secondary)",
  radius: "var(--atlas-table-radius)",
  cellPaddingX: "var(--atlas-table-cell-padding-x)",
  cellPaddingY: "var(--atlas-table-cell-padding-y)",
  rowHeight: "var(--atlas-table-row-height)",
  rowHeightSmall: "var(--atlas-table-row-height-small)",
  headerHeight: "var(--atlas-table-header-height)",
  headerHeightSmall: "var(--atlas-table-header-height-small)",
} as const;

export type TableToken = keyof typeof tableTokens;
