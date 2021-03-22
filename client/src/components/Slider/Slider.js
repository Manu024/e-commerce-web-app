import React from "react";
import img1 from "../../ajio/banner/25122020-d-unisex-topbanner-ajiomaniasale-50to90.jpg";
import img2 from "../../ajio/banner/30122020-d-unisex-stealoftheday-min50extra32.jpg";
import img3 from "../../ajio/banner/30122020-d-unisex-topbanner-IconicBrands-nowonajio.webp";
import img4 from "../../ajio/banner/30122020-d-unisex-topbanner-superbranddays-upto60Extra15.webp";
import img5 from "../../ajio/banner/30122020-d-unisex-topbanner-tommyhilfiger-upto50.webp";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Slider.css";

const Imgs = [img1, img2, img3, img4, img5];

const Slider = () => {
  let Images = Imgs.map((img) => (
    <img key={img} className="imgContainer" src={img} alt="" />
  ));

  return (
    <div className="Slider">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval="1300"
        touchTracking
      >
        {Images}
      </AliceCarousel>
    </div>
  );
};

export default Slider;
