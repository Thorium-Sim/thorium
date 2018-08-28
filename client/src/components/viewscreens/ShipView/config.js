import React, { Component } from "react";
import { Input } from "reactstrap";
import FileExplorer from "../../views/TacticalMap/fileExplorer";

class ShipViewsConfig extends Component {
  render() {
    let { data: inputData, updateData, simple } = this.props;
    const data = JSON.parse(inputData);
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto"
        }}
      >
        <div>
          <label>Name</label>
          <Input
            bsSize="sm"
            defaultValue={data.name}
            onChange={evt =>
              updateData(JSON.stringify({ ...data, name: evt.target.value }))
            }
          />
        </div>
        <div>
          <label>Text</label>
        </div>
        <div>
          <Input
            bsSize="sm"
            type="textarea"
            value={data.text}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, { text: evt.target.value })
                )
              )
            }
            rows={2}
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
            selectedFiles={[data.ship]}
            onClick={(evt, container) =>
              updateData(
                JSON.stringify({
                  ...data,
                  ship: container.fullPath
                })
              )
            }
          />
        </div>
      </div>
    );
  }
}

export default ShipViewsConfig;
