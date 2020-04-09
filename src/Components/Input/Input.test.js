import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Input from "./Input";
import ThemeProvider from "../ThemeProvider/ThemeProvider";

configure({ adapter: new Adapter() });

describe("<Input/>", () => {
  let input;
  beforeEach(() => {
    input = shallow(<Input />);
  });

  const inputCustomStyle = {
    border: "dotted 3px",
    borderColor: "blue",
    ":hover": {
      borderColor: "orange"
    }
  };

  it("Debe renderizar un componente <Input/>", () => {
    expect(input).not.toBeNull();
  });

  it("Debe modificar el value de inputText de '' a 'test' cuando se escriba en el input  ", () => {
    let inputText = "";

    const wrapper = mount(
      <Input value={inputText} onChange={e => (inputText = e.target.value)} />
    );

    wrapper.simulate("change", { target: { value: "test" } });
    expect(inputText).toEqual("test");
  });

  it("Debe retornar un componente <Input/> con la prop backgroundColor diferente a 'white' ", () => {
    expect(input.props().children().props.css.backgroundColor).toBe(
      "transparent"
    );

    input.setProps({ variant: "filled" });
    expect(input.props().children().props.css.backgroundColor).not.toBe(
      "white"
    );
  });

  it("Debe tener estilos custom iguales a los descritos en la constante 'inputCustomStyle'", () => {
    const customInput = mount(
      <ThemeProvider theme={inputCustomStyle}>
        <Input />
      </ThemeProvider>
    );

    const wrapperStyle = customInput
      .find(Input)
      .children()
      .props().css;

    expect(wrapperStyle.border).toBe("dotted 3px");
    expect(wrapperStyle.borderColor).toBe("blue");
    expect(wrapperStyle[":hover"]).toEqual({
      borderColor: "orange"
    });
  });
});
