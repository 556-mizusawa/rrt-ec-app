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
import { orderProduct } from "../reducks/products/operations";
import { FFD } from "../firebase/types";

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
            height: 356,
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
    const selector = useSelector((state: { users: initialStateUsersType }) => state);
    const productsInCart: FFD = getProductsInCart(selector);

    const subtotal = useMemo(() => {
        return productsInCart.reduce((sum: number, product: { price: number }) => (sum += product.price), 0);
    }, [productsInCart]);

    const shippngFee = subtotal > 10000 ? 0 : 210;
    const tax = subtotal * 0.1;
    const total = productsInCart.length > 0 ? subtotal + shippngFee + tax : 0;

    const backToHome = useCallback(() => {
        dispatch(push("/"));
    }, [dispatch]);

    const order = useCallback(() => {
        dispatch(orderProduct(productsInCart, total));
    }, [dispatch, productsInCart, total]);

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">???????????????</h2>
            <div className="p-grid__row">
                <div className={classes.delailBox}>
                    <List>
                        {productsInCart.length > 0 ? (
                            productsInCart.map((product: { cartId: string }) => (
                                <CartListItem key={product.cartId} product={product} />
                            ))
                        ) : (
                            <div className={classes.noItem}>
                                <h2>????????????????????????</h2>
                            </div>
                        )}
                    </List>
                </div>
                <div className={classes.orderBox}>
                    <TextDetail label={"????????????"} value={"??" + subtotal.toLocaleString()} />
                    <TextDetail label={"?????????"} value={"??" + tax.toLocaleString()} />
                    <TextDetail
                        label={"??????"}
                        value={productsInCart.length > 0 ? "??" + shippngFee.toLocaleString() : "??" + 0}
                    />
                    <Divider />

                    <div className="module-spacer--extra-small" />

                    <TextDetail label={"??????(??????)"} value={"??" + total.toLocaleString()} />
                    <Divider />

                    <div className="module-spacer--extra-small" />

                    {productsInCart.length > 0 ? (
                        <PrimaryButton label={"????????????"} onClick={order} color={"primary"} />
                    ) : (
                        <PrimaryButton disabled={true} label={"????????????"} onClick={order} color={"primary"} />
                    )}
                    <GreenButton label={"??????????????????????????????"} onClick={backToHome} />
                </div>
            </div>
        </section>
    );
};

export default OrderComfirm;
