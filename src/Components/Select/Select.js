/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { colors } from "../Colors/Colors";
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

  optionSelectedHandler = (id, selected) => {
    let options = [...this.state.options];
    // Selección única
    if (!this.props.multi) {
      options.map(option => {
        option.selected = false;
      });
    }
    options[id].selected = selected;
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

  styles = theme => {
    //custom themes

    if (theme) {
      var rootCustomStyle = theme.root;
      if (theme.root) {
        var rootCustomStyleHover = theme.root[":hover"];
        var rootCustomStyleFocus = theme.root[":focus"];
      }
      var optionListCustomStyle = theme.optionList;
      var optionItemCustomStyle = theme.optionItem;
      var selectedOptionItemCustomStyle = theme.selectedOptionItem;
      var selectedOptionsCustomStyle = theme.selectedOptions;
      var iconCustomStyle = theme.icon;
      var selectedOptionsPillsListCustomStyle = theme.selectedOptionsPillsList;
      var selectedOptionsPillsCustomStyle = theme.selectedOptionsPills;
      if (theme.selectedOptionsPills) {
        var selectedOptionsPillsAfterCustomStyle =
          theme.selectedOptionsPills[":after"];
      }
      var placeholderCustomStyle = theme.placeholder;
    }
    return {
      root: {
        boxSizing: "border-box",
        display: "inline-block",
        margin: "5px",
        position: "relative",
        backgroundColor: "white",
        width: "fit-content",
        outline: "none",
        border: "solid 1px",
        borderColor: colors.darkGray,
        borderRadius: "4px",
        ...rootCustomStyle,
        ":hover": {
          borderWidth: "2px",
          borderColor: this.color,
          ...rootCustomStyleHover
        },
        ":focus": {
          borderWidth: "2px",
          borderColor: this.color,
          ...rootCustomStyleFocus
        }
      },
      optionsList: {
        maxHeight: "150px",
        zIndex: "1000",
        overflowY: "auto",
        backgroundColor: "white",
        position: "absolute",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
        display: "none",
        boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
        marginTop: "5px",
        padding: "5px 0 5px 0",
        ...optionListCustomStyle
      },
      optionItem: {
        display: "block",
        fontSize: "16px",
        cursor: "default",
        padding: "5px 20px",
        ...optionItemCustomStyle
      },
      selectedOptionItem: {
        color: this.color,
        ...selectedOptionItemCustomStyle
      },
      selectedOptions: {
        minHeight: "30px",
        display: "flex",
        alignItems: "center",
        width: "350px",
        padding: "5px 5px",
        ...selectedOptionsCustomStyle
      },
      icon: {
        right: "0",
        cursor: "pointer",
        fill: colors.darkGray,
        display: "flex",
        alignItems: "center",
        ...iconCustomStyle
      },
      selectedOptionsPillsList: {
        width: "100%",
        ...selectedOptionsPillsListCustomStyle
      },
      selectedOptionsPills: {
        fontSize: "14px",
        borderRadius: "4px",
        padding: "2px 10px",
        margin: "3px 5px",
        border: "solid 1px #ddd",
        display: "inline-block",
        ...selectedOptionsPillsCustomStyle,
        ":after": {
          content: '"×"',
          cursor: "pointer",
          marginLeft: "7px",
          verticalAlign: "middle",
          ...selectedOptionsPillsAfterCustomStyle
        }
      },
      placeholder: {
        color: "#ccc",
        marginLeft: "10px",
        ...placeholderCustomStyle
      }
    };
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <div
            css={this.styles(theme).root}
            onBlur={this.closeDropDownHandler}
            tabIndex="0"
          >
            <div
              css={this.styles(theme).selectedOptions}
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
                styles={this.styles(theme)}
              />
              <div css={this.styles(theme).icon}>
                {!this.state.dropDownOpen ? arrowDown : arrowUp}
              </div>
            </div>

            <OptionList
              options={this.state.options}
              open={this.state.dropDownOpen}
              optionSelected={this.optionSelectedHandler}
              //estilos
              styles={this.styles(theme)}
            />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Select;
