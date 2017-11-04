import React from "react";
import { render } from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

window.thorium = window.thorium || { sendMessage: () => {} };
render(<App />, document.getElementById("root"));
