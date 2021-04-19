import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { PrimaryButtonProps } from "./type";

const useStyles = makeStyles({
  button: {
    color: "#fff",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
});

const PrimaryButton = (props: PrimaryButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant={"contained"}
      onClick={() => props.onClick()}
      color="primary"
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;