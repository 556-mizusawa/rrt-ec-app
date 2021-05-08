import React, { useCallback } from "react";
import List from "@material-ui/core/List";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/users/selectors";
import { initialStateUsersType } from "../reducks/store/type";
import { CartListItem } from "../components/Products";
import { GreenButton, PrimaryButton } from "../components/UIkit";
import { push } from "connected-react-router";

const CartList: React.FC = () => {
  const selector = useSelector(
    (state: { users: initialStateUsersType }) => state
  );
  const productsInCart = getProductsInCart(selector);
  const dispatch = useDispatch();

  const goToOrder = useCallback(() => {
    dispatch(push("/order/comfirm"));
  }, [dispatch]);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, [dispatch]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ショッピングカート</h2>
      <List>
        {productsInCart.length > 0 &&
          productsInCart.map((product: { cartId: string }) => (
            <CartListItem key={product.cartId} product={product} />
          ))}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        {productsInCart.length > 0 && (
          <PrimaryButton
            label={"レジへ進む"}
            onClick={goToOrder}
            color={"primary"}
          />
        )}
        <div className="module-spacer--extra-small" />
        <GreenButton label={"ショッピングを続ける"} onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
