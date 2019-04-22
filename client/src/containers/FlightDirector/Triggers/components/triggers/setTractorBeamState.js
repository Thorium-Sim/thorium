import React from "react";

export default {
  name: "setTractorBeamState",
  category: "Triggers",
  component: () => (
    <div>
      Event: Tractor Beam State Change
      <div>
        <small>
          Possible "state" options:{" "}
          <div>
            <code>on</code>: the tractor beam turned on
          </div>
          <div>
            <code>off</code>: the tractor beam turned off
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
      id: "state",
      color: "red",
      title: "State",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};
