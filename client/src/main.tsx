import React from "react";
import {render} from "react-dom";

import App from "./App";
import "bootstrap/scss/bootstrap.scss";
import {initializeTabId} from "@thorium/tab-id";

initializeTabId();

try {
  window.thorium = window.thorium || {
    sendMessage: (args: any) => {},
  };
  window.thoriumLocal = {
    clockSync: 0,
    roundTrip: 0,
  };
} catch (err) {
  // Do nothing
}
render(<App />, document.getElementById("root"));
