import React, { Fragment } from "react";
import DynamicPicker from "./DynamicPicker";

const MosaicPicker = ({ layout, mosaic, setMosaic, editable, setEdit }) => {
  return (
    ["Dynamic", "Next"].indexOf(layout) > -1 && (
      <Fragment>
        <DynamicPicker mosaic={mosaic} onChange={setMosaic} />
        <label>
          <input
            type="checkbox"
            checked={editable}
            onChange={e => setEdit(e.target.checked)}
          />{" "}
          Edit
        </label>
      </Fragment>
    )
  );
};
export default MosaicPicker;
