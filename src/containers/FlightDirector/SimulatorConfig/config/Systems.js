import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ButtonGroup
} from "reactstrap";
import { titleCase, camelCase } from "change-case";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import * as Configs from "./systemsConfig";

const systems = [
  "computerCore",
  "coolant",
  "engine",
  "internalComm",
  "longRangeComm",
  "navigation",
  "phasers",
  "probes",
  "reactor",
  "sensors",
  "shield",
  "shortRangeComm",
  "sickbay",
  "signalJammer",
  "stealthField",
  "targeting",
  "thrusters",
  "thx",
  "torpedo",
  "tractorBeam",
  "transporters"
];

const SYSTEM_QUERY = gql`
  query Systems($simulatorId: ID!) {
    systems(simulatorId: $simulatorId) {
      id
      name
      type
      displayName
    }
  }
`;
const System = ({ id, selected, type, displayName, name, click }) => {
  return (
    <Col
      key={id}
      sm={4}
      onClick={click}
      style={{
        backgroundColor: selected ? "rgba(255,255,255,0.4)" : "transparent",
        borderRadius: "10px"
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundImage: `url('/systems/${camelCase(type)}.png')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      >
        <div style={{ paddingTop: "100%" }} />
      </div>
      <p style={{ textAlign: "center", marginBottom: 0 }}>
        {displayName || name}
      </p>
      {type !== name && (
        <p style={{ textAlign: "center" }}>
          <small>{titleCase(type)}</small>
        </p>
      )}
    </Col>
  );
};
class SystemsConfig extends Component {
  state = {};
  render() {
    const { id } = this.props.selectedSimulator;
    const { addSystem, selectedSystem } = this.state;
    const SystemConfig = selectedSystem
      ? Configs[selectedSystem] || Configs.Generic
      : () => null;
    return (
      <Container fluid style={{ height: "90vh" }}>
        <Row style={{ height: "100%" }}>
          <Col
            sm={5}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <h6>Available Systems</h6>
            <Card
              className="systems-container"
              style={{ height: "40%", overflowY: "auto" }}
            >
              <CardBody>
                <Row>
                  {systems.map(s => (
                    <System
                      key={s.id}
                      id={s}
                      selected={s === addSystem}
                      name={s}
                      displayName={titleCase(s)}
                      type={s}
                      click={() => this.setState({ addSystem: s })}
                    />
                  ))}
                </Row>
              </CardBody>
            </Card>
            <ButtonGroup>
              <Button size="sm" color="danger" disabled={!selectedSystem}>
                Remove System
              </Button>
              <Button size="sm" color="success" disabled={!addSystem}>
                Add System
              </Button>
            </ButtonGroup>
            <h6>Installed Systems</h6>
            <Card
              className="systems-container"
              style={{ height: "40%", overflowY: "auto" }}
            >
              <CardBody>
                <Row>
                  <Query query={SYSTEM_QUERY} variables={{ simulatorId: id }}>
                    {({ data, loading }) => {
                      if (loading) return null;
                      return data.systems.map(s => (
                        <System
                          key={s.id}
                          {...s}
                          selected={s.id === selectedSystem}
                          click={() => this.setState({ selectedSystem: s.id })}
                        />
                      ));
                    }}
                  </Query>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm={7}>
            {selectedSystem && (
              <SystemConfig simulatorId={id} type={selectedSystem} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default SystemsConfig;
