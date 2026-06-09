import { useId } from "react";
import styles from "./Field.module.css";
import { FieldErrorText } from "./FieldErrorText";
import { FieldHelperText } from "./FieldHelperText";
import { FieldLabel } from "./FieldLabel";
import type { FieldWrapperProps } from "./Field.types";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export function FieldWrapper({
  id,
  label,
  helperText,
  errorText,
  required = false,
  disabled = false,
  fullWidth = false,
  children,
  className,
}: FieldWrapperProps) {
  const generatedId = useId();
  const inputId = id ?? `atlas-field-${generatedId}`;
  const labelId = `${inputId}-label`;
  const helperTextId = helperText ? `${inputId}-helper` : undefined;
  const errorTextId = errorText ? `${inputId}-error` : undefined;
  const describedBy = [helperTextId, errorTextId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(errorText);

  return (
    <div className={cx(styles.field, className)} data-full-width={fullWidth ? "true" : undefined}>
      {label ? (
        <FieldLabel id={labelId} htmlFor={inputId} required={required} disabled={disabled}>
          {label}
        </FieldLabel>
      ) : null}
      {children({
        inputId,
        labelId,
        helperTextId,
        errorTextId,
        describedBy,
        invalid,
      })}
      {helperText ? <FieldHelperText id={helperTextId} disabled={disabled}>{helperText}</FieldHelperText> : null}
      {errorText ? <FieldErrorText id={errorTextId}>{errorText}</FieldErrorText> : null}
    </div>
  );
}
