export const tagTokens = {
  height: "var(--atlas-tag-height)",
  radius: "var(--atlas-tag-radius)",
  paddingX: "var(--atlas-tag-padding-x)",
  gap: "var(--atlas-tag-gap)",
  background: "var(--atlas-tag-background)",
  hoverBackground: "var(--atlas-tag-background-hover)",
  border: "var(--atlas-tag-border)",
  focusBorder: "var(--atlas-tag-border-focus)",
  focusRing: "var(--atlas-tag-focus-ring)",
  text: "var(--atlas-tag-text)",
  hoverText: "var(--atlas-tag-text-hover)",
  icon: "var(--atlas-tag-icon)",
  hoverIcon: "var(--atlas-tag-icon-hover)",
  countBackground: "var(--atlas-tag-count-background)",
  countText: "var(--atlas-tag-count-text)",
  countHeight: "var(--atlas-tag-count-height)",
  removeSize: "var(--atlas-tag-remove-size)",
  cloudGap: "var(--atlas-tag-cloud-gap)",
} as const;

export type TagToken = keyof typeof tagTokens;
