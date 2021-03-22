import React, { useState } from "react";
import classes from "./Header.module.css";
import logo from "../../ajio/Ajio-Logo.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingBag,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../SideBar/SideBar";
import * as actions from "../../reducer/actions/index";

const Header = (props) => {
  const [sideBarClicked, setSideBarClicked] = useState(false);

  const sideBarClickedHandler = () => {
    setSideBarClicked((prevState) => !prevState);
  };

  return (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <div className={classes.menu} onClick={sideBarClickedHandler}>
            <div className={classes.bar1}></div>
            <div className={classes.bar2}></div>
            <div className={classes.bar3}></div>
          </div>
          <Link to="/">
            <img className={classes.logo} src={logo} alt="" />
          </Link>
          <span className={classes.search}>
            <input
              className={classes.searchText}
              type="text"
              placeholder="What are you looking for?"
            />
            <FontAwesomeIcon className={classes.searchIcon} icon={faSearch} />
          </span>
          <Link className={classes.Icons} to="/orders">
            <FontAwesomeIcon className={classes.Icon} icon={faShoppingBag} />
          </Link>
          <Link className={classes.Icons} to="/cart">
            <FontAwesomeIcon className={classes.Icon} icon={faShoppingCart} />
          </Link>

          {props.isAuthenticated ? (
            <span className={classes.signIn} onClick={props.onLogout}>
              Hello {props.username}
            </span>
          ) : (
            <Link className={classes.signIn} to="/login">
              Login/SignIn
            </Link>
          )}

          {props.isAuthenticated ? (
            <span onClick={props.onLogout}>
              <FontAwesomeIcon
                className={classes.signInIcon}
                icon={faSignOutAlt}
              />
            </span>
          ) : (
            <Link to="/login">
              <FontAwesomeIcon
                className={classes.signInIcon}
                icon={faSignInAlt}
              />
            </Link>
          )}
        </div>
      </div>
      {sideBarClicked && (
        <SideBar clicked={sideBarClicked} showSideBar={sideBarClickedHandler} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.Reducer.username,
    isAuthenticated: state.AuthReducer.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
