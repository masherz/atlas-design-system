import styles from "./Field.module.css";
import type { FieldHelperTextProps } from "./Field.types";

export function FieldHelperText({ id, children, disabled = false }: FieldHelperTextProps) {
  return (
    <p id={id} className={styles.helperText} data-disabled={disabled ? "true" : undefined}>
      {children}
    </p>
  );
}
