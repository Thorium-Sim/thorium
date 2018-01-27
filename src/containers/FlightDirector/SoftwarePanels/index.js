import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import uuid from "uuid";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import { Link } from "react-router-dom";
import ComponentLibrary from "./componentLibrary";
import Measure from "react-measure";
import Canvas from "./canvas";
import Config from "./componentConfig";

const SUB = gql`
  subscription SoftwarePanelsUpdate {
    softwarePanelsUpdate {
      id
      name
      cables {
        id
        color
        components
      }
      components {
        id
        x
        y
        scale
        component
        level
        label
      }
      connections {
        id
        to
        from
      }
    }
  }
`;

class App extends Component {
  state = {
    edit: true,
    libraryShown: false,
    draggingComponent: null,
    componentLocation: { x: 0, y: 0 },
    components: [],
    connections: [],
    cables: [],
    connectingFrom: null,
    connectingLocation: { x: 0, y: 0 }
  };
  subscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            softwarePanels: subscriptionData.data.softwarePanelsUpdate
          });
        }
      });
    }
    if (!nextProps.data.loading && nextProps.data.softwarePanels) {
      if (this.state.selectedPanel) {
        const panel = nextProps.data.softwarePanels.find(
          s => s.id === this.state.selectedPanel
        );
        if (panel) {
          this.setState({
            components: panel.components,
            connections: panel.connections,
            cables: panel.cables
          });
        }
      }
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  applyUpdate = (data, noupdate) => {
    this.setState(data);
    if (!noupdate) {
      const mutation = gql`
        mutation UpdateSoftwarePanel(
          $id: ID!
          $cables: [PanelCableInput]
          $components: [PanelComponentInput]
          $connections: [PanelConnectionInput]
        ) {
          updateSoftwarePanel(
            panel: {
              id: $id
              cables: $cables
              components: $components
              connections: $connections
            }
          )
        }
      `;
      const variables = {
        id: this.state.selectedPanel,
        components: data.components.map(c => ({
          id: c.id,
          component: c.component,
          level: c.level,
          label: c.label,
          scale: c.scale,
          x: c.x,
          y: c.y
        })),
        cables: data.cables.map(c => ({
          id: c.id,
          color: c.color,
          components: c.components
        })),
        connections: data.connections.map(c => ({
          id: c.id,
          to: c.to,
          from: c.from
        }))
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  };
  mouseDown = (evt, component) => {
    this.setState({
      libraryShown: false,
      draggingComponent: component,
      componentLocation: {
        x: evt.clientX - this.state.dimensions.left - 12,
        y: evt.clientY - this.state.dimensions.top - 30
      }
    });
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
  };
  mouseMove = evt => {
    const loc = this.state.componentLocation;
    this.setState({
      componentLocation: {
        x: loc.x + evt.movementX,
        y: loc.y + evt.movementY
      }
    });
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    const {
      components,
      componentLocation: loc,
      draggingComponent
    } = this.state;
    this.setState({
      draggingComponent: null
    });
    if (
      loc.x < 0 ||
      loc.y < 0 ||
      loc.x > this.state.dimensions.width ||
      loc.y > this.state.dimensions.height
    )
      return;
    const comp = {
      id: uuid.v4(),
      component: draggingComponent,
      x: loc.x / this.state.dimensions.width,
      y: loc.y / this.state.dimensions.height
    };
    this.setState(
      {
        components: components.concat(comp)
      },
      () => {
        this.applyUpdate(this.state);
      }
    );
  };
  selectLine = id => {
    this.setState({ selectedLine: id });
  };
  delete = () => {
    if (this.state.selectedLine) {
      this.setState(
        prevState => ({
          connections: prevState.connections.filter(
            c => c.id !== prevState.selectedLine
          ),
          selectedLine: null
        }),
        () => {
          this.applyUpdate(this.state);
        }
      );
    }
  };
  createPanel = () => {
    const name = prompt("What is the name of the new panel?");
    const mutation = gql`
      mutation CreatePanel($name: String!) {
        createSoftwarePanel(panel: { name: $name })
      }
    `;
    const variables = {
      name
    };
    this.props.client.mutate({ mutation, variables });
  };
  selectPanel = id => {
    if (!this.props.data.loading && this.props.data.softwarePanels && id) {
      const panel = this.props.data.softwarePanels.find(s => s.id === id);
      if (panel) {
        this.setState({
          components: panel.components,
          connections: panel.connections,
          cables: panel.cables,
          selectedPanel: id
        });
      }
    }
  };

  render() {
    const {
      libraryShown,
      selectedLine,
      edit,
      components,
      connections,
      cables,
      draggingComponent,
      componentLocation,
      selectedPanel,
      selectedComponent
    } = this.state;
    const { data: { loading, softwarePanels } } = this.props;
    if (loading || !softwarePanels) return null;
    return (
      <Container fluid className="software-panels">
        <Row>
          <Col sm={3}>
            <Link to={"/"}>Go Back</Link>
            {selectedPanel && (
              <div>
                {edit && (
                  <Button
                    size="sm"
                    onClick={() => this.setState({ libraryShown: true })}
                  >
                    Show
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => this.setState({ edit: !edit })}
                >
                  {edit ? "Play" : "Edit"}
                </Button>
                {selectedLine && (
                  <Button size="sm" onClick={this.delete}>
                    Delete
                  </Button>
                )}
              </div>
            )}
            <ListGroup>
              {softwarePanels.map(s => (
                <ListGroupItem
                  key={s.id}
                  active={selectedPanel === s.id}
                  tag="button"
                  action
                  onClick={() => this.selectPanel(s.id)}
                >
                  {s.name}
                </ListGroupItem>
              ))}
            </ListGroup>
            <Button color="success" block onClick={this.createPanel}>
              Create Panel
            </Button>
          </Col>
          <Col sm={9}>
            {selectedPanel && (
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ dimensions: contentRect.bounds });
                }}
              >
                {({ measureRef }) => (
                  <div className="componentCanvas" ref={measureRef}>
                    <div style={{ paddingTop: `${9 / 16 * 100}%` }} />
                    {this.state.dimensions && (
                      <Canvas
                        edit={this.state.edit}
                        selectedLine={selectedLine}
                        applyUpdate={this.applyUpdate}
                        components={components}
                        connections={connections}
                        cables={cables}
                        draggingComponent={draggingComponent}
                        componentLocation={componentLocation}
                        selectLine={this.selectLine}
                        selectComponent={id =>
                          this.setState({ selectedComponent: id })
                        }
                        selectedComponent={selectedComponent}
                        update
                        {...this.state.dimensions}
                      />
                    )}
                  </div>
                )}
              </Measure>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {selectedComponent && (
              <Config
                applyUpdate={this.applyUpdate}
                selectedComponent={selectedComponent}
                components={components}
                connections={connections}
                cables={cables}
              />
            )}
          </Col>
        </Row>
        <ComponentLibrary
          mouseDown={this.mouseDown}
          shown={libraryShown}
          hide={() => this.setState({ libraryShown: false })}
        />
      </Container>
    );
  }
}

const QUERY = gql`
  query SoftwarePanels {
    softwarePanels {
      id
      name
      cables {
        id
        color
        components
      }
      components {
        id
        x
        y
        scale
        component
        level
        label
      }
      connections {
        id
        to
        from
      }
    }
  }
`;

export default graphql(QUERY)(withApollo(App));
