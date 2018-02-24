import React from "react";
import { Label, Input } from "reactstrap";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const Range = ({ min = 1, max = 5, value = 1, disabled, updateForm, id }) => {
  const range = max - min + 1;
  const labels = isNaN(range)
    ? {}
    : Array(range)
        .fill(0)
        .reduce(
          (prev, next, i) => Object.assign({}, prev, { [i + 1]: i + 1 }),
          {}
        );
  return (
    <div>
      <Label>
        Min
        <Input
          type="number"
          max={parseInt(max, 10) - 1}
          value={min}
          onChange={e => updateForm(id, "min", parseInt(e.target.value, 10))}
        />
      </Label>
      <Label>
        Max
        <Input
          type="number"
          min={parseInt(min, 10) + 1}
          value={max}
          onChange={e => updateForm(id, "max", parseInt(e.target.value, 10))}
        />
      </Label>
      <Slider
        min={parseInt(min, 10)}
        max={parseInt(max, 10)}
        value={value}
        labels={labels}
        disabled={disabled}
      />
    </div>
  );
};

export default Range;
