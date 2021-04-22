import { initialStateUsersType } from "../store/type";
import { userActionType } from "./type";

export const SIGN_IN = "SIGN_IN";
export const signInAction = (
  userState: initialStateUsersType
): userActionType => {
  return {
    type: "SIGN_IN",
    payload: {
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
