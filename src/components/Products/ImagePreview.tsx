import React from "react";
import { imagesProps } from "./type";

const ImagePreview: React.FC<imagesProps> = (props) => {
  return (
    <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
      <img src={props.path} alt="商品画像" />
    </div>
  );
};

export default ImagePreview;
