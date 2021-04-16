import { actionType } from "./interface";

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState: {
  uid: actionType;
  username: actionType;
}) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = (): actionType => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      uid: "",
      username: "",
    },
  };
};
