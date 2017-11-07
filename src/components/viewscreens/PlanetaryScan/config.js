import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class PlanetaryScanConfig extends Component {
  constructor(props) {
    super(props);
    const data = JSON.parse(props.data);

    this.state = {
      startOutput: parseFloat(data.startOutput),
      endOutput: parseFloat(data.endOutput),
      duration: parseFloat(data.duration)
    };
  }
  render() {
    let { data, updateData, assetData } = this.props;
    data = JSON.parse(data);
    return (
      <div>
        <div>
          <label>
            Wireframe{" "}
            <input
              type="checkbox"
              value={data.wireframe}
              onClick={evt =>
                updateData(
                  JSON.stringify(
                    Object.assign({}, data, { wireframe: evt.target.checked })
                  )
                )}
            />
          </label>
        </div>
        <div>
          <label>Planet Texture</label>
          {!assetData.loading && (
            <select
              value={data.planet}
              onChange={evt =>
                updateData(
                  JSON.stringify(
                    Object.assign({}, data, { planet: evt.target.value })
                  )
                )}
            >
              {assetData.assetFolders &&
                assetData.assetFolders[0].containers
                  .filter(c => c.name.toLowerCase().indexOf("clouds") === -1)
                  .map(c => (
                    <option key={c.id} value={c.fullPath}>
                      {c.name}
                    </option>
                  ))}
            </select>
          )}
        </div>
        <div>
          <label>Cloud Texture</label>
          {!assetData.loading && (
            <select
              value={data.clouds}
              onChange={evt =>
                updateData(
                  JSON.stringify(
                    Object.assign({}, data, { clouds: evt.target.value })
                  )
                )}
            >
              <option value="">No Clouds</option>
              {assetData.assetFolders &&
                assetData.assetFolders[0].containers
                  .filter(c => c.name.toLowerCase().indexOf("clouds") > -1)
                  .map(c => (
                    <option key={c.id} value={c.fullPath}>
                      {c.name}
                    </option>
                  ))}
            </select>
          )}
        </div>
        <div>
          <label>Text</label>
          <textarea
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, { text: evt.target.value })
                )
              )}
            rows={10}
          />
        </div>
      </div>
    );
  }
}

const ASSET_QUERY = gql`
  query AssetFolders($names: [String]) {
    assetFolders(names: $names) {
      id
      name
      containers {
        id
        name
        fullPath
      }
    }
  }
`;

export default graphql(ASSET_QUERY, {
  name: "assetData",
  options: ownProps => ({
    variables: {
      names: ["Planets"]
    }
  })
})(PlanetaryScanConfig);
