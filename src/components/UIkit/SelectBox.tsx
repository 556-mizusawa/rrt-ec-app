import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { SelectBoxProps } from "./type";

const useStyles = makeStyles({
  formControl: {
    marginTop: 16,
    marginBottom: 16,
    minWidth: 100,
    width: "100%",
  },
});

const SelectBox: React.FC<SelectBoxProps> = (props) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        label={props.label}
        required={props.required}
        value={props.value}
        onChange={(event) => props.select(event.target.value)}>
        {props.options.map((option: { id: string; name: string }) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
