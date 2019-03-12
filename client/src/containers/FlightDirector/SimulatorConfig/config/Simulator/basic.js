import React from "react";
import LayoutList from "components/layouts";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";

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

      <Query
        query={gql`
          query Thorium {
            thorium {
              spaceEdventuresCenter {
                simulators {
                  id
                  name
                }
              }
            }
          }
        `}
      >
        {({ data: { thorium }, loading }) =>
          loading ||
          !thorium.spaceEdventuresCenter ||
          !thorium.spaceEdventuresCenter.simulators ? null : (
            <fieldset className="form-group">
              <label>Space EdVentures Simulator</label>
              <div>
                <small>
                  This is the simulator on{" "}
                  <a
                    href="https://spaceedventures.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SpaceEdventures.org
                  </a>{" "}
                  that participants will be assigned to when they do a flight on
                  this simulator.
                </small>
              </div>
              <div>
                <select
                  className="form-control"
                  value={selectedSimulator.spaceEdventuresId || ""}
                  name="spaceEdventures"
                  onChange={handleChange}
                >
                  <option value="">Choose a Simulator</option>
                  {thorium.spaceEdventuresCenter.simulators.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
          )
        }
      </Query>
    </form>
  </div>
);
