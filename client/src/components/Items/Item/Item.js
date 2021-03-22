import React, { useEffect } from "react";
import classes from "./Item.module.css";
import axios from "../../../axios";
import { connect } from "react-redux";
import * as actions from "../../../reducer/actions/index";

const Item = (props) => {
  useEffect(() => {
    axios
      .put(`${props.number}/${props.id}.json/`, props.state)
      .then(() => {})
      .catch((err) => props.onToastInit("failed", err.message));
  }, [props]);

  const cartHandler = () => {
    const cartItem = {
      product: props.imgName,
      image: props.img,
      price: props.price,
    };
    props.onCartUpdate(cartItem, props.price);
  };

  return (
    <div className={classes.Item}>
      <img className={classes.img} src={props.img} alt="" />
      <p className={classes.imgText}>{props.imgName}</p>
      <p className={classes.imgText}>₹ {props.price}</p>
      <button className={classes.button} onClick={cartHandler} type="button">
        Add to Basket
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.Reducer.id,
    number: state.Reducer.number,
    state: state.Reducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCartUpdate: (cart, price) => dispatch(actions.cartUpdate(cart, price)),
    onToastInit: (state, content) => dispatch(actions.toastInit(state, content))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
