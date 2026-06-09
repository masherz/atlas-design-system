import styles from "./Field.module.css";
import type { FieldErrorTextProps } from "./Field.types";

export function FieldErrorText({ id, children, live = true }: FieldErrorTextProps) {
  return (
    <p id={id} className={styles.errorText} role={live ? "alert" : undefined}>
      {children}
    </p>
  );
}
