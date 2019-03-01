import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo, Mutation } from "react-apollo";
import { Table, Button } from "reactstrap";
import { InputField, OutputField } from "../../generic/core";
import SubscriptionHelper from "helpers/subscriptionHelper";

const fragment = gql`
  fragment ReactorData on Reactor {
    id
    type
    model
    efficiency
    displayName
    powerOutput
  }
`;
const REACTOR_SUB = gql`
  subscription ReactorsUpdate($simulatorId: ID!) {
    reactorUpdate(simulatorId: $simulatorId) {
      ...ReactorData
    }
  }
  ${fragment}
`;

const SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId) {
      id
      name
      displayName
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
        destroyed
        which
      }
      simulatorId
      type
    }
  }
`;

const options = [
  { key: "destroy", title: "Destroy" },
  { key: "rnd", title: "R&D" },
  { key: "engineering", title: "Engineering" }
];
class DamageControlCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      room: null
    };
  }
  systemStyle(sys) {
    const obj = {
      listStyle: "none",
      cursor: "pointer"
    };
    if (
      sys.power &&
      sys.power.powerLevels &&
      sys.power.powerLevels.length > 0 &&
      !sys.power.powerLevels.find(p => p <= sys.power.power)
    ) {
      obj.color = "#888";
    }
    if (sys.damage.damaged) {
      obj.color = "red";
    }
    if (!sys.name) {
      obj.color = "purple";
    }
    if (sys.damage.which === "rnd") {
      obj.color = "orange";
    }
    if (sys.damage.which === "engineering") {
      obj.color = "rgb(0,128,255)";
    }
    if (sys.damage.destroyed) {
      obj.color = "black";
      obj.textShadow = "0px 0px 1px rgba(255,255,255,1)";
    }
    return obj;
  }
  systemName(sys) {
    if (sys.type === "Shield") {
      return `${sys.name} Shields`;
    }
    return sys.displayName || sys.name;
  }
  setPower(system, power) {
    const mutation = gql`
      mutation SetPower($systemId: ID!, $power: Int!) {
        changePower(systemId: $systemId, power: $power)
      }
    `;
    const variables = {
      systemId: system.id,
      power
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  setPowerOutput = output => {
    if ((!output || !parseFloat(output)) && output !== "0") return;
    const reactor = this.props.data.reactors.find(r => r.model === "reactor");
    const mutation = gql`
      mutation ReactorPowerLevel($id: ID!, $output: Int!) {
        reactorChangeOutput(id: $id, output: $output)
      }
    `;
    const variables = {
      id: reactor.id,
      output: parseInt(output, 10)
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  toggleDamage = (e, system, destroyed = false, which) => {
    e.preventDefault();
    const variables = {
      systemId: system.id,
      destroyed,
      which
    };
    let mutation;
    if (system.damage.damaged) {
      // Fix it
      mutation = gql`
        mutation RepairSystem($systemId: ID!) {
          repairSystem(systemId: $systemId)
        }
      `;
    } else {
      // Break it
      mutation = gql`
        mutation DamageSystem(
          $systemId: ID!
          $destroyed: Boolean
          $which: String
        ) {
          damageSystem(
            systemId: $systemId
            destroyed: $destroyed
            which: $which
          )
        }
      `;
    }
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setContext = (e, s) => {
    e.preventDefault();
    this.setState({
      context: {
        system: s,
        x: e.clientX,
        y: e.clientY
      }
    });
    //this.toggleDamage(e, s, true)
  };
  damageOption = (e, option) => {
    const { system } = this.state.context;
    if (option === "destroy") {
      this.toggleDamage(e, system, true);
    } else {
      this.toggleDamage(e, system, false, option);
    }
    this.setState({ context: null });
  };
  render() {
    if (
      this.props.data.loading ||
      !this.props.data.systems ||
      !this.props.data.reactors
    )
      return null;
    const reactor = this.props.data.reactors.find(r => r.model === "reactor");
    return (
      <Mutation
        mutation={gql`
          mutation FluxPower($id: ID, $all: Boolean, $simulatorId: ID) {
            fluxSystemPower(id: $id, all: $all, simulatorId: $simulatorId)
          }
        `}
        variables={{ simulatorId: this.props.simulator.id }}
      >
        {action => (
          <div onMouseLeave={() => this.setState({ context: null })}>
            <Table size="sm" hover>
              <SubscriptionHelper
                subscribe={() =>
                  this.props.data.subscribeToMore({
                    document: SYSTEMS_SUB,
                    variables: {
                      simulatorId: this.props.simulator.id
                    },
                    updateQuery: (previousResult, { subscriptionData }) => {
                      return Object.assign({}, previousResult, {
                        systems: subscriptionData.data.systemsUpdate
                      });
                    }
                  })
                }
              />
              <SubscriptionHelper
                subscribe={() =>
                  this.props.data.subscribeToMore({
                    document: REACTOR_SUB,
                    variables: {
                      simulatorId: this.props.simulator.id
                    },
                    updateQuery: (previousResult, { subscriptionData }) => {
                      return Object.assign({}, previousResult, {
                        reactors: subscriptionData.data.reactorUpdate
                      });
                    }
                  })
                }
              />
              <thead>
                <tr>
                  <th>System</th>
                  <th>Set</th>
                  <th />
                  <th>Req</th>
                  <th>Flux</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.systems
                  .concat()
                  .sort((a, b) => {
                    if (
                      !(
                        (a.power.power || a.power.power === 0) &&
                        a.power.powerLevels.length
                      ) &&
                      ((b.power.power || b.power.power === 0) &&
                        b.power.powerLevels.length)
                    )
                      return 1;
                    if (
                      !(
                        (b.power.power || b.power.power === 0) &&
                        b.power.powerLevels.length
                      ) &&
                      ((a.power.power || a.power.power === 0) &&
                        a.power.powerLevels.length)
                    )
                      return -1;
                    if (a.type > b.type) return 1;
                    if (a.type < b.type) return -1;
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                  })
                  .map(s => (
                    <tr key={s.id}>
                      <td
                        onClick={e => this.toggleDamage(e, s)}
                        onContextMenu={e => this.setContext(e, s)}
                        style={this.systemStyle(s)}
                      >
                        {this.systemName(s)}
                      </td>
                      <td>
                        {(s.power.power || s.power.power === 0) && (
                          <InputField
                            prompt="What is the power?"
                            onClick={this.setPower.bind(this, s)}
                          >
                            {s.power.power}
                          </InputField>
                        )}
                      </td>
                      <td>/</td>
                      <td>
                        {(s.power.power || s.power.power === 0) && (
                          <OutputField>{s.power.powerLevels[0]}</OutputField>
                        )}
                      </td>
                      <td>
                        {s.power.powerLevels &&
                          s.power.powerLevels.length > 0 && (
                            <Button
                              size="sm"
                              color="warning"
                              title="Flux"
                              style={{ height: "15px" }}
                              onClick={() =>
                                action({ variables: { id: s.id } })
                              }
                            />
                          )}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td>Total</td>
                  <td>
                    <OutputField>
                      {this.props.data.systems.reduce(
                        (prev, next) =>
                          next.power ? prev + next.power.power : prev,
                        0
                      )}
                    </OutputField>
                  </td>
                  <td>{reactor && "/"}</td>
                  <td>
                    {reactor && (
                      <OutputField title="Reactor Output">
                        {Math.round(reactor.powerOutput * reactor.efficiency)}
                      </OutputField>
                    )}
                  </td>
                  <td>
                    {reactor && (
                      <InputField
                        title="Reactor Power Level"
                        prompt="What is the new power output?"
                        onClick={this.setPowerOutput}
                      >
                        {reactor.powerOutput}
                      </InputField>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5}>Right-Click for options</td>
                </tr>
                <tr>
                  <td colSpan={1}>
                    <Button block size="sm" color="warning" onClick={action}>
                      Flux Random
                    </Button>
                  </td>
                  <td colSpan={4}>
                    <Button
                      block
                      size="sm"
                      color="danger"
                      onClick={() =>
                        action({
                          variables: {
                            all: true,
                            simulatorId: this.props.simulator.id
                          }
                        })
                      }
                    >
                      Flux All
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
            {this.state.context && (
              <div
                style={{
                  transform: `translate(${this.state.context.x}px, ${
                    this.state.context.y
                  }px)`
                }}
                className="systems-context"
              >
                {options.map(o => (
                  <p key={o.key} onClick={e => this.damageOption(e, o.key)}>
                    {o.title}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </Mutation>
    );
  }
}
const SYSTEMS_QUERY = gql`
  query Systems($simulatorId: ID) {
    reactors(simulatorId: $simulatorId) {
      ...ReactorData
    }
    systems(simulatorId: $simulatorId) {
      id
      name
      displayName
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
        destroyed
        which
      }
      simulatorId
      type
    }
  }
  ${fragment}
`;

export default graphql(SYSTEMS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(DamageControlCore));
