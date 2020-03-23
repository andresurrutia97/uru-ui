/** @jsx jsx */
import { jsx } from "@emotion/core";

import { colors } from "../Colors/Colors";
import React from "react";
import SelectedItemList from "./SelectedItemsList/SelectedItemList";
import OptionList from "./OptionList/OptionList";

import { arrowUp, arrowDown } from "../../Assets/icons/arrows";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownOpen: false,
      options: [],
      selectedOptions: []
    };
  }

  componentDidMount() {
    const options = [];
    this.props.options.map((el, index) => {
      options.push({ label: el.label, id: index });
    });
    this.setState({ options: options });
  }

  optionSelectedHandler = (index, selected) => {
    let options = [...this.state.options];
    // Selección única
    if (!this.props.multi) {
      options.map(option => {
        option.selected = false;
      });
    }
    options[index].selected = selected;
    this.setState({ selectedOptions: options });
  };

  removeSelectionHandler = id => {
    let selectedOptions = [...this.state.selectedOptions];
    selectedOptions.map(option => {
      if (option.id === id) {
        option.selected = false;
      }
    });

    this.setState({ selectedOptions: selectedOptions, dropDownOpen: true });
  };

  closeDropDownHandler = () => {
    this.setState({ dropDownOpen: false });
  };

  openDropDownHandler = () => {
    this.setState({ dropDownOpen: true });
  };

  color = this.props.color ? colors[this.props.color] : colors.primary;

  styles = {
    root: {
      boxSizing: "border-box",
      margin: "5px",
      position: "relative",
      backgroundColor: "white",
      width: "fit-content",
      outline: "none",
      border: "solid 1px",
      borderColor: colors.darkGray,
      borderRadius: "4px",
      ":hover": {
        borderWidth: "2px",
        borderColor: this.color
      },
      ":focus": {
        borderWidth: "2px",
        borderColor: this.color
      }
    },
    optionsList: {
      maxHeight: "150px",
      overflowY: "auto",
      backgroundColor: "white",
      position: "absolute",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "100%",
      display: "none",
      boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
      marginTop: "5px",
      padding: "5px 0 5px 0"
    },
    optionItem: {
      display: "block",
      fontSize: "16px",
      cursor: "default",
      padding: "5px 20px"
    },
    selectedOptionItem: {
      color: this.color
    },
    selectedOptions: {
      minHeight: "30px",
      display: "flex",
      alignItems: "center",
      width: "500px",
      padding: "5px 5px"
    },
    icon: {
      right: "0",
      cursor: "pointer",
      fill: colors.darkGray,
      display: "flex",
      alignItems: "center"
    },
    selectedOptionsPillsList: {
      width: "100%"
    },
    selectedOptionsPills: {
      fontSize: "14px",
      borderRadius: "4px",
      padding: "2px 10px",
      margin: "3px 5px",
      border: "solid 1px #ddd",
      display: "inline-block",
      ":after": {
        content: '"×"',
        cursor: "pointer",
        marginLeft: "7px",
        verticalAlign: "middle"
      }
    },
    placeholder: {
      color: "#ccc",
      marginLeft: "10px"
    }
  };

  render() {
    return (
      <div
        css={this.styles.root}
        onBlur={this.closeDropDownHandler}
        tabIndex="0"
      >
        <div
          css={this.styles.selectedOptions}
          onClick={() => {
            this.setState(prevState => {
              return { dropDownOpen: !prevState.dropDownOpen };
            });
          }}
        >
          <SelectedItemList
            items={this.state.selectedOptions}
            deselectItem={this.removeSelectionHandler}
            placeholder={this.props.placeholder}
            //estilos
            styles={this.styles}
          />
          <div css={this.styles.icon}>
            {!this.state.dropDownOpen ? arrowDown : arrowUp}
          </div>
        </div>

        <OptionList
          options={this.state.options}
          open={this.state.dropDownOpen}
          optionSelected={this.optionSelectedHandler}
          //estilos
          styles={this.styles}
        />
      </div>
    );
  }
}

export default Select;
