import { CallHistoryMethodAction, push } from "connected-react-router";
import { Dispatch } from "react";
import { db, FirebaseTimeStamp } from "../../firebase";
import { dataType } from "./type";

const productsRef = db.collection("products");

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
