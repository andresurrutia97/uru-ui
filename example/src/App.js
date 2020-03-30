import React, { Component } from "react";

import {
  Button,
  ThemeProvider,
  Input,
  InputNumber,
  Select,
  Autocomplete
} from "uru-ui";

const buttonCustomStyle = {
  padding: "8px",
  fontSize: "14px",
  margin: "5px",
  border: "solid 2px green",
  borderRadius: "0 5px 0 5px",
  ":hover": {
    borderColor: "black"
  }
};

const inputCustomStyle = {
  padding: "8px",
  fontSize: "14px",
  margin: "5px",
  border: "dotted 3px",
  borderColor: "blue",
  borderRadius: "none",
  ":hover": {
    borderColor: "orange"
  }
};
const selectCustomStyle = {
  root: {
    borderWidth: "3px",
    borderRadius: "0 50px 50px 0",
    borderColor: "blue",
    width: "300px",
    ":hover": { borderColor: "green", borderWidth: "3px" },
    ":focus": { borderColor: "black", borderWidth: "3px" }
  },
  selectedOptionItem: { color: "red" },
  selectedOptionsPills: {
    backgroundColor: "#a3e4be"
  },
  placeholder: {
    color: "#c934ce"
  }
};

const autocomleteCustomStyle = {
  root: { width: "300px" },
  input: {
    padding: "8px",
    fontSize: "14px",
    borderStyle: " dotted dashed double solid",
    borderWidth: " 3px",
    borderRadius: "none",
    ":hover": {
      borderColor: "red"
    }
  }
};

const optionsSelect = [
  { label: "Perro" },
  { label: "gato" },
  { label: "leon" },
  { label: "culebra" },
  { label: "pez" },
  { label: "tigre" },
  { label: "aguila" }
];

const autocomplete = [
  "perro",
  "gato",
  "leon",
  "culebra",
  "pez",
  "tigre",
  "aguila",
  "arroz"
  // "agua",
  // "alcohol",
  // "aprinchi"
];

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      input: ""
    };
  }

  onChange = event => {
    const input = event.target.value;
    console.log(input);
    this.setState({ input });
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <h2>Botones</h2>
          <ThemeProvider theme={buttonCustomStyle}>
            <Button color="danger">Custom Button</Button>
          </ThemeProvider>
          <Button color="primary">Primary Button</Button>
          <Button color="danger">Danger Button</Button>
          <Button variant="outlined" color="success">
            Success outlined Button
          </Button>
          <Button variant="outlined">Default outlined Button</Button>
        </div>
        <div>
          <h2>Inputs</h2>
          <ThemeProvider theme={inputCustomStyle}>
            <Input variant="outlined" placeholder="custom Input" />
          </ThemeProvider>
          <Input
            color="success"
            placeholder="filled success"
            variant="filled"
            onChange={this.onChange}
            value={this.state.input}
          />
          <Input placeholder="outlined primary" variant="outlined" />
          <Input color="danger" placeholder="Default danger" />
        </div>
        <div>
          <h2>Number Input</h2>
          <ThemeProvider theme={inputCustomStyle}>
            <InputNumber
              placeholder="Custom number"
              variant="outlined"
            ></InputNumber>
          </ThemeProvider>
          <InputNumber
            placeholder="Number Input"
            variant="outlined"
          ></InputNumber>
        </div>
        <div>
          <h2>Multiple select</h2>
          <ThemeProvider theme={selectCustomStyle}>
            <Select
              options={optionsSelect}
              multi
              placeholder="Custom select..."
            ></Select>
          </ThemeProvider>
          <Select options={optionsSelect} multi></Select>
        </div>
        <div>
          <h2>Autocomplete</h2>
          <ThemeProvider theme={autocomleteCustomStyle}>
            <Autocomplete
              variant="outlined"
              options={autocomplete}
              placeholder="Type something..."
            ></Autocomplete>
          </ThemeProvider>
          <Autocomplete
            options={autocomplete}
            placeholder="Type something..."
          ></Autocomplete>
        </div>
      </React.Fragment>
    );
  }
}
