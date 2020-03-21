import React, { Component } from "react";

import { Button, ThemeProvider, Input, InputNumber } from "uru-ui";

const theme = {
  padding: "10px 30px",
  fontSize: "16px",
  margin: "5px",
  border: "solid 2px green",
  color: "white",
  backgroundColor: "#ccc"
};

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <h2>Botones</h2>
          <ThemeProvider theme={theme}>
            <Button>Custom Button</Button>
          </ThemeProvider>
          <Button color="primary">Primary Button</Button>
          <Button color="danger">Danger Button</Button>
          <Button outlined color="success">
            Success outlined Button
          </Button>
          <Button outlined>Default outlined Button</Button>
        </div>
        <div>
          <h2>Inputs</h2>
          <ThemeProvider theme={theme}>
            <Input placeholder="custom Input" />
          </ThemeProvider>
          <Input
            color="success"
            placeholder="filled success"
            variant="filled"
          />
          <Input placeholder="outlined primary" variant="outlined" />
          <Input color="danger" placeholder="Default danger" />
        </div>
        <div>
          <h2>Number Input</h2>
          <Input type="number" placeholder="number input" />
          <InputNumber></InputNumber>
        </div>
      </React.Fragment>
    );
  }
}
