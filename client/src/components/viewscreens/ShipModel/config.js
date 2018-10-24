import React from "react";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import ColorPicker from "helpers/colorPicker";

export default ({ data, updateData, simple }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }}
  >
    <label>Title</label>
    <input
      onChange={evt =>
        updateData(
          JSON.stringify({ ...JSON.parse(data), title: evt.target.value })
        )
      }
      defaultValue={JSON.parse(data).title}
    />
    <label>Description</label>
    <div>
      <textarea
        rows={3}
        onChange={evt =>
          updateData(
            JSON.stringify({
              ...JSON.parse(data),
              description: evt.target.value
            })
          )
        }
        defaultValue={JSON.parse(data).description}
      />
    </div>
    <label>Wireframe</label>
    <input
      type="checkbox"
      onChange={evt =>
        updateData(
          JSON.stringify({ ...JSON.parse(data), wireframe: evt.target.checked })
        )
      }
      checked={JSON.parse(data).wireframe}
    />
    <label>Rotation Speed ({JSON.parse(data).speed || 2} RPM)</label>
    <input
      type="range"
      min={0.1}
      max={10}
      step={0.01}
      onChange={evt =>
        updateData(
          JSON.stringify({
            ...JSON.parse(data),
            speed: parseFloat(evt.target.value)
          })
        )
      }
      checked={JSON.parse(data).speed || 2}
    />
    {/* <label>Texture</label>
    <input
      type="checkbox"
      onChange={evt =>
        updateData(
          JSON.stringify({ ...JSON.parse(data), texture: evt.target.checked })
        )
      }
      checked={JSON.parse(data).texture}
    /> */}
    {/* Just making a change... */}
    <label>Color</label>
    <ColorPicker
      color={JSON.parse(data).color}
      onChangeComplete={color => {
        updateData(
          JSON.stringify({
            ...JSON.parse(data),
            color: color.hex,
            opacity: color.rgb.a
          })
        );
      }}
    />
    <label>
      Mesh <small>Will use a texture of the same name</small>
    </label>
    <div
      style={{
        flex: 1,
        overflow: "auto"
      }}
    >
      <FileExplorer
        simple={simple}
        directory="/3D/Mesh"
        selectedFiles={[JSON.parse(data).mesh]}
        onClick={(evt, container) =>
          updateData(
            JSON.stringify(
              Object.assign({}, JSON.parse(data), { mesh: container.fullPath })
            )
          )
        }
      />
    </div>
  </div>
);
