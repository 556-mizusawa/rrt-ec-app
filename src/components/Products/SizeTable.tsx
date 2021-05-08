import React, { useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/styles";
import ShopingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});

const SizeTable: React.FC<{
  addProduct: (selectedSize: string) => void;
  addFavorite: (selectedSize: string) => void;
  sizes: [];
}> = (props) => {
  const classes = useStyles();
  const [favorite, setFavorite] = useState<boolean>(false);

  const sizes = props.sizes;

  const favoriteOn = (size: string) => {
    props.addFavorite(size);
    console.log("+");
    setFavorite(true);
  };

  const favoriteOff = () => {
    console.log("-");
    setFavorite(false);
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 &&
            sizes.map((size: { size: string; quantity: number }) => (
              <TableRow key={size.size}>
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>残り{size.quantity}</TableCell>
                <TableCell className={classes.iconCell}>
                  {size.quantity > 0 ? (
                    <IconButton onClick={() => props.addProduct(size.size)}>
                      <ShopingCartIcon />
                    </IconButton>
                  ) : (
                    <div>売り切れ</div>
                  )}
                </TableCell>
                {/* イイね仮実装 */}
                <TableCell className={classes.iconCell}>
                  {favorite === false ? (
                    <IconButton onClick={() => favoriteOn(size.size)}>
                      <FavoriteBorderIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => favoriteOff()}>
                      <FavoriteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
