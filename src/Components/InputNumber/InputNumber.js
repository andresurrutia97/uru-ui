import React from "react";
import PropTypes from "prop-types";

class NumberField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: ""
    };
  }

  onChange = event => {
    const input = event.target.value;
    const onlyNumbers = input.replace(/[\D\s\._\-]+/g, "");

    this.setState({ number: this.formatNumber(onlyNumbers) });
  };

  formatNumber = number => {
    var formatter = new Intl.NumberFormat("en-US");
    const formated = formatter.format(number.replace(/,/g, ""));
    return formated;
  };

  render() {
    return (
      <div>
        <input
          value={this.state.number}
          onChange={event => this.onChange(event)}
        />
      </div>
    );
  }
}

// NumberField.propTypes = {
//   name: PropTypes.string,
//   value: PropTypes.string,
//   onChange: PropTypes.func
// };

export default NumberField;
