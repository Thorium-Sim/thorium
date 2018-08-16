import React from "react";

const SimulatorPicker = ({ simulators, simulator, pickSimulator }) => {
  return (
    simulators.length > 1 && (
      <select
        className="btn btn-info btn-sm"
        onChange={pickSimulator}
        value={simulator || ""}
      >
        <option>Pick a simulator</option>
        <option disabled />
        {process.env.NODE_ENV !== "production" && (
          <option value="test">Test</option>
        )}
        {simulators.map(s => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    )
  );
};
export default SimulatorPicker;
