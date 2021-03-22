import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer/reducer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import authReducer from "./reducer/authReducer";
import actingReducer from "./reducer/actingReducer"; 
import thunk from "redux-thunk";

const stripePromise = loadStripe("pk_test_51HRL3XGbc59fm8bCHNovXa8KvU6WgS1roASkEz6JQu7P1uTmdJ9xL1iIYCEIAHYAuArjCMWsARG5YPccaLDqVqzh00F7graUc1");

const rootReducer = combineReducers({
  Reducer: reducer,
  AuthReducer: authReducer,
  ActingReducer: actingReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <App />
      </Provider>
    </Elements>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();