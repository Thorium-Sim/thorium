import React, { Component } from "react";
import { Input, FormGroup, Label } from "reactstrap";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const ops = {
  updatePowerLevels: gql`
    mutation UpdatePowerLevels($id: ID!, $levels: [Int]!) {
      changeSystemPowerLevels(systemId: $id, powerLevels: $levels)
    }
  `,
  updateName: gql`
    mutation UpdateName($id: ID!, $name: String, $displayName: String) {
      updateSystemName(systemId: $id, name: $name, displayName: $displayName)
    }
  `
};

export class GenericSystemConfig extends Component {
  addPowerLevel = ({ id, power: { powerLevels = [] } }) => {
    const lastLevel = powerLevels[powerLevels.length - 1] || 4;
    const updatedPowerLevels = powerLevels.concat(lastLevel + 1);
    this.performMutation(updatedPowerLevels, id);
  };
  removePowerLevel = ({ id, power: { powerLevels = [] } }) => {
    const updatedPowerLevels = powerLevels.concat();
    updatedPowerLevels.pop();
    this.performMutation(updatedPowerLevels, id);
  };
  updatePowerLevel = ({ id, power: { powerLevels = [] } }, index, level) => {
    const updatedPowerLevels = powerLevels.concat();
    updatedPowerLevels[index] = parseInt(level, 10);
    this.performMutation(updatedPowerLevels, id);
  };
  performMutation = (levels, id) => {
    const variables = {
      levels,
      id
    };
    this.props.client.mutate({
      mutation: ops.updatePowerLevels,
      variables,
      refetchQueries: [
        "System",
        "Engines",
        "ShortRangeComm",
        "Reactor",
        "Phasers",
        "Shields",
        "Torpedo"
      ]
    });
  };
  updateName = ({ id }, name, displayName) => {
    const variables = {
      name,
      displayName,
      id
    };
    this.props.client.mutate({
      mutation: ops.updateName,
      variables,
      refetchQueries: [
        "System",
        "Engines",
        "ShortRangeComm",
        "Reactor",
        "Phasers",
        "Shields",
        "Torpedo"
      ]
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.systems) return null;
    const systems = this.props.data.systems;
    return (
      <div className="scroll">
        {systems.length === 0 && (
          <p>Click the checkbox to add a {this.props.type} system</p>
        )}
        {systems.map(s => (
          <div
            key={s.id}
            style={{ border: "solid 1px rgba(0,0,0,0.5)", padding: "2px" }}
          >
            <label>{s.type}</label>
            <FormGroup>
              <Label>
                Name
                <Input
                  type="text"
                  value={s.name}
                  onChange={e => {
                    this.updateName(s, e.target.value, null);
                  }}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                Display Name
                <Input
                  type="text"
                  value={s.displayName}
                  onChange={e => {
                    this.updateName(s, null, e.target.value);
                  }}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>Required Power</Label>
              <FontAwesome
                onClick={() => {
                  this.addPowerLevel(s);
                }}
                name="plus-circle"
                className="text-success"
              />
              <FontAwesome
                onClick={() => {
                  this.removePowerLevel(s);
                }}
                name="minus-circle"
                className="text-danger"
              />
              {s.power.powerLevels &&
                s.power.powerLevels.map((p, i) => (
                  <div
                    key={`system-power-${i}`}
                    style={{ display: "inline-block" }}
                  >
                    <Input
                      style={{
                        width: "40px",
                        padding: "2px",
                        display: "inline-block"
                      }}
                      type="number"
                      name="power"
                      value={p}
                      onChange={e =>
                        this.updatePowerLevel(s, i, e.target.value)}
                    />
                  </div>
                ))}
            </FormGroup>
            {this.props.children}
          </div>
        ))}
      </div>
    );
  }
}

const SYSTEM_QUERY = gql`
  query System($id: ID, $type: String) {
    systems(simulatorId: $id, type: $type) {
      id
      name
      displayName
      type
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
        requested
        reactivationCode
        neededReactivationCode
      }
      displayName
    }
  }
`;

export default graphql(SYSTEM_QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.simulatorId,
      type: ownProps.type
    }
  })
})(GenericSystemConfig);
