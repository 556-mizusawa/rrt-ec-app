import React from "react";
import IconButtons from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { getProductsInCart } from "../../reducks/users/selectors";
import { useSelector } from "react-redux";
import { initialStateUsersType } from "../../reducks/store/type";

const HeaderMenus: React.FC<{
  handleDrawerToggle: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}> = (props) => {
  const selector = useSelector(
    (state: { users: initialStateUsersType }) => state
  );
  const productsInCart = getProductsInCart(selector);

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
