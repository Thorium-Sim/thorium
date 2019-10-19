import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Login/index.js";

export default {
  title: "Cards|Login",
};
export const Login = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
