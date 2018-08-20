import React from "react";
import { ButtonGroup, Button, Row, Container, Col, Input } from "reactstrap";
import { titleCase } from "change-case";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const LightingCore = ({ clients, simulator: { id } }) => {
  const duration = 1000;
  const ecsClient = clients.find(
    c => c.id.indexOf("ECS") === 0 && c.simulator && c.simulator.id === id
  );
  if (!ecsClient) return null;
  return (
    <Query
      query={gql`
        query Lighting($id: String!) {
          simulators(id: $id) {
            id
            lighting {
              intensity
              action
              actionStrength
              transitionDuration
              color
            }
          }
        }
      `}
      variables={{ id }}
    >
      {({ loading, data: { simulators } }) => {
        if (loading) return null;
        const [simulator] = simulators;
        if (!simulator) return "No Simulator";
        const {
          intensity,
          action,
          actionStrength,
          transitionDuration,
          color
        } = simulator.lighting;
        return (
          <Container fluid className="lighting">
            <div>Lighting</div>

            <Row>
              <Col sm={4}>
                <div>Mode</div>
                <Input type="select" bsSize="sm" value={action}>
                  {["normal", "oscillate", "strobe", "shake"].map(s => (
                    <option key={s} value={s}>
                      {titleCase(s)}
                    </option>
                  ))}
                </Input>
                <label>
                  Alert Color{" "}
                  <Input type="checkbox" checked={color === "null"} />
                </label>
              </Col>
              <Col sm={4}>
                <div>Effect Strength</div>
                <ButtonGroup>
                  <Button
                    size="sm"
                    color="info"
                    active={actionStrength === 0.2}
                  >
                    Low
                  </Button>
                  <Button
                    size="sm"
                    color="warning"
                    active={actionStrength === 0.5}
                  >
                    Mid
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    active={actionStrength === 1}
                  >
                    High
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button size="sm" color="default">
                    Fade Down
                  </Button>
                  <Button size="sm" color="default">
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
                    defaultValue={intensity}
                  />
                </div>
                <div>
                  <label>
                    Fade Duration: {Math.round(duration / 100) / 10}s
                  </label>
                  <Input
                    type="range"
                    min="0"
                    max={10 * 1000}
                    step="0.01"
                    defaultValue={transitionDuration}
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
                      intensity === 1 && action === "normal" && color === null
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
                  >
                    Blue
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    active={
                      intensity === 1 && action === "normal" && color === "red"
                    }
                  >
                    Red
                  </Button>
                  <Button color="dark" size="sm" active={intensity === 0}>
                    Blackout
                  </Button>
                </ButtonGroup>
                Shake:
                <ButtonGroup>
                  <Button size="sm" color="default">
                    Short
                  </Button>
                  <Button size="sm" color="default">
                    Long
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Container>
        );
      }}
    </Query>
  );
};

export default LightingCore;
