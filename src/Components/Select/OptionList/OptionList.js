/** @jsx jsx */
import { jsx } from "@emotion/core";

const OptionList = props => {
  const show = props.open ? { display: "block" } : "";
  const styles = { ...props.styles.optionsList, ...show };
  return (
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
};

export default OptionList;
