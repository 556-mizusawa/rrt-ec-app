import * as Actions from "./actions";
import initialState from "../store/initialState";

export const ProductsReducer = (
  state = initialState.products,
  action: { type: "FETCH_PRODUCTS"; payload: [] }
): {
  list: never[];
} => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
      };

    default:
      return state;
  }
};
