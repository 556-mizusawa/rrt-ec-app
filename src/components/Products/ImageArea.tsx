import React, { useCallback } from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { Fab, makeStyles } from "@material-ui/core";
import { storage } from "../../firebase";
import { ImagePreview } from "./index";
import { imagesProps } from "./type";

const useStyles = makeStyles({
  icon: {
    paddingTop: "5px",
    cursor: "pointer",
  },
});

const ImageArea: (props: {
  images: [];
  setImages: (value: any) => void;
}) => JSX.Element = (props) => {
  const classes = useStyles();

  const deleteImage = useCallback(
    async (id: string) => {
      const ret = window.confirm("この画像を削除しますか？");
      if (!ret) {
        return false;
      } else {
        const newImages = props.images.filter(
          (image: { id: string | void }) => image.id !== id
        );
        props.setImages(newImages);
        return storage.ref("image").child(id).delete();
      }
    },
    [props.images]
  );

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;
      const blob = new Blob(file, { type: "jpeg/image" });

      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const filename = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      const uploadRef = storage.ref("images").child(filename);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: filename, path: downloadURL };
          props.setImages((prevState: any) => [...prevState, newImage]);
        });
      });
    },
    [props.setImages]
  );

  return (
    <div>
      <div className="p-grid__list-images">
        {props.images.length > 0 &&
          props.images.map((image: imagesProps) => (
            <ImagePreview
              delete={deleteImage}
              id={image.id}
              path={image.path}
              key={image.id}
            />
          ))}
      </div>
      <div className="module-spacer--extra-extra-small" />
      <div className="u-text-right">
        <Fab size="small" color="primary" aria-label="add">
          <label>
            <AddPhotoAlternateIcon className={classes.icon} />
            <input
              className="u-display-none"
              type="file"
              id="image"
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </Fab>
      </div>
    </div>
  );
};

export default ImageArea;
