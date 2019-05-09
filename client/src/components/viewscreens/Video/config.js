import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import { Button } from "reactstrap";
const ADD_CACHE_MUTATION = gql`
  mutation AddCache($clientId: ID!, $cacheItem: String!) {
    clientAddCache(client: $clientId, cacheItem: $cacheItem)
  }
`;

class VideoConfig extends Component {
  componentDidUpdate(prevProps) {
    const oldData = JSON.parse(prevProps.data);
    const data = JSON.parse(this.props.data);
    if (data.asset !== oldData.asset && this.props.selectedClient) {
      this.props.client.mutate({
        mutation: ADD_CACHE_MUTATION,
        variables: {
          clientId: this.props.selectedClient,
          cacheItem: data.asset
        }
      });
    }
  }
  togglePause = () => {
    this.props.viewscreen &&
      this.props.client.mutate({
        mutation: gql`
          mutation ToggleVideo($viewscreenId: ID) {
            toggleViewscreenVideo(viewscreenId: $viewscreenId)
          }
        `,
        variables: {
          viewscreenId: this.props.viewscreen.id
        }
      });
  };
  render() {
    let { data, updateData, simple } = this.props;
    data = JSON.parse(data);
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Button
          size="sm"
          color="info"
          onClick={this.togglePause}
          disabled={!this.props.viewscreen}
        >
          Toggle Video Paused
        </Button>
        <div>
          <div style={{ float: "left", marginLeft: "5px" }}>
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
          <div style={{ float: "left", marginLeft: "5px" }}>
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
          <div>
            <label>
              <input
                checked={data.advance}
                type="checkbox"
                onChange={evt =>
                  updateData(
                    JSON.stringify(
                      Object.assign({}, data, { advance: evt.target.checked })
                    )
                  )
                }
              />{" "}
              Auto-Advance Mission Timeline on Complete
            </label>
          </div>
          <div>
            <label>
              Playback Speed
              <select
                value={data.speed || "1"}
                type="select"
                onChange={evt =>
                  updateData(
                    JSON.stringify(
                      Object.assign({}, data, { speed: evt.target.value })
                    )
                  )
                }
              >
                <option value="0.125">1/8 Speed</option>
                <option value="0.25">1/4 Speed</option>
                <option value="0.5">1/2 Speed</option>
                <option value="0.75">3/4 Speed</option>
                <option value="1">1 Speed</option>
                <option value="1.25">1.25x Speed</option>
                <option value="1.5">1.5x Speed</option>
                <option value="2">2x Speed</option>
                <option value="4">4x Speed</option>
                <option value="8">8x Speed</option>
                <option value="16">16x Speed</option>
              </select>
            </label>
          </div>
        </div>
        <label>Video</label>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <FileExplorer
            simple={simple}
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
    );
  }
}

export default withApollo(VideoConfig);
