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
    //Formatea el número
    let formatedNumber = this.formatNumberHandler(input);
    //Retorna la informacion al usuario por medio de la prop onChange
    if (typeof this.props.onChange === "function") {
      this.props.onChange(formatedNumber);
    }
    this.setState({ number: formatedNumber });
  };

  //Función que recibe un numero y lo devuelve formateado
  formatNumberHandler = number => {
    //Objeto de javaScript que se encarga de dar formato númerico
    var formatter = new Intl.NumberFormat("en-US");

    //Elimina todas las letras
    let onlyNumbers = number.replace(/[^\d-]/g, "");

    //Verifica que solo formatee números mayor a cero
    if (parseFloat(onlyNumbers) > 0) {
      //Da formato al número
      onlyNumbers = formatter.format(onlyNumbers);
    }

    return onlyNumbers;
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
