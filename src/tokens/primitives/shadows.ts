export const primitiveShadows = {
  xsmall: "0 2px 10px 0 rgba(0, 0, 0, 0.6)",
  small: "0 4px 10px 0 rgba(0, 0, 0, 0.9)",
  medium: "0 8px 16px 0 rgba(0, 0, 0, 1)",
  large: "0 0 20px 0 rgba(0, 0, 0, 0.9)",
  xlDrawer: "-6px 0 10px 0 rgba(0, 0, 0, 0.9)",
} as const;

export type PrimitiveShadowToken = keyof typeof primitiveShadows;
