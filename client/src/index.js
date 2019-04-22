import React from "react";
import { render } from "react-dom";
import "./helpers/sentry";
import App from "./App";
import "bootstrap/scss/bootstrap.scss";
import { initializeClient } from "helpers/getClientId";

initializeClient();

window.thorium = window.thorium || {
  sendMessage: args => {
    console.log(args);
  },
  clockSync: 0
};
render(<App />, document.getElementById("root"));
