import React from "react";

export const ThemeContext = React.createContext();

export function ThemeProvider(props) {
  return (
    <ThemeContext.Provider value={props.theme}>
      {props.children}
    </ThemeContext.Provider>
  );
}
