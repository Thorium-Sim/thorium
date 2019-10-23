import React from "react";

import Provider from "./mockProvider";

import "bootstrap/scss/bootstrap.scss";
import "../../app.scss";
import "../../components/layouts/LayoutClear/style.scss";
import "./style.scss";
window.thorium = window.thorium || {
  sendMessage: args => {},
  clockSync: 0,
};

export default props => {
  return (
    <React.Suspense fallback={"Loading..."}>
      <div className="layout-clear">
        <Provider {...props} />
      </div>
    </React.Suspense>
  );
};
