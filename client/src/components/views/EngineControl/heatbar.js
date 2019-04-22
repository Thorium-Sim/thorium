import React, { Fragment } from "react";

const HeatBar = props => {
  return (
    <Fragment>
      <label className="heatBox-Label">{props.label}</label>
      <div className="heatBox">
        <div
          className="heatBar"
          style={{
            height: `${props.level * 100}%`,
            backgroundImage: props.background
          }}
        />
      </div>
    </Fragment>
  );
};

export default HeatBar;
