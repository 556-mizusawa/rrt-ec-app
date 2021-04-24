import { Divider } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { saveProduct } from "../reducks/products/operations";
import { ImageArea } from "../components/Products";
import { db } from "../firebase";
import firebase from "firebase";

const ProductEdit: React.FC = () => {
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
    [price, setPrice] = useState<string>("");

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
        .then((snapshot: firebase.firestore.DocumentData) => {
          const data = snapshot.data();
          setImages(data.images);
          setName(data.name);
          setDiscription(data.description);
          setCategory(data.category);
          setGender(data.gender);
          setPrice(data.price);
        });
    }
  }, [id]);

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">商品登録・編集</h2>
      <Divider />
      <div className="c-section-container">
        <div className="module-spacer--medium" />
        <ImageArea images={images} setImages={setImages} />

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

        <div className="module-spacer--medium" />
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
                  images
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
