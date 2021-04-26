import { createSelector } from "reselect";
import { initialStateProductsType } from "../../reducks/store/type";

const productsSelector = (state: initialStateProductsType) => state.products;

export const getProducts = createSelector(
  [productsSelector],
  (state) => state.list
);
