import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Label, Row, Col, Input, Button, ButtonGroup } from "reactstrap";
import Preview, { Viewscreen } from "./index";
import * as ViewscreenCards from "../../viewscreens";
import Layouts from "../../layouts";

import "./style.scss";

const CardPreview = Viewscreen;

const VIEWSCREEN_SUB = gql`
  subscription ViewscreenSub($simulatorId: ID) {
    viewscreensUpdate(simulatorId: $simulatorId) {
      id
      name
      component
      data
      auto
    }
  }
`;

class ViewscreenCore extends Component {
  sub = null;
  cards = Object.keys(ViewscreenCards)
    .filter(c => c.indexOf("Config") === -1)
    .sort();
  configs = Object.keys(ViewscreenCards)
    .filter(c => c.indexOf("Config") > -1)
    .sort();
  state = {
    selectedViewscreen: null,
    preview: true,
    configData: "{}"
  };
  componentWillUnmount() {
    this.sub && this.sub();
  }
  componentWillReceiveProps(nextProps) {
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
      if (viewscreens.length === 1) {
        this.setState({
          selectedViewscreen: viewscreens[0].id
        });
      }
    }
  }
  updateCard = component => {
    const { previewComponent, configData } = this.state;

    const mutation = gql`
      mutation UpdateViewscreen($id: ID!, $component: String!, $data: String) {
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
    const auto = !viewscreens.find(v => v.id === selectedViewscreen).auto;
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
  render() {
    if (this.props.data.loading) return null;
    const { viewscreens } = this.props.data;
    const {
      selectedViewscreen = null,
      preview,
      previewComponent,
      configData
    } = this.state;
    const LayoutComponent =
      Layouts[this.props.simulator.layout + "Viewscreen"] ||
      Layouts[this.props.simulator.layout];
    if (!viewscreens) return <div>No Viewscreens</div>;
    return (
      <div className="viewscreen-core">
        <div className="q1">
          {selectedViewscreen &&
            <LayoutComponent
              clientObj={{}}
              flight={{}}
              simulator={this.props.simulator}
              station={{}}
              cardName={"Viewscreen"}
            >
              <Preview
                simulator={this.props.simulator}
                clientObj={{ id: selectedViewscreen }}
              />
            </LayoutComponent>}
        </div>
        <div className="q3">
          {previewComponent &&
            <LayoutComponent
              clientObj={{}}
              flight={{}}
              simulator={this.props.simulator}
              station={{}}
              cardName={"Viewscreen"}
            >
              <CardPreview
                simulator={this.props.simulator}
                component={previewComponent}
                viewscreen={{ data: configData }}
              />
            </LayoutComponent>}
        </div>
        <div className="core" style={{ height: "100%" }}>
          <div className="q2">
            <Row>
              <Col sm={6}>
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
                  {viewscreens.map(v =>
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  )}
                </Input>
                <Label>
                  <input
                    type="checkbox"
                    checked={
                      viewscreens.find(v => v.id === selectedViewscreen).auto
                    }
                    onChange={this.toggleAuto}
                  />{" "}
                  Auto-switch generic tactical cards
                </Label>
              </Col>
              <Col sm={6}>
                <Label>Cards</Label>
                <div className="card-list">
                  {this.cards.map(c =>
                    <p
                      key={c}
                      className={`${selectedViewscreen &&
                      viewscreens.find(v => v.id === selectedViewscreen)
                        .component === c
                        ? "previewing"
                        : ""} ${previewComponent === c ? "selected" : ""}`}
                      onClick={() =>
                        preview
                          ? this.setState({ previewComponent: c })
                          : this.updateCard(c)}
                    >
                      {c}
                    </p>
                  )}
                </div>
                <ButtonGroup>
                  <Button
                    color="primary"
                    className={preview ? "active" : ""}
                    onClick={() => this.setState({ preview: true })}
                  >
                    Preview
                  </Button>
                  <Button
                    color="info"
                    onClick={() => this.updateCard(previewComponent)}
                  >
                    Go
                  </Button>
                  <Button
                    color="success"
                    className={!preview ? "active" : ""}
                    onClick={() => this.setState({ preview: false })}
                  >
                    Change
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </div>
          <div className="q4">
            <Label>Config</Label>
            <Row>
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
                        data={currentData}
                        updateData={this.updateData}
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
                        data={configData}
                        updateData={data => this.setState({ configData: data })}
                      />
                    );
                  }
                  return <p>No config for this component</p>;
                })()}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const VIEWSCREEN_QUERY = gql`
  query Viewscreens($simulatorId: ID) {
    viewscreens(simulatorId: $simulatorId) {
      id
      name
      component
      data
      auto
    }
  }
`;
export default graphql(VIEWSCREEN_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ViewscreenCore));
