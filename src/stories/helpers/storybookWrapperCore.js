import React from "react";
import {MockedProvider} from "@apollo/react-testing";
import "bootstrap/scss/bootstrap.scss";
import "../../app.scss";
import "../../components/core/CoreComponents.scss";
window.thorium = window.thorium || {
  sendMessage: args => {},
  clockSync: 0,
};

export default ({children, mocks}) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};
