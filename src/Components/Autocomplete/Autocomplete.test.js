import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Autocomplete from "./Autocomplete";

import Input from "../Input/Input";
import ThemeProvider from "../ThemeProvider/ThemeProvider";

configure({ adapter: new Adapter() });

describe("<Autocomplete/>", () => {
  const options = [
    "perro",
    "gato",
    "leon",
    "culebra",
    "pez",
    "tigre",
    "aguila",
    "arroz"
  ];

  const autocomplete = mount(<Autocomplete options={options} />);
  const aux = autocomplete.find("Input");

  const autocompleteCustomStyle = {
    input: {
      borderStyle: "dotted dashed double solid",
      ":hover": {
        borderColor: "red"
      }
    }
  };

  it("Debe renderizar un componente <Autocomplete/>", () => {
    expect(autocomplete).not.toBeNull();
  });

  it("Debe cambiar el estado del showDropdown a true al escribir algo y actualizar el esatdo de inputText por lo que se escriba en el input ", () => {
    aux.simulate("change", {
      target: { value: "ti" }
    });

    expect(autocomplete.state().showDropdown).toBe(true);
    expect(autocomplete.state().inputText).toBe("ti");
  });

  it("Debe actualizar el estado de las sugerencias 'suggestions' a un array con las opciones que tengan la letra 'a' ", () => {
    const suggestionSample = ["gato", "culebra", "aguila", "arroz"];

    aux.simulate("change", {
      target: { value: "a" }
    });

    expect(autocomplete.state().suggestions).toEqual(suggestionSample);
  });

  it("Debe actualizar el value del input por el seleccionado en la lista de opciones", () => {
    aux.simulate("change", {
      target: { value: "a" }
    });

    autocomplete
      .find("ul")
      .find("li")
      .at(3)
      .simulate("click");

    expect(autocomplete.state().inputText).toBe("arroz");
  });

  it("Al pasar el prop variant='filled', debe llegar al componente input  y modificar el background de 'white' a '#e9e9e9' ", () => {
    autocomplete.setProps({ variant: "filled" });

    expect(
      autocomplete
        .find(Input)
        .children()
        .props().variant
    ).toEqual("filled");

    expect(
      autocomplete
        .find(Input)
        .children()
        .props().css.backgroundColor
    ).toEqual("#e9e9e9");
  });

  it("Debe modificar los estilos del compoenente <Input/> dentro del <Autocomplete/> de acuerdo a los estilos del theme", () => {
    const autocompleteWrapper = mount(
      <ThemeProvider theme={autocompleteCustomStyle}>
        <Autocomplete variant="outlined" options={options} />
      </ThemeProvider>
    );

    const wrapperStyle = autocompleteWrapper
      .find(Input)
      .children()
      .props().css;

    expect(wrapperStyle.borderStyle).toBe("dotted dashed double solid");
    expect(wrapperStyle[":hover"]).toEqual({
      borderColor: "red"
    });
  });

  it("La prop 'placeholder' deb llegar al componente <Input/> con el valor 'testing' ", () => {
    autocomplete.setProps({ placeholder: "testing" });

    expect(autocomplete.find(Input).props().placeholder).toBe("testing");
  });
});
