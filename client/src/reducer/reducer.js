import * as actionTypes from "./actionTypes";

let initialState = {
  username: "User",
  password: null,
  mail: null,
  cart: [],
  total: 0,
  order: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_DETAIL_UPDATE:
      return {
        ...state,
        ...action.userDetail[0],
        username: action.userDetail[0].username,
      };
    case actionTypes.NEW_USER_UPDATE:
      return {
        ...state,
        ...action.userDetail[0],
      };

    case actionTypes.CART_UPDATE:
      const updatedCart = [...state.cart];
      updatedCart.push(action.cart);
      return {
        ...state,
        cart: updatedCart,
        total: state.total + action.price,
      };

    case actionTypes.CART_DELETE_UPDATE:
      return {
        ...state,
        cart: action.cart,
      };
    case actionTypes.TOTAL_UPDATE:
      const updateCart = [...state.cart];
      let total = 0;
      for (let cart of updateCart) {
        total += cart.price;
      }
      return {
        ...state,
        total: total,
      };
    case actionTypes.ORDER_UPDATE:
      const fromCartToOrder = [...state.cart];
      const ordersArray = [];
      for (let item of fromCartToOrder) {
        ordersArray.push({
          ...item,
          date: action.date,
        });
      }
      return {
        ...state,
        cart: [],
        order: [...state.order, ...ordersArray],
        total: 0,
      };
    default:
      return state;
  }
};

export default Reducer;
