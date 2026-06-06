import { forwardRef } from "react";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "medium",
      loading = false,
      loadingLabel = "Loading",
      fullWidth = false,
      leadingIcon,
      trailingIcon,
      type = "button",
      disabled = false,
      ...buttonProps
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        {...buttonProps}
        ref={ref}
        type={type}
        className={cx(styles.button, styles[variant], styles[size], className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-loading={loading ? "true" : undefined}
        data-full-width={fullWidth ? "true" : undefined}
      >
        {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
        <span className={styles.content}>
          {leadingIcon ? (
            <span className={styles.icon} aria-hidden="true">
              {leadingIcon}
            </span>
          ) : null}
          <span>{children}</span>
          {trailingIcon ? (
            <span className={styles.icon} aria-hidden="true">
              {trailingIcon}
            </span>
          ) : null}
        </span>
        {loading ? <span className="sr-only">{loadingLabel}</span> : null}
      </button>
    );
  },
);

Button.displayName = "Button";
