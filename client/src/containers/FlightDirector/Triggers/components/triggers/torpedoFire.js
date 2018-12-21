import React from "react";

export default {
  name: "torpedoFire",
  category: "Triggers",
  component: () => (
    <div>
      Event: Torpedo Fired
      <div>
        <small>
          Possible types:{" "}
          <div>
            <code>photon</code>
          </div>
          <div>
            <code>quantum</code>
          </div>
          <div>
            {" "}
            <code>probe</code>
          </div>
        </small>
      </div>
    </div>
  ),
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    },
    {
      id: "type",
      color: "green",
      title: "Torpedo Type",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};
