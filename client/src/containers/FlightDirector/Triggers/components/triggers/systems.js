import React from "react";

export const damageSystem = {
  name: "damageSystem",
  category: "Triggers",
  component: () => (
    <div>
      Event: Damage System
      <div>
        <small>Type is the system's type</small>
      </div>
      <div>
        <small>Name is the system's name</small>
      </div>
      <div>
        <small>Destroyed (true/false) is if the system was destroyed</small>
      </div>
      <div>
        <small>
          Which is the damage report type:
          <div>
            <code>default</code>
          </div>
          <div>
            <code>rnd</code>
          </div>
          <div>
            <code>engineering</code>
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
      color: "#AFDF35",
      title: "Type",
      type: "String"
    },
    {
      id: "name",
      color: "#35DECA",
      title: "Name",
      type: "String"
    },
    {
      id: "destroyed",
      color: "black",
      title: "Destroyed",
      type: "Boolean"
    },
    {
      id: "which",
      color: "white",
      title: "Which",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};

export const repairSystem = {
  name: "repairSystem",
  category: "Triggers",
  component: () => (
    <div>
      Event: Repair System
      <div>
        <small>Type is the system's type</small>
      </div>
      <div>
        <small>Name is the system's name</small>
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
      color: "#AFDF35",
      title: "Type",
      type: "String"
    },
    {
      id: "name",
      color: "#35DECA",
      title: "Name",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};
