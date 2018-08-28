import React, { Component } from "react";
import { Input, Button, ButtonGroup } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ViewscreenCardList from "./viewscreenCardList";
import Config from "./ConfigComponent";

class VideoViewscreenCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: "Video",
      data: "{}",
      viewscreen:
        props.viewscreens.length === 1 ? props.viewscreens[0].id : "nothing"
    };
  }
  updateViewscreen = action => () => {
    const { viewscreen: id, data, component } = this.state;
    action({ variables: { id, data, component } });
  };
  viewscreenAuto = action => () => {
    const { viewscreen: id } = this.state;
    action({ variables: { id } });
  };
  render() {
    const { viewscreens, simulator, flightId } = this.props;
    const { viewscreen, data, component } = this.state;
    return (
      <div className="core-viewscreen">
        <div className="upper">
          <Input
            type="select"
            bsSize="sm"
            className="btn-sm btn-primary"
            value={viewscreen}
            onChange={e => this.setState({ viewscreen: e.target.value })}
            style={{ width: "auto", height: "20px", float: "left" }}
          >
            {viewscreens.map(v => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </Input>
          <ButtonGroup>
            <Mutation
              mutation={gql`
                mutation UpdateViewscreen(
                  $id: ID!
                  $component: String!
                  $data: String!
                ) {
                  updateViewscreenComponent(
                    id: $id
                    component: $component
                    data: $data
                  )
                }
              `}
            >
              {action => (
                <Button
                  size="sm"
                  color="success"
                  disabled={!viewscreen}
                  onClick={this.updateViewscreen(action)}
                >
                  Update
                </Button>
              )}
            </Mutation>
            <Mutation
              mutation={gql`
                mutation SetViewscreenAuto($id: ID!) {
                  setViewscreenToAuto(id: $id)
                }
              `}
            >
              {action => (
                <Button
                  size="sm"
                  color="info"
                  disabled={!viewscreen}
                  onClick={this.viewscreenAuto(action)}
                >
                  Auto
                </Button>
              )}
            </Mutation>
          </ButtonGroup>
          <label>
            <Mutation
              mutation={gql`
                mutation SetOverlay($id: ID!, $overlay: Boolean!) {
                  setClientOverlay(id: $id, overlay: $overlay)
                }
              `}
            >
              {action => (
                <input
                  type="checkbox"
                  checked={
                    viewscreen &&
                    viewscreens.find(v => v.id === viewscreen).overlay
                  }
                  onChange={e =>
                    action({
                      variables: {
                        id:
                          viewscreen &&
                          viewscreens.find(v => v.id === viewscreen).id,
                        overlay: e.target.checked
                      }
                    })
                  }
                />
              )}
            </Mutation>{" "}
            Show card overlay
          </label>
        </div>
        <div className="lower">
          <ViewscreenCardList
            previewComponent={component}
            viewscreen={
              viewscreen && viewscreens.find(v => v.id === viewscreen)
            }
            update={c => this.setState({ component: c })}
          />
          <div className="config">
            <Config
              simple
              component={component}
              data={data}
              updateData={newData => this.setState({ data: newData })}
              simulator={simulator}
              flightId={flightId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default VideoViewscreenCore;
