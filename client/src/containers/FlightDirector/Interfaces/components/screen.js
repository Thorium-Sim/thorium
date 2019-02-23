import React from "react";

export default {
  name: "Screen",
  locked: true,
  hiddenInLibrary: true,
  component: ({ value = {} }) => {
    const { width = 320, height = 568 } = value;
    return (
      <div
        style={{
          width,
          height,
          backgroundColor: "rgba(0,0,0,0.5)",
          border: "solid 2px white"
        }}
      />
    );
  },
  outputs: [],
  inputs: [],
  config: []
};
