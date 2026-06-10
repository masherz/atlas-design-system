import { createContext, useCallback, useContext, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { FieldWrapper } from "../Field";
import { InterchangeableIcon } from "../Icon";
import styles from "./Select.module.css";
import type {
  ComboboxProps,
  SearchableComboboxProps,
  SelectContentProps,
  SelectContextValue,
  SelectGroupProps,
  SelectLabelProps,
  SelectOptionProps,
  SelectProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValue,
} from "./Select.types";

const SelectContext = createContext<SelectContextValue | null>(null);

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

function toArray(value: SelectValue | undefined): string[] {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function useControllableArrayValue({
  value,
  defaultValue,
  multiple,
  onValueChange,
}: {
  value?: SelectValue;
  defaultValue?: SelectValue;
  multiple: boolean;
  onValueChange?: (value: SelectValue) => void;
}) {
  const [internalValue, setInternalValue] = useState<string[]>(toArray(defaultValue));
  const currentValue = value === undefined ? internalValue : toArray(value);

  const setValue = useCallback(
    (nextValue: string[]) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }
      onValueChange?.(multiple ? nextValue : nextValue[0] ?? "");
    },
    [multiple, onValueChange, value],
  );

  return [currentValue, setValue] as const;
}

function useControllableStringValue({
  value,
  defaultValue,
  onChange,
}: {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = value === undefined ? internalValue : value;

  const setValue = useCallback(
    (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [onChange, value],
  );

  return [currentValue, setValue] as const;
}

function useSelectContext(component: string) {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(`${component} must be used within Select.`);
  }
  return context;
}

export function Select({
  id,
  label,
  helperText,
  errorText,
  required = false,
  disabled = false,
  fullWidth = false,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select",
  multiple = false,
  searchable = false,
  searchValue,
  defaultSearchValue,
  onSearchValueChange,
  children,
  className,
}: SelectProps) {
  const generatedId = useId();
  const contentId = `${id ?? `atlas-select-${generatedId}`}-content`;
  const optionLabels = useRef(new Map<string, ReactNode>());
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useControllableArrayValue({ value, defaultValue, multiple, onValueChange });
  const [currentSearchValue, setCurrentSearchValue] = useControllableStringValue({
    value: searchValue,
    defaultValue: defaultSearchValue,
    onChange: onSearchValueChange,
  });

  return (
    <FieldWrapper
      id={id}
      label={label}
      helperText={helperText}
      errorText={errorText}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      className={cx(styles.root, className)}
    >
      {({ inputId, labelId, describedBy, invalid }) => {
        const registerOption = (optionValue: string, optionLabel: ReactNode) => {
          optionLabels.current.set(optionValue, optionLabel);
        };

        const context: SelectContextValue = {
          open,
          multiple,
          disabled,
          invalid,
          searchable,
          value: selectedValue,
          inputId,
          labelId,
          contentId,
          describedBy,
          placeholder,
          searchValue: currentSearchValue,
          setOpen,
          setSearchValue: setCurrentSearchValue,
          isSelected: (optionValue) => selectedValue.includes(optionValue),
          selectValue: (optionValue, optionLabel) => {
            optionLabels.current.set(optionValue, optionLabel);
            if (multiple) {
              const nextValue = selectedValue.includes(optionValue)
                ? selectedValue.filter((selected) => selected !== optionValue)
                : [...selectedValue, optionValue];
              setSelectedValue(nextValue);
            } else {
              setSelectedValue([optionValue]);
              setOpen(false);
            }
          },
          removeValue: (optionValue) => {
            setSelectedValue(selectedValue.filter((selected) => selected !== optionValue));
          },
          getLabel: (optionValue) => optionLabels.current.get(optionValue) ?? optionValue,
          registerOption,
        };

        return (
          <SelectContext.Provider value={context}>
            <div className={styles.select} data-open={open ? "true" : undefined} data-full-width={fullWidth ? "true" : undefined}>
              {children}
            </div>
          </SelectContext.Provider>
        );
      }}
    </FieldWrapper>
  );
}

export function SelectTrigger({ className, children, onKeyDown, onClick, type = "button", ...props }: SelectTriggerProps) {
  const context = useSelectContext("SelectTrigger");
  const selectedLabels = useMemo(() => context.value.map((selected) => context.getLabel(selected)), [context]);
  const hasValue = context.value.length > 0;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || context.disabled) return;
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      context.setOpen(true);
    }
    if (event.key === "Escape") {
      context.setOpen(false);
    }
  };

  return (
    <button
      {...props}
      id={context.inputId}
      type={type}
      className={cx(styles.trigger, className)}
      disabled={context.disabled}
      aria-haspopup="listbox"
      aria-expanded={context.open}
      aria-controls={context.contentId}
      aria-labelledby={context.labelId}
      aria-describedby={context.describedBy}
      aria-invalid={context.invalid || undefined}
      data-open={context.open ? "true" : undefined}
      data-invalid={context.invalid ? "true" : undefined}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          context.setOpen(!context.open);
        }
      }}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.triggerValue} data-placeholder={!hasValue ? "true" : undefined}>
        {children ??
          (context.multiple && hasValue ? (
            <>
              <SelectPill value={context.value[0]}>{selectedLabels[0]}</SelectPill>
              {context.value.length > 1 ? <span>Selected</span> : null}
            </>
          ) : hasValue ? (
            selectedLabels[0]
          ) : (
            context.placeholder
          ))}
      </span>
      <InterchangeableIcon icon={context.open ? "chevron-up" : "chevron-down"} size={20} aria-hidden="true" />
    </button>
  );
}

