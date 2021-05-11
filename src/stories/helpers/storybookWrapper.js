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
window.thoriumLocal = {
  clockSync: 0,
};
export default ({mocks, queries, children}) => {
  return (
    <React.Suspense fallback={"Loading..."}>
      <div className="layout-clear">
        <Provider mocks={mocks} queries={queries} children={children} />
      </div>
    </React.Suspense>
  );
};
