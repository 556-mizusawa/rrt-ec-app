import { FFD } from "../../firebase/types";
import { productActionType } from "./type";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const deleteProductsAction = (products: FFD): productActionType => {
  return {
    type: "DELETE_PRODUCT",
    payload: products,
  };
};

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (products: FFD): productActionType => {
  return {
    type: "FETCH_PRODUCTS",
    payload: products,
  };
};
