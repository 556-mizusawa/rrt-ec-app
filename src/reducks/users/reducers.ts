import * as Actions from "./actions";
import initialState from "../store/initialState";
import { initialStateUsersType } from "../store/type";

// : (
//   state: initialStateUsersType | undefined,
//   action: {
//     type: "SIGN_IN" | "SIGN_OUT";
//     payload: initialStateUsersType;
//   }
// ) => {
//   cart: [];
//   isSignedIn: boolean;
//   role: string;
//   uid: string;
//   username: string;
// }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const UsersReducer = (
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
