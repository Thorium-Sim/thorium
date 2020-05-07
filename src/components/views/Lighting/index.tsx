import React from "react";
import {
  ButtonGroup,
  Button,
  Row,
  Container,
  Col,
  Input,
} from "helpers/reactstrap";
import "./style.scss";
import {
  Simulator,
  useLightingControlSubscription,
  useUpdateLightingMutation,
  useShakeLightsMutation,
  useLightingSetEffectMutation,
  useLightingSetIntensityMutation,
  Lighting_Action,
  useDmxConfigsSubscription,
} from "generated/graphql";

export const LightingOptions = () => (
  <>
    <option value="normal">Normal</option>
    <option value="darken">Darken</option>
    <option value="blackout">Blackout</option>
    <option value="work">Work</option>
    <hr />
    <option value="fade">Fade</option>
    <option value="oscillate">Oscillate</option>
    <option value="strobe">Strobe</option>
    <option value="shake">Shake</option>
  </>
);

const LightingCore: React.FC<{simulator: Simulator}> = ({simulator: {id}}) => {
  const {data} = useLightingControlSubscription({variables: {simulatorId: id}});
  const {data: dmxConfigsData} = useDmxConfigsSubscription();
  const [update] = useUpdateLightingMutation();
  const [shake] = useShakeLightsMutation();
  const [setEffect] = useLightingSetEffectMutation();
  const [setIntensity] = useLightingSetIntensityMutation();

  const {intensity, action, actionStrength, transitionDuration, dmxConfig} =
    data?.simulatorsUpdate?.[0]?.lighting || {};
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
              setEffect({
                variables: {
                  simulatorId: id,
                  effect: e.target.value as Lighting_Action,
                  duration: transitionDuration || 1000,
                },
              })
            }
          >
            <LightingOptions />
          </Input>
          <Input
            type="select"
            value={dmxConfig?.id || "default"}
            onChange={e =>
              update({
                variables: {
                  id,
                  lighting: {dmxConfig: e.target.value},
                },
              })
            }
          >
            <option value={"default"}>Default</option>
            {dmxConfigsData?.dmxConfigs.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Input>
        </Col>
        <Col sm={4}>
          <div>Effect Strength</div>
          <ButtonGroup>
            <Button
              size="sm"
              color="info"
              active={actionStrength === 0.2}
              onClick={() =>
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
              onClick={() =>
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
              onClick={() =>
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
              onClick={() =>
                update({
                  variables: {
                    id,
                    lighting: {
                      action: Lighting_Action.Fade,
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
              onClick={() =>
                update({
                  variables: {
                    id,
                    lighting: {
                      action: Lighting_Action.Fade,
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
              onChange={e => setIntensityLabel(parseFloat(e.target.value))}
              onMouseUp={(e: any) =>
                setIntensity({
                  variables: {
                    simulatorId: id,
                    intensity: parseFloat(e.target.value),
                  },
                })
              }
            />
          </div>
          <div>
            <label>
              Duration: {Math.round((transitionDurationLabel || 0) / 100) / 10}s
            </label>
            <Input
              type="range"
              min="500"
              max={20 * 1000}
              step="1"
              defaultValue={transitionDuration}
              onChange={e =>
                setTransitionDurationLabel(parseFloat(e.target.value))
              }
              onMouseUp={(e: any) =>
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
              onClick={() =>
                update({
                  variables: {
                    id,
                    lighting: {
                      action: Lighting_Action.Normal,
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
              active={intensity === 0.3}
              onClick={() =>
                update({
                  variables: {
                    id,
                    lighting: {
                      action: Lighting_Action.Darken,
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
              onClick={() =>
                update({
                  variables: {
                    id,
                    lighting: {
                      action: Lighting_Action.Blackout,
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
              onClick={() =>
                update({
                  variables: {
                    id,
                    lighting: {
                      action: Lighting_Action.Work,
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
              onClick={() =>
                shake({variables: {simulatorId: id, duration: 5 * 1000}})
              }
            >
              Short
            </Button>
            <Button
              size="sm"
              onClick={() =>
                shake({variables: {simulatorId: id, duration: 15 * 1000}})
              }
            >
              Long
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default LightingCore;
