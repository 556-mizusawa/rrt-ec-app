import initialState from "../store/initialState";

export const ProductsReducer: (
  state:
    | {
        list: never[];
      }
    | undefined,
  action: any
) => {
  list: never[];
} = (state = initialState.products, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
