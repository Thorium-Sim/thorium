import React from "react";

export default ({ selectedSimulator, handleChange }) => (
  <div>
    <fieldset className="form-group">
      <label>Make all text uppercase (including typed-in text)</label>
      <input
        type="checkbox"
        defaultChecked={selectedSimulator.caps}
        name="changeCaps"
        onChange={handleChange}
      />
    </fieldset>
    <fieldset className="form-group">
      <label>
        Simulator has printer (enables print button for code cyphers and
        officers log)
      </label>
      <input
        type="checkbox"
        defaultChecked={selectedSimulator.hasPrinter}
        name="hasPrinter"
        onChange={handleChange}
      />
    </fieldset>
    <fieldset className="form-group">
      <label>
        Bridge Station Messaging - Allow messaging between bridge stations
      </label>
      <input
        type="checkbox"
        defaultChecked={selectedSimulator.bridgeOfficerMessaging}
        name="setBridgeMessaging"
        onChange={handleChange}
      />
    </fieldset>
    <fieldset className="form-group">
      <label>Exocomp Count</label>
      <input
        type="range"
        min="0"
        max="5"
        name="exocomps"
        onChange={handleChange}
        defaultValue={selectedSimulator.exocomps}
      />{" "}
      {selectedSimulator.exocomps}
    </fieldset>
  </div>
);
