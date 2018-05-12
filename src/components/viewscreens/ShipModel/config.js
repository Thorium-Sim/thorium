import React from "react";
import { ChromePicker } from "react-color";
import FileExplorer from "../../views/TacticalMap/fileExplorer";
export default ({ data, updateData }) => (
  <div
    style={{
      height: "45vh",
      overflow: "auto"
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
    <ChromePicker
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
    <FileExplorer
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
);
