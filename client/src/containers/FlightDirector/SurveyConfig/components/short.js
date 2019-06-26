import React from "react";
import { Input } from "helpers/reactstrap";
const Short = ({ value = "", updateValue = () => {}, required, disabled }) => {
  return (
    <div>
      <Input
        type="text"
        value={value}
        onChange={e => updateValue(e.target.value)}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};
export default Short;
