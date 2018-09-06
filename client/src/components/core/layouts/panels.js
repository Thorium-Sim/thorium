import React from "react";
import SoftwarePanels from "components/views/SoftwarePanels";

export default props => {
  return (
    <div className="core">
      <SoftwarePanels {...props} />
    </div>
  );
};
