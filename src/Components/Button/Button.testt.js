import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Button from "./Button";
import ThemeProvider from "../ThemeProvider/ThemeProvider";

configure({ adapter: new Adapter() });

describe("<Button/>", () => {
  let button;
  beforeEach(() => {
    button = shallow(<Button />);
  });

  const buttonCustomStyle = {
    padding: "8px",
    fontSize: "14px",
    margin: "5px",
    border: "solid 2px green",
    borderRadius: "0 5px 0 5px",
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

  it("Debe retornar un componente <Button/> con estilo css 'backgroundColor' igual a '#f75454' ", () => {
    button.setProps({ color: "danger" });
    expect(button.props().children().props.css.backgroundColor).toBe("#f75454");
  });

  it("Debe hacer un llamado a la función 'test' al hacer click en el botón ", () => {
    const test = jest.fn();
    button.setProps({ onClick: test() });
    button.simulate("click");
    expect(test).toHaveBeenCalledTimes(1);
  });

  it("Debe tener estilos custom iguales a los descritos en la constante 'buttonCustomStyle'", () => {
    const custombuttonJSX = (
      <ThemeProvider theme={buttonCustomStyle}>
        <Button />
      </ThemeProvider>
    );
    const custombutton = mount(custombuttonJSX);

    expect(custombutton.props().theme).toEqual({
      padding: "8px",
      fontSize: "14px",
      margin: "5px",
      border: "solid 2px green",
      borderRadius: "0 5px 0 5px",
      ":hover": {
        borderColor: "black"
      }
    });
  });

  it("Debe tener un componente <Button/> dentro del ThemeProvider", () => {
    expect(custombutton.find(Button)).toHaveLength(1);
  });
});
