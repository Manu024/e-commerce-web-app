import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import CartItem from "./CartItem/CartItem";
import classes from "./Cart.module.css";
import CheckOut from "./CheckOut/CheckOut";
import axios from "../../axios";
import * as actions from "../../reducer/actions/index";

const Cart = (props) => {
  let [cartArray, setcartArray] = useState([]);

  const proceedHandler = () => {
    props.history.replace("/cart/checkout");
  };

  useEffect(() => {
    const deleteCartItemHandler = (product) => {
      let cart = [];
      cart = props.cartItems.filter((cartItem) => cartItem.product !== product);
      props.onCartdeleteUpdate(cart);
      props.onTotalUpdate();
    };
    const axiosPostRequest = async () => {
      await axios
        .put(`${props.number}/${props.id}.json`, props.state)
        .then(() => {})
        .catch((err) => props.onToastInit("failed", err.message));
      };
      setcartArray(
        props.cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.product}
            productName={cartItem.product}
            image={cartItem.image}
            price={cartItem.price}
            deleteCartItem={deleteCartItemHandler}
          />
        ))
      );
    axiosPostRequest();
  }, [props]);

  return (
    <React.Fragment>
      <Header />
      <div className={classes.cart_checkout}>
        <div className={classes.CartContainer}>
          <div className={classes.Cart}>
            <h1 style={{ color: "rgba(11, 2, 34, 0.919)" }}>Shopping Cart</h1>
            <p className={classes.price}>Price</p>
          </div>
          <hr />
          {props.isAuth && cartArray.length !== 0 ? cartArray : (<h3 className={classes.empty}>Cart is Empty 😞!</h3>)}
        </div>
        <CheckOut
          total={props.total}
          cartLength={cartArray.length}
          disabled={cartArray.length === 0}
          proceedHandler={proceedHandler}
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.Reducer.cart,
    isAuth: state.AuthReducer.isAuth,
    total: state.Reducer.total,
    number: state.Reducer.number,
    id: state.Reducer.id,
    state: state.Reducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCartdeleteUpdate: (cart) => dispatch(actions.cartDeleteUpdate(cart)),
    onTotalUpdate: () => dispatch(actions.totalUpdate()),
    onToastInit: (state, content) => dispatch(actions.toastInit(state, content))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
