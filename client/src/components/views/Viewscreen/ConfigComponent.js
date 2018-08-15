import React from "react";
import * as ViewscreenCards from "../../viewscreens";

const configs = Object.keys(ViewscreenCards)
  .filter(c => c.indexOf("Config") > -1)
  .sort();

const Config = ({
  simulator,
  flightId,
  updateData,
  component,
  data,
  simple
}) => {
  if (configs.indexOf(`${component}Config`) > -1) {
    const ConfigComponent = ViewscreenCards[`${component}Config`];
    return (
      <ConfigComponent
        simple={simple}
        simulator={simulator}
        flightId={flightId}
        data={data}
        updateData={updateData}
      />
    );
  }
  return <p>No config for this component</p>;
};

export default Config;
