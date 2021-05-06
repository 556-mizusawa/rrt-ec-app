import React, { useEffect } from "react";
import IconButtons from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { getProductsInCart, getUserId } from "../../reducks/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import { initialStateUsersType } from "../../reducks/store/type";
import { db } from "../../firebase/index";
import { FFD } from "../../firebase/types";
import { fetchProductsInCart } from "../../reducks/users/operations";

const HeaderMenus: React.FC<{
  handleDrawerToggle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: { users: initialStateUsersType }) => state);
  const uid = getUserId(selector);
  let productsInCart: FFD = getProductsInCart(selector);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              productsInCart.push(product);
              break;
            case "modified":
              // eslint-disable-next-line no-case-declarations
              const index = productsInCart.findIndex(
                (product: { cartId: string }) => product.cartId === change.doc.id
              );
              productsInCart[index] = product;
              break;
            case "removed":
              // eslint-disable-next-line react-hooks/exhaustive-deps
              productsInCart = productsInCart.filter(
                (product: { cartId: string }) => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });

        dispatch(fetchProductsInCart(productsInCart));
      });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButtons>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButtons>
      <IconButtons>
        <FavoriteBorderIcon />
      </IconButtons>
      <IconButtons onClick={(event) => props.handleDrawerToggle(event)}>
        <MenuIcon />
      </IconButtons>
    </>
  );
};

export default HeaderMenus;