function SelectPill({ value, children }: { value: string; children: ReactNode }) {
  const context = useSelectContext("SelectPill");

  return (
    <span className={styles.pill}>
      <span>{children}</span>
      <span
        className={styles.pillRemove}
        role="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={(event) => {
          event.stopPropagation();
          context.removeValue(value);
        }}
      >
        <InterchangeableIcon icon="x" size={14} aria-hidden="true" />
      </span>
    </span>
  );
}

export function SelectContent({ className, children, onKeyDown, ...props }: SelectContentProps) {
  const context = useSelectContext("SelectContent");

  if (!context.open) {
    return null;
  }

  return (
    <div
      {...props}
      id={context.contentId}
      className={cx(styles.content, className)}
      role="listbox"
      aria-labelledby={context.labelId}
      aria-multiselectable={context.multiple || undefined}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === "Escape") {
          context.setOpen(false);
        }
      }}
    >
      {context.searchable ? <SelectSearch /> : null}
      {children}
    </div>
  );
}

function SelectSearch() {
  const context = useSelectContext("SelectSearch");

  return (
    <div className={styles.searchRow}>
      <input
        className={styles.searchInput}
        value={context.searchValue}
        onChange={(event) => context.setSearchValue(event.target.value)}
        placeholder="Filter..."
        aria-label="Filter options"
      />
      {context.searchValue ? (
        <button type="button" className={styles.clearSearch} onClick={() => context.setSearchValue("")} aria-label="Clear filter">
          <InterchangeableIcon icon="x" size={18} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

export function SelectOption({ className, value, children, disabled = false, onClick, ...props }: SelectOptionProps) {
  const context = useSelectContext("SelectOption");
  const selected = context.isSelected(value);

  context.registerOption(value, children);

  return (
    <div
      {...props}
      className={cx(styles.option, className)}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      data-selected={selected ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      tabIndex={disabled ? undefined : 0}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) {
          context.selectValue(value, children);
        }
      }}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          context.selectValue(value, children);
        }
      }}
    >
      {context.multiple ? (
        <span className={styles.optionCheckbox} data-checked={selected ? "true" : undefined} aria-hidden="true">
          {selected ? <InterchangeableIcon icon="check" size={12} aria-hidden="true" /> : null}
        </span>
      ) : (
        <span className={styles.optionCheckSlot} data-visible={selected ? "true" : undefined} aria-hidden="true">
          <InterchangeableIcon icon="check" size={16} aria-hidden="true" />
        </span>
      )}
      <span className={styles.optionText}>{children}</span>
    </div>
  );
}

export function SelectGroup({ className, ...props }: SelectGroupProps) {
  return <div {...props} className={cx(styles.group, className)} role="group" />;
}

export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return <div {...props} className={cx(styles.label, className)} />;
}

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return <div {...props} className={cx(styles.separator, className)} role="separator" />;
}

export function Combobox(props: ComboboxProps) {
  return <Select {...props} searchable />;
}

export function SearchableCombobox(props: SearchableComboboxProps) {
  return <Select {...props} searchable />;
}
