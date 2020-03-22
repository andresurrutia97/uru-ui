/** @jsx jsx */
import { jsx } from "@emotion/core";

import { colors } from "../Colors/Colors";
import React from "react";
import SelectedItemList from "./SelectedItemsList/SelectedItemList";
import OptionList from "./OptionList/OptionList";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownClicked: false,
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

  optionsOnchange = (index, value) => {
    let dd = this.props.options;
    // for single select options
    if (this.props.isSingleSelect === true) {
      dd.map(option => {
        option.value = false;
      });
    }
    dd[index].value = value;
    this.setState({ selectedOptions: dd, dropDownClicked: true });
  };

  selectedOptionsClick = id => {
    let filteredToasts = this.state.selectedOptions;
    filteredToasts.map(obj => {
      if (obj.id === id) {
        obj.value = false;
      }
    });
    this.setState({ selectedOptions: filteredToasts });
  };

  closeDropDown = () => {
    this.setState({ dropDownClicked: false });
  };

  openDropDown = () => {
    this.setState({ dropDownClicked: true });
  };

  styles = {
    root: {
      boxSizing: "border-box",
      margin: "5px",
      position: "relative",
      backgroundColor: "#fff",
      width: "fit-content",
      outline: "none"
    },
    optionsList: {
      height: "150px",
      overflowY: "auto",
      Zindex: "10001",
      backgroundColor: "#fff",
      position: "absolute",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "100%",
      display: "none",
      boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
      marginTop: "5px",
      padding: "0",
      padding: "5px 0 5px 0"
    },
    optionItem: {
      display: "block",
      fontSize: "16px",
      cursor: "default",
      padding: "5px 20px"
    },
    selectedOptionItem: {
      color: colors.primary
    },
    selectedOptions: {
      height: "30px",
      verticalAlign: "middle",
      display: "flex",
      alignItems: "center",
      border: "solid 1px #ccc",
      borderRadius: "4px",
      width: "500px",
      padding: "5px 20px"
    },
    icon: {
      right: "0",
      display: "inline-block",
      cursor: "pointer",
      fontSize: "12px",
      width: "10px",
      cursor: "pointer"
    },
    selectedOptionsBadgesList: {
      fontWeight: " 400",
      margin: "0",
      textAlign: "left",
      verticalAlign: "middle",
      display: "inline-block",
      width: "calc(100% - 20px)",
      whiteSpace: "nowrap",
      textOverflow: "clip",
      overflow: "hidden"
    },
    selectedOptionsBadges: {
      fontSize: "14px",
      borderRadius: "2px",
      padding: "2px 10px",
      margin: "0 5px 0 0",
      border: "solid 1px #ddd",
      display: "inline-block",
      ":after": {
        content: '"×"',
        cursor: "pointer",
        marginLeft: "5px",
        verticalAlign: "middle"
      }
    }
  };

  render() {
    return (
      <div
        css={this.styles.root}
        onBlur={this.closeDropDown}
        onClick={() => {
          this.setState({ dropDownClicked: !this.state.dropDownClicked });
        }}
      >
        <div css={this.styles.selectedOptions}>
          <SelectedItemList
            items={this.state.selectedOptions}
            deselectItem={this.selectedOptionsClick}
            //estilos
            styles={this.styles}
          />
          <div css={this.styles.icon}>&#9660;</div>
        </div>

        <OptionList
          options={this.props.options}
          open={this.state.dropDownClicked}
          optionsOnchange={this.optionsOnchange}
          //estilos
          styles={this.styles}
        />
      </div>
    );
  }
}

export default Select;
