import React from "react";

export const remoteAccessSendCode = {
  name: "remoteAccessSendCode",
  objectKey: "remoteAccessSendCode",
  category: "Triggers",
  component: () => (
    <div>
      Event: Remote Access Code Sent
      <div>
        <small>"Code" is the code that was sent.</small>
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
      id: "code",
      color: "yellow",
      title: "Code",
      type: "String",
    },
  ],
  inputs: [],
  config: [],
};
export const remoteAccessUpdateCode = {
  name: "remoteAccessUpdateCode",
  objectKey: "remoteAccessUpdateCode",
  category: "Triggers",
  component: () => (
    <div>
      Event: Remote Access Code Accepted/Denied
      <div>
        <small>"Code" is the code that was sent.</small>
      </div>
      <div>
        <small>
          Possible "State" options:{" "}
          <div>
            <code>true</code>: Code was accepted
          </div>
          <div>
            <code>false</code>: Code was rejected
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
      id: "code",
      color: "yellow",
      title: "Code",
      type: "String",
    },
    {
      id: "state",
      color: "green",
      title: "State",
      type: "String",
    },
  ],
  inputs: [],
  config: [],
};
