export const buttonTokens = {
  radius: "var(--atlas-button-radius)",
  focusRing: "var(--atlas-button-focus-ring)",
  fontFamily: "var(--atlas-button-font-family)",
  fontSize: "var(--atlas-button-font-size)",
  fontWeight: "var(--atlas-button-font-weight)",
} as const;

export type ButtonToken = keyof typeof buttonTokens;
