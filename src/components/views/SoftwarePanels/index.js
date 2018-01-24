import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card } from "reactstrap";
import Measure from "react-measure";
import Canvas from "../../../containers/FlightDirector/SoftwarePanels/canvas";
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
            template: subscriptionData.data.templateUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
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
      const variables = {
        id: this.state.selectedPanel,
        components: data.components.map(c => ({
          id: c.id,
          component: c.component,
          level: c.level,
          label: c.label,
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
  render() {
    const { data: { loading, softwarePanels } } = this.props;
    const { selectedPanel } = this.state;
    if (loading) return null;
    return (
      <Container fluid className="softwarePanels-card software-panels">
        <Row>
          <Col sm={3}>
            <Card>
              {softwarePanels.map(s => (
                <p
                  key={s.id}
                  className={selectedPanel === s.id ? "selected" : ""}
                  onClick={() => this.setState({ selectedPanel: s.id })}
                >
                  {s.name}
                </p>
              ))}
            </Card>
          </Col>
          <Col sm={9}>
            {selectedPanel && (
              <Card>
                {(() => {
                  const panel = softwarePanels.find(
                    s => s.id === selectedPanel
                  );
                  if (!panel) return;
                  const { components, connections, cables } = panel;
                  return (
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
                  );
                })()}
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
