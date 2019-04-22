import React from "react";
import { render } from "react-dom";
import Component from "./App";

it("renders without crashing", () => {
  // Fix the dom
  window.TweenMax = { fromTo: () => {} };
  const div = document.createElement("div");
  render(<Component />, div);
});
