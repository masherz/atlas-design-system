import type { HTMLAttributes, ReactNode } from "react";

export type CardVariant = "default" | "stroke";
export type CardElevation = "none" | "small" | "medium";
export type CardPadding = "none" | "medium" | "large";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  elevation?: CardElevation;
  padding?: CardPadding;
  interactive?: boolean;
  fullWidth?: boolean;
};

export type CardSectionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
};

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};
