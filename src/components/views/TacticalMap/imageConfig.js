import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class ImageConfig extends Component {
  render() {
    let { selectedLayer, updateLayer, assetData } = this.props;
    return (
      <div>
        <div>
          <label>Image</label>
          {!assetData.loading && (
            <select
              value={selectedLayer.image || "Default-Image"}
              onChange={evt => updateLayer("image", evt.target.value)}
            >
              <option value="Default-Image" disabled>
                Select an image...
              </option>
              {assetData.assetFolders &&
                assetData.assetFolders[0].containers.map(c => (
                  <option key={c.id} value={c.fullPath}>
                    {c.name}
                  </option>
                ))}
            </select>
          )}
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
  options: () => ({
    variables: {
      names: ["Tactical"]
    }
  })
})(ImageConfig);
