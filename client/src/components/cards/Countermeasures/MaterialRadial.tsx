import React from "react";
import {capitalCase} from "change-case";

const MaterialRadial: React.FC<{
  label: string;
  count: number;
  max: number;
}> = ({label, count, max}) => {
  return (
    <div className="material">
      <div
        className={`radial-dial ${label}`}
        style={{
          ["--end-angle" as any]: `${(count / max) * 100}%`,
        }}
        data-value={Math.round(count)}
      ></div>
      <div className="label">{capitalCase(label)}</div>
    </div>
  );
};

export default MaterialRadial;
