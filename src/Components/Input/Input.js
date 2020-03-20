import React from "react";
import styles from "./Input.module.css";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { colors } from "../Colors/Colors";

export const Input = props => {
  let classes = [styles.btn];

  const baseTheme = ({ button }) => {
    classes = [styles.btn, styles.btnWTheme];
    return {
      backgroundColor: button.backgroundColor,
      borderColor: button.borderColor,
      color: button.color,
      fontSize: button.fontSize,
      padding: "7px 15px",
      borderRadius: "8px",
      margin: "5px",
      border: "none"
    };
  };

  const variants = () => {
    const baseButton = {
      padding: "7px 15px",
      fontSize: "16px",
      color: "white",
      margin: "5px"
    };
    switch (props.variant) {
      case "standard":
        classes = [styles.btn, styles.btnPrimary];
        return {
          borderBottom: "solid 1px",
          borderColor: colors.primary,

          ...baseButton
        };
      case "danger":
        classes = [styles.btn, styles.btnDanger];
        return {
          backgroundColor: colors.danger,
          ...baseButton
        };
      case "success":
        classes = [styles.btn, styles.btnSuccess];
        return {
          backgroundColor: colors.success,
          ...baseButton
        };
      default:
        classes = [styles.btn, styles.btnDefault];
        return {
          backgroundColor: colors.default,
          ...baseButton
        };
    }
  };

  return (
    <ThemeContext.Consumer>
      {theme => (
        <input
          style={theme ? baseTheme(theme) : variants()}
          className={classes.join(" ")}
        ></input>
      )}
    </ThemeContext.Consumer>
  );
};
