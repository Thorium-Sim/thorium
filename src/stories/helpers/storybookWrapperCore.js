import React from "react";
import Provider from "./mockProvider";
import "bootstrap/scss/bootstrap.scss";
import "../../app.scss";
import "../../components/core/CoreComponents.scss";
import "./style.scss";

window.thorium = window.thorium || {
  sendMessage: args => {},
  clockSync: 0,
};

export default props => {
  return (
    <React.Suspense fallback={"Loading..."}>
      <div className="core">
        <Provider {...props} />
      </div>
    </React.Suspense>
  );
};
