export const primitiveTypography = {
  fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  label2: {
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
    fontWeight: 700,
  },
  body2: {
    fontSize: "0.8125rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
  },
} as const;

export type PrimitiveTypographyToken = keyof typeof primitiveTypography;
