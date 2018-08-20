import React from "react";
import { ButtonGroup, Button, Row, Container, Col, Input } from "reactstrap";
import { titleCase } from "change-case";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import ColorPicker from "../../../helpers/colorPicker";

const queryData = `
id
lighting {
  intensity
  action
  actionStrength
  transitionDuration
  useAlertColor
  color
}`;
const QUERY = gql`
query Lighting($id: String!) {
  simulators(id: $id) {
    ${queryData}
  }
}
`;
const SUBSCRIPTION = gql`
        subscription SimulatorsUpdate($id:ID!) {
  simulatorsUpdate(simulatorId:$id) {
    ${queryData}
  }
}
`;

const LightingCore = ({ clients, simulator: { id } }) => {
  const ecsClient = clients.find(
    c => c.id.indexOf("ECS") === 0 && c.simulator && c.simulator.id === id
  );
  if (!ecsClient) return null;
  return (
    <Query query={QUERY} variables={{ id }}>
      {({ loading, data: { simulators }, subscribeToMore }) => {
        if (loading) return null;
        const [simulator] = simulators;
        if (!simulator) return "No Simulator";
        const {
          intensity,
          action,
          actionStrength,
          transitionDuration,
          useAlertColor,
          color
        } = simulator.lighting;
        console.log(useAlertColor, color);
        return (
          <Mutation
            mutation={gql`
              mutation UpdateLighting($id: ID!, $lighting: LightingInput!) {
                updateSimulatorLighting(id: $id, lighting: $lighting)
              }
            `}
          >
            {update => (
              <Container fluid className="lighting">
                <SubscriptionHelper
                  subscribe={() =>
                    subscribeToMore({
                      document: SUBSCRIPTION,
                      variables: { id },
                      updateQuery: (previousResult, { subscriptionData }) => {
                        return Object.assign({}, previousResult, {
                          simulators: subscriptionData.data.simulatorsUpdate
                        });
                      }
                    })
                  }
                />
                <div
                  style={{
                    right: "10px",
                    position: "absolute"
                  }}
                >
                  Lighting
                </div>

                <Row>
                  <Col sm={4}>
                    <div>Mode</div>
                    <Input
                      type="select"
                      bsSize="sm"
                      value={action}
                      style={{ height: "18px" }}
                      onChange={e =>
                        update({
                          variables: {
                            id,
                            lighting: { action: e.target.value }
                          }
                        })
                      }
                    >
                      {["normal", "fade", "oscillate", "strobe", "shake"].map(
                        s => (
                          <option key={s} value={s}>
                            {titleCase(s)}
                          </option>
                        )
                      )}
                    </Input>
                    <label>
                      Alert Color{" "}
                      <Input
                        type="checkbox"
                        checked={useAlertColor}
                        style={{ position: "relative", margin: 0 }}
                        onChange={e =>
                          update({
                            variables: {
                              id,
                              lighting: {
                                color: e.target.checked ? null : "blue"
                              }
                            }
                          })
                        }
                      />
                    </label>
                    <div style={{ float: "right" }}>
                      <ColorPicker
                        color={color || "#000"}
                        onChangeComplete={finalColor =>
                          update({
                            variables: {
                              id,
                              lighting: {
                                color: finalColor.hex
                              }
                            }
                          })
                        }
                      />
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div>Effect Strength</div>
                    <ButtonGroup>
                      <Button
                        size="sm"
                        color="info"
                        active={actionStrength === 0.2}
                        onClick={e =>
                          update({
                            variables: { id, lighting: { actionStrength: 0.2 } }
                          })
                        }
                      >
                        Low
                      </Button>
                      <Button
                        size="sm"
                        color="warning"
                        active={actionStrength === 0.5}
                        onClick={e =>
                          update({
                            variables: { id, lighting: { actionStrength: 0.5 } }
                          })
                        }
                      >
                        Mid
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        active={actionStrength === 1}
                        onClick={e =>
                          update({
                            variables: { id, lighting: { actionStrength: 1 } }
                          })
                        }
                      >
                        High
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button
                        size="sm"
                        color="default"
                        onClick={e =>
                          update({
                            variables: {
                              id,
                              lighting: {
                                action: "fade",
                                intensity: 0
                              }
                            }
                          })
                        }
                      >
                        Fade Down
                      </Button>
                      <Button
                        size="sm"
                        color="default"
                        onClick={e =>
                          update({
                            variables: {
                              id,
                              lighting: {
                                action: "fade",
                                intensity: 1
                              }
                            }
                          })
                        }
                      >
                        Fade Up
                      </Button>
                    </ButtonGroup>
                  </Col>
                  <Col sm={4}>
                    <div>
                      <label>Intensity</label>
                      <Input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={intensity}
                        onChange={e =>
                          update({
                            variables: {
                              id,
                              lighting: {
                                intensity: parseFloat(e.target.value)
                              }
                            }
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>
                        Fade/Shake Duration:{" "}
                        {Math.round(transitionDuration / 100) / 10}s
                      </label>
                      <Input
                        type="range"
                        min="500"
                        max={20 * 1000}
                        step="1"
                        value={transitionDuration}
                        onChange={e =>
                          update({
                            variables: {
                              id,
                              lighting: {
                                transitionDuration: parseInt(e.target.value, 10)
                              }
                            }
                          })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <div>Presets</div>
                    <ButtonGroup>
                      <Button
                        color="secondary"
                        size="sm"
                        active={
                          intensity === 1 &&
                          action === "normal" &&
                          color === null
                        }
                        onClick={e =>
                          update({
                            variables: {
                              id,
                              lighting: {
                                action: "normal",
                                color: null,
                                intensity: 1
                              }
                            }
                          })
                        }
                      >
                        Normal
                      </Button>
                      <Button
                        color="primary"
                        size="sm"
                        active={
                          intensity === 1 &&
                          action === "normal" &&
                          color === "blue"
                        }
                        onClick={e =>
                          update({
                            variables: {
                              id,
                              lighting: {
                                action: "normal",
                                color: "blue",
                                intensity: 1
                              }
                            }
                          })
                        }
                      >
                        Blue
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        active={
                          intensity === 1 &&
                          action === "normal" &&
                          color === "red"
                        }
                        onClick={e =>
                          update({
                            variables: {
                              id,
                              lighting: {
                                action: "normal",
                                color: "red",
                                intensity: 1
                              }
                            }
                          })
                        }
                      >
                        Red
                      </Button>
                      <Button
                        color="dark"
                        size="sm"
                        active={intensity === 0}
                        onClick={e =>
                          update({
                            variables: {
                              id,
                              lighting: { action: "normal", intensity: 0 }
                            }
                          })
                        }
                      >
                        Blackout
                      </Button>
                    </ButtonGroup>
                    Shake:
                    <ButtonGroup>
                      <Button
                        size="sm"
                        color="default"
                        onClick={e =>
                          update({
                            variables: {
                              id,
                              lighting: {
                                action: "shake",
                                transitionDuration: 5 * 1000
                              }
                            }
                          })
                        }
                      >
                        Short
                      </Button>
                      <Button
                        size="sm"
                        color="default"
                        onClick={e =>
                          update({
                            variables: {
                              id,
                              lighting: {
                                action: "shake",
                                transitionDuration: 15 * 1000
                              }
                            }
                          })
                        }
                      >
                        Long
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Container>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default LightingCore;
