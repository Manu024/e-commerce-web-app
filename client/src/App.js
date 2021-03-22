import React from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import LoginPassword from "./components/Login/LoginPassword/LoginPassword";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Orders from "./components/Orders/Orders";
import Cart from "./components/Cart/Cart";
import SignUp from "./components/SignIn/SignIn";
import Payment from "./components/PaymentForm/PaymentForm";
import Header from "./components/Header/Header";
import { connect } from "react-redux";
import Toast from "./components/Toast/Toast";
import * as actions from "./reducer/actions/index";

const App = (props) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    props.onAuthCheck();
  }, []);

  React.useEffect(() => {
    setShow(props.toast.show);
  }, [props.toast.show]);

  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/password" component={LoginPassword} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/cart/checkout">
          <Header />
          <Payment />
        </Route>
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      {routes}
      {show && (
        <Toast
          toastState={props.toast?.toastState}
          content={props.toast?.toastContent}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuth,
    toast: state.ActingReducer.toast,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheck: () => dispatch(actions.authCheck()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
