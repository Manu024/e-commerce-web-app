import React from "react";
import classes from "./imageBanner.module.css";
import img1 from "../../ajio/AJIO_files/31122020-m-unisex-discountstore-70to80.jpg";
import img2 from "../../ajio/AJIO_files/31122020-m-unisex-discountstore-under599.jpg";
import img3 from "../../ajio/AJIO_files/31122020-m-unisex-brands-adidas-40to60.jpg";

const Imgs = [img1, img2, img3];

const imageBanner = () => {

  let Images = Imgs.map((img) => (
    <img key={img} className={classes.img} src={img} alt="" />
  ));

  return (
    <div>
      <div className={classes.imgContainer}>{Images}</div>
    </div>
  );
};

export default imageBanner;
