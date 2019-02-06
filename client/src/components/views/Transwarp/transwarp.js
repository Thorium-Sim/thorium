import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import PowerLine from "../JumpDrive/powerLine";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Tour from "helpers/tourHelper";
import HeatBar from "../EngineControl/heatbar";
class Transwarp extends Component {
  state = {};
  trainingSteps = () => {
    const { name, displayName } = this.props;
    const sysName = displayName || name;
    return [
      {
        selector: ".selector",
        content: `The ${sysName} is a propulsion device capable of propelling a ship at ultra-luminary speeds. It does this by encasing the ship in several layers of subspace and quantum waves. While dangerous to operate, it will allow your ship to traverse vast distances in a very short period of time. While it is activated, you must carefully monitor the power levels to ensure they are properly aligned.`
      },
      {
        selector: ".power-bars",
        content: `Each quadrant of the ship has three sets of power levels that must be maintained. Adjust the power levels by dragging the gray or green bars left or right until they are at the desired level. The yellow line represents the level the power must be at for the ${sysName} to be stable.`
      },
      {
        selector: ".power",
        content: `You can see the power used, the power required, and the power provided to you here. Make sure the power used and the power required are always balanced. If you don't have sufficient power available, you can ask the person in charge of power distribution to allocate more power to the ${sysName}`
      },
      {
        selector: ".activate",
        content: `Click this button to activate or deactivate the ${sysName}. You can only activate it when the power levels are properly balanced.`
      },
      {
        selector: ".transwarp-heat",
        content: `The ${sysName} produces a lot of heat while activated. Make sure it does not overheat by regularly flushing coolant through the system.`
      }
    ];
  };
  applyCoolant = () => {
    const { id } = this.props;
    const mutation = gql`
      mutation CoolEngine($id: ID!, $state: Boolean) {
        engineCool(id: $id, state: $state)
      }
    `;
    const variables = {
      id,
      state: true
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    document.addEventListener("mouseup", this.stopCoolant);
    document.addEventListener("touchend", this.stopCoolant);
  };
  stopCoolant = () => {
    const { id } = this.props;
    const mutation = gql`
      mutation CoolEngine($id: ID!, $state: Boolean) {
        engineCool(id: $id, state: $state)
      }
    `;
    const variables = {
      id: id,
      state: false
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      simulator: { assets },
      id,
      quad1,
      quad2,
      quad3,
      quad4,
      power,
      active,
      heat,
      coolant,
      clientObj
    } = this.props;
    const { dragPower, dragQuad, dragField } = this.state;
    const requiredPower = Object.values({ quad1, quad2, quad3, quad4 })
      .map(q =>
        Object.values(q).reduce(
          (prev, next) => prev + parseInt(next.required, 10),
          0
        )
      )
      .reduce((prev, next) => prev + parseInt(next, 10), 0);
    const usedPower = Object.values({ quad1, quad2, quad3, quad4 })
      .map(q =>
        Object.values(q).reduce(
          (prev, next) => prev + parseInt(next.value, 10),
          0
        )
      )
      .reduce(
        (prev, next) => prev + parseInt(next, 10),
        dragPower ? dragPower - this.props[dragQuad][dragField].value : 0
      );
    // Power total is current power level divided by the max power level times 300
    const powerTotal =
      (power.power / power.powerLevels[power.powerLevels.length - 1]) * 300;
    return (
      <div className="card-transwarp">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={`quad-${i}`} className={`quad quad${i + 1}`}>
              <ListGroup className="power-bars">
                <ListGroupItem active>
                  <strong>Quadrant {i + 1}</strong>
                </ListGroupItem>
                <ListGroupItem>
                  {[
                    { key: "field", label: "E.M. Field" },
                    { key: "core", label: "Transwarp Core" },
                    { key: "warp", label: "Warp Field" }
                  ].map(v => (
                    <Mutation
                      mutation={gql`
                        mutation TranswarpPower(
                          $id: ID!
                          $quad: String!
                          $field: String!
                          $value: Int!
                        ) {
                          setTranswarpSectorValue(
                            id: $id
                            quad: $quad
                            field: $field
                            value: $value
                          )
                        }
                      `}
                      key={`quad-${i}-${v.key}`}
                    >
                      {action => (
                        <PowerLine
                          powerLevels={[
                            this.props[`quad${i + 1}`][v.key].required
                          ]}
                          maxPower={25}
                          onChanging={value =>
                            this.setState({
                              dragPower: value,
                              dragQuad: `quad${i + 1}`,
                              dragField: v.key
                            })
                          }
                          onChange={value => {
                            action({
                              variables: {
                                id,
                                quad: `quad${i + 1}`,
                                field: v.key,
                                value
                              }
                            }).then(() => {
                              this.setState({ dragPower: 0 });
                            });
                          }}
                          topPower={25}
                          label={v.label}
                          power={this.props[`quad${i + 1}`][v.key].value}
                        />
                      )}
                    </Mutation>
                  ))}
                </ListGroupItem>
              </ListGroup>
            </div>
          ))}
        <div className="ship">
          <img src={`/assets${assets.top}`} alt="Ship Top" />
        </div>
        <div className="power">
          <h1>Power Used: {usedPower}</h1>
          <h1>
            Power Required:{" "}
            <span className={usedPower !== requiredPower ? "text-danger" : ""}>
              {requiredPower}
            </span>
          </h1>
          <h1>Power Available: {powerTotal}</h1>
        </div>
        <div className="transwarp-heat">
          <div className="heat-bars">
            <div>
              <HeatBar
                label="Heat"
                background="linear-gradient(to bottom, #440000 0%,#aa0000 50%,#440000 100%)"
                level={heat}
              />
            </div>
            <div>
              <HeatBar
                label="Coolant"
                background="linear-gradient(to bottom, #004488 0%,#0088aa 50%,#004488 100%)"
                level={coolant}
              />
            </div>
          </div>
          <Button
            block
            color="info"
            onMouseDown={this.applyCoolant}
            onTouchStart={this.applyCoolant}
          >
            Coolant
          </Button>
        </div>
        <div className="activate">
          <Mutation
            mutation={gql`
              mutation TranswarpActivate($id: ID!, $active: Boolean!) {
                setTranswarpActive(id: $id, active: $active)
              }
            `}
            variables={{ id, active: !active }}
          >
            {action => (
              <Button
                block
                color="danger"
                size="lg"
                disabled={!active && usedPower !== requiredPower}
                style={{ fontSize: "24px", fontWeight: 800 }}
                onClick={action}
              >
                {active ? "Deactivate" : "Activate"}
              </Button>
            )}
          </Mutation>
        </div>
        <Tour steps={this.trainingSteps()} client={clientObj} />
      </div>
    );
  }
}
export default Transwarp;
