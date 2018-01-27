import React from "react";
import FileExplorer from "../../views/TacticalMap/fileExplorer";
export default ({ data, updateData }) => (
  <div>
    <label>Name</label>
    <textarea
      rows="10"
      style={{ width: "100%" }}
      onChange={evt =>
        updateData(
          JSON.stringify(
            Object.assign({}, JSON.parse(data), { name: evt.target.value })
          )
        )
      }
      value={JSON.parse(data).name}
    />
    <FileExplorer
      directory="/Viewscreen/Faces"
      selectedFiles={[JSON.parse(data).image]}
      onClick={(evt, container) =>
        updateData(
          JSON.stringify(
            Object.assign({}, JSON.parse(data), { image: container.fullPath })
          )
        )
      }
    />
  </div>
);
