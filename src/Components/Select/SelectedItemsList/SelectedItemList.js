/** @jsx jsx */
import { jsx } from "@emotion/core";

//Componente que renderiza las opciones seleccionadas
const SelectedItem = props => {
  let isItemsSelected = false;

  /*Función para verificar si hay algún elemento seleccionado y crear un flag y así,
  asignar un placeholder en caso de no haber ninguna item seleccioanda */
  for (let item in props.items) {
    // console.log(props.items);
    if (props.items[item].selected === true) {
      isItemsSelected = true;
    }
  }

  //Verifica si hay placeholder asignado por props
  let placeholder = "Select...";
  if (props.placeholder) {
    placeholder = props.placeholder;
  }

  /* Verifica si la bandera de items seleccionados es true, para 
  mostrar la lista de items */
  let pills = <span css={props.styles.placeholder}>{placeholder}</span>;
  if (isItemsSelected) {
    pills = props.items.map(el => {
      if (el.selected) {
        return (
          <span
            key={el.id}
            onClick={() => props.deselectItem(el.id)}
            css={props.styles.selectedOptionsPills}
          >
            {el.label}
          </span>
        );
      }
    });
  }

  return <label css={props.styles.selectedOptionsPillsList}>{pills}</label>;
};

export default SelectedItem;
