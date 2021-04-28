import React, { useState } from "react";
import Swiper, { ReactIdSwiperProps } from "react-id-swiper";
import NoImage from "../../assets/img/noimg.png";
import "swiper/css/swiper.css";

const ImageSwiper: React.FC<{ images: [] }> = (props) => {
  const [params] = useState<ReactIdSwiperProps>({
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });

  const images = props.images;

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className="p-media__thumb">
          <img src={NoImage} alt="no image" />
        </div>
      ) : (
        images.map((image: { path: string; id: string }) => (
          <div className="p-media__thumb" key={image.id}>
            <img src={image.path} alt="商品画像" />
          </div>
        ))
      )}
    </Swiper>
  );
};

export default ImageSwiper;
