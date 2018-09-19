import React from "react";
import { render } from "react-dom";
import App from "./App";
import "bootstrap/scss/bootstrap.scss";

window.thorium = window.thorium || {
  sendMessage: args => {
    console.log(args);
  },
  clockSync: 0
};
render(<App />, document.getElementById("root"));
