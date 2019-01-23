import React from "react";
import LayoutList from "components/layouts";

const Layouts = Object.keys(LayoutList).filter(
  s => s.indexOf("Viewscreen") === -1
);

export default ({ selectedSimulator, handleChange }) => (
  <div>
    <small>
      These values represent the properties of the simulator itself.
    </small>
    <form>
      <fieldset className="form-group">
        <label>Name</label>
        <input
          onChange={handleChange}
          defaultValue={selectedSimulator.name}
          type="text"
          name="name"
          className="form-control"
          placeholder="USS Voyager"
        />
      </fieldset>
      <fieldset className="form-group">
        <label>Layout</label>
        <select
          onChange={handleChange}
          defaultValue={selectedSimulator.layout}
          name="layout"
          className="c-select form-control"
        >
          {Layouts.map(e => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            );
          })}
        </select>
      </fieldset>

      <fieldset className="form-group">
        <label>Alert Level</label>
        <select
          onChange={handleChange}
          defaultValue={selectedSimulator.alertlevel}
          name="alertLevel"
          className="c-select form-control"
        >
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="2">1</option>
          <option value="p">P</option>
        </select>
      </fieldset>
    </form>
  </div>
);
