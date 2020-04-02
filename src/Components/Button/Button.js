/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";

import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { colors } from "../Colors/Colors";

const Button = props => {
  //Función que retorna los estilos del componente
  const styles = theme => {
    //verifica si la variante outlined esta activada
    let outlined = false;
    if (props.variant === "outlined") {
      outlined = true;
    }

    //Verifica si hay estilos Custom y crea variables
    var customTheme = theme;
    if (theme) {
      //Se crea variable especifica para los Selectores (para no sobreescribir los estilos Default)
      var customThemeHover = theme[":hover"];
    }
    //Estilos base del botón
    const baseButton = {
      boxSizing: "border-box",
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "8px",
      margin: "5px",
      outline: "none",
      cursor: "pointer"
    };

    //Estilos base del botón con variante "Filled"
    const baseButtonFilled = {
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      border: "none",
      color: "white"
    };

    //Estilos base del botón con variante "Outlined"
    const baseButtonOutlined = {
      border: "solid 1px",
      backgroundColor: "white"
    };

    //Switch case para asignar estilos dependiendo del color y la variante
    switch (props.color) {
      //Case para color "primary"
      case "primary":
        let variantPrimary = {};
        outlined
          ? (variantPrimary = {
              borderColor: colors.primary,
              color: colors.primary,
              ...baseButtonOutlined,
              ":hover": {
                borderColor: colors.primaryDark,
                color: colors.primaryDark,
                ...customThemeHover
              }
            })
          : (variantPrimary = {
              backgroundColor: colors.primary,
              ...baseButtonFilled,
              ":hover": {
                backgroundColor: colors.primaryDark,
                ...customThemeHover
              }
            });
        return {
          ...variantPrimary,
          ...baseButton,
          ...customTheme
        };
      //Case para color "danger"
      case "danger":
        let variantDanger = {};
        outlined
          ? (variantDanger = {
              borderColor: colors.danger,
              color: colors.danger,
              ...baseButtonOutlined,
              ":hover": {
                borderColor: colors.dangerDark,
                color: colors.dangerDark,
                ...customThemeHover
              }
            })
          : (variantDanger = {
              backgroundColor: colors.danger,
              ...baseButtonFilled,
              ":hover": {
                backgroundColor: colors.dangerDark,
                ...customThemeHover
              }
            });
        return {
          ...variantDanger,
          ...baseButton,
          ...customTheme
        };
      //Case para color "success"
      case "success":
        let variantSuccess = {};
        outlined
          ? (variantSuccess = {
              borderColor: colors.success,
              color: colors.success,
              ...baseButtonOutlined,
              ":hover": {
                borderColor: colors.successDark,
                color: colors.successDark,
                ...customThemeHover
              }
            })
          : (variantSuccess = {
              backgroundColor: colors.success,
              ...baseButtonFilled,
              ":hover": {
                backgroundColor: colors.successDark,
                ...customThemeHover
              }
            });
        return {
          ...variantSuccess,
          ...baseButton,
          ...customTheme
        };
      //Default
      default:
        let variantDefault = {};
        outlined
          ? (variantDefault = {
              borderColor: colors.default,
              color: colors.default,
              ...baseButtonOutlined,
              ":hover": {
                borderColor: colors.defaultDark,
                color: colors.defaultDark,
                ...customThemeHover
              }
            })
          : (variantDefault = {
              backgroundColor: colors.default,
              ...baseButtonFilled,
              ":hover": {
                backgroundColor: colors.defaultDark,
                ...customThemeHover
              }
            });
        return {
          ...variantDefault,
          ...baseButton,
          ...customTheme
        };
    }
  };

  return (
    <ThemeContext.Consumer>
      {theme => (
        <button {...props} css={styles(theme)}>
          {props.children}
        </button>
      )}
    </ThemeContext.Consumer>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  colors: PropTypes.string
};

export default Button;
