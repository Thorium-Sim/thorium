import React from "react";
import {
  ButtonGroup,
  Button,
  Row,
  Container,
  Col,
  Input,
} from "helpers/reactstrap";
import {capitalCase} from "change-case";
import {Query, Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import ColorPicker from "helpers/colorPicker";
import "./style.scss";

const fragment = gql`
  fragment LightingData on Simulator {
    id
    lighting {
      intensity
      action
      actionStrength
      transitionDuration
    }
  }
`;
export const LIGHTING_QUERY = gql`
  query Lighting($simulatorId: ID!) {
    simulators(id: $simulatorId) {
      ...LightingData
    }
  }
  ${fragment}
`;
export const LIGHTING_SUB = gql`
  subscription SimulatorsUpdate($simulatorId: ID!) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      ...LightingData
    }
  }
  ${fragment}
`;

const LightingCore = ({simulator: {lighting, id}}) => {
  const {intensity, action, actionStrength, transitionDuration} = lighting;
  const [transitionDurationLabel, setTransitionDurationLabel] = React.useState(
    transitionDuration,
  );
  const [intensityLabel, setIntensityLabel] = React.useState(intensity);
  React.useEffect(() => {
    setTransitionDurationLabel(transitionDuration);
  }, [transitionDuration]);
  React.useEffect(() => {
    setIntensityLabel(intensity);
  }, [intensity]);
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
          <div
            style={{
              right: "10px",
              position: "absolute",
            }}
          >
            Lighting
          </div>

          <Row>
            <Col sm={4}>
              <div>Mode</div>
              <Input
                type="select"
                value={action}
                onChange={e =>
                  update({
                    variables: {
                      id,
                      lighting: {action: e.target.value},
                    },
                  })
                }
              >
                <option value="normal">Normal</option>
                <option value="darken">Darken</option>
                <option value="blackout">Blackout</option>
                <option value="work">Work</option>
                <hr />
                <option value="fade">Fade</option>
                <option value="oscillate">Oscillate</option>
                <option value="strobe">Strobe</option>
                <option value="shake">Shake</option>
              </Input>
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
                      variables: {id, lighting: {actionStrength: 0.2}},
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
                      variables: {id, lighting: {actionStrength: 0.5}},
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
                      variables: {id, lighting: {actionStrength: 1}},
                    })
                  }
                >
                  High
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button
                  size="sm"
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "fade",
                          intensity: 0,
                        },
                      },
                    })
                  }
                >
                  Fade Down
                </Button>
                <Button
                  size="sm"
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "fade",
                          intensity: 1,
                        },
                      },
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
                  value={intensityLabel}
                  onChange={e => setIntensityLabel(e.target.value)}
                  onMouseUp={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          intensity: parseFloat(e.target.value),
                        },
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>
                  Duration: {Math.round(transitionDurationLabel / 100) / 10}s
                </label>
                <Input
                  type="range"
                  min="500"
                  max={20 * 1000}
                  step="1"
                  defaultValue={transitionDuration}
                  onChange={e => setTransitionDurationLabel(e.target.value)}
                  onMouseUp={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          transitionDuration: parseInt(e.target.value, 10),
                        },
                      },
                    })
                  }
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <ButtonGroup>
                <Button
                  color="info"
                  size="sm"
                  active={intensity === 1 && action === "normal"}
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "normal",
                          intensity: 1,
                        },
                      },
                    })
                  }
                >
                  Normal
                </Button>
                <Button
                  color="secondary"
                  size="sm"
                  active={intensity === 1 && action === "darken"}
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "darken",
                          intensity: 1,
                        },
                      },
                    })
                  }
                >
                  Darken
                </Button>

                <Button
                  color="dark"
                  className="black-as-night"
                  size="sm"
                  active={action === "blackout"}
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "blackout",
                          intensity: 1,
                        },
                      },
                    })
                  }
                >
                  Blackout
                </Button>
                <Button
                  color="light"
                  size="sm"
                  active={action === "work"}
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "work",
                          intensity: 1,
                        },
                      },
                    })
                  }
                >
                  Work
                </Button>
              </ButtonGroup>
            </Col>
            <Col sm={4}>
              Shake:
              <ButtonGroup>
                <Button
                  size="sm"
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "shake",
                          transitionDuration: 5 * 1000,
                        },
                      },
                    })
                  }
                >
                  Short
                </Button>
                <Button
                  size="sm"
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "shake",
                          transitionDuration: 15 * 1000,
                        },
                      },
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
};
const LightingCoreData = ({clients, simulator: {id}}) => {
  return (
    <Query query={LIGHTING_QUERY} variables={{simulatorId: id}}>
      {({loading, data, error, subscribeToMore}) => {
        if (loading || !data) return null;
        const {simulators} = data;
        const [simulator] = simulators;
        if (!simulator) return "No Simulator";
        return (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: LIGHTING_SUB,
                variables: {simulatorId: id},
                updateQuery: (previousResult, {subscriptionData}) => {
                  return Object.assign({}, previousResult, {
                    simulators: subscriptionData.data.simulatorsUpdate,
                  });
                },
              })
            }
          >
            <LightingCore simulator={simulator} />
          </SubscriptionHelper>
        );
      }}
    </Query>
  );
};

export default LightingCoreData;
