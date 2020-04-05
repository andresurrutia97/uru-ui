/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { colors } from "../Colors/Colors";

class Input extends React.Component {
  //Función que retorna los estilos del componente
  styles = (theme) => {
    //Verifica si hay props de color. En caso de no haber, asigna el default
    let colorInput = this.props.color
      ? colors[this.props.color]
      : colors.primary;

    //Verifica si hay estilos Custom y crea variables
    var customTheme = theme;
    if (theme) {
      //Se crea variable especifica para los Selectores (para no sobreescribir los estilos default)
      var customThemeHover = theme[":hover"];
      var customThemeFocus = theme[":focus"];
    }

    //Estilos base del Input
    const baseInput = {
      fontFamily: "Montserrat",
      boxSizing: "border-box",
      padding: "10px 15px",
      fontSize: "16px",
      margin: "5px",
      outline: "none",
    };

    //Switch case para asignar estilos dependiendo de la variante
    switch (this.props.variant) {
      //Case para variante "filled"
      case "filled":
        let variantFilled = {
          border: "none",
          backgroundColor: colors.gray,
          borderBottom: "solid 1px",
          borderRadius: "5px 5px 0 0",
          borderColor: colorInput,
          ":hover": {
            borderBottom: "solid 2px",
            borderColor: colorInput,
            padding: "10px 15px 9px",
            ...customThemeHover,
          },
          ":focus": {
            borderBottom: "solid 2px",
            borderColor: colorInput,
            padding: "10px 15px 9px",
            ...customThemeFocus,
          },
        };
        return {
          ...variantFilled,
          ...baseInput,
          ...customTheme,
        };
      //Case para variante "outlined"
      case "outlined":
        let varianOutlined = {
          border: "none",
          backgroundColor: "white",
          border: "solid 1px",
          borderRadius: "5px",
          borderColor: colorInput,
          ":hover": {
            border: "solid 2px",
            borderColor: colorInput,
            padding: "9px 14px",
            ...customThemeHover,
          },
          ":focus": {
            border: "solid 2px",
            borderColor: colorInput,
            padding: "9px 14px",
            ...customThemeFocus,
          },
        };
        return {
          ...varianOutlined,
          ...baseInput,
          ...customTheme,
        };
      //Default
      default:
        let variantDefault = {
          border: "none",
          backgroundColor: "white",
          borderBottom: "solid 1px",
          borderRadius: "5px 5px 0 0",
          borderColor: colorInput,
          ":hover": {
            borderBottom: "solid 2px",
            borderColor: colorInput,
            padding: "10px 15px 9px",
            ...customThemeHover,
          },
          ":focus": {
            borderBottom: "solid 2px",
            borderColor: colorInput,
            padding: "10px 15px 9px",
            ...customThemeFocus,
          },
        };
        return {
          ...variantDefault,
          ...baseInput,
          ...customTheme,
        };
    }
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <input
            {...this.props}
            placeholder={this.props.placeholder}
            value={this.props.value}
            css={this.styles(theme)}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}

Input.propTypes = {
  variant: PropTypes.string,
  colors: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
