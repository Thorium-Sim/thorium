import React from "react";

const DiagramContext = React.createContext({
  startLibraryDrag: () => {},
  resetCanvas: () => {},
  clearCanvas: () => {},
  components: [],
  connections: [],
  values: {},
  view: { x: 0, y: 0, scale: 1 },
  reset: 0,
  dimensions: { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 },
  updateDimensions: () => {},
  updatePan: () => {},
  updateComponentPosition: () => {},
  addConnection: () => {},
  updateValue: () => {},
  updateSelectedComponent: () => {},
  selectedComponent: null,
  config: {},
  setConfig: () => {}
});

export default DiagramContext;
