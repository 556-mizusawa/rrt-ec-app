import * as Actions from "./actions";
import initialState from "../store/initialState";
import { initialStateUsersType } from "../store/type";

export const UsersReducer: (
  state: initialStateUsersType | undefined,
  action: {
    type: "SIGN_IN" | "SIGN_OUT";
    payload: initialStateUsersType;
  }
) => {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
} = (
  state = initialState.users,
  action: { type: "SIGN_IN" | "SIGN_OUT"; payload: initialStateUsersType }
) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    case Actions.SIGN_OUT:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};
