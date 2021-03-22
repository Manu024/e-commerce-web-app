import * as actionTypes from "./actionTypes";

let initialState = {
  toast: {
    show: false,
  },
  loader: false,
};

const actingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOAST_UPDATE:
      return {
        ...state,
        toast: {
          ...action.toast,
        },
      };
    default:
      return state;
  }
};
export default actingReducer;
