import React from "react";
export const ThemeContext = React.createContext();

const ThemeProvider = props => {
  return (
    <ThemeContext.Provider value={props.theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
