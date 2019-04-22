import React from "react";
import * as Layouts from "../layouts";

const LayoutPicker = ({ pickLayout, layout }) => {
  return (
    <select
      className="btn btn-primary btn-sm"
      onChange={pickLayout}
      value={layout}
    >
      <option disabled>Pick a layout</option>
      <option disabled />
      {Object.keys(Layouts)
        .filter(function(item, index, a) {
          return a.indexOf(item) === index;
        })
        .map(l => {
          return (
            <option key={l} value={l}>
              {l}
            </option>
          );
        })}
    </select>
  );
};
export default LayoutPicker;
