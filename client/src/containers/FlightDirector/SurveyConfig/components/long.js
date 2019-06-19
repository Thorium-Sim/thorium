import React from "react";
import { Input } from "helpers/reactstrap";
const Long = ({ value = "", updateValue = () => {}, required, disabled }) => {
  return (
    <div>
      <Input
        type="textarea"
        value={value}
        onChange={e => updateValue(e.target.value)}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};
export default Long;
