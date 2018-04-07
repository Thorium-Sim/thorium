import React, { Component } from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import FileExplorer from "../../views/TacticalMap/fileExplorer";

const ADD_CACHE_MUTATION = gql`
  mutation AddCache($clientId: ID!, $cacheItem: String!) {
    clientAddCache(client: $clientId, cacheItem: $cacheItem)
  }
`;

class VideoConfig extends Component {
  componentWillReceiveProps(nextProps) {
    const data = JSON.parse(nextProps.data);
    const oldData = JSON.parse(this.props.data);
    if (data.asset !== oldData.asset && nextProps.selectedClient) {
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
    let { data, updateData } = this.props;
    data = JSON.parse(data);
    return (
      <div>
        <div>
          <label>Video</label>
          <div style={{ maxHeight: "34vh", overflowY: "scroll" }}>
            <FileExplorer
              directory="/Viewscreen/Videos"
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
                )
              }
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
                )
              }
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
                )
              }
            />{" "}
            Overlay
          </label>
        </div>
      </div>
    );
  }
}

export default withApollo(VideoConfig);
