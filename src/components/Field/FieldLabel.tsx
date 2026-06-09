import styles from "./Field.module.css";
import type { FieldLabelProps } from "./Field.types";

export function FieldLabel({ id, htmlFor, children, required = false, disabled = false }: FieldLabelProps) {
  return (
    <label id={id} htmlFor={htmlFor} className={styles.label} data-disabled={disabled ? "true" : undefined}>
      <span>{children}</span>
      {required ? (
        <span className={styles.required} aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}
