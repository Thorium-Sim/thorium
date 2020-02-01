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
      useAlertColor
      color
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
  const {
    intensity,
    action,
    actionStrength,
    transitionDuration,
    useAlertColor,
    color,
  } = lighting;
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
                bsSize="sm"
                value={action}
                style={{height: "18px"}}
                onChange={e =>
                  update({
                    variables: {
                      id,
                      lighting: {action: e.target.value},
                    },
                  })
                }
              >
                {["normal", "fade", "oscillate", "strobe", "shake"].map(s => (
                  <option key={s} value={s}>
                    {capitalCase(s)}
                  </option>
                ))}
              </Input>
              <label>
                Alert Color{" "}
                <Input
                  type="checkbox"
                  checked={useAlertColor}
                  style={{position: "relative", margin: 0}}
                  onChange={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          color: e.target.checked ? null : "blue",
                        },
                      },
                    })
                  }
                />
              </label>
              <div style={{float: "right"}}>
                <ColorPicker
                  color={color || "#000"}
                  onChangeComplete={finalColor =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          color: finalColor.hex,
                        },
                      },
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
                  color="secondary"
                  size="sm"
                  active={
                    intensity === 1 && action === "normal" && color === null
                  }
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "normal",
                          color: null,
                          intensity: 1,
                        },
                      },
                    })
                  }
                >
                  Normal
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  active={
                    intensity === 1 && action === "normal" && color === "blue"
                  }
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "normal",
                          color: "blue",
                          intensity: 1,
                        },
                      },
                    })
                  }
                >
                  Blue
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  active={
                    intensity === 1 && action === "normal" && color === "red"
                  }
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "normal",
                          color: "red",
                          intensity: 1,
                        },
                      },
                    })
                  }
                >
                  Red
                </Button>
                <Button
                  color="dark"
                  className="black-as-night"
                  size="sm"
                  active={color === "black"}
                  onClick={e =>
                    update({
                      variables: {
                        id,
                        lighting: {
                          action: "normal",
                          color: "black",
                          intensity: 1,
                        },
                      },
                    })
                  }
                >
                  Blackout
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
