import React, { useState } from "react";
import classes from "./LoginPassword.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../reducer/actions/index";

const LoginPassword = (props) => {
  let [incorrectMsg, setIncorrectMsg] = useState(null);

  const proceedHandler = (e) => {
    e.preventDefault();
    const password = e.target[0].value;

    if (props.password === password) {
      props.onAuthenticate(props.number);
      props.history.push("/");
    } else {
      setIncorrectMsg("Incorrect Password");
    }
  };
  return (
    <div className={classes.LoginPassword}>
      <p className={classes.header}>Welcome to AJIO</p>
      <label>Enter Password</label>
      <form onSubmit={(e) => proceedHandler(e)}>
        <input
          className={classes.inputPassword}
          type="password"
          maxLength="6"
          required
        />
        <br />
        <span className={classes.incorrectMsg}>{incorrectMsg}</span>
        <br />
        <button className={classes.btn}>SIGN IN</button>
      </form>
      <label id={classes.loginParaTag}>
        By Signing In, I agree to{" "}
        <span className={classes.TnS}>Terms and Conditions.</span>
      </label>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    password: state.Reducer.password,
    username: state.Reducer.username,
    number: state.Reducer.number,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (number) => dispatch(actions.authInit(number)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPassword));
