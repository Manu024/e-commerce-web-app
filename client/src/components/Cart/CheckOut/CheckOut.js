import React, { useState } from "react";
import classes from "./CheckOut.module.css";
import { withRouter } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import axios from "axios";
import qs from "qs";
import axiosFirebase from "../../../axios";
import * as actions from "../../../reducer/actions/index";

const CheckOut = (props) => {
  const [payBtnStatus, setPayBtnStatus] = useState(true);
  const [payErrorStatus, setPayErrorStatus] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();
    setPayBtnStatus(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const stripeParameters = {
        id,
        amount: props.total * 100,
      };
      axios
        .post(
          "/api/payment",
          qs.stringify(stripeParameters),
          config
        )
        .then(res => {
          if (res.data.message === "succeeded") {
            const date = new Date().toDateString();
            props.onOrdersUpdate(date);
            const data = {
              cart: [],
              total: 0,
            };
            axiosFirebase
              .put(`${props.number}/${props.id}.json`, data)
              .then(() => {
                setPayBtnStatus(false);
                props.onToastInit("success", "Order Placed");
                props.history.replace("/");
              });
          }
        })
        .catch(error => {
          setPayBtnStatus(false);
          props.onToastInit("failed", error.message);
        });
    }
  };
  const changeHandler = (event) => {
    if (event.complete) {
      // enable payment button
      setPayBtnStatus(false);
      setPayErrorStatus("Validation Success");
    } else if (event.error) {
      // show validation to customer
      setPayErrorStatus(event.error.message);
      setPayBtnStatus(true);
    }
  };

  return (
    <div
      className={
        !props.cardElement ? classes.CheckOut : classes.paymentCheckout
      }
    >
      {props.location.pathname === "/cart" ? (
        <h2 className={classes.h2}> Checkout </h2>
      ) : (
        <h2 className={classes.h2}>Payment</h2>
      )}
      {props.cardElement ? (
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          onChange={changeHandler}
          className={classes.cardElement}
        />
      ) : null}
      <p className={!payBtnStatus ? classes.errorSuccess : classes.errorMsg}>
        {payErrorStatus}
      </p>
      <h4 className={classes.h4}>Total of ({props.cartLength}) items</h4>
      <h5 className={classes.h5}>Subtotal: ₹ {props.total}</h5>
      <button
        onClick={props.cardElement ? paymentHandler : props.proceedHandler}
        disabled={props.disabled ?? payBtnStatus}
        className={classes.btn}
        type="button"
      >
        {props.location.pathname === "/cart"
          ? "Proceed to Checkout"
          : "Place Your Order"}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    number: state.Reducer.number,
    id: state.Reducer.id,
    state: state.Reducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrdersUpdate: (date) => dispatch(actions.orderUpdate(date)),
    onToastInit: (toastState, toastContent) =>
      dispatch(actions.toastInit(toastState, toastContent)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckOut)
);
