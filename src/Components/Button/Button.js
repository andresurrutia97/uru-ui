/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { colors } from "../Colors/Colors";

const Button = props => {
  const baseTheme = theme => ({
    ...theme
  });

  const variants = () => {
    const baseButton = {
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "8px",
      margin: "5px",
      outline: "none",
      cursor: "pointer"
    };
    const baseButtonFilled = {
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      border: "none",
      color: "white"
    };
    const baseButtonOutlined = {
      border: "solid 1px",
      backgroundColor: "white"
    };
    switch (props.color) {
      case "primary":
        let variantPrimary = {};
        props.outlined
          ? (variantPrimary = {
              borderColor: colors.primary,
              color: colors.primary,
              ...baseButtonOutlined,
              ":hover": {
                borderColor: colors.primaryDark,
                color: colors.primaryDark
              }
            })
          : (variantPrimary = {
              backgroundColor: colors.primary,
              ...baseButtonFilled,
              ":hover": {
                backgroundColor: colors.primaryDark
              }
            });
        return {
          ...variantPrimary,
          ...baseButton
        };
      case "danger":
        let variantDanger = {};
        props.outlined
          ? (variantDanger = {
              borderColor: colors.danger,
              color: colors.danger,
              ...baseButtonOutlined,
              ":hover": {
                borderColor: colors.dangerDark,
                color: colors.dangerDark
              }
            })
          : (variantDanger = {
              backgroundColor: colors.danger,
              ...baseButtonFilled,
              ":hover": {
                backgroundColor: colors.dangerDark
              }
            });
        return {
          ...variantDanger,
          ...baseButton
        };
      case "success":
        let variantSuccess = {};
        props.outlined
          ? (variantSuccess = {
              borderColor: colors.success,
              color: colors.success,
              ...baseButtonOutlined,
              ":hover": {
                borderColor: colors.successDark,
                color: colors.successDark
              }
            })
          : (variantSuccess = {
              backgroundColor: colors.success,
              ...baseButtonFilled,
              ":hover": {
                backgroundColor: colors.successDark
              }
            });
        return {
          ...variantSuccess,
          ...baseButton
        };
      default:
        let variantDefault = {};
        props.outlined
          ? (variantDefault = {
              borderColor: colors.default,
              color: colors.default,
              ...baseButtonOutlined,
              ":hover": {
                borderColor: colors.defaultDark,
                color: colors.defaultDark
              }
            })
          : (variantDefault = {
              backgroundColor: colors.default,
              ...baseButtonFilled,
              ":hover": {
                backgroundColor: colors.defaultDark
              }
            });
        return {
          ...variantDefault,
          ...baseButton
        };
    }
  };

  const css = theme => {
    if (theme) return baseTheme(theme);
    else {
      return variants();
    }
  };

  const outlined = theme => {
    if (theme) return baseTheme(theme);
    else {
      return variants();
    }
  };

  return (
    <ThemeContext.Consumer>
      {theme => <button css={css(theme)}>{props.children}</button>}
    </ThemeContext.Consumer>
  );
};

export default Button;
