/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { colors } from "../Colors/Colors";

const Button = props => {
  //Función que retorna los estilos del componente
  const styles = theme => {
    //Verifica si hay props de color. En caso de no haber, asigna uno por default
    let colorInput = props.color ? colors[props.color] : colors.primary;

    //Verifica si hay estilos Custom y crea variables
    var customTheme = theme;
    if (theme) {
      //Se crea variable especifica para los Selectores (para no sobreescribir los estilos Default)
      var customThemeHover = theme[":hover"];
      var customThemeFocus = theme[":focus"];
    }

    //Estilos base del Input
    const baseInput = {
      boxSizing: "border-box",
      padding: "10px 15px",
      fontSize: "16px",
      margin: "5px",
      outline: "none"
    };

    //Switch case para asignar estilos dependiendo de la variante
    switch (props.variant) {
      //Case para variante "filled"
      case "filled":
        let variantFilled = {
          border: "none",
          backgroundColor: colors.gray,
          borderBottom: "solid 1px",
          borderRadius: "5px 5px 0 0",
          borderColor: colorInput,
          transition: "border-width 0.05s",
          ":hover": {
            borderBottom: "solid 2px",
            borderColor: colorInput,
            ...customThemeHover
          },
          ":focus": {
            borderBottom: "solid 2px",
            borderColor: colorInput,
            ...customThemeFocus
          }
        };
        return {
          ...variantFilled,
          ...baseInput,
          ...customTheme
        };
      //Case para variante "outlined"
      case "outlined":
        let varianOutlined = {
          border: "none",
          backgroundColor: "white",
          border: "solid 1px",
          borderRadius: "5px",
          borderColor: colorInput,
          transition: "border-width 0.05s",
          ":hover": {
            border: "solid 2px",
            borderColor: colorInput,
            ...customThemeHover
          },
          ":focus": {
            border: "solid 2px",
            borderColor: colorInput,
            ...customThemeFocus
          }
        };
        return {
          ...varianOutlined,
          ...baseInput,
          ...customTheme
        };
      //Case para variante por default
      default:
        let variantDefault = {
          border: "none",
          backgroundColor: "white",
          borderBottom: "solid 1px",
          borderRadius: "5px 5px 0 0",
          borderColor: colorInput,
          transition: "border-width 0.05s",
          ":hover": {
            borderBottom: "solid 2px",
            borderColor: colorInput,
            ...customThemeHover
          },
          ":focus": {
            borderBottom: "solid 2px",
            borderColor: colorInput,
            ...customThemeFocus
          }
        };
        return {
          ...variantDefault,
          ...baseInput,
          ...customTheme
        };
    }
  };

  return (
    <ThemeContext.Consumer>
      {theme => (
        <input
          {...props}
          placeholder={props.placeholder}
          value={props.value}
          css={styles(theme)}
        />
      )}
    </ThemeContext.Consumer>
  );
};

export default Button;
