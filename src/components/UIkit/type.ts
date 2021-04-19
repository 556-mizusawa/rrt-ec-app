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
};
