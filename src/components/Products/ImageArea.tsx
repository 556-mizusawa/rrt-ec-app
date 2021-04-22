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

type Props = {
  images: [];
  setImages: (value: any) => void;
};

const ImageArea: React.FC<Props> = ({ images, setImages }) => {
  const classes = useStyles();

  const deleteImage = useCallback(
    async (id: string) => {
      const ret = window.confirm("この画像を削除しますか？");
      if (!ret) {
        return false;
      } else {
        const newImages = images.filter(
          (image: { id: string | void }) => image.id !== id
        );
        setImages(newImages);
        return storage.ref("image").child(id).delete();
      }
    },
    [images, setImages]
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
          setImages((prevState: any) => [...prevState, newImage]);
        });
      });
    },
    [setImages]
  );

  return (
    <div>
      <div className="p-grid__list-images">
        {images.length > 0 &&
          images.map((image: imagesProps) => (
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
