import React from "react";
import {MockedProvider} from "@apollo/react-testing";
import "bootstrap/scss/bootstrap.scss";

window.thorium = window.thorium || {
  sendMessage: args => {},
  clockSync: 0,
};

export default ({children}) => {
  return <MockedProvider mocks={[]}>{children}</MockedProvider>;
};
