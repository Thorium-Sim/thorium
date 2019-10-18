import React from "react";
import {render} from "react-dom";
import Component from "./App";

it("renders without crashing", () => {
  // Fix the dom
  console.log("Window.location", window.location);

  window.TweenMax = {fromTo: () => {}};
  const div = document.createElement("div");
  render(<Component />, div);
});
