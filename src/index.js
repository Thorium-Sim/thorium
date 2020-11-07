import React from "react";
import {render} from "react-dom";
// import "./helpers/sentry";
import App from "./App";
import "bootstrap/scss/bootstrap.scss";
import {initializeClient} from "helpers/getClientId";

initializeClient();
try {
  window.thorium = window.thorium || {
    sendMessage: args => {},
    clockSync: 0,
  };
} catch (err) {
  // Do nothing
}
render(<App />, document.getElementById("root"));
