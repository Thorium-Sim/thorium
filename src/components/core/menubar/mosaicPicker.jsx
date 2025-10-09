import React, {Fragment} from "react";
import {Input} from "reactstrap";
import DynamicPicker from "./DynamicPicker";

const MosaicPicker = ({layout, mosaic, setMosaic, editable, setEdit}) => {
  return (
    ["Dynamic", "Next"].includes(layout) && (
      <Fragment>
        <DynamicPicker mosaic={mosaic} onChange={setMosaic} />
        <label className="checkbox-inline">
          <Input
            type="checkbox"
            checked={editable}
            onChange={e => setEdit(e.target.checked)}
            className="align-middle"
          />
          <span className="align-middle ms-1">Edit</span>
        </label>
      </Fragment>
    )
  );
};

export default MosaicPicker;
