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
} = (state = initialState.products, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
