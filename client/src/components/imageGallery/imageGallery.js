import React from "react";
import classes from "./imageGallery.module.css";
import img1 from "../../ajio/AJIO_files/25122020-m-unisex-categoryselection-men.jpg";
import img2 from "../../ajio/AJIO_files/25122020-m-unisex-categoryselection-footwear.jpg";
import img3 from "../../ajio/AJIO_files/25122020-m-unisex-categoryselection-jewellery.jpg";
import img4 from "../../ajio/AJIO_files/25122020-m-unisex-categoryselection-kids.jpg";
import img5 from "../../ajio/AJIO_files/25122020-m-unisex-categoryselection-home.jpg";
import img6 from "../../ajio/AJIO_files/25122020-m-unisex-categoryselection-toys.jpg";
import img7 from "../../ajio/AJIO_files/25122020-m-unisex-categoryselection-watches.jpg";
import img8 from "../../ajio/AJIO_files/25122020-m-unisex-categoryselection-women.jpg";
import Head from "../../ajio/07012021-d-unisex-discountstore-sectionheader.webp";

const Imgs = [img1, img2, img3, img4, img5, img6, img7, img8];

const imageGallery = () => {

  let Images = Imgs.map((img) => (
    <img key={img} className={classes.img} src={img} alt="" />
  ));

  return (
    <div>
      <img className={classes.img1} src={Head} alt="" />
      <div className={classes.imgGallery}>{Images}</div>
    </div>
  );
};

export default imageGallery;
