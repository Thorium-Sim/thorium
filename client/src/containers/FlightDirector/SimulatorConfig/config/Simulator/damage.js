import React from "react";
import DamageTasks from "./damageTasks";
export default ({ selectedSimulator, handleChange }) => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <fieldset className="form-group">
        <label>
          <input
            type="checkbox"
            defaultChecked={selectedSimulator.stepDamage}
            name="stepDamage"
            onChange={handleChange}
          />
          Split damage reports into steps
        </label>
      </fieldset>
      <fieldset className="form-group">
        <label>
          <input
            type="checkbox"
            defaultChecked={selectedSimulator.verifyStep}
            name="verifyStep"
            onChange={handleChange}
          />
          Require damage report step validation (must use step damage option)
        </label>
      </fieldset>
    </div>
    <div style={{ flex: 1 }}>
      <DamageTasks {...selectedSimulator} />
    </div>
  </div>
);
