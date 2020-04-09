import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import InputNumber from "./InputNumber";
import Input from "../Input/Input";
import ThemeProvider from "../ThemeProvider/ThemeProvider";

configure({ adapter: new Adapter() });

describe("<InputNumber/>", () => {
  let inputNumber;
  beforeEach(() => {
    inputNumber = shallow(<InputNumber />);
  });

  const wrapper = mount(<InputNumber />);

  const inputNumberCustomStyle = {
    border: "dotted 3px",
    borderColor: "blue",
    ":hover": {
      borderColor: "orange"
    }
  };

  it("Debe renderizar un componente <InputNumber/>", () => {
    expect(inputNumber).not.toBeNull();
  });

  it("Debe contener un componente <Input/> dentro <InputNumber/> ", () => {
    expect(wrapper.find(Input)).toHaveLength(1);
  });

  it("Debe modificar el  estado 'number' con el numero formateado ", () => {
    wrapper.simulate("change", {
      target: { value: "15320156" }
    });

    expect(wrapper.state().number).toEqual("15,320,156");
    expect(wrapper.find(Input).props().value).toEqual("15,320,156");
  });

  it("No debe retornar nada en caso de que se escriba alguna letra o no agregar nada si ya hay números ", () => {
    wrapper.simulate("change", {
      target: { value: "asdf" }
    });
    expect(wrapper.state().number).toEqual("");

    wrapper.simulate("change", {
      target: { value: "1123adf" }
    });
    expect(wrapper.state().number).toEqual("1,123");
  });

  it("Debe retornar el numero formateado a traves de la propiedad onChange", () => {
    let func = [];
    wrapper.setProps({
      onChange: num => {
        func = num;
      }
    });

    wrapper.simulate("change", {
      target: { value: "559833" }
    });

    expect(func).toEqual("559,833");
  });

  it("Al pasar el prop variant='filled', debe llegar al compoenente input  y modificarlo el backgroun de 'white' a '#e9e9e9' ", () => {
    wrapper.setProps({ variant: "filled" });

    wrapper.simulate("change", {
      target: { value: "asdpf" }
    });

    expect(
      wrapper
        .find(Input)
        .children()
        .props().variant
    ).toEqual("filled");

    expect(
      wrapper
        .find(Input)
        .children()
        .props().css.backgroundColor
    ).toEqual("#e9e9e9");
  });

  it("Debe modificar los estilos del componente <Input/> dentro del <InputNumber/> de acuerdo a los estilos del theme", () => {
    const inputWrapper = mount(
      <ThemeProvider theme={inputNumberCustomStyle}>
        <InputNumber variant="outlined"></InputNumber>
      </ThemeProvider>
    );

    const wrapperStyle = inputWrapper
      .find(Input)
      .children()
      .props().css;

    expect(wrapperStyle.borderColor).toBe("blue");
    expect(wrapperStyle.border).toBe("dotted 3px");
    expect(wrapperStyle[":hover"]).toEqual({
      borderColor: "orange"
    });
  });

  it("La prop 'placeholder' deb llegar al componente <Input/> con el valor 'testing' ", () => {
    wrapper.setProps({ placeholder: "testing" });
    expect(wrapper.find(Input).props().placeholder).toBe("testing");
  });
});
