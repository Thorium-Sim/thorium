import React from "react";

export const internalCommCallOutgoing = {
  name: "internalCommCallOutgoing",
  objectKey: "internalCommCallOutgoing",
  category: "Triggers",
  component: () => (
    <div>
      Event: Internal Comm Call Outgoing
      <div>
        <small>
          Possible "Is All Decks" options:{" "}
          <div>
            <code>true</code>: It's an all decks call
          </div>
          <div>
            <code>false</code>: It's a call to a room
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
      id: "allDecks",
      color: "yellow",
      title: "Is All Decks",
      type: "String",
    },
  ],
  inputs: [],
  config: [],
};
