export const semanticColors = {
  background: {
    default: "var(--atlas-color-background-default)",
    surface: "var(--atlas-color-background-surface)",
    subtle: "var(--atlas-color-background-subtle)",
    interactive: "var(--atlas-color-background-interactive)",
    interactiveHover: "var(--atlas-color-background-interactive-hover)",
    interactiveActive: "var(--atlas-color-background-interactive-active)",
  },
  text: {
    primary: "var(--atlas-color-text-primary)",
    secondary: "var(--atlas-color-text-secondary)",
    inverse: "var(--atlas-color-text-inverse)",
    link: "var(--atlas-color-text-link)",
    disabled: "var(--atlas-color-text-disabled)",
  },
  border: {
    default: "var(--atlas-color-border-default)",
    subtle: "var(--atlas-color-border-subtle)",
    strong: "var(--atlas-color-border-strong)",
    focus: "var(--atlas-color-border-focus)",
  },
  action: {
    primary: "var(--atlas-color-action-primary)",
    primaryHover: "var(--atlas-color-action-primary-hover)",
    primaryActive: "var(--atlas-color-action-primary-active)",
  },
} as const;

export type SemanticColorToken = typeof semanticColors;
