import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Select from "./Select";
import OptionList from "./OptionList/OptionList";
import SelectedItem from "./SelectedItemsList/SelectedItemList";
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
    padding: "8px",
    fontSize: "14px",
    margin: "5px",
    border: "dotted 3px",
    borderColor: "blue",
    borderRadius: "none",
    ":hover": {
      borderColor: "orange"
    }
  };

  it("Debe renderizar un componente <Input/>", () => {
    expect(select).not.toBeNull();
  });

  it("Debe retornar las opciones pasadas por props con un id en la variable de state estado options", () => {
    const auxOptions = [];
    optionsSelect.map((el, index) => {
      auxOptions.push({ label: el.label, id: index, selected: false });
    });

    expect(JSON.stringify(select.state().options)).toBe(
      JSON.stringify(auxOptions)
    );
  });

  it("Debe retornar true en el elemento selected de la variable 5 del arreglo de opciones del estado del componente ", () => {
    const selectWrapper = mount(<Select options={optionsSelect} />);

    expect(JSON.stringify(selectWrapper.state().selectedOptions)).toBe(
      JSON.stringify([])
    );

    selectWrapper
      .find("ul")
      .props()
      .children[5].props.onClick();

    expect(selectWrapper.state().selectedOptions[5].selected).toBe(true);
  });

  it("Select selección multiple - Debe retornar dos pills de los elementos seleccionados de las opciones ", () => {
    const selectWrapper = mount(<Select options={optionsSelect} multi />);

    const funcAux = index =>
      selectWrapper
        .find("ul")
        .props()
        .children[index].props.onClick();

    funcAux(5);
    funcAux(3);

    const selecteslist = selectWrapper.state().selectedOptions;
    selectWrapper.setProps({ selectedOptions: selecteslist });

    const selectWrapperSpan = selectWrapper.find("span");

    expect(selectWrapperSpan).toHaveLength(2);
    expect(selectWrapperSpan.at(0).props().children).toBe("culebra");
    expect(selectWrapperSpan.at(1).props().children).toBe("tigre");
  });

  it("Select selección única - Debe retornar solo una pill, así se le de click a más de un elemento de las opciones ", () => {
    const selectWrapper = mount(<Select options={optionsSelect} />);

    const funcAux = index =>
      selectWrapper
        .find("ul")
        .props()
        .children[index].props.onClick();

    funcAux(2);
    funcAux(4);
    funcAux(6);

    const selecteslist = selectWrapper.state().selectedOptions;
    selectWrapper.setProps({ selectedOptions: selecteslist });

    const selectWrapperSpan = selectWrapper.find("span");

    expect(selectWrapperSpan).toHaveLength(1);
  });
});
