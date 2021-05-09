import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { GreenButton, PrimaryButton } from "../components/UIkit";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  text: {
    display: "inlineBlock",
    marginTop: 40,
    textAlign: "center",
  },
  button: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const OrderReset: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const backToCart = useCallback(() => {
    dispatch(push("/cart"));
  }, [dispatch]);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, [dispatch]);

  return (
    <div>
      <h2 className="u-text__headline u-text-center">注文処理失敗</h2>
      <div>
        <p className={classes.text}>
          注文処理を中断しました。通信環境をご確認の上再度お試しください。
        </p>
        <div className={classes.button}>
          <PrimaryButton
            label={"カートに戻る"}
            onClick={backToCart}
            color={"primary"}
          />
          <GreenButton label={"ホームに戻る"} onClick={backToHome} />
        </div>
      </div>
    </div>
  );
};

export default OrderReset;
