export const primitiveColors = {
  base01: "#111111",
  base02: "#1D1D1D",
  base03: "#252525",
  base04: "#575757",
  primary: "#174BCC",
  primaryHover: "#1D55D8",
  primaryActive: "#123EA8",
  hoverMain: "#191D26",
  hoverAccent: "#283550",
  activeMain: "#1E222C",
  activeAccent: "#272D3A",
  border01: "#3F3F45",
  border02: "#333338",
  border03: "#6F737C",
  borderFocus: "#3A59A6",
  textBody: "#EFEFEF",
  textTertiary: "#949494",
  textOnPrimary: "#FFFFFF",
  textLink: "#76BBFF",
} as const;

export type PrimitiveColorToken = keyof typeof primitiveColors;
