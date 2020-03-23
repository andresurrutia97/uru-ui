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
const themeSelect = {
  root: {
    borderWidth: "3px",
    borderRadius: "0 50px 50px 0",
    borderColor: "blue",
    [":hover"]: { borderColor: "green", borderWidth: "3px" },
    [":focus"]: { borderColor: "black", borderWidth: "3px" }
  },
  selectedOptionItem: { color: "red" },
  selectedOptionsPills: {
    backgroundColor: "#a3e4be"
  },
  placeholder: {
    color: "#c934ce"
  }
};

const options = [
  { label: "Perro" },
  { label: "gato" },
  { label: "leon" },
  { label: "culebra" },
  { label: "pez" },
  { label: "tigre" },
  { label: "aguila" }
];

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
          <InputNumber placeholder="numeros" variant="outlined"></InputNumber>
        </div>
        <div>
          <h2>Multiple select</h2>
          <Select options={options} multi></Select>
          <ThemeProvider theme={themeSelect}>
            <Select
              options={options}
              multi
              placeholder="Custom select..."
            ></Select>
          </ThemeProvider>
        </div>
      </React.Fragment>
    );
  }
}
