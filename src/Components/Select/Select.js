/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import PropTypes from "prop-types";

import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { colors } from "../Colors/Colors";
import SelectedItemList from "./SelectedItemsList/SelectedItemList";
import OptionList from "./OptionList/OptionList";
import { arrowUp, arrowDown } from "../../Assets/icons/arrows";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Flag para abrir o cerrar el dropDown
      dropDownOpen: false,
      //Opciones de selección
      options: [],
      //Opciones seleccionadas
      selectedOptions: []
    };
  }

  componentDidMount() {
    let options = [];
    /* Recibe las opciones y crea un nuevo arreglo con un id en cada item de 
    acuerdo al index del arreglo y lo asigna a la variable de esatado "options" */

    if (this.props.options) {
      this.props.options.map((el, index) => {
        options.push({ label: el.label, id: index, selected: false });
      });
    }

    this.setState({ options: options });
  }

  /* Función que modifica el flag "selected" de cada item del arreglo para verificar si 
  ha sido seleccionado o no */
  optionSelectedHandler = (id, selected) => {
    let options = [...this.state.options];
    //verifica si la selección es única
    if (!this.props.multi) {
      options.map(option => {
        option.selected = false;
      });
    }
    options[id].selected = selected;

    if (typeof this.props.onChange === "function") {
      this.props.onChange(this.returnSelectedValues(options));
    }

    this.setState({ selectedOptions: options });
  };

  /* Función modifica el flag booleano de cada item del arreglo para 
  deseleccionar el item */
  removeSelectionHandler = id => {
    let selectedOptions = [...this.state.selectedOptions];
    selectedOptions.map(option => {
      if (option.id === id) {
        option.selected = false;
      }
    });

    if (typeof this.props.onChange === "function") {
      this.props.onChange(this.returnSelectedValues(selectedOptions));
    }

    this.setState({ selectedOptions: selectedOptions, dropDownOpen: true });
  };

  //Función para devolver solo los valores seleccionados al usuario
  returnSelectedValues = options => {
    let selectedOps = [];

    for (let i in options) {
      if (options[i].selected) {
        selectedOps.push(this.props.options[i]);
      }
    }
    return selectedOps;
  };

  // Función que se encarga de cerrar el dropDown
  closeDropDownHandler = () => {
    this.setState({ dropDownOpen: false });
  };

  // Función que se encarga de abrir el dropDown
  openDropDownHandler = () => {
    this.setState({ dropDownOpen: true });
  };

  // Verifica si hay props de color. En caso de no haber, asigna uno por default
  color = this.props.color ? colors[this.props.color] : colors.primary;

  //Función que retorna los estilos del componente
  styles = theme => {
    //Verifica si hay estilos Custom y crea variables de acuerdo al componente modificado
    if (theme) {
      var rootCustomStyle = theme.root;
      if (theme.root) {
        //Se crea variable especifica para los Selectores (para no sobreescribir los estilos Default)
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
        fontFamily: "Montserrat",
        fontSize: "14px",
        boxSizing: "border-box",
        display: "inline-block",
        position: "relative",
        backgroundColor: "transparent",
        width: "400px",
        outline: "none",
        margin: "6px",
        ...rootCustomStyle
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
        fontSize: "14px",
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
        justifyContent: "space-between",
        border: "solid 1px",
        borderColor: colors.darkGray,
        borderRadius: "4px",
        padding: "5px 5px",
        ":hover": {
          borderWidth: "2px",
          borderColor: this.color,
          padding: "4px 4px",
          ...rootCustomStyleHover
        },
        ":focus": {
          borderWidth: "2px",
          borderColor: this.color,
          padding: "4px 4px",
          ...rootCustomStyleFocus
        },
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
        color: "#8e8e8e",
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
              <div style={{ display: "block" }}>
                <SelectedItemList
                  items={this.state.selectedOptions}
                  deselectItem={this.removeSelectionHandler}
                  placeholder={this.props.placeholder}
                  //estilos
                  styles={this.styles(theme)}
                />
              </div>

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

Select.propTypes = {
  options: PropTypes.array,
  multi: PropTypes.bool,
  color: PropTypes.string,
  placeholder: PropTypes.string
};

export default Select;
