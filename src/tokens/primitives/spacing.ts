export const primitiveSpacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  ml: "1.5rem",
  lg: "2rem",
  xl: "2.5rem",
  xxl: "4rem",
} as const;

export type PrimitiveSpacingToken = keyof typeof primitiveSpacing;
