import {
  CompositionEventHandler,
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
} from "react";

export type PrimaryButtonProps = {
  className?: string;
  onClick: () => void;
  label?: string;
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
};

export type TextInputProps = {
  variant?: "standard" | "filled" | "outlined" | undefined;
  autoFocus?: boolean;
  fullWidth?: boolean;
  label?: string;
  multiline?: boolean;
  required?: boolean;
  rows?: number;
  value: string | number;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onCompositionStart?: CompositionEventHandler<HTMLDivElement>;
  onCompositionEnd?: CompositionEventHandler<HTMLDivElement>;
};

export type SelectBoxProps = {
  label: string;
  required?: boolean;
  value?: string;
  // onChange?:
  //   | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  //   | undefined;
  select: Dispatch<SetStateAction<string | any>>;
  options: any;
};
