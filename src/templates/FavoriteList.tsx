import React, { useCallback, useState } from "react";
import List from "@material-ui/core/List";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInFavorite } from "../reducks/users/selectors";
import { initialStateUsersType } from "../reducks/store/type";
import { FavoriteListItem } from "../components/Products";
import { GreenButton, PrimaryButton } from "../components/UIkit";
import { push } from "connected-react-router";
import { FirebaseTimeStamp } from "../firebase";
import { addProductToCart } from "../reducks/users/operations";
import { productDetail } from "./types";

const FavoriteList: React.FC = () => {
  const selector = useSelector(
    (state: { users: initialStateUsersType }) => state
  );
  const productsInFavorite = getProductsInFavorite(selector);
  const dispatch = useDispatch();
  const [product] = useState<productDetail | null>(null);

  const goToCart = useCallback(() => {
    dispatch(push("/cart"));
  }, [dispatch]);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, [dispatch]);

  const addProduct = useCallback(
    (selectedSize: string) => {
      const timestamp = FirebaseTimeStamp.now();
      dispatch(
        addProductToCart({
          added_at: timestamp,
          description: product?.description,
          gender: product?.gender,
          images: product?.images,
          name: product?.name,
          price: product?.price,
          productId: product?.id,
          quantity: 1,
          size: selectedSize,
        })
      );
    },
    [product, dispatch]
  );

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">お気に入り</h2>
      <List>
        {productsInFavorite.length > 0 &&
          productsInFavorite.map((product: { favoriteId: string }) => (
            <FavoriteListItem
              key={product.favoriteId}
              product={product}
              addProduct={addProduct}
            />
          ))}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        {productsInFavorite.length > 0 && (
          // カート追加仮実装
          <PrimaryButton
            label={"カートへ進む"}
            onClick={goToCart}
            color={"primary"}
          />
        )}
        <div className="module-spacer--extra-small" />
        <GreenButton label={"ショッピングを続ける"} onClick={backToHome} />
      </div>
    </section>
  );
};

export default FavoriteList;
