import { CallHistoryMethodAction, push } from "connected-react-router";
import { db, FirebaseTimeStamp } from "../../firebase";
import { dataType } from "./type";

const productsRef = db.collection("products");

export const saveProduct = (
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string
) => {
  return async (
    dispatch: (arg0: CallHistoryMethodAction<[string, unknown?]>) => void
  ): Promise<void> => {
    const timeStamp = FirebaseTimeStamp.now();

    const data: dataType = {
      category: category,
      description: description,
      gender: gender,
      name: name,
      price: parseInt(price, 10),
      updated_at: timeStamp,
    };

    const ref = productsRef.doc();
    const id = ref.id;
    data.id = id;
    data.created_at = timeStamp;

    return productsRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
