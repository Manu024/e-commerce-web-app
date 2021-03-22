import React from "react";
import classes from "./PaymentForm.module.css";
import Checkout from "../Cart/CheckOut/CheckOut";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const PaymentForm = (props) => {
  return (
    <div className={classes.Payment}>
      <form className={classes.PaymentForm}>
        <h2 className={classes.Header}>Shipping Address</h2>
        <p className={classes.Label}>Name</p>
        <input className={classes.input} type="text" autoFocus required />
        <p className={classes.Label}>Contact Number</p>
        <input className={classes.input} type="text" max="10" required />
        <p className={classes.Label}>Street/Locality</p>
        <input className={classes.input} type="text" required />
        <p className={classes.Label}>Pincode</p>
        <input className={classes.input} type="number" min="100000"max="999999" inputMode="numeric" required />
        <p className={classes.Label}>Near By</p>
        <input className={classes.input} type="text" required />
        <Checkout
          total={props.total}
          cartLength={props.cartItems.length}
          cardElement={true}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.Reducer.cart,
    total: state.Reducer.total,
    isAuth: state.AuthReducer.isAuth,
  };
};

export default withRouter(connect(mapStateToProps)(PaymentForm));
