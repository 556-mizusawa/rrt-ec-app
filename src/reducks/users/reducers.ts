import * as Actions from "./actions";
import initialState from "../store/initialState";
import { actionType } from "./interface";

export const UsersReducer = (
  state = initialState.users,
  action: { type: "SIGN_IN"; payload: actionType["payload"] }
) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
