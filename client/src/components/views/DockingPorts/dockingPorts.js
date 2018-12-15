import React, { Component, Fragment } from "react";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Tour from "helpers/tourHelper";
import { FormattedMessage } from "react-intl";

class DockingPorts extends Component {
  state = {};
  static trainingSteps = [
    {
      selector: ".nothing",
      content: (
        <FormattedMessage
          id="docking-ports-training-1"
          defaultMessage="Docking ports are specialized reinforced airlocks positioned on the outside of the ship. They allow other ships to dock with your ship to transfer supplies, personnel, and power between the ships."
        />
      )
    },
    {
      selector: ".docking-port-buttons",
      content: (
        <FormattedMessage
          id="docking-ports-training-2"
          defaultMessage="These buttons each represent a docking port on your ship. They change colors based on the status of the docking port. Blue means there is no ship waiting to dock. Yellow means a ship is either waiting to dock or has docked. Red means the docking port is damaged. Click on one of the buttons to control the docking port.."
        />
      )
    },
    {
      selector: ".ship-info",
      content: (
        <FormattedMessage
          id="docking-ports-training-3"
          defaultMessage="You can see the identification of the ship in the docking port here."
        />
      )
    },
    {
      selector: ".control-button",
      content: (
        <FormattedMessage
          id="docking-ports-training-4"
          defaultMessage="Once you have selected a docking port, you can control it. Press these buttons to attach or detach the docking clamps and to retract or extend the boarding ramps. For the ship to be fully docked, the docking clamps must be attached and the boarding ramps must be extended."
        />
      )
    }
  ];
  render() {
    const { dockingPorts, simulator, clientObj } = this.props;
    const { selectedPort } = this.state;
    const dockingPort = dockingPorts.find(d => d.id === selectedPort);
    return (
      <Container className="card-dockingPorts">
        <Row style={{ paddingBottom: 20 }}>
          <Col sm={4}>
            <div
              className="flex docking-port-buttons"
              style={{ flexWrap: "wrap" }}
            >
              {dockingPorts.map(d => (
                <Button
                  key={d.id}
                  color={
                    d.damage.damaged ? "danger" : d.docked ? "warning" : "info"
                  }
                  style={{ width: "50%" }}
                  disabled={d.damage.damaged}
                  active={selectedPort === d.id}
                  onClick={() => this.setState({ selectedPort: d.id })}
                >
                  {d.name}
                </Button>
              ))}
            </div>
          </Col>
          <Col sm={8}>
            <Row>
              <Col sm={4} className="control-button">
                <Mutation
                  mutation={gql`
                    mutation DockingPortChange($port: DockingPortInput!) {
                      updateDockingPort(port: $port)
                    }
                  `}
                >
                  {action => (
                    <Fragment>
                      <Button
                        color="primary"
                        block
                        disabled={!dockingPort || !dockingPort.clamps}
                        onClick={() =>
                          action({
                            variables: {
                              port: {
                                id: dockingPort.id,
                                doors: !dockingPort.doors
                              }
                            }
                          })
                        }
                      >
                        {!dockingPort || !dockingPort.doors
                          ? "Extend"
                          : "Retract"}{" "}
                        Boarding Ramp
                      </Button>
                      <Button
                        color="primary"
                        block
                        disabled={!dockingPort || dockingPort.doors}
                        onClick={() =>
                          action({
                            variables: {
                              port: {
                                id: dockingPort.id,
                                clamps: !dockingPort.clamps
                              }
                            }
                          })
                        }
                      >
                        {!dockingPort || !dockingPort.clamps
                          ? "Attach"
                          : "Detach"}{" "}
                        Docking Clamps
                      </Button>
                    </Fragment>
                  )}
                </Mutation>
              </Col>
              <Col sm={8} className="ship-info">
                <Card>
                  <CardBody>
                    Ship Name:{" "}
                    <strong>
                      {dockingPort && dockingPort.docked
                        ? dockingPort.shipName
                        : "No Ship Present"}
                    </strong>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ flex: 1 }}>
          <img
            src={`/assets${simulator.assets.top}`}
            alt="Ship Top"
            draggable="false"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Row>
        <Tour steps={DockingPorts.trainingSteps} client={clientObj} />
      </Container>
    );
  }
}

export default DockingPorts;
