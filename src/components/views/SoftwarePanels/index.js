import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card } from "reactstrap";
import Measure from "react-measure";
import Canvas from "../../../containers/FlightDirector/SoftwarePanels/canvas";
import { getComponentLevel } from "../../../containers/FlightDirector/SoftwarePanels";
import "./style.css";

const SUB = gql`
  subscription SoftwarePanelsUpdate($simulatorId: ID) {
    softwarePanelsUpdate(simulatorId: $simulatorId) {
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
class SoftwarePanels extends Component {
  subscription = null;
  state = {};
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            softwarePanels: subscriptionData.data.softwarePanelsUpdate
          });
        }
      });
    }
    if (!nextProps.data.loading && nextProps.data.softwarePanels) {
      const shownPanel = this.props.panel || this.state.selectedPanel;
      if (shownPanel) {
        const panel = nextProps.data.softwarePanels.find(
          s => s.id === shownPanel
        );
        if (panel) {
          this.setState(
            {
              components: panel.components,
              connections: panel.connections,
              cables: panel.cables
            },
            () => this.reconcileComponents()
          );
        }
      }
    }
  }

  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  reconcileComponents = () => {
    const topCompNames = ["Light", "PlasmaChannel"];
    const { components, connections, cables } = this.state;
    const calcedComps = {};
    const calcLevel = comp => {
      if (calcedComps[comp.id] || calcedComps[comp.id] === 0)
        return calcedComps[comp.id];
      // Get the down-stream levels
      const levels = connections
        .filter(c => c.to === comp.id)
        .map(c => c.from)
        // Get the cables too.
        .concat(
          comp.component === "CableOutput"
            ? cables
                .filter(c => c.components.indexOf(comp.id) > -1)
                .map(c => c.components.find(d => d !== comp.id))
            : []
        )
        .map(c => components.find(d => d.id === c))
        .map(
          c =>
            calcedComps[comp.id] || calcedComps[comp.id] === 0
              ? calcedComps[comp.id]
              : calcLevel(c)
        )
        .filter(c => (Array.isArray(c) ? c.length > 0 : c || c === 0))
        .concat(topCompNames.indexOf(comp.component) > -1 ? [0] : [comp.level])
        .sort(function(a, b) {
          return b - a;
        });
      if (levels.length !== 1) {
        levels.pop();
      }
      const level = getComponentLevel(comp, levels);
      calcedComps[comp.id] = level;
      return level;
    };

    const topComponents = components.filter(
      c => topCompNames.indexOf(c.component) > -1
    );
    const componentLevels = topComponents.reduce((prev, next) => {
      return Object.assign({}, prev, { [next.id]: calcLevel(next) });
    }, {});
    this.setState({
      components: components.map(c => {
        if (componentLevels[c.id] || componentLevels[c.id] === 0) {
          return Object.assign({}, c, { level: componentLevels[c.id] });
        }
        return c;
      })
    });
  };
  applyUpdate = (data, noupdate) => {
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
      const shownPanel = this.props.panel || this.state.selectedPanel;
      const variables = {
        id: shownPanel,
        components: data.components.map(c => ({
          id: c.id,
          component: c.component,
          level: c.level,
          label: c.label,
          x: c.x,
          y: c.y,
          scale: c.scale
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
  selectPanel = id => {
    if (!this.props.data.loading && this.props.data.softwarePanels && id) {
      const panel = this.props.data.softwarePanels.find(s => s.id === id);
      if (panel) {
        this.setState(
          {
            components: panel.components,
            connections: panel.connections,
            cables: panel.cables,
            selectedPanel: id
          },
          () => this.reconcileComponents()
        );
      }
    }
  };

  render() {
    const { data: { loading, softwarePanels }, panel } = this.props;
    const { selectedPanel, components, connections, cables } = this.state;
    const shownPanel = panel || selectedPanel;
    if (loading) return null;
    return (
      <Container
        fluid={panel ? false : true}
        className="softwarePanels-card software-panels"
      >
        <Row>
          {!panel && (
            <Col sm={3}>
              <Card>
                {softwarePanels.map(s => (
                  <p
                    key={s.id}
                    className={selectedPanel === s.id ? "selected" : ""}
                    onClick={() => this.selectPanel(s.id)}
                  >
                    {s.name}
                  </p>
                ))}
              </Card>
            </Col>
          )}
          <Col sm={panel ? 12 : 9}>
            {shownPanel && (
              <Card>
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
                          edit={false}
                          applyUpdate={this.applyUpdate}
                          components={components}
                          connections={connections}
                          cables={cables}
                          {...this.state.dimensions}
                        />
                      )}
                    </div>
                  )}
                </Measure>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const QUERY = gql`
  query SoftwarePanels($simulatorId: ID) {
    softwarePanels(simulatorId: $simulatorId) {
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
export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(SoftwarePanels));
