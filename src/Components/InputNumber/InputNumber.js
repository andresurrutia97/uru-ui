import React from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";

class InputNumber extends React.Component {
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
        <Input
          {...this.props}
          value={this.state.number}
          onChange={event => this.onChange(event)}
        ></Input>
      </div>
    );
  }
}

InputNumber.propTypes = {
  number: PropTypes.string,
};

export default InputNumber;
