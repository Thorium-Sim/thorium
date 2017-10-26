import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

const ADD_CACHE_MUTATION = gql`
  mutation AddCache($clientId: ID!, $cacheItem: String!) {
    clientAddCache(client: $clientId, cacheItem: $cacheItem)
  }
`;

class VideoConfig extends Component {
  componentWillReceiveProps(nextProps) {
    const data = JSON.parse(nextProps.data);
    const oldData = JSON.parse(this.props.data);
    console.log({
      clientId: nextProps.selectedClient,
      cacheItem: data.asset
    });
    if (data.asset !== oldData.asset) {
      this.props.client.mutate({
        mutation: ADD_CACHE_MUTATION,
        variables: {
          clientId: nextProps.selectedClient,
          cacheItem: data.asset
        }
      });
    }
  }
  render() {
    let { data, updateData, assetData } = this.props;
    data = JSON.parse(data);
    return (
      <div>
        <div>
          <label>Video</label>
          {!assetData.loading &&
            <select
              value={data.asset}
              onChange={evt =>
                updateData(
                  JSON.stringify(
                    Object.assign({}, data, { asset: evt.target.value })
                  )
                )}
            >
              {assetData.assetFolders[0].containers.map(c =>
                <option key={c.id} value={c.fullPath}>
                  {c.name}
                </option>
              )}
            </select>}
        </div>
        <div>
          <label>
            <input
              checked={data.autoplay}
              type="checkbox"
              onChange={evt =>
                updateData(
                  JSON.stringify(
                    Object.assign({}, data, { autoplay: evt.target.checked })
                  )
                )}
            />{" "}
            Autoplay
          </label>
        </div>
        <div>
          <label>
            <input
              checked={data.loop}
              type="checkbox"
              onChange={evt =>
                updateData(
                  JSON.stringify(
                    Object.assign({}, data, { loop: evt.target.checked })
                  )
                )}
            />{" "}
            Loop
          </label>
        </div>
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
                )}
            />{" "}
            Overlay
          </label>
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
      names: ["Videos"]
    }
  })
})(withApollo(VideoConfig));
