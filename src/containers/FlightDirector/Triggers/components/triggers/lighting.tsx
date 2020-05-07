import React from "react";

export const lightingShakeLights = {
  name: "Lighting: Shake Lights",
  objectKey: "lightingShakeLights",
  category: "Triggers",
  component: () => (
    <div>
      Event: Lighting Shake Lights
      <div>
        <small>
          Possible "Strength" options:{" "}
          <div>
            <code>low</code>
          </div>
          <div>
            <code>mid</code>
          </div>
          <div>
            <code>high</code>
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
      id: "strength",
      color: "yellow",
      title: "Strength",
      type: "String",
    },
  ],
  inputs: [],
  config: [],
};

export const lightingSetEffect = {
  name: "Lighting: Shake Lights",
  objectKey: "lightingShakeLights",
  category: "Triggers",
  component: () => (
    <div>
      Event: Lighting Shake Lights
      <div>
        <small>
          Possible "Effect" options:{" "}
          <div>
            <code>normal</code>
          </div>
          <div>
            <code>darken</code>
          </div>
          <div>
            <code>blackout</code>
          </div>
          <div>
            <code>work</code>
          </div>
          <div>
            <code>fade</code>
          </div>
          <div>
            <code>shake</code>
          </div>
          <div>
            <code>strobe</code>
          </div>
          <div>
            <code>oscillate</code>
          </div>
        </small>
      </div>
      <div>
        <small>
          Possible "Strength" options:{" "}
          <div>
            <code>low</code>
          </div>
          <div>
            <code>mid</code>
          </div>
          <div>
            <code>high</code>
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
      id: "effect",
      color: "green",
      title: "Effect",
      type: "String",
    },
    {
      id: "strength",
      color: "yellow",
      title: "Strength",
      type: "String",
    },
  ],
  inputs: [],
  config: [],
};
