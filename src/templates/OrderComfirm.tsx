import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/Products/index";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { GreenButton, PrimaryButton, TextDetail } from "../components/UIkit";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { initialStateUsersType } from "../reducks/store/type";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    delailBox: {
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        width: 320,
      },
      [theme.breakpoints.up("sm")]: {
        width: 512,
      },
    },
    orderBox: {
      border: "1px solid rgba(0,0,0,0.2)",
      borderRadius: 4,
      boxShadow: "0 4px 2px 2px rgba(0,0,0,0.2)",
      height: 256,
      margin: "24px auto 16px auto",
      padding: 16,
      width: 288,
    },
    noItem: {
      margin: "50px auto",
    },
  })
);

const OrderComfirm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(
    (state: { users: initialStateUsersType }) => state
  );
  const productsInCart = getProductsInCart(selector);

  const subtotal = useMemo(() => {
    return productsInCart.reduce(
      (sum: number, product: { price: number }) => (sum += product.price),
      0
    );
  }, [productsInCart]);

  const shippngFee = subtotal > 10000 ? 210 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shippngFee + tax;

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, [dispatch]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.delailBox}>
          <List>
            {productsInCart.length > 0 ? (
              productsInCart.map((product: { cartId: string }) => (
                <CartListItem key={product.cartId} product={product} />
              ))
            ) : (
              <div className={classes.noItem}>
                <h2>商品はありません</h2>
              </div>
            )}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail
            label={"商品合計"}
            value={"¥" + subtotal.toLocaleString()}
          />
          <TextDetail label={"消費税"} value={"¥" + tax.toLocaleString()} />
          <TextDetail
            label={"送料"}
            value={"¥" + shippngFee.toLocaleString()}
          />
          <Divider />

          <div className="module-spacer--extra-small" />

          <TextDetail
            label={"合計(税込)"}
            value={"¥" + total.toLocaleString()}
          />
          <GreenButton label={"ショッピングを続ける"} onClick={backToHome} />
        </div>
      </div>
    </section>
  );
};

export default OrderComfirm;
