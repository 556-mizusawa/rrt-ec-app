import { FFD } from "../../firebase/types";

export type dataType = {
  category: string;
  description: string;
  gender: string;
  name: string;
  images: [];
  sizes: [];
  price: number;
  updated_at: any;
  id?: string;
  created_at?: any;
};

export type productActionType = {
  type: "FETCH_PRODUCTS" | "DELETE_PRODUCT";
  payload: any;
};
