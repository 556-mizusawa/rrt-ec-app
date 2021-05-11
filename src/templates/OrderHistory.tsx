import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersHistory } from "../reducks/users/selectors";
import { initialStateUsersType } from "../reducks/store/type";
import { fetchOrdersHistory } from "../reducks/users/operations";
import { OrderHistoryItem } from "../components/Products";

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
    const dispatch = useDispatch();
    const selector = useSelector((state: { users: initialStateUsersType }) => state);
    const orders = getOrdersHistory(selector);

    useEffect(() => {
        dispatch(fetchOrdersHistory());
    }, [dispatch]);

    console.log(orders);

    return (
        <section className="c-section-wrapin">
            <List className={classes.orderList}>
                {orders.length > 0 &&
                    orders.map((order: { id: string; amount: number; updated_at: string; shipping_date: string }) => (
                        <OrderHistoryItem order={order} key={order.id} />
                    ))}
            </List>
        </section>
    );
};

export default OrderHistory;
