import React from "react";
import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  return (
    <div className={classes.OrderItem}>
      <div className={classes.imageHeader}>
        <img className={classes.OrderItemImg} src={props.image} alt="" />
        <div className={classes.btnContainer}>
          <p className={classes.Text}>{props.productName}</p>
          <p className={classes.orderText}> Ordered at: {props.date}</p>
        </div>
      </div>
      <h4>₹ {props.price}</h4>
    </div>
  );
};

export default OrderItem;
