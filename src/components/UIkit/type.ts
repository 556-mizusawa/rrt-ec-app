import { CompositionEventHandler, KeyboardEventHandler } from "react";

export type PrimaryButtonProps = {
  onClick: () => void;
  label: string | undefined;
};

export type TextInputProps = {
  autoFocus?: boolean | undefined;
  fullWidth: boolean | undefined;
  label: string;
  multiline: boolean | undefined;
  required: boolean | undefined;
  rows: number | undefined;
  value: string;
  type: string | undefined;
  onChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined;
  onCompositionStart?: CompositionEventHandler<HTMLDivElement> | undefined;
  onCompositionEnd?: CompositionEventHandler<HTMLDivElement> | undefined;
};
