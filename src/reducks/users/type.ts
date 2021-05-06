import { CallHistoryMethodAction } from "connected-react-router";
import { Dispatch } from "react";
import { FFD } from "../../firebase/types";
import { loadingActionType } from "../loading/type";

export type userActionType = {
  type: "SIGN_IN" | "SIGN_OUT";
  payload: {
    isSignedIn: boolean;
    role: string;
    uid: string;
    username: string;
  };
};

export type userFetchProductActionType = {
  type: "FETCH_PRODUCTS_IN_CART";
  payload: FFD;
};

export type userOpDispatch = Dispatch<
  userActionType | loadingActionType | CallHistoryMethodAction<[string, unknown?]>
>;
