import { CallHistoryMethodAction } from "connected-react-router";
import { Dispatch } from "react";
import { loadingActionType } from "../loading/type";

export type userActionType = {
  type: string;
  payload: {
    isSignedIn: boolean;
    role: string;
    uid: string;
    username: string;
  };
};

export type userOpDispatch = Dispatch<
  | userActionType
  | loadingActionType
  | CallHistoryMethodAction<[string, unknown?]>
>;
