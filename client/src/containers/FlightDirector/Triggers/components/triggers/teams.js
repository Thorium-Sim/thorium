import React from "react";

export const createTeam = {
  name: "createTeam",
  category: "Triggers",
  component: () => (
    <div>
      Event: Create team
      <div>
        <small>Type is the teams's type:</small>
        <div>
          <code>damage</code>
        </div>
        <div>
          <code>security</code>
        </div>
        <div>
          <code>medical</code>
        </div>
      </div>
      <div>
        <small>Name is the teams's name</small>
      </div>
      <div>
        <small>Orders is the team's orders</small>
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
      id: "orders",
      color: "#3565DE",
      title: "Orders",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};
