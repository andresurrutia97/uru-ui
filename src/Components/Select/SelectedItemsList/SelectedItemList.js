/** @jsx jsx */
import { jsx } from "@emotion/core";

const SelectedItem = props => {
  let isItemsSelected = false;

  for (let item in props.items) {
    if (props.items[item].selected === true) {
      isItemsSelected = true;
    }
  }
  let placeholder = "Select...";
  if (props.placeholder) {
    placeholder = props.placeholder;
  }
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
