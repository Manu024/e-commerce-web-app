import React, { useState } from "react";
import classes from "./Login.module.css";
import { withRouter, Link } from "react-router-dom";
import axios from "../../axios";
import { connect } from "react-redux";
import * as actions from "../../reducer/actions/index";

const Login = (props) => {
  let [incorrectMsg, setIncorrectMsg] = useState(null);

  const continueHandler = (e) => {
    e.preventDefault();
    const number = e.target[0].value;
    let data = null;

    axios
      .get(`${number}.json/`)
      .then((response) => {
        data = response.data;
        if (data != null) {
          const fetchedDetails = [];
          for (let key in response.data) {
            fetchedDetails.push({
              ...response.data[key],
              id: key,
            });
          }
          props.onUserDetailUpdate(fetchedDetails);
          props.history.push("/password");
        } else {
          setIncorrectMsg("*Incorrect UserName or UserName doesn't exist");
        }
      })
      .catch(() => props.onToastInit("failed", "Error Login/SignIn"));
  };

  return (
    <div className={classes.container}>
      <div className={classes.Login}>
        <p className={classes.header}>Welcome to AJIO</p>
        <p id={classes.loginParaTag}>
          Login /{" "}
          <Link
            to="/signUp"
            style={{ color: "rgb(209, 137, 35)", fontSize: "small" }}
          >
            Create Account
          </Link>
        </p>
        <label id={classes.loginParaTag}>Enter Mobile Number</label>
        <form onSubmit={(e) => continueHandler(e)}>
          <input
            className={classes.inputMail}
            type="text"
            maxLength="10"
            required
          />
          <br />
          <span className={classes.incorrectMsg}>{incorrectMsg}</span>
          <br />
          <button className={classes.btn}>CONTINUE</button>
        </form>
        <label id={classes.loginParaTag}>
          By Signing In, I agree to{" "}
          <span className={classes.TnS}>Terms and Conditions.</span>
        </label>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.Reducer.username,
    password: state.Reducer.password,
    state: state.Reducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserDetailUpdate: (fetchedDetails) =>
      dispatch(actions.userUpdate(fetchedDetails)),
    onAuthCheck: () => dispatch(actions.authCheck()),
    onToastInit: () => dispatch(actions.toastInit("failed", "Error Login/SignIn"))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
