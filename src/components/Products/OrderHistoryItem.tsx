import React from "react";
import Divider from "@material-ui/core/Divider";
import { TextDetail } from "../UIkit";
import { dateToString, datetimeToString } from "../../function/common";

const OrderHistoryItem: React.FC<{
    order: {
        id: string;
        amount: number;
        updated_at: any;
        shipping_date: any;
    };
    key: string;
}> = (props) => {
    const order = props.order;
    const price = "¥" + order.amount.toLocaleString();
    const orderedDateTime = datetimeToString(order.updated_at.toDate());
    const shippingDate = dateToString(order.shipping_date.toDate());

    return (
        <div>
            <div className="module-spacer--small" />
            <TextDetail label={"注文ID"} value={order.id} />
            <TextDetail label={"注文日時"} value={orderedDateTime} />
            <TextDetail label={"発送予定日"} value={shippingDate} />
            <TextDetail label={"注文金額"} value={price} />

            <div className="module-spacer--extra-extra-small" />
            <Divider />
        </div>
    );
};
export default OrderHistoryItem;
