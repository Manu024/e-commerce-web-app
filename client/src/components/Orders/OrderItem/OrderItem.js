import React from "react";
import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  return (
    <div className={classes.OrderItem}>
      <div className={classes.imageHeader}>
        <img className={classes.OrderItemImg} src={props.image} alt="" />
        <div className={classes.btnContainer}>
          <h3>{props.productName}</h3>
          <p style={{ margin: "8px" }}> Ordered at: {props.date}</p>
        </div>
      </div>
      <h4>₹ {props.price}</h4>
    </div>
  );
};

export default OrderItem;
