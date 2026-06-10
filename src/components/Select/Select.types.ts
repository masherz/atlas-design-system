import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { FieldBaseProps } from "../Field";

export type SelectValue = string | string[];

export type SelectContextValue = {
  open: boolean;
  multiple: boolean;
  disabled: boolean;
  invalid: boolean;
  searchable: boolean;
  value: string[];
  inputId: string;
  labelId?: string;
  contentId: string;
  describedBy?: string;
  placeholder?: ReactNode;
  searchValue: string;
  setOpen: (open: boolean) => void;
  setSearchValue: (value: string) => void;
  isSelected: (value: string) => boolean;
  selectValue: (value: string, label: ReactNode) => void;
  removeValue: (value: string) => void;
  getLabel: (value: string) => ReactNode;
  registerOption: (value: string, label: ReactNode) => void;
};

export type SelectProps = Omit<FieldBaseProps, "readOnly" | "size"> & {
  value?: SelectValue;
  defaultValue?: SelectValue;
  onValueChange?: (value: SelectValue) => void;
  placeholder?: ReactNode;
  multiple?: boolean;
  searchable?: boolean;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
};

export type SelectTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children?: ReactNode;
};

export type SelectContentProps = HTMLAttributes<HTMLDivElement>;

export type SelectOptionProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  value: string;
  children: ReactNode;
  disabled?: boolean;
};

export type SelectGroupProps = HTMLAttributes<HTMLDivElement>;

export type SelectLabelProps = HTMLAttributes<HTMLDivElement>;

export type SelectSeparatorProps = HTMLAttributes<HTMLDivElement>;

export type ComboboxProps = SelectProps;
export type SearchableComboboxProps = SelectProps;
