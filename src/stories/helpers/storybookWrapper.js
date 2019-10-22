import React from "react";
import {MockedProvider} from "@apollo/react-testing";
import "bootstrap/scss/bootstrap.scss";
import "../../app.scss";
import "../../components/layouts/LayoutClear/style.scss";
import "./style.scss";
window.thorium = window.thorium || {
  sendMessage: args => {},
  clockSync: 0,
};

export default ({children, mocks}) => {
  return (
    <div className="layout-clear">
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    </div>
  );
};
