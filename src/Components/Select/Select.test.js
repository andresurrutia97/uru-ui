import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Select from "./Select";
import ThemeProvider from "../ThemeProvider/ThemeProvider";

configure({ adapter: new Adapter() });

describe("<Select/>", () => {
  let select;

  const optionsSelect = [
    { label: "Perro" },
    { label: "gato" },
    { label: "leon" },
    { label: "culebra" },
    { label: "pez" },
    { label: "tigre" },
    { label: "aguila" }
  ];

  beforeEach(() => {
    select = shallow(<Select options={optionsSelect} />);
  });

  const selectCustomStyle = {
    root: {
      borderWidth: "3px",
      borderRadius: "0 50px 50px 0",
      borderColor: "blue",
      width: "300px",
      ":hover": { borderColor: "green", borderWidth: "3px" },
      ":focus": { borderColor: "black", borderWidth: "3px" }
    },
    selectedOptionItem: { color: "red" },
    selectedOptionsPills: {
      backgroundColor: "#a3e4be"
    },
    placeholder: {
      color: "#c934ce"
    }
  };

  //Función para seleccioanr items
  const funcAuxSelectItem = (wrapper, index) =>
    wrapper
      .find("ul")
      .find("li")
      .at(index)
      .simulate("click");

  it("Debe renderizar un componente <Select/>", () => {
    expect(select).not.toBeNull();
  });

  it("Debe retornar las opciones pasadas por props con una id y un bool en false", () => {
    const auxOptions = [];

    optionsSelect.map((el, index) => {
      auxOptions.push({ label: el.label, id: index, selected: false });
    });

    expect(select.state().options).toEqual(auxOptions);
  });

  it("Debe cambiar el estado del dropdownOpen a true al dar click ", () => {
    const selectWrapper = mount(<Select options={optionsSelect} />);

    selectWrapper
      .find("div")
      .at(1)
      .simulate("click");

    expect(selectWrapper.state().dropDownOpen).toBe(true);
  });

  it("Debe retornar true en el elemento selected de la variable 5 del arreglo de opciones ", () => {
    const selectWrapper = mount(<Select options={optionsSelect} multi />);

    expect(selectWrapper.state().selectedOptions).toEqual([]);

    funcAuxSelectItem(selectWrapper, 5);

    expect(selectWrapper.state().selectedOptions[5].selected).toBe(true);
  });

  it("Select selección multiple - Debe retornar dos pills al dar click en dos elementos de la lista de opciones ", () => {
    const selectWrapper = mount(<Select options={optionsSelect} multi />);

    funcAuxSelectItem(selectWrapper, 5);
    funcAuxSelectItem(selectWrapper, 3);

    const selectWrapperSpan = selectWrapper.find("span");

    expect(selectWrapperSpan).toHaveLength(2);
    expect(selectWrapperSpan.at(0).props().children).toBe("culebra");
    expect(selectWrapperSpan.at(1).props().children).toBe("tigre");
  });

  it("Select selección única - Debe retornar solo una pill, así se le de click a más de un elemento de las opciones ", () => {
    const selectWrapper = mount(<Select options={optionsSelect} />);

    funcAuxSelectItem(selectWrapper, 2);
    funcAuxSelectItem(selectWrapper, 4);
    funcAuxSelectItem(selectWrapper, 6);

    const selectWrapperSpan = selectWrapper.find("span");

    expect(selectWrapperSpan).toHaveLength(1);
  });

  it("Select selección multiple - Debe deseleccionar la variable y devolver solo dos pills  ", () => {
    const selectWrapper = mount(<Select options={optionsSelect} multi />);

    funcAuxSelectItem(selectWrapper, 2);
    funcAuxSelectItem(selectWrapper, 4);
    funcAuxSelectItem(selectWrapper, 6);
    funcAuxSelectItem(selectWrapper, 2);

    const selectWrapperSpan = selectWrapper.find("span");

    expect(selectWrapperSpan).toHaveLength(2);
  });

  it("Debe retornar en la prop Theme los estilos custom iguales a los descritos en la constante 'selectCustomStyle'", () => {
    const customSelect = mount(
      <ThemeProvider theme={selectCustomStyle}>
        <Select options={optionsSelect} />
      </ThemeProvider>
    );

    const wrapperStyle = customSelect
      .find(Select)
      .children()
      .props().css;

    expect(wrapperStyle.borderColor).toBe("blue");
    expect(wrapperStyle[":hover"]).toEqual({
      borderColor: "green",
      borderWidth: "3px"
    });
  });

  it("Ddebe retornar el placeholder 'select test' cuando no es haya seleccionado ningun item de las opciones", () => {
    const selectWrapper = mount(
      <Select options={optionsSelect} multi placeholder="select test" />
    );

    expect(selectWrapper.find("span").props().children).toBe("select test");
  });
});
