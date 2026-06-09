import { forwardRef } from "react";
import { FieldWrapper } from "../Field";
import styles from "./TextInput.module.css";
import type { TextInputProps } from "./TextInput.types";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      label,
      helperText,
      errorText,
      required = false,
      disabled = false,
      readOnly = false,
      fullWidth = false,
      size = "medium",
      startIcon,
      endIcon,
      className,
      type = "text",
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...inputProps
    },
    ref,
  ) => {
    return (
      <FieldWrapper
        id={id}
        label={label}
        helperText={helperText}
        errorText={errorText}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        fullWidth={fullWidth}
        size={size}
        className={cx(styles.root, className)}
      >
        {({ inputId, describedBy, invalid }) => {
          const mergedDescribedBy = [describedBy, ariaDescribedBy].filter(Boolean).join(" ") || undefined;

          return (
            <div
              className={styles.control}
              data-size={size}
              data-invalid={invalid ? "true" : undefined}
              data-disabled={disabled ? "true" : undefined}
              data-readonly={readOnly ? "true" : undefined}
            >
              {startIcon ? (
                <span className={cx(styles.icon, styles.iconStart)} aria-hidden="true">
                  {startIcon}
                </span>
              ) : null}
              <input
                {...inputProps}
                ref={ref}
                id={inputId}
                className={styles.input}
                type={type}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
                aria-label={ariaLabel}
                aria-invalid={invalid || undefined}
                aria-describedby={mergedDescribedBy}
              />
              {endIcon ? (
                <span className={cx(styles.icon, styles.iconEnd)} aria-hidden="true">
                  {endIcon}
                </span>
              ) : null}
            </div>
          );
        }}
      </FieldWrapper>
    );
  },
);

TextInput.displayName = "TextInput";
