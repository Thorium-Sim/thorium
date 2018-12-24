import React from "react";

export const commHail = {
  name: "commHail",
  category: "Triggers",
  component: () => "Event: Short Range Hail",
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
export const cancelHail = {
  name: "cancelHail",
  category: "Triggers",
  component: () => "Event: Short Range Cancel Hail",
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
export const connectHail = {
  name: "connectHail",
  category: "Triggers",
  component: () => "Event: Short Range Connect Hail",
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
export const commAddArrow = {
  name: "commAddArrow",
  category: "Triggers",
  component: () => "Event: Short Range Incoming Call",
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
export const commRemoveArrow = {
  name: "commRemoveArrow",
  category: "Triggers",
  component: () => "Event: Short Range Incoming Call Ended",
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
export const commConnectArrow = {
  name: "commConnectArrow",
  category: "Triggers",
  component: () => "Event: Short Range Incoming Call Connected",
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
export const commDisconnectArrow = {
  name: "commDisconnectArrow",
  category: "Triggers",
  component: () => "Event: Short Range Incoming Call Disconnected",
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
export const muteShortRangeComm = {
  name: "muteShortRangeComm",
  category: "Triggers",
  component: () => (
    <div>
      Event: Short Range Mute Changed
      <div>
        <small>
          Possible "Is Muted" options:{" "}
          <div>
            <code>on</code>: the mute turned on
          </div>
          <div>
            <code>off</code>: the mute turned off
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
      id: "mute",
      color: "gray",
      title: "Is Muted",
      type: "String"
    }
  ],
  inputs: [],
  config: []
};
