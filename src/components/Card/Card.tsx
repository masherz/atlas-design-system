import { forwardRef } from "react";
import styles from "./Card.module.css";
import type { CardDescriptionProps, CardProps, CardSectionProps, CardTitleProps } from "./Card.types";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      elevation = "small",
      padding = "medium",
      interactive = false,
      fullWidth = false,
      tabIndex,
      ...cardProps
    },
    ref,
  ) => (
    <div
      {...cardProps}
      ref={ref}
      tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
      className={cx(styles.card, className)}
      data-variant={variant}
      data-elevation={elevation}
      data-padding={padding}
      data-interactive={interactive ? "true" : undefined}
      data-full-width={fullWidth ? "true" : undefined}
    />
  ),
);

Card.displayName = "Card";

export function CardHeader({ className, ...props }: CardSectionProps) {
  return <div {...props} className={cx(styles.header, className)} />;
}

export function CardTitle({ as: Component = "h3", className, ...props }: CardTitleProps) {
  return <Component {...props} className={cx(styles.title, className)} />;
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <p {...props} className={cx(styles.description, className)} />;
}

export function CardContent({ className, ...props }: CardSectionProps) {
  return <div {...props} className={cx(styles.content, className)} />;
}

export function CardFooter({ className, ...props }: CardSectionProps) {
  return <div {...props} className={cx(styles.footer, className)} />;
}
