import { FFD } from "../../firebase/types";
import { userSignInActionType, userFetchProductActionType, userActionType } from "./type";

export const FETCH_ORDERS_HISTORY = "FETCH_ORDERS_HISTORY";
export const fetchOrdersHistoryAction = (history: FFD): userFetchProductActionType => {
    return {
        type: "FETCH_ORDERS_HISTORY",
        payload: history,
    };
};

export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
export const fetchProductsInCartAction = (products: FFD): userFetchProductActionType => {
    return {
        type: "FETCH_PRODUCTS_IN_CART",
        payload: products,
    };
};

export const FETCH_PRODUCTS_IN_FAVORITE = "FETCH_PRODUCTS_IN_FAVORITE";
export const fetchProductsInFavoriteAction = (products: FFD): userFetchProductActionType => {
    return {
        type: "FETCH_PRODUCTS_IN_FAVORITE",
        payload: products,
    };
};

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState: userSignInActionType): userActionType => {
    return {
        type: "SIGN_IN",
        payload: {
            favorite: [],
            cart: [],
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username,
        },
    };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = (): userActionType => {
    return {
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            role: "",
            uid: "",
            username: "",
        },
    };
};
