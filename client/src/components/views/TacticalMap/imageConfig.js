import React from "react";
import FileExplorer from "./fileExplorer";

export default ({ selectedLayer, updateLayer }) => (
  <FileExplorer
    directory="/Viewscreen/Tactical Backgrounds"
    selectedFiles={[selectedLayer.image]}
    onClick={(evt, container) => updateLayer("image", container.fullPath)}
  />
);
