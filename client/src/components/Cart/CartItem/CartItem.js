import React from "react";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <React.Fragment>
      <div className={classes.CartItem}>
        <div className={classes.imageHeader}>
          <img className={classes.image} src={props.image} alt="" />
          <div className={classes.btnContainer}>
            <p className={classes.Text}>{props.productName}</p>
            <span
              onClick={() => {
                props.deleteCartItem(props.productName);
              }}
              className={classes.deleteBtn}
            >
              {" "}
              Delete{" "}
            </span>{" "}
            |<span style={{ color: "#000" }}> Qty: </span>
            <input
              className={classes.qtyBtn}
              type="number"
              min="1"
              defaultValue="1"
            />
          </div>
        </div>
        <p className={[classes.Text, classes.price].join(" ")}>₹ {props.price}</p>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default CartItem;
