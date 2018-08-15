import React, { Fragment, Component } from "react";
import { Input } from "reactstrap";
import { titleCase } from "change-case";
import FileExplorer from "../../views/TacticalMap/fileExplorer";
import ColorPicker from "../../../helpers/colorPicker";

class PlanetaryScanConfig extends Component {
  state = {};
  render() {
    const { config } = this.state;
    let { data, updateData, simple } = this.props;
    data = JSON.parse(data);
    const { planet, wireframe, clouds = null, color } = data;
    if (!planet) {
      updateData(
        JSON.stringify(
          Object.assign({}, data, { planet: "/3D/Texture/Planets/Alpine.jpg" })
        )
      );
    }
    if (config) {
      return (
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <strong>Config {titleCase(config)}</strong>
          <FileExplorer
            simple={simple}
            directory="/3D/Texture/Planets"
            selectedFiles={[data[config]]}
            onClick={(evt, container) => {
              updateData(
                JSON.stringify(
                  Object.assign({}, data, { [config]: container.fullPath })
                )
              );
              this.setState({ config: null });
            }}
          />
        </div>
      );
    }
    return (
      <div>
        <div>
          <label>
            Wireframe{" "}
            <input
              type="checkbox"
              checked={wireframe}
              onClick={evt =>
                updateData(
                  JSON.stringify(
                    Object.assign({}, data, { wireframe: evt.target.checked })
                  )
                )
              }
            />
          </label>
        </div>
        {wireframe ? (
          <Fragment>
            <label>Color</label>
            <ColorPicker
              color={color}
              onChangeComplete={color => {
                updateData(
                  JSON.stringify({
                    ...data,
                    color: color.hex
                  })
                );
              }}
            />
          </Fragment>
        ) : (
          <Fragment>
            <div>
              <label>Planet Texture</label>
              <img
                src={`/assets/${planet}`}
                alt="Planet"
                style={{ cursor: "pointer", width: "100%", maxWidth: "150px" }}
                draggable={false}
                onClick={() => this.setState({ config: "planet" })}
              />
            </div>
            <div>
              <label>Cloud Texture</label>
              {clouds ? (
                <img
                  src={`/assets/${clouds}`}
                  alt="Planet"
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: "150px"
                  }}
                  draggable={false}
                  onClick={() => this.setState({ config: "clouds" })}
                />
              ) : (
                <div
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: "150px",
                    fontSize: "24px",
                    border: "solid 1px white",
                    textAlign: "center",
                    padding: "5px"
                  }}
                  onClick={() => this.setState({ config: "clouds" })}
                >
                  No Clouds
                </div>
              )}
            </div>
          </Fragment>
        )}
        <div>
          <label>Text</label>
          <Input
            type="textarea"
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
      </div>
    );
  }
}
export default PlanetaryScanConfig;
