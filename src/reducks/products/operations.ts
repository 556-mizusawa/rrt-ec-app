import { CallHistoryMethodAction, push } from "connected-react-router";
import { Dispatch } from "react";
import { db, FirebaseTimeStamp } from "../../firebase";
import { FFD } from "../../firebase/types";
import { deleteProductsAction, fetchProductsAction } from "./actions";
import { dataType, productActionType } from "./type";

const productsRef = db.collection("products");

export const deleteProduct = (id: string) => {
  return async (
    dispatch: (arg0: productActionType) => void,
    getState: () => { products: { list: FFD } }
  ): Promise<void> => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(
          (product: { id: string }) => product.id !== id
        );
        dispatch(deleteProductsAction(nextProducts));
      });
  };
};

export const fetchProducts = () => {
  return async (
    dispatch: Dispatch<{
      type: string;
      payload: FFD;
    }>
  ): Promise<void> => {
    productsRef
      .orderBy("updated_at", "desc")
      .get()
      .then((snapshots) => {
        const productList: FFD = [];
        snapshots.forEach((snapshot) => {
          const product: FFD = snapshot.data();
          productList.push(product);
        });
        dispatch(fetchProductsAction(productList));
      });
  };
};

export const saveProduct = (
  id: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string,
  images: [],
  sizes: []
) => {
  return async (
    dispatch: Dispatch<CallHistoryMethodAction<[string, unknown?]>>
  ): Promise<void> => {
    const timeStamp = FirebaseTimeStamp.now();

    const data: dataType = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10),
      sizes: sizes,
      updated_at: timeStamp,
    };
    if (id === "") {
      const ref = productsRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timeStamp;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
