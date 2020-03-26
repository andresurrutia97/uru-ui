/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Component, Fragment } from "react";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { colors } from "../Colors/Colors";
import Input from "../Input/Input";

class Autocomplete extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: [],
      showDropdown: false,
      inputText: ""
    };
  }

  onChange = event => {
    const options = this.props.options;
    const inputText = event.target.value;

    //Filtra las opciones que hacen match con se ingresa en el input
    const suggestions = options.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(inputText.toLowerCase()) > -1
    );

    this.setState({
      suggestions,
      showDropdown: true,
      inputText: event.currentTarget.value
    });
  };

  selectItemHandler = event => {
    this.setState({
      suggestions: [],
      showDropdown: false,
      inputText: event.target.innerText
    });
  };

  styles = theme => {
    return {
      Root: {
        width: "350px",
        margin: "5px"
      },
      Input: {
        boxSizing: "unset",
        width: "inherit",
        margin: "0"
      },
      optionsList: {
        maxHeight: "150px",
        zIndex: "1000",
        overflowY: "auto",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
        boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
        marginTop: "5px",
        padding: "5px 20px",
        listStyle: "none"
      },
      optionItem: {
        fontSize: "16px",
        cursor: "default",
        margin: "5px 0"
      }
    };
  };

  optionList = theme => {
    let suggestionsListComponent;

    if (this.state.showDropdown && this.state.inputText) {
      if (this.state.suggestions.length) {
        return (suggestionsListComponent = (
          <ul css={this.styles(theme).optionsList}>
            {this.state.suggestions.map(suggestion => {
              return (
                <li
                  key={suggestion}
                  onClick={event => this.selectItemHandler(event)}
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
          <div>
            <span>No hay sugerencias</span>
          </div>
        ));
      }
    }
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <div css={this.styles(theme).Root}>
            <Input
              variant={"filled"}
              css={this.styles(theme).Input}
              type="text"
              onChange={event => this.onChange(event)}
              value={this.state.inputText}
            />
            {this.optionList(theme)}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Autocomplete;
