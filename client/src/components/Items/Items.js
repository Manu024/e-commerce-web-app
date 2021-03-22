import React from "react";
import classes from "./Items.module.css";
import Item from "./Item/Item";
import img1 from "../../ajio/Canon EOS 1500D 24.1 Digital SLR Camera (Black) with EF S18-55 is II Lens, 16GB Card and Carry Case.jpg";
import img2 from "../../ajio/OnePlus Y Series 80 cm (32 inches) HD Ready LED Smart Android TV 32Y1 (Black) (2020 Model).jpg";
import img3 from "../../ajio/OnePlus Nord 5G (Gray Onyx, 8GB RAM, 128GB Storage).jpg";
import img4 from "../../ajio/Lamkei BOUNCEFIT What's App, Message, Steps, Heart Round Silicon Strap-QRB-1024 Black Men's Smartwatch.jpg";
import img5 from "../../ajio/CHKOKKO Men's Solid Wind Cheater Jacket.jpg";

const itemsDetail = [
  {
    img: img1,
    imgName: "Canon EOS 1500D DSLR Camera 16GB Card ",
    price: 30000,
  },
  {
    img: img2,
    imgName: "OnePlus Y Series 80cm (32 inches) Android TV",
    price: 27000,
  },
  {
    img: img3,
    imgName: "OnePlus Nord (Gray Onyx, 8GB RAM, 128GB)",
    price: 28999,
  },
  {
    img: img4,
    imgName: "Lamkei BOUNCEFIT Black Men's Smartwatch",
    price: 3000,
  },
  {
    img: img5,
    imgName: "CHKOKKO Men's Solid Wind Cheater Jacket",
    price: 1700,
  },
];

const Items = () => {
  let items = null;
  
  items = itemsDetail.map((item) => (
    <Item
      key={item.imgName}
      imgName={item.imgName}
      img={item.img}
      price={item.price}
    />
  ));

  return <div className={classes.Items}>{items}</div>;
};

export default Items;
