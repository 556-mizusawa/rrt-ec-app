import React from "react";
import IconButtons from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";

const HeaderMenus: React.FC = () => {
  return (
    <>
      <IconButtons>
        <Badge badgeContent={3} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButtons>
      <IconButtons>
        <FavoriteBorderIcon />
      </IconButtons>
      <IconButtons>
        <MenuIcon />
      </IconButtons>
    </>
  );
};

export default HeaderMenus;
