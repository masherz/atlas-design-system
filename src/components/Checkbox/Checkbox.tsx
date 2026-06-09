import { forwardRef, useEffect, useId, useRef } from "react";
import checkIcon from "../Icon/assets/check.svg";
import styles from "./Checkbox.module.css";
import type { CheckboxProps } from "./Checkbox.types";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      className,
      label,
      subtext,
      errorText,
      required = false,
      disabled = false,
      indeterminate = false,
      checked,
      defaultChecked,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...inputProps
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? `atlas-checkbox-${generatedId}`;
    const subtextId = subtext ? `${inputId}-subtext` : undefined;
    const errorId = errorText ? `${inputId}-error` : undefined;
    const describedBy = [subtextId, errorId, ariaDescribedBy].filter(Boolean).join(" ") || undefined;
    const localRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (localRef.current) {
        localRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className={cx(styles.root, className)} data-disabled={disabled ? "true" : undefined} data-invalid={errorText ? "true" : undefined}>
        <div className={styles.container}>
          <label className={styles.area} htmlFor={inputId}>
            <input
              {...inputProps}
              ref={(node) => {
                localRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) ref.current = node;
              }}
              id={inputId}
              className={styles.input}
              type="checkbox"
              checked={checked}
              defaultChecked={defaultChecked}
              required={required}
              disabled={disabled}
              aria-label={ariaLabel}
              aria-invalid={errorText ? true : undefined}
              aria-describedby={describedBy}
              data-indeterminate={indeterminate ? "true" : undefined}
            />
              <span className={styles.box} aria-hidden="true">
                <span className={styles.indicator} data-state="checked">
                  <img className={styles.checkMark} src={checkIcon} alt="" aria-hidden="true" />
                </span>
              <span className={styles.indicator} data-state="indeterminate">
                <span className={styles.minusMark} />
              </span>
            </span>
            {label ? (
              <span className={styles.label}>
                <span>{label}</span>
                {required ? (
                  <span className={styles.required} aria-hidden="true">
                    *
                  </span>
                ) : null}
              </span>
            ) : null}
          </label>
          {subtext ? (
            <p id={subtextId} className={styles.subtext}>
              {subtext}
            </p>
          ) : null}
          {errorText ? (
            <p id={errorId} className={cx(styles.error, styles.errorRow)} role="alert">
              {errorText}
            </p>
          ) : null}
        </div>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
