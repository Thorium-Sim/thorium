import React from "react";

export const restoreComputerCoreFile = {
  name: "restoreComputerCoreFile",
  category: "Triggers",
  component: () => "Event: Restore Computer Core File",
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    },
    {
      id: "level",
      color: "pink",
      title: "Level",
      type: "Number"
    }
  ],
  inputs: [],
  config: []
};

export const deleteComputerCoreVirus = {
  name: "deleteComputerCoreVirus",
  category: "Triggers",
  component: () => "Event: Delete Computer Core Virus",
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    }
  ],
  inputs: [],
  config: []
};

export const restartComputerCoreTerminal = {
  name: "restartComputerCoreTerminal",
  category: "Triggers",
  component: () => "Event: Restart Computer Core Terminal",
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    }
  ],
  inputs: [],
  config: []
};

export const removeComputerCoreUser = {
  name: "removeComputerCoreUser",
  category: "Triggers",
  component: () => (
    <div>
      Event: Remove Computer Core User
      <div>
        <small>
          Possible "Hacker" options:{" "}
          <div>
            <code>true</code>: the user is a hacker
          </div>
          <div>
            <code>false</code>: the user is not a hacker
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
      id: "hacker",
      color: "black",
      title: "Hacker",
      type: "Boolean"
    },
    {
      id: "level",
      color: "pink",
      title: "Level",
      type: "Number"
    }
  ],
  inputs: [],
  config: []
};
