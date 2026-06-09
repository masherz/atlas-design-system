import type { ReactNode } from "react";

export type FieldSize = "small" | "medium";

export type FieldBaseProps = {
  id?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  size?: FieldSize;
};

export type FieldRenderProps = {
  inputId: string;
  labelId: string;
  helperTextId?: string;
  errorTextId?: string;
  describedBy?: string;
  invalid: boolean;
};

export type FieldWrapperProps = FieldBaseProps & {
  children: (field: FieldRenderProps) => ReactNode;
  className?: string;
};

export type FieldLabelProps = {
  id?: string;
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
};

export type FieldHelperTextProps = {
  id?: string;
  children: ReactNode;
  disabled?: boolean;
};

export type FieldErrorTextProps = {
  id?: string;
  children: ReactNode;
  live?: boolean;
};
