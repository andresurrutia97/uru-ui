/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import ThemeProvider, { ThemeContext } from "../ThemeProvider/ThemeProvider";
import Input from "../Input/Input";

class InputNumber extends React.Component {
  constructor() {
    super();
    this.state = {
      number: ""
    };
  }

  // Lee lo ingresado por el usuario y lo pasa por la funcion de formateo y lo devuelve
  onChange = event => {
    //Contiene la informacion ingresada por el usuario
    const input = event.target.value;
    const formatedNumber = this.formatNumberHandler(input);
    if (typeof this.props.onChange === "function") {
      this.props.onChange(formatedNumber);
    }
    this.setState({ number: formatedNumber });
  };

  //Función que recibe un numero y lo devuelve formateado
  formatNumberHandler = number => {
    //Objeto de javaScript que se encarga de dar formato númerico
    var formatter = new Intl.NumberFormat("en-US");

    //Elimina cualquier elemento que no sea un número
    const onlyNumbers = number.replace(/[^\d-]/g, "");

    //Da formato al número
    const formated = formatter.format(onlyNumbers);
    return formated;
  };

  //Función para agregar estilos al componente
  styles = theme => {
    const styles = { ...theme };
    return styles;
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <ThemeProvider theme={theme}>
            <Input
              {...this.props}
              value={this.state.number}
              onChange={event => this.onChange(event)}
            />
          </ThemeProvider>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default InputNumber;
