import React, { Component } from "react";
import { Input } from "reactstrap";
import FileExplorer from "../../views/TacticalMap/fileExplorer";

class ShipViewsConfig extends Component {
  render() {
    let { data, updateData, simple } = this.props;
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div>
          <label>Name</label>
          <Input
            value={data.name}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, { name: evt.target.value })
                )
              )
            }
          />
        </div>
        <div>
          <label>Text</label>
        </div>
        <div>
          <input
            type="textarea"
            value={data.text}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, { text: evt.target.value })
                )
              )
            }
            rows={5}
          />
        </div>
        <label>Ship Image</label>
        <div
          style={{
            flex: 1,
            overflow: "auto"
          }}
        >
          <FileExplorer
            simple={simple}
            directory="/Sensor Contacts/Pictures"
            selectedFiles={[JSON.parse(data).ship]}
            onClick={(evt, container) =>
              updateData(
                JSON.stringify(
                  Object.assign({}, JSON.parse(data), {
                    ship: container.fullPath
                  })
                )
              )
            }
          />
        </div>
      </div>
    );
  }
}

export default ShipViewsConfig;
