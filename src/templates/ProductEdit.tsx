import { Divider } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { saveProduct } from "../reducks/products/operations";
import { ImageArea, SetSizeArea } from "../components/Products";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core";
import { FFD } from "../firebase/types";

const useStyles = makeStyles({
  divider: {
    margin: "0 auto",
    maxWidth: 500,
    padding: 0.5,
    height: "auto",
    width: "calc(100% - 2rem)",
  },
});

const ProductEdit: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  let id = window.location.pathname.split("/product/edit")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const [name, setName] = useState<string>(""),
    [description, setDiscription] = useState<string>(""),
    [category, setCategory] = useState<string>(""),
    [gender, setGender] = useState<string>(""),
    [images, setImages] = useState<[]>([]),
    [price, setPrice] = useState<string>(""),
    [sizes, setSizes] = useState<[]>([]);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDiscription = useCallback(
    (event) => {
      setDiscription(event.target.value);
    },
    [setDiscription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const categories = [
    { id: "tops", name: "トップス" },
    { id: "jkt", name: "ジャケット" },
    { id: "shirts", name: "シャツ" },
    { id: "pants", name: "パンツ" },
    { id: "シューズ", name: "シューズ" },
  ];

  const genders = [
    { id: "all", name: "全て" },
    { id: "male", name: "男性" },
    { id: "female", name: "女性" },
  ];

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot: FFD) => {
          const data = snapshot.data();
          setImages(data.images);
          setName(data.name);
          setDiscription(data.description);
          setCategory(data.category);
          setGender(data.gender);
          setPrice(data.price);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品登録・編集</h2>
      <Divider className={classes.divider} />
      <div className="c-section-container">
        <div className="module-spacer--medium" />

        <ImageArea images={images} setImages={setImages} />

        <div className="module-spacer--extra-small" />

        <TextInput
          fullWidth={true}
          label={"商品名"}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
          type={"text"}
        />
        <TextInput
          fullWidth={true}
          label={"商品説明"}
          multiline={true}
          required={true}
          onChange={inputDiscription}
          rows={5}
          value={description}
          type={"text"}
        />
        <SelectBox
          label={"カテゴリー"}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />
        <SelectBox
          label={"性別"}
          required={true}
          options={genders}
          select={setGender}
          value={gender}
        />
        <TextInput
          fullWidth={true}
          label={"商品価格"}
          multiline={false}
          required={true}
          onChange={inputPrice}
          rows={1}
          value={price}
          type={"number"}
        />

        <div className="module-spacer--small" />

        <SetSizeArea sizes={sizes} setSizes={setSizes} />

        <div className="module-spacer--small" />

        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  images,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
