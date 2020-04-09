import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Button from "./Button";
import ThemeProvider from "../ThemeProvider/ThemeProvider";

configure({ adapter: new Adapter() });

describe("<Button/>", () => {
  let button;
  beforeEach(() => {
    button = shallow(<Button>Test</Button>);
  });

  const buttonCustomStyle = {
    border: "solid 2px green",
    ":hover": {
      borderColor: "black"
    }
  };

  it("Debe renderizar un componente <Button/>", () => {
    expect(button).not.toBeNull();
  });

  it("Debe retornar un componente <Button/> con la prop variant igual a 'outlined' ", () => {
    button.setProps({ variant: "outlined" });

    expect(button.props().children().props.variant).toBe("outlined");
  });

  it("Debe retornar un componente <Button/> con estilo css 'backgroundColor' igual a '#f75454' al pasar la prop color:'danger' ", () => {
    button.setProps({ color: "danger" });

    expect(button.props().children().props.css.backgroundColor).toBe("#ed1e79");
  });

  it("Debe devolver la prop children igual al texto dado al crear el botón ('Test')", () => {
    expect(button.props().children().props.children).toBe("Test");
  });

  it("Debe hacer un llamado a la función 'test' al hacer click en el botón ", () => {
    const test = jest.fn();
    const aux = mount(<Button onClick={test} />);

    aux.simulate("click");

    expect(test).toHaveBeenCalledTimes(1);
  });

  it("Debe modificar los estilos del componente con los estilos descritos en la constante 'buttonCustomStyle'", () => {
    const custombutton = mount(
      <ThemeProvider theme={buttonCustomStyle}>
        <Button />
      </ThemeProvider>
    );

    const wrapperStyle = custombutton
      .find(Button)
      .children()
      .props().css;

    expect(wrapperStyle.border).toBe("solid 2px green");
    expect(wrapperStyle[":hover"]).toEqual({
      borderColor: "black"
    });
  });
});
