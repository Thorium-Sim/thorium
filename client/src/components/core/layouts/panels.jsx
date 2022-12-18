import React from "react";
import SoftwarePanels from "@client/cards/SoftwarePanels";

export default props => {
  return (
    <div className="core">
      <SoftwarePanels {...props} />
    </div>
  );
};
