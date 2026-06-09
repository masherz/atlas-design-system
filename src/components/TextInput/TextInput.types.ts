import type { InputHTMLAttributes, ReactNode } from "react";
import type { FieldBaseProps } from "../Field";

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "disabled" | "readOnly" | "required"> &
  FieldBaseProps & {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
  };
