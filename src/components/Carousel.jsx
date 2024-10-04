import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "./_Carousel.scss";
import "react-alice-carousel/lib/alice-carousel.css";


const Carousel = ({ item, options = {} }) => {
  if (!item || (!item.imgSrc && !item.videoSrc)) return null;
  const items = [];
  item.imgSrc?.forEach(imgsrc =>
    items.push(
      <div className="item">
        <img src={`/media/${imgsrc}`} alt={imgsrc} className="media" />
      </div>
    )
  );

  if (item.videoSrc) {
    items.push(
      <div className="item">
        <video width="100%" controls className="media">
          <source src={`/media/${item.videoSrc}`} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  const Slider = () => {
    const [mainIndex, setMainIndex] = useState(0);
    const slideNext = () => {
      if (mainIndex < items.length - 1) {
        setMainIndex(mainIndex + 1);
      }
    };

    const slidePrev = () => {
      if (mainIndex > 0) {
        setMainIndex(mainIndex - 1);
      }
    };
    return <>
      <AliceCarousel
        activeIndex={mainIndex}
        disableDotsControls
        disableButtonsControls
        items={items}
      />
      <p className="index">{`${mainIndex + 1}/${items.length}`}</p>
      <div className="btn-prev" onClick={slidePrev}>
        &lang;
      </div>
      <div className="btn-next" onClick={slideNext}>
        &rang;
      </div>
    </>
  }

  return (
    <div className="carousel">
      <Slider />
    </div>
  );
};

export default Carousel;
