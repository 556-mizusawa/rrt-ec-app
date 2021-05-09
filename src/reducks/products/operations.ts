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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const orderProduct = (productsInCart: any, amount: number) => {
  return async (
    dispatch: Dispatch<CallHistoryMethodAction<[string, unknown?]>>,
    getState: () => { users: { uid: string } }
  ): Promise<false | undefined> => {
    const uid = getState().users.uid;
    const userRef = db.collection("users").doc(uid);
    const timestamp = FirebaseTimeStamp.now();

    const products: {
        id: string;
        images: [];
        name: string;
        price: number;
        size: string;
      }[] = [],
      soldOutProducts: { name: string }[] = [];

    const batch = db.batch();

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const sizes = snapshot.data()?.sizes;

      const updatedSizes = sizes.map(
        (size: { size: string; quantity: number }) => {
          if (size.size === product.size) {
            if (size.quantity === 0) {
              soldOutProducts.push(product.name);
              return size;
            }
            return {
              size: size.size,
              quantity: size.quantity - 1,
            };
          } else {
            return size;
          }
        }
      );
      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      });

      batch.update(productsRef.doc(product.productId), { sizes: updatedSizes });

      batch.delete(userRef.collection("cart").doc(product.cartId));
    }
    if (soldOutProducts.length > 0) {
      const errorMessage =
        soldOutProducts.length > 0
          ? soldOutProducts.join("と")
          : soldOutProducts[0];
      alert(
        "大変申し訳ありません。" +
          errorMessage +
          "が在庫切れとなったため、注文処理を中断しました。"
      );
      return false;
    } else {
      batch
        .commit()
        .then(() => {
          const orderRef = userRef.collection("orders").doc();
          const date = timestamp.toDate();
          const shippingDate = FirebaseTimeStamp.fromDate(
            new Date(date.getDate() + 3)
          );

          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp,
          };

          orderRef.set(history);

          dispatch(push("/order/complete"));
        })
        .catch(() => {
          alert("注文処理に失敗しました。");
          return false;
        });
    }
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
