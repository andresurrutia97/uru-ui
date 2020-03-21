/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { colors } from "../Colors/Colors";

const Button = props => {
  const customTheme = theme => ({
    ...theme
  });

  const variants = () => {
    let colorInput = props.color ? colors[props.color] : colors.primary;

    const baseInput = {
      boxSizing: "border-box",
      padding: "10px 20px",
      fontSize: "16px",
      margin: "5px",
      outline: "none"
    };

    switch (props.variant) {
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
            borderColor: colorInput
          },
          ":focus": {
            borderBottom: "solid 2px",
            borderColor: colorInput
          }
        };

        return {
          ...variantFilled,
          ...baseInput
        };
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
            borderColor: colorInput
          },
          ":focus": {
            border: "solid 2px",
            borderColor: colorInput
          }
        };

        return {
          ...varianOutlined,
          ...baseInput
        };
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
            borderColor: colorInput
          },
          ":focus": {
            borderBottom: "solid 2px",
            borderColor: colorInput
          }
        };

        return {
          ...variantDefault,
          ...baseInput
        };
    }
  };

  const css = theme => {
    if (theme) return customTheme(theme);
    else {
      return variants();
    }
  };

  return (
    <ThemeContext.Consumer>
      {theme => (
        <input
          {...props}
          placeholder={props.placeholder}
          value={props.value}
          css={css(theme)}
        />
      )}
    </ThemeContext.Consumer>
  );
};

export default Button;
