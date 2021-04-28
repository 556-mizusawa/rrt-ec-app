import React, { useEffect, useState } from "react";
import { History } from "history";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { FFD } from "../firebase/types";
import { makeStyles, Theme } from "@material-ui/core";
import { returnCodeToBr } from "../function/common";
import { productDetail } from "./types";
import { ImageSwiper, SizeTable } from "../components/Products/index";

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
}));

const ProductDetail: React.FC = () => {
  const classes = useStyles();

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

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{product.price.toLocaleString()}</p>

            <div className="module-spacer--small" />

            <SizeTable sizes={product.sizes} />

            <div className="module-spacer--small" />

            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
