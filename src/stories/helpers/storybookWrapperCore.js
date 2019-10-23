import React from "react";
import Provider from "./mockProvider";
import "bootstrap/scss/bootstrap.scss";
import "../../app.scss";
import "../../components/core/CoreComponents.scss";
window.thorium = window.thorium || {
  sendMessage: args => {},
  clockSync: 0,
};

export default props => {
  return (
    <React.Suspense fallback={"Loading..."}>
      <Provider {...props} />
    </React.Suspense>
  );
};
