export const cardTokens = {
  background: "var(--atlas-card-background)",
  text: "var(--atlas-card-text)",
  description: "var(--atlas-card-description)",
  border: "var(--atlas-card-border)",
  radius: "var(--atlas-card-radius)",
  paddingMedium: "var(--atlas-card-padding-md)",
  paddingLarge: "var(--atlas-card-padding-lg)",
  gap: "var(--atlas-card-gap)",
  shadowSmall: "var(--atlas-card-shadow-small)",
  shadowMedium: "var(--atlas-card-shadow-medium)",
} as const;

export type CardToken = keyof typeof cardTokens;
