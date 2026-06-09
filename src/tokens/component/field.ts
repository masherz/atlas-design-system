export const fieldTokens = {
  gap: "var(--atlas-field-gap)",
  labelColor: "var(--atlas-field-label-color)",
  helperColor: "var(--atlas-field-helper-color)",
  errorColor: "var(--atlas-field-error-color)",
  controlHeightSmall: "var(--atlas-field-control-height-sm)",
  controlHeightMedium: "var(--atlas-field-control-height-md)",
  controlBorder: "var(--atlas-field-control-border)",
  controlBorderFocus: "var(--atlas-field-control-border-focus)",
  controlBorderError: "var(--atlas-field-control-border-error)",
} as const;

export type FieldToken = keyof typeof fieldTokens;
