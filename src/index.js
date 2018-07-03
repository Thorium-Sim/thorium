import React from "react";
import { render } from "react-dom";
import App from "./App";
import "bootstrap/scss/bootstrap.scss";

window.thorium = window.thorium || { sendMessage: () => {} };
render(<App />, document.getElementById("root"));
