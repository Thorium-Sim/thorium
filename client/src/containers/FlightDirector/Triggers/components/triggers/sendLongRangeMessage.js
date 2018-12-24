import React from "react";

export default {
  name: "sendLongRangeMessage",
  category: "Triggers",
  component: () => (
    <div>
      Event: Send Long Range Message
      <div>
        <small>
          Possible "Is Outgoing" options:{" "}
          <div>
            <code>true</code>: the message was sent to the crew
          </div>
          <div>
            <code>false</code>: the message was sent by the crew
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
    }
  ],
  inputs: [
    {
      id: "crew",
      color: "yellow",
      title: "Is Outgoing",
      type: "String"
    }
  ],
  config: []
};
