import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class ShipViewsConfig extends Component {
  render() {
    let { data, updateData, assetData } = this.props;
    data = JSON.parse(data);
    return (
      <div>
        <div>
          <label>Ship Image</label>
          {!assetData.loading && (
            <select
              value={data.ship}
              onChange={evt =>
                updateData(
                  JSON.stringify(
                    Object.assign({}, data, { ship: evt.target.value })
                  )
                )}
            >
              {assetData.assetFolders &&
                assetData.assetFolders[0].containers.map(c => (
                  <option key={c.id} value={c.fullPath}>
                    {c.name}
                  </option>
                ))}
            </select>
          )}
        </div>
        <div>
          <label>Name</label>
          <input
            value={data.name}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, { name: evt.target.value })
                )
              )}
            rows={10}
          />
        </div>
        <div>
          <label>Text</label>
        </div>
        <div>
          <textarea
            value={data.text}
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
      names: ["Pictures"]
    }
  })
})(ShipViewsConfig);
