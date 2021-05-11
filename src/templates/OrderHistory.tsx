import React from "react";
import List from "@material-ui/core/List";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderList: {
      backgroundColor: "#f5f5f5",
      margin: "0 auto",
      padding: 32,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: 768,
      },
    },
  })
);

const OrderHistory: React.FC = () => {
  const classes = useStyles();

  return (
    <section className="c-section-wrapin">
      <List className={classes.orderList}></List>
    </section>
  );
};

export default OrderHistory;
