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
    expect(input).not.toBeNull();
  });

  it("Debe retornar un componente <Input/> con la prop backgroundColor diferente a 'white' ", () => {
    expect(input.props().children().props.css.backgroundColor).toBe("white");

    input.setProps({ variant: "filled" });
    expect(input.props().children().props.css.backgroundColor).not.toBe(
      "white"
    );
  });

  it("Debe modificar la variable testState de 'test1' a 'test2'  ", () => {
    const testState = { value: "test1" };

    const wrapper = mount(
      <Input
        value={testState.value}
        onChange={e => {
          testState.value = e.target.value;
        }}
      />
    );

    expect(testState.value).toEqual("test1");
    wrapper.simulate("change", { target: { name: "value", value: "test2" } });
    expect(testState.value).toEqual("test2");
  });

  it("Debe tener estilos custom iguales a los descritos en la constante 'inputCustomStyle'", () => {
    const customInputJSX = (
      <ThemeProvider theme={inputCustomStyle}>
        <Input />
      </ThemeProvider>
    );
    const customInput = mount(customInputJSX);

    expect(customInput.props().theme).toEqual({
      padding: "8px",
      fontSize: "14px",
      margin: "5px",
      border: "dotted 3px",
      borderColor: "blue",
      borderRadius: "none",
      ":hover": {
        borderColor: "orange"
      }
    });
  });

  it("Debe retornar un componente <Input/> con el placeholder 'testing' ", () => {
    input.setProps({ placeholder: "testing" });
    expect(input.props().children().props.placeholder).toBe("testing");
  });
});
