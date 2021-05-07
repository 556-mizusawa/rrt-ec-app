import React, { useCallback, useEffect, useState } from "react";
import { History } from "history";
import { useDispatch, useSelector } from "react-redux";
import { db, FirebaseTimeStamp } from "../firebase";
import { FFD } from "../firebase/types";
import { makeStyles, Theme } from "@material-ui/core";
import { returnCodeToBr } from "../function/common";
import { productDetail } from "./types";
import { ImageSwiper, SizeTable } from "../components/Products/index";
import { addProductToCart } from "../reducks/users/operations";
import { deleteProduct } from "../reducks/products/operations";
import { push } from "connected-react-router";
import { PrimaryButton } from "../components/UIkit/index";

const useStyles = makeStyles((theme: Theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 24px auto",
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
      height: "auto",
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: "auto",
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
  span: {
    fontSize: 15,
  },
  button: {
    color: "#fff",
    fontSize: 16,
    height: 48,
    marginRight: 15,
    width: 144,
  },
}));

const ProductDetail: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selector = useSelector((state: { router: History }) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/product/")[1];

  const [product, setProduct] = useState<productDetail | null>(null);

  useEffect(() => {
    db.collection("products")
      .doc(id)
      .get()
      .then((doc: FFD) => {
        const data: productDetail = doc.data();
        setProduct(data);
      });
  }, [id]);

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
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>
              ¥{product.price.toLocaleString()}
              <span className={classes.span}>(税別)</span>
            </p>

            <div className="module-spacer--small" />

            <SizeTable addProduct={addProduct} sizes={product.sizes} />

            <div className="module-spacer--small" />

            <div>
              <PrimaryButton
                className={classes.button}
                color={"primary"}
                onClick={() => {
                  dispatch(push("/product/edit/" + id));
                }}
                label={"編集"}
              />
              <PrimaryButton
                className={classes.button}
                color={"secondary"}
                onClick={() => {
                  dispatch(deleteProduct(id));
                  dispatch(push("/"));
                }}
                label={"削除"}
              />
            </div>

            <div className="module-spacer--small" />

            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
