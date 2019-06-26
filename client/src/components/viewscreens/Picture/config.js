import React from "react";
import FileExplorer from "components/views/TacticalMap/fileExplorer";

const VideoConfig = ({ data, updateData, simple }) => {
  data = JSON.parse(data);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div>
        <div>
          <label>
            <input
              checked={data.overlay}
              type="checkbox"
              onChange={evt =>
                updateData(
                  JSON.stringify(
                    Object.assign({}, data, { overlay: evt.target.checked })
                  )
                )
              }
            />{" "}
            Overlay
          </label>
        </div>
      </div>
      <label>Image</label>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <FileExplorer
          simple={simple}
          directory="/"
          selectedFiles={[data.asset]}
          onClick={(evt, container) =>
            updateData(
              JSON.stringify(
                Object.assign({}, data, { asset: container.fullPath })
              )
            )
          }
        />
      </div>
    </div>
  );
};

export default VideoConfig;
