import React from "react";

export const setJumpdriveActivated = {
  name: "setJumpdriveActivated",
  objectKey: "setJumpdriveActivated",
  category: "Triggers",
  component: () => (
    <div>
      Event: Jump Drive Activation/Deactivation
      <div>
        <small>
          Possible "Activated" options:{" "}
          <div>
            <code>true</code>: Jump Drive was Activated
          </div>
          <div>
            <code>false</code>: Jump Drive was Deactivated
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
      type: "Trigger",
    },
    {
      id: "activated",
      color: "yellow",
      title: "Activated",
      type: "String",
    },
  ],
  inputs: [],
  config: [],
};
export const setJumpDriveRingsExtended = {
  name: "setJumpDriveRingsExtended",
  objectKey: "setJumpDriveRingsExtended",
  category: "Triggers",
  component: () => (
    <div>
      Event: Jump Drive Rings Extended
      <div>
        <small>
          Possible "Rings Extended" options:{" "}
          <div>
            <code>true</code>: Rings were extended
          </div>
          <div>
            <code>false</code>: Rings were retracted
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
      type: "Trigger",
    },
    {
      id: "ringsExtended",
      color: "yellow",
      title: "Rings Extended",
      type: "String",
    },
  ],
  inputs: [],
  config: [],
};
