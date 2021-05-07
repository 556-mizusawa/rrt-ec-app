import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core";
import { PrimaryButtonProps } from "./type";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles({
  button: {
    color: "white",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
});

const ColorButton = withStyles({
  root: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
})(Button);

const PrimaryButton: React.FC<PrimaryButtonProps> = (
  props: PrimaryButtonProps
) => {
  const classes = useStyles();

  return (
    <ColorButton
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={() => props.onClick()}>
      ショッピングを続ける
    </ColorButton>
  );
};

export default PrimaryButton;
