import * as actionTypes from "../actionTypes";
import axios from "../../axios";
import jwt from "jsonwebtoken";

export const authentication = (token) => {
  return {
    type: actionTypes.AUTHENTICATION,
    token: token
  };
};

export const authCheckUpdate = (isAuth, token) => {
  return {
    type: actionTypes.AUTH_CHECK_UPDATE,
    isAuth,
    token,
  };
};


export const userUpdate = (userDetail) => {
  return {
    type: actionTypes.USER_DETAIL_UPDATE,
    userDetail:userDetail
  };
};

export const newUserUpdate = (userDetail) => {
  return {
    type: actionTypes.NEW_USER_UPDATE,
    userDetail:userDetail
  };
};

export const toastUpdate = (show, toastState, toastContent) => {
  return {
    type: actionTypes.TOAST_UPDATE,
    toast: {
      toastState: toastState,
      toastContent: toastContent,
      show: show
    }
  }
}

export const cartUpdate = (cart, price) => {
  return {
    type: actionTypes.CART_UPDATE,
    cart: cart,
    price: price 
  }
}
export const cartDeleteUpdate = cart => {
  return {
    type: actionTypes.CART_DELETE_UPDATE,
    cart: cart
  }
}

export const orderUpdate = date => {
  return {
    type: actionTypes.ORDER_UPDATE,
    date: date
  }
}

export const totalUpdate = () => {
  return {
    type: actionTypes.TOTAL_UPDATE,
  }
}

export const toastInit = (toastState, toastContent) => {
  return dispatch => {
    dispatch(toastUpdate(true,toastState, toastContent));
    setTimeout(() => {
      dispatch(toastUpdate(false));
    }, 3000)
  }
}

export const logout = () => {
    localStorage.clear();
    window.location.reload();
}

export const fetchUser = (number) => {
  return (dispatch) => {
    axios
      .get(`${number}.json`)
      .then((response) => {
        if (response.data != null) {
          const fetchedDetails = [];
          for (let key in response.data) {
            fetchedDetails.push({
              ...response.data[key],
              id: key,
            });
          }
          dispatch(userUpdate(fetchedDetails));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => dispatch(toastInit("failed", err.message)));
  };
};

export const authInit = (number) => {
  return dispatch => {
    let token;
    try {
      token = jwt.sign(
        { number: number },
        process.env.REACT_APP_JWT_SECRET_KEY,
        { expiresIn: "2h" }
      );
      const date = new Date();
      localStorage.setItem(
        "token",
        JSON.stringify({ token, expiry: date.getTime() + 1000 * 60 * 60 * 2})
      );
    } catch (err) {
      token = null;
    }
    dispatch(authentication(token));
  }
}

export const authCheck = () => {
  return (dispatch) => {
      const localToken = JSON.parse(localStorage.getItem("token")) || null;
      const now = new Date();
      if (localToken) {
          if (localToken.expiry < now.getTime()) {
              dispatch(authCheckUpdate(false, null));
              localStorage.removeItem("token");
            } else {
                const tokenObj = jwt.verify(localToken.token, process.env.REACT_APP_JWT_SECRET_KEY);
                dispatch(authCheckUpdate(true, localToken.token));
                dispatch(fetchUser(tokenObj.number));
      }
    } else {
      dispatch(authCheckUpdate(false, null));
    }
  };
};


export const orderUpdateDirect = (number, id) => {
  return dispatch => {
    const date = new Date().toString();
    const cart = [];
    axios.put(`${number}/${id}/cart.json`, cart)
    .then(() => dispatch(orderUpdate(date)))
    .catch(err => toastInit("failed", err.message));
  }
}

export const newUser = userDetails => {
  return dispatch => {
    axios
      .post(`${userDetails.number}.json`, userDetails)
      .then((response) => {
        const userDetail = [
          {
            ...userDetails,
            id: response.data.name,
          },
        ];
        dispatch(newUserUpdate(userDetail));
        dispatch(authInit(userDetail[0].number));
      })
      .catch(() => dispatch(toastInit("failed", "Error Login/SignIn")));
  }
}