import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { productsProps } from "./type";
import NoImage from "../../assets/img/noimg.png";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Menuitem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { deleteProduct } from "../../reducks/products/operations";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: 8,
      width: "calc(50% - 16px)",
    },
    [theme.breakpoints.up("md")]: {
      margin: 16,
      width: "calc(33.3333% - 32px)",
    },
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
    cursor: "pointer",
  },
  name: {
    cursor: "pointer",
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
  menuButton: {
    marginRight: 110,
  },
}));

const ProductCard: React.FC<productsProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: { currentTarget: Element }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const images = props.images.length > 0 ? props.images : [{ path: NoImage }];
  const price = props.price.toLocaleString();

  return (
    <Card className={classes.root}>
      <CardMedia
        image={images[0].path}
        className={classes.media}
        title=""
        onClick={() => dispatch(push("/product/" + props.id))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push("/product/" + props.id))}>
          <Typography
            className={classes.name}
            color="textSecondary"
            component="p">
            {props.name}
          </Typography>
          <Typography className={classes.price} component="p">
            ¥{price}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <Menuitem
            onClick={() => {
              dispatch(push("/product/edit/" + props.id));
              handleClose();
            }}>
            編集する
          </Menuitem>
          <Menuitem
            onClick={() => {
              dispatch(deleteProduct(props.id));
              handleClose();
            }}>
            削除する
          </Menuitem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
