import React, { Component, Fragment } from "react";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  onChange = event => {
    const suggestions = this.props.options;
    const userInput = event.currentTarget.value;

    // // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        (suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: event.currentTarget.value
    });
  };

  onClick = event => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: event.currentTarget.innerText
    });
  };

  render() {
    let suggestionsListComponent;

    if (this.state.showSuggestions && this.state.userInput) {
      if (this.state.filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul>
            {this.state.filteredSuggestions.map(suggestion => {
              return (
                <li key={suggestion} onClick={event => this.onClick(event)}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div>
            <ul>
              <em>No suggestions, you're on your own!</em>
            </ul>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={event => this.onChange(event)}
          value={this.state.userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
