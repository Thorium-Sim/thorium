import React, {Component} from "react";
import {css} from "@emotion/core";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
} from "helpers/reactstrap";
import {capitalCase, camelCase} from "change-case";
import {Query, Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import * as Configs from "./systemsConfig";

const systems = [
  "ComputerCore",
  "Coolant",
  "Countermeasures",
  "Crm",
  "Engine",
  "InternalComm",
  "JumpDrive",
  "LongRangeComm",
  "Navigation",
  "Phasers",
  "Probes",
  "Railgun",
  "Reactor",
  "Sensors",
  "Shield1",
  "Shield4",
  "Shield6",
  "ShortRangeComm",
  "Sickbay",
  "SignalJammer",
  "StealthField",
  "SubspaceField",
  "Targeting",
  "Thrusters",
  "Thx",
  "Torpedo",
  "TractorBeam",
  "Transporters",
  "Transwarp",
  "Generic",
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

const System = ({id, selected, type, displayName, name, click, added}) => {
  return (
    <Col
      key={id}
      sm={3}
      onClick={click}
      style={{
        backgroundColor: selected ? "rgba(255,255,255,0.4)" : "transparent",
        borderRadius: "10px",
        opacity: added ? 0.5 : 1,
        pointerEvents: added ? "none" : "all",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundImage: `url('/systems/${camelCase(type)}.png')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div style={{paddingTop: "100%"}} />
      </div>
      <p style={{textAlign: "center", marginBottom: 0}}>
        {displayName || name}
      </p>
      {type !== name && (
        <p style={{textAlign: "center"}}>
          <small>{capitalCase(type)}</small>
        </p>
      )}
    </Col>
  );
};
const reconfigureShields = (num, id) => {
  const shieldNames = ["Fore", "Aft", "Port", "Starboard", "Ventral", "Dorsal"];
  if (num === 1) {
    // Default is sufficient
    return [
      {
        id,
        type: "Shield",
        params: "{}",
      },
    ];
  } else {
    return Array(num)
      .fill("")
      .map((_, i) => ({
        id,
        type: "Shield",
        params: JSON.stringify({
          name: shieldNames[i],
          position: i + 1,
        }),
      }));
  }
};
class SystemsConfig extends Component {
  state = {};
  addSystem = (action, addSystem) => {
    const {id} = this.props.selectedSimulator;
    this.setState({addSystem: null});
    if (addSystem.indexOf("Shield") > -1) {
      // Create based on the shield count
      const num = parseInt(addSystem[addSystem.length - 1], 10);
      return reconfigureShields(num, id).forEach(s => action({variables: s}));
    } else if (addSystem.indexOf("Sensors") > -1) {
      // Create both internal and external sensors
      action({
        variables: {
          id,
          type: "Sensors",
          params: JSON.stringify({domain: "internal"}),
        },
      });
      action({
        variables: {
          id,
          type: "Sensors",
          params: JSON.stringify({domain: "external"}),
        },
      });
      return;
    } else if (addSystem === "Generic") {
      return action({
        variables: {
          id,
          type: "System",
          params: JSON.stringify({name: "Generic"}),
        },
      });
    } else {
      return action({variables: {id, type: addSystem}});
    }
  };
  removeSystem = (action, systems) => () => {
    const {selectedSystem} = this.state;
    const sys = systems.find(s => s.id === selectedSystem);
    if (!sys) return;
    this.setState({selectedSystem: null});
    if (sys.type === "Sensors") {
      return systems
        .filter(s => s.type === "Sensors")
        .forEach(s => action({variables: {id: s.id}}));
    }
    if (sys.type === "Shield") {
      return systems
        .filter(s => s.type === "Shield")
        .forEach(s => action({variables: {id: s.id}}));
    }
    return action({variables: {id: selectedSystem}});
  };
  getAdded(sys, systems) {
    if (sys === "Reactor" || sys === "Torpedo" || sys === "Engine")
      return false;
    return systems.find(s => {
      if (sys.indexOf("Shield") > -1) {
        return s.type === "Shield";
      }
      return s.type === sys;
    });
  }
  render() {
    const {id} = this.props.selectedSimulator;
    const {selectedSystem, selectedType} = this.state;
    const SystemConfig = selectedType
      ? Configs[selectedType] || Configs.Generic
      : () => null;
    return (
      <Container fluid css={{height: "100%"}}>
        <Query query={SYSTEM_QUERY} variables={{simulatorId: id}}>
          {({data, loading}) => {
            if (loading) return null;
            return (
              <Row css={{height: "100%"}}>
                <Col
                  sm={5}
                  css={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <h6>Available Systems</h6>

                  <div
                    css={css`
                      display: flex;
                      * {
                        flex: 1;
                      }
                    `}
                  >
                    <Mutation
                      mutation={gql`
                        mutation AddSystemToSimulator(
                          $id: ID!
                          $type: String!
                          $params: String = "{}"
                        ) {
                          addSystemToSimulator(
                            simulatorId: $id
                            className: $type
                            params: $params
                          )
                        }
                      `}
                      refetchQueries={[
                        {query: SYSTEM_QUERY, variables: {simulatorId: id}},
                      ]}
                    >
                      {action => (
                        <Input
                          type="select"
                          size="sm"
                          className="btn btn-success"
                          value={"select"}
                          onChange={e => this.addSystem(action, e.target.value)}
                        >
                          <option value={"select"} disabled>
                            Add System
                          </option>
                          {systems.map(s => (
                            <option
                              key={s}
                              value={s}
                              disabled={this.getAdded(s, data.systems)}
                            >
                              {capitalCase(s)}
                            </option>
                          ))}
                        </Input>
                      )}
                    </Mutation>
                    <Mutation
                      mutation={gql`
                        mutation RemoveSystem($id: ID!) {
                          removeSystemFromSimulator(systemId: $id)
                        }
                      `}
                      refetchQueries={[
                        {query: SYSTEM_QUERY, variables: {simulatorId: id}},
                      ]}
                    >
                      {action => (
                        <Button
                          size="sm"
                          color="danger"
                          disabled={!selectedSystem}
                          onClick={this.removeSystem(action, data.systems)}
                        >
                          Remove System
                        </Button>
                      )}
                    </Mutation>
                  </div>
                  <h6>Installed Systems</h6>
                  <Card
                    className="systems-container"
                    style={{flex: 1, overflowY: "auto"}}
                  >
                    <CardBody>
                      <Row>
                        {data.systems
                          .concat()
                          .sort((a, b) => {
                            if (a.type > b.type) return 1;
                            if (a.type < b.type) return -1;
                            return 0;
                          })
                          .map(s => (
                            <System
                              key={s.id}
                              {...s}
                              selected={s.id === selectedSystem}
                              click={() =>
                                this.setState({
                                  selectedSystem: s.id,
                                  selectedType: s.type,
                                })
                              }
                            />
                          ))}
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm={7}>
                  {selectedSystem && (
                    <SystemConfig simulatorId={id} id={selectedSystem} />
                  )}
                </Col>
              </Row>
            );
          }}
        </Query>
      </Container>
    );
  }
}
export default SystemsConfig;
