import React from "react";
import classes from "./SideBar.module.css";
import Backdrop from "./Backdrop/Backdrop";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../../reducer/actions/index";

const sidebarTexts = [
  ["Account", "/"],
  ["My Orders", "/orders"],
  ["Go to Basket", "/cart"],
  ["My Wishlist", "/"],
  ["Track Orders", "/orders"],
];

const SideBar = (props) => {
  let sidebarText = sidebarTexts.map((text) => (
    <Link
      key={text[0]}
      className={classes.sideBarText}
      to={text[1]}
      //  onClick={props.showSideBar()}
    >
      {text[0]}
      <hr className={classes.hr1} />
    </Link>
  ));

  return (
    <>
      <div className={props.clicked ? classes.sideBarEnabled : classes.sideBar}>
        <div className={classes.menu}>
          <div
            className={props.clicked ? classes.change : classes.container}
            onClick={props.showSideBar}
          >
            <div className={classes.bar1}></div>
            <div className={classes.bar2}></div>
            <div className={classes.bar3}></div>
          </div>
          <span className={classes.welcomeText}>AJIO</span>
        </div>
        {sidebarText}
        {props.isAuthenticated ? (
          <span className={classes.sideBarText} onClick={props.onLogout}>
            LOGOUT
            <hr className={classes.hr1} />
          </span>
        ) : (
          <Link className={classes.sideBarText} to="/login">
            LOGIN
            <hr className={classes.hr1} />
          </Link>
        )}
      </div>
      <Backdrop show={props.clicked} clicked={props.showSideBar} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideBar)
);
