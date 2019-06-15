import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo, Mutation } from "react-apollo";
import { Label, Row, Col, Input, Button, ButtonGroup } from "reactstrap";
import Preview, { Viewscreen } from "./index";
import ViewscreenCardList from "./viewscreenCardList";
import ViewscreenHotkeysConfig from "./hotkeysConfig";
import * as ViewscreenCards from "components/viewscreens";

import "./style.scss";

const CardPreview = Viewscreen;

const fragment = gql`
  fragment ViewscreenData on Viewscreen {
    id
    name
    component
    data
    auto
    secondary
    overlay
    pictureInPicture {
      data
      size
      position
      component
    }
  }
`;
const VIEWSCREEN_SUB = gql`
  subscription ViewscreenSub($simulatorId: ID) {
    viewscreensUpdate(simulatorId: $simulatorId) {
      ...ViewscreenData
    }
  }
  ${fragment}
`;

class ViewscreenManager extends Component {
  sub = null;
  configs = Object.keys(ViewscreenCards)
    .filter(c => c.indexOf("Config") > -1)
    .sort();
  state = {
    selectedViewscreen: null,
    preview: true,
    configData: "{}",
    pipPosition: "bottomRight",
    pipSize: "medium"
  };
  componentWillUnmount() {
    this.sub && this.sub();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: VIEWSCREEN_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            viewscreens: subscriptionData.data.viewscreensUpdate
          });
        }
      });
    }
    if (!nextProps.data.loading) {
      const { viewscreens } = nextProps.data;
      if (viewscreens.length === 1 && viewscreens[0]) {
        this.setState({
          selectedViewscreen: viewscreens[0].id
        });
      }
    }
  }
  updateCard = component => {
    const { previewComponent, configData, configuringPip } = this.state;

    if (configuringPip) {
      const mutation = gql`
        mutation PictureInPicture(
          $id: ID!
          $component: String!
          $data: JSON
          $size: PIP_SIZE
          $position: PIP_POSITION
        ) {
          setViewscreenPictureInPicture(
            id: $id
            component: $component
            data: $data
            size: $size
            position: $position
          )
        }
      `;
      const variables = {
        id: this.state.selectedViewscreen,
        component,
        data: JSON.parse(configData),
        size: this.state.pipSize,
        position: this.state.pipPosition
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    } else {
      const mutation = gql`
        mutation UpdateViewscreen(
          $id: ID!
          $component: String!
          $data: String
        ) {
          updateViewscreenComponent(id: $id, component: $component, data: $data)
        }
      `;
      const variables = {
        id: this.state.selectedViewscreen,
        component
      };
      if (component === previewComponent) {
        // If the component we are switching to is the same as the preview component
        // Apply the preview data to the new component
        variables.data = configData;
      }
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  };
  updateData = data => {
    const mutation = gql`
      mutation UpdateViewscreenData($id: ID!, $data: String!) {
        updateViewscreenData(id: $id, data: $data)
      }
    `;
    const variables = {
      id: this.state.selectedViewscreen,
      data
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  toggleAuto = () => {
    const { viewscreens } = this.props.data;
    const { selectedViewscreen } = this.state;
    const auto = !(
      viewscreens.find(v => v.id === selectedViewscreen) &&
      viewscreens.find(v => v.id === selectedViewscreen).auto
    );
    const id = selectedViewscreen;
    const mutation = gql`
      mutation UpdateViewscreenAuto($id: ID!, $auto: Boolean!) {
        updateViewscreenAuto(id: $id, auto: $auto)
      }
    `;
    const variables = {
      id,
      auto
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  toggleSecondary = () => {
    const { viewscreens } = this.props.data;
    const { selectedViewscreen } = this.state;
    const secondary =
      viewscreens.find(v => v.id === selectedViewscreen) &&
      viewscreens.find(v => v.id === selectedViewscreen).secondary;
    const id = selectedViewscreen;
    const mutation = gql`
      mutation UpdateViewscreenSecondary($id: ID!, $secondary: Boolean!) {
        updateViewscreenSecondary(id: $id, secondary: $secondary)
      }
    `;
    const variables = {
      id,
      secondary: !secondary
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.viewscreens) return null;
    const { viewscreens } = this.props.data;
    const {
      selectedViewscreen = null,
      previewComponent,
      configData,
      config,
      configuringPip
    } = this.state;
    if (!viewscreens) return <div>No Viewscreens</div>;
    const scaleFactor = (window.innerWidth / 1920) * 0.45;
    const viewscreen =
      (selectedViewscreen &&
        viewscreens.length &&
        viewscreens.find(v => v.id === selectedViewscreen) &&
        viewscreens.find(v => v.id === selectedViewscreen)) ||
      {};
    return (
      <div className="viewscreen-core">
        <div
          className="q1"
          style={{
            transform: `scale(${scaleFactor})`
          }}
        >
          {selectedViewscreen && (
            <Preview
              simulator={this.props.simulator}
              flightId={this.props.flightId}
              clientObj={{ id: selectedViewscreen }}
              core
            />
          )}
        </div>
        <div
          className="q3"
          style={{
            transform: `scale(${scaleFactor})`
          }}
        >
          {previewComponent && (
            <CardPreview
              simulator={this.props.simulator}
              component={previewComponent}
              flightId={this.props.flightId}
              viewscreen={{ data: configData }}
              core
            />
          )}
        </div>
        <div className="core" style={{ height: "100%" }}>
          <div className="q2">
            <Row style={{ height: "100%" }}>
              <Col sm={6} style={{ height: "100%" }}>
                <Label>Viewscreen</Label>
                <Input
                  type="select"
                  size="sm"
                  value={selectedViewscreen || "select"}
                  onChange={evt => {
                    this.setState({ selectedViewscreen: evt.target.value });
                  }}
                >
                  <option value="select">Select a viewscreen</option>
                  {viewscreens.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </Input>
                <div>
                  <Button
                    color="success"
                    size="sm"
                    onClick={() =>
                      this.setState({ configuringPip: !configuringPip })
                    }
                  >
                    Configure {configuringPip ? "Main Screen" : "PiP"}
                  </Button>
                  {viewscreen.pictureInPicture && (
                    <Mutation
                      mutation={gql`
                        mutation RemovePIP($id: ID!) {
                          removeViewscreenPictureInPicture(id: $id)
                        }
                      `}
                      variables={{ id: viewscreen.id }}
                    >
                      {action => (
                        <Button color="danger" size="sm" onClick={action}>
                          Remove PiP
                        </Button>
                      )}
                    </Mutation>
                  )}
                </div>
                {configuringPip ? (
                  <>
                    <Label>
                      Position
                      <Input
                        type="select"
                        value={this.state.pipPosition}
                        onChange={e =>
                          this.setState({ pipPosition: e.target.value })
                        }
                      >
                        <option value={"bottomRight"}>Bottom Right</option>
                        <option value={"bottomLeft"}>Bottom Left</option>
                        <option value={"topRight"}>Top Right</option>
                        <option value={"topLeft"}>Top Left</option>
                        <option value={"center"}>Center</option>
                      </Input>
                    </Label>
                    <Label>
                      Size
                      <Input
                        type="select"
                        value={this.state.pipSize}
                        onChange={e =>
                          this.setState({ pipSize: e.target.value })
                        }
                      >
                        <option value={"small"}>Small</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"large"}>Large</option>
                      </Input>
                    </Label>
                  </>
                ) : (
                  <>
                    <Label>
                      <input
                        type="checkbox"
                        checked={viewscreen.auto}
                        onChange={this.toggleAuto}
                      />{" "}
                      Auto-switch generic tactical cards
                    </Label>
                    <Label>
                      <input
                        type="checkbox"
                        disabled={!viewscreen}
                        checked={viewscreen.secondary}
                        onChange={this.toggleSecondary}
                      />{" "}
                      Secondary Screen?
                    </Label>

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
                            disabled={!viewscreen}
                            checked={viewscreen.overlay}
                            onChange={e =>
                              action({
                                variables: {
                                  id: viewscreen.id,
                                  overlay: e.target.checked
                                }
                              })
                            }
                          />
                        )}
                      </Mutation>{" "}
                      Show card overlay
                    </label>
                    <div>
                      <Button
                        size="sm"
                        onClick={() => this.setState({ config: true })}
                      >
                        Configure Hotkeys
                      </Button>
                    </div>
                    <small>
                      Viewscreen Hotkeys are available on any core by pressing
                      'Option' + 'Shift'
                    </small>
                  </>
                )}
              </Col>
              <Col
                sm={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%"
                }}
              >
                <Label>Cards</Label>
                <ViewscreenCardList
                  previewComponent={previewComponent}
                  viewscreen={configuringPip ? viewscreen.pip : viewscreen}
                  update={c => this.setState({ previewComponent: c })}
                />
                <ButtonGroup>
                  <Button
                    color="success"
                    onClick={() => this.updateCard(previewComponent)}
                  >
                    Go
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </div>
          <div className="q4">
            <Label>Config</Label>
            <Row style={{ height: "90%" }}>
              <Col sm={6}>
                <Label>Current Viewscreen</Label>
                {(() => {
                  const viewscreen =
                    selectedViewscreen &&
                    viewscreens.find(v => v.id === selectedViewscreen);
                  const currentComponent = viewscreen && viewscreen.component;
                  const currentData = viewscreen && viewscreen.data;
                  if (this.configs.indexOf(`${currentComponent}Config`) > -1) {
                    const ConfigComponent =
                      ViewscreenCards[`${currentComponent}Config`];
                    return (
                      <ConfigComponent
                        simulator={this.props.simulator}
                        flightId={this.props.flightId}
                        data={currentData}
                        updateData={this.updateData}
                        viewscreen={viewscreen}
                      />
                    );
                  }
                  return <p>No config for this component</p>;
                })()}
              </Col>
              <Col sm={6}>
                <Label>Preview Viewscreen</Label>
                {(() => {
                  if (this.configs.indexOf(`${previewComponent}Config`) > -1) {
                    const ConfigComponent =
                      ViewscreenCards[`${previewComponent}Config`];
                    return (
                      <ConfigComponent
                        simulator={this.props.simulator}
                        flightId={this.props.flightId}
                        data={configData}
                        updateData={data => this.setState({ configData: data })}
                        selectedClient={selectedViewscreen}
                      />
                    );
                  }
                  return <p>No config for this component</p>;
                })()}
              </Col>
            </Row>
          </div>
        </div>
        <ViewscreenHotkeysConfig
          {...this.props}
          modal={config}
          toggle={() => this.setState({ config: false })}
        />
      </div>
    );
  }
}

const VIEWSCREEN_QUERY = gql`
  query Viewscreens($simulatorId: ID) {
    viewscreens(simulatorId: $simulatorId) {
      ...ViewscreenData
    }
  }
  ${fragment}
`;
export default graphql(VIEWSCREEN_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ViewscreenManager));
