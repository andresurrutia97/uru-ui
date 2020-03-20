import React, { Component } from "react";

import { Button, ThemeProvider, Input } from "uru-ui";

const theme = {
  padding: "10px 30px",
  fontSize: "16px",
  margin: "5px",
  border: "solid 2px green",
  color: "white",
  backgroundColor: "green"
};

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Button>Custom</Button>
        </ThemeProvider>
        <Button color="primary">Danger Button</Button>
        <Button outlined color="danger">
          Danger Button
        </Button>
        <Button outlined color="success">
          Danger Button
        </Button>
        <Button outlined>Danger Button</Button>
      </React.Fragment>
    );
  }
}
