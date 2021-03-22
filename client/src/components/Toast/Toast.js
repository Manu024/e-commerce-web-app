import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import classes from "./Toast.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Toast = (props) => {
  const success = (
    <FontAwesomeIcon className={classes.toastIcon} icon={faCheckCircle} />
  );
  const failed = (
    <FontAwesomeIcon className={classes.toastIcon} icon={faTimesCircle} />
  );
  return (
    <div
      className={
        props.toastState === "success"
          ? [classes.Toast, classes.ToastSuccess].join(" ")
          : [classes.Toast, classes.ToastFailure].join(" ")
      }
    >
      {props.toastState === "success" ? success : failed}
      {props.content}
    </div>
  );
};

export default Toast;
