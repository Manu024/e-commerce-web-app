import React from "react";
import Header from "../Header/Header";
import Slider from "../Slider/Slider";
import ImageGallery from "../imageGallery/imageGallery";
import ImageBanner from "../imageBanner/imageBanner";
import Items from "../Items/Items";

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <Slider />
      <ImageGallery />
      <ImageBanner />
      <Items />
    </React.Fragment>
  );
};

export default Home;
