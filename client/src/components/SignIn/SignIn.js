import React from "react";
import classes from "./SignIn.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../reducer/actions/index";

const SignIn = (props) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const userDetail = {
      username: e.target[0].value,
      mail: e.target[1].value,
      number: e.target[2].value,
      password: e.target[3].value,
    };
    props.onNewUser(userDetail);
    props.history.push("/");
  };

  return (
    <div className={classes.SignIn}>
      <p className={classes.header}>Welcome to AJIO</p>
      <p style={{ color: "rgb(209, 147, 45)", fontSize: "large" }}>
        Create Account
      </p>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <label>Enter UserName</label>
        <input className={classes.input} type="text" maxLength="10" required />
        <label>Enter Mail</label>
        <input className={classes.input} type="email" maxLength="20" required />
        <label>Enter Number</label>
        <input className={classes.input} type="text" maxLength="10" required />
        <label>Enter Password</label>
        <input
          className={classes.input}
          type="password"
          maxLength="6"
          required
        />

        <br />
        <button className={classes.btn}>SIGN IN</button>
      </form>
      <label>
        By Signing In, I agree to{" "}
        <span className={classes.TnS}>Terms and Conditions.</span>
      </label>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.Reducer,
    username: state.Reducer.username,
    number: state.Reducer.number,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNewUser: userDetail => dispatch(actions.newUser(userDetail)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
