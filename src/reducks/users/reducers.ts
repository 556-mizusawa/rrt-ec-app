import * as Actions from "./actions";
import initialState from "../store/initialState";
import { initialStateType } from "../store/type";

export const UsersReducer = (
  state = initialState.users,
  action: { type: "SIGN_IN" | "SIGN_OUT"; payload: initialStateType }
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
