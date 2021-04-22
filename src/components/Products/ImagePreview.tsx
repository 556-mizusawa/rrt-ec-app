import React from "react";
import { imagesProps } from "./type";

const ImagePreview = (props: imagesProps): JSX.Element => {
  return (
    <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
      <img src={props.path} alt="商品画像" />
    </div>
  );
};

export default ImagePreview;
