import React from "react";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag.macro";
import { Query, Mutation } from "react-apollo";
import { Input, FormGroup, Label, Row, Col, Button } from "helpers/reactstrap";
import FontAwesome from "react-fontawesome";

const REACTOR_QUERY = gql`
  query Reactor($id: ID!) {
    reactor(id: $id) {
      id
      model
      powerOutput
      batteryChargeRate
      requireBalance
      efficiencies {
        label
        color
        efficiency
      }
    }
  }
`;

const colors = [
  { label: "Blue", value: "primary" },
  { label: "Purple", value: "cloak" },
  { label: "Gray", value: "default" },
  { label: "Light Blue", value: "info" },
  { label: "Yellow", value: "warning" },
  { label: "Red", value: "danger" },
  { label: "Green", value: "success" }
];
const Reactor = props => {
  const { id } = props;
  const updateEfficiencies = (action, reactor, i, key) => evt => {
    action({
      variables: {
        id: reactor.id,
        efficiencies: reactor.efficiencies.map(({ __typename, ...e }, ind) =>
          ind === i
            ? {
                ...e,
                [key]: isNaN(parseFloat(evt.target.value))
                  ? !evt.target.value
                    ? null
                    : evt.target.value
                  : parseFloat(evt.target.value)
              }
            : e
        )
      }
    });
  };
  const removeEfficiency = (action, reactor, i) => () => {
    action({
      variables: {
        id: reactor.id,
        efficiencies: reactor.efficiencies
          .filter((_, ind) => ind !== i)
          .map(({ __typename, ...e }) => e)
      }
    });
  };
  const addEfficiency = (action, reactor) => () => {
    action({
      variables: {
        id: reactor.id,
        efficiencies: reactor.efficiencies
          .map(({ __typename, ...e }) => e)
          .concat({
            label: "Efficiency",
            color: "default",
            efficiency: 0.5
          })
      }
    });
  };
  return (
    <GenericSystemConfig {...props}>
      <Query query={REACTOR_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return null;
          const { reactor } = data;
          return (
            <div>
              <FormGroup>
                <Label>Model</Label>
                <Mutation
                  mutation={gql`
                    mutation ReactorModel($id: ID!, $model: String!) {
                      reactorChangeModel(id: $id, model: $model)
                    }
                  `}
                  refetchQueries={[{ query: REACTOR_QUERY, variables: { id } }]}
                >
                  {action => (
                    <Input
                      type="select"
                      value={reactor.model}
                      onChange={e =>
                        action({ variables: { id, model: e.target.value } })
                      }
                    >
                      <option value="reactor">Reactor</option>
                      <option value="battery">Battery</option>
                    </Input>
                  )}
                </Mutation>
              </FormGroup>
              {reactor.model === "reactor" ? (
                <FormGroup>
                  <Label>
                    Reactor Output
                    <Mutation
                      mutation={gql`
                        mutation UpdateReactorOutput($id: ID!, $output: Int!) {
                          reactorChangeOutput(id: $id, output: $output)
                        }
                      `}
                      refetchQueries={[
                        { query: REACTOR_QUERY, variables: { id } }
                      ]}
                    >
                      {action => (
                        <Input
                          type="number"
                          defaultValue={reactor.powerOutput}
                          onChange={evt =>
                            action({
                              variables: {
                                id,
                                output: parseInt(evt.target.value, 10)
                              }
                            })
                          }
                        />
                      )}
                    </Mutation>
                  </Label>
                  <Label style={{ marginLeft: "30px" }}>
                    <Mutation
                      mutation={gql`
                        mutation RequireBalance($id: ID!, $balance: Boolean!) {
                          reactorRequireBalance(id: $id, balance: $balance)
                        }
                      `}
                      refetchQueries={[
                        { query: REACTOR_QUERY, variables: { id } }
                      ]}
                    >
                      {action => (
                        <Input
                          type="checkbox"
                          defaultChecked={reactor.requireBalance}
                          onChange={evt =>
                            action({
                              variables: { id, balance: evt.target.checked }
                            })
                          }
                        />
                      )}
                    </Mutation>
                    Warn crew of Unbalanced Power
                  </Label>
                  <Mutation
                    mutation={gql`
                      mutation UpdateEfficiencies(
                        $id: ID!
                        $efficiencies: [ReactorEfficiencyInput]!
                      ) {
                        setReactorEffciciencies(
                          id: $id
                          efficiencies: $efficiencies
                        )
                      }
                    `}
                    refetchQueries={[
                      { query: REACTOR_QUERY, variables: { id } }
                    ]}
                  >
                    {action => (
                      <div>
                        <Label>Efficiencies</Label>
                        <Row>
                          <Col sm="4">Name</Col>
                          <Col sm="4">Color</Col>
                          <Col sm="4">
                            Efficiency (0 - 1), Blank for external power
                          </Col>
                        </Row>
                        {reactor.efficiencies.map((e, i) => (
                          <Row key={`${reactor.id}-${i}-${e.label}-${e.color}`}>
                            <Col sm={4}>
                              <Input
                                type="text"
                                defaultValue={e.label}
                                onBlur={updateEfficiencies(
                                  action,
                                  reactor,
                                  i,
                                  "label"
                                )}
                              />
                            </Col>
                            <Col sm={3}>
                              <Input
                                type="select"
                                defaultValue={e.color}
                                onChange={updateEfficiencies(
                                  action,
                                  reactor,
                                  i,
                                  "color"
                                )}
                              >
                                {colors.map(c => (
                                  <option key={c.value} value={c.value}>
                                    {c.label}
                                  </option>
                                ))}
                              </Input>
                            </Col>
                            <Col sm={4}>
                              <Input
                                type="number"
                                defaultValue={e.efficiency}
                                onBlur={updateEfficiencies(
                                  action,
                                  reactor,
                                  i,
                                  "efficiency"
                                )}
                              />
                            </Col>
                            <Col sm={1}>
                              <FontAwesome
                                name="ban"
                                className="text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={removeEfficiency(action, reactor, i)}
                              />
                            </Col>
                          </Row>
                        ))}
                        <Button
                          color="success"
                          onClick={addEfficiency(action, reactor)}
                        >
                          Add Efficiency
                        </Button>
                      </div>
                    )}
                  </Mutation>
                </FormGroup>
              ) : (
                <FormGroup>
                  <Label>
                    Battery Charge Rate
                    <small>{` Numbers < 1 are slow, > 1 are fast, < 0 are reverse`}</small>
                    <Mutation
                      mutation={gql`
                        mutation BatteryChargeRate($id: ID!, $rate: Float!) {
                          reactorBatteryChargeRate(id: $id, rate: $rate)
                        }
                      `}
                      refetchQueries={[
                        { query: REACTOR_QUERY, variables: { id } }
                      ]}
                    >
                      {action => (
                        <Input
                          type="number"
                          defaultValue={reactor.batteryChargeRate * 1000}
                          onChange={evt =>
                            action({
                              variables: {
                                id,
                                rate: (parseFloat(evt.target.value) || 0) / 1000
                              }
                            })
                          }
                        />
                      )}
                    </Mutation>
                  </Label>
                </FormGroup>
              )}
            </div>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};
export default Reactor;
