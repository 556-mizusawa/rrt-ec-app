import { FFD } from "../../firebase/types";
import { productActionType } from "./type";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (products: FFD): productActionType => {
  return {
    type: "FETCH_PRODUCTS",
    payload: products,
  };
};
