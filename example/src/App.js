import React, { Component } from "react";

import { Button, ThemeProvider, Input, InputNumber, Select } from "uru-ui";

const theme = {
  padding: "10px 30px",
  fontSize: "16px",
  margin: "5px",
  border: "solid 2px green",
  color: "white",
  backgroundColor: "#ccc"
};

const options = [
  { id: "1", label: "Perro" },
  { id: "2", label: "gato" },
  { id: "3", label: "leon" },
  { id: "4", label: "culebra" }
];

export default class App extends Component {

  render() {
    const selectedOptionsStyles = {
      color: "#3c763d",
      backgroundColor: "#dff0d8"
    };
    const optionsListStyles = {
      backgroundColor: "#fcf8e3",
      color: "#8a6d3b"
    };
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
          <InputNumber placeholder="numeros" variant="outlined"></InputNumber>
        </div>
        <div>
          <h2>Multiple selecte</h2>
          <Select
            options={options}
            selectedOptionsStyles={selectedOptionsStyles}
            optionsListStyles={optionsListStyles}
            isSingleSelect={false}
          ></Select>
        </div>
      </React.Fragment>
    );
  }
}
