import React from "react";
import TextFieled from "@material-ui/core/TextField";
import { TextInputProps } from "./type";

const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  return (
    <TextFieled
      variant={props.variant}
      autoFocus={props.autoFocus}
      fullWidth={props.fullWidth}
      label={props.label}
      margin="normal"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      onCompositionStart={props.onCompositionStart}
      onCompositionEnd={props.onCompositionEnd}
    />
  );
};

export default TextInput;
