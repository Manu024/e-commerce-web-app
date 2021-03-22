import React from "react";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <React.Fragment>
      <div className={classes.CartItem}>
        <div className={classes.imageHeader}>
          <img className={classes.image} src={props.image} alt="" />
          <div className={classes.btnContainer}>
            <h3>{props.productName}</h3>
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
        <h4 className={classes.price}>₹ {props.price}</h4>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default CartItem;
