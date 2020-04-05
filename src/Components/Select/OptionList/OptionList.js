/** @jsx jsx */
import { jsx } from "@emotion/core";

//Componente que renderiza la lista de opciones
const OptionList = (props) => {
  //verifiva si el flag del dropdown es "true" para mostrarlo
  const show = props.open ? { display: "block" } : "";
  //Asigna los estilos a una variable
  const styles = { ...props.styles.optionsList, ...show };

  let optionsList = "";
  if (Object.keys(props.options).length === 0) {
    optionsList = (
      <ul css={styles}>
        <li css={props.styles.optionItem}>No hay opciones</li>
      </ul>
    );
  } else {
    optionsList = (
      <ul css={styles}>
        {props.options.map((el) => {
          const selectedItem = el.selected
            ? { ...props.styles.selectedOptionItem }
            : {};
          return (
            <li
              css={props.styles.optionItem}
              style={selectedItem}
              key={el.id}
              onClick={() => props.optionSelected(el.id, !el.selected)}
            >
              {el.label}
            </li>
          );
        })}
      </ul>
    );
  }
  return <div>{optionsList}</div>;
};

export default OptionList;
