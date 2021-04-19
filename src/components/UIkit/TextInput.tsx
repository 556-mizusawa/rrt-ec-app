import React from "react";
import TextFieled from "@material-ui/core/TextField";
import { TextInputProps } from "./type";

const TextInput = (props: TextInputProps) => {
  return (
    <TextFieled
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  );
};

export default TextInput;
