export const primitiveRadii = {
  checkbox: "0.125rem",
  default: "0.25rem",
} as const;

export type PrimitiveRadiusToken = keyof typeof primitiveRadii;
