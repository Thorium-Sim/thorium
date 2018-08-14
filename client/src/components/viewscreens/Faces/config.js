import React from "react";
import { Input } from "reactstrap";
import FileExplorer from "../../views/TacticalMap/fileExplorer";
export default ({ data, updateData, simple }) => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <label>Name</label>
    <Input
      type="textarea"
      rows="5"
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
    <div style={{ flex: 1, overflowY: "auto" }}>
      <FileExplorer
        simple={simple}
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
  </div>
);
