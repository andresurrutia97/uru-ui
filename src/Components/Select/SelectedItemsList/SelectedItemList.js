/** @jsx jsx */
import { jsx } from "@emotion/core";

const SelectedItem = props => {
  return (
    <label css={props.styles.selectedOptionsBadgesList}>
      {props.items.map(obj => {
        if (obj.value) {
          return (
            <span
              key={obj.id}
              onClick={() => props.deselectItem(obj.id)}
              css={props.styles.selectedOptionsBadges}
            >
              {obj.label}
            </span>
          );
        }
      })}
    </label>
  );
};

export default SelectedItem;
