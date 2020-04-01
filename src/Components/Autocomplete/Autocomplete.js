/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Component } from "react";
import ThemeProvider, { ThemeContext } from "../ThemeProvider/ThemeProvider";
import Input from "../Input/Input";

class Autocomplete extends Component {
  constructor() {
    super();
    this.state = {
      //Arreglo de sugerencias
      suggestions: [],
      //Flag para abrir o cerrar el dropDown
      showDropdown: false,
      //Texto ingresado por el usuario
      inputText: ""
    };
  }

  //Recibe el input del usuario y devuelve las sugerencias
  onChange = event => {
    const options = this.props.options;
    const inputText = event.target.value;

    /*Filtra las opciones que hacen match con los caracteres que ingresa 
    el usuaior y el de las opciones y crea un arreglo con estas opciones */
    const suggestions = options.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(inputText.toLowerCase()) > -1
    );

    this.setState({
      suggestions,
      showDropdown: true,
      inputText: event.target.value
    });
  };

  //Selecciona la variable que el usuario da click
  selectItemHandler = event => {
    this.setState({
      suggestions: [],
      showDropdown: false,
      inputText: event
    });
  };

  // Función que se encarga de cerrar el dropDown
  closeDropDownHandler = () => {
    this.setState({ showDropdown: false });
  };

  //Función que retorna los estilos del componente
  styles = theme => {
    //Verifica si hay estilos Custom y crea variables
    if (theme) {
      var rootCustomStyle = theme.root;
      var inputCustomStyle = theme.input;
      var optionListCustomStyle = theme.optionList;
      var optionItemCustomStyle = theme.optionItem;
    }

    return {
      root: {
        boxSizing: "border-box",
        display: "inline-block",
        position: "relative",
        width: "350px",
        margin: "5px",
        ...rootCustomStyle
      },
      input: {
        width: "100%",
        margin: "0",
        ...inputCustomStyle
      },
      optionsList: {
        boxSizing: "border-box",
        width: "100%",
        maxHeight: "150px",
        position: "absolute",
        zIndex: "1000",
        overflowY: "auto",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
        marginTop: "5px",
        padding: "5px 20px",
        listStyle: "none",
        ...optionListCustomStyle
      },
      optionItem: {
        fontSize: "16px",
        cursor: "default",
        margin: "5px 0",
        optionItemCustomStyle
      }
    };
  };

  optionList = theme => {
    let suggestionsListComponent;

    //verifica si el flag del dropdown es true y si el usuario ha digitado algo
    if (this.state.showDropdown && this.state.inputText) {
      //Verifica si hay sugerencias
      if (this.state.suggestions.length) {
        return (suggestionsListComponent = (
          <ul
            css={this.styles(theme).optionsList}
            onBlur={this.closeDropDownHandler}
            tabIndex="0"
          >
            {this.state.suggestions.map(suggestion => {
              return (
                <li
                  key={suggestion}
                  onClick={() => this.selectItemHandler(suggestion)}
                  css={this.styles(theme).optionItem}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        ));
      } else {
        return (suggestionsListComponent = (
          <ul css={this.styles(theme).optionsList}>
            <span>No hay sugerencias</span>
          </ul>
        ));
      }
    }
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <div css={this.styles(theme).root}>
            <ThemeProvider theme={this.styles(theme).input}>
              <Input
                {...this.props}
                onChange={event => this.onChange(event)}
                value={this.state.inputText}
              />
              {this.optionList(theme)}
            </ThemeProvider>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Autocomplete;
