import React from "react";

export const updateDockingPort = {
  name: "updateDockingPort",
  category: "Triggers",
  component: () => (
    <div>
      Event: Docking Port/Shuttle Change
      <div>
        <small>
          Possible "Is Docked" options:
          <div>
            <code>true</code>: the shuttle/docking port became docked
          </div>
          <div>
            <code>false</code>: the shuttle/docking port became undocked
          </div>
        </small>
      </div>
      <div>
        <small>
          Possible "Type" options:
          <div>
            <code>shuttle</code>
          </div>
          <div>
            <code>dockingPort</code>
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
      id: "isDocked",
      color: "yellow",
      title: "Is Docked",
      type: "Boolean"
    },
    {
      id: "type",
      color: "aqua",
      title: "Type",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};
