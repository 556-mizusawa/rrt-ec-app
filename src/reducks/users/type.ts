import { CallHistoryMethodAction } from "connected-react-router";
import { Dispatch } from "react";
import { FFD } from "../../firebase/types";
import { loadingActionType } from "../loading/type";

export type userActionType = {
    type: "SIGN_IN" | "SIGN_OUT";
    payload: {
        favorite?: [];
        cart?: [];
        isSignedIn: boolean;
        role: string;
        uid: string;
        username: string;
    };
};

export type userSignInActionType = {
    favorite?: [];
    cart?: [];
    isSignedIn: boolean;
    role: string;
    uid: string;
    username: string;
};

export type userFetchProductActionType = {
    type: "FETCH_PRODUCTS_IN_CART" | "FETCH_PRODUCTS_IN_FAVORITE" | "FETCH_ORDERS_HISTORY";
    payload: FFD;
};

export type userOpDispatch = Dispatch<
    userActionType | userFetchProductActionType | loadingActionType | CallHistoryMethodAction<[string, unknown?]>
>;
