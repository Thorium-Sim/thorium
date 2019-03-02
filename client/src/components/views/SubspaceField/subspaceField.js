import React from "react";
import ChargeBar from "../StealthField/chargeBar";
import { titleCase } from "change-case";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import Tour from "helpers/tourHelper";

const subspaceSectors = [
  "fore",
  "port",
  "dorsal",
  "aft",
  "starboard",
  "ventral"
];
class SubspaceField extends React.Component {
  state = {};
  trainingSteps = () => {
    const { name, displayName } = this.props;
    const sysName = displayName || name;
    return [
      {
        selector: ".selector",
        content: `The ${sysName} is a powerful field which substantially decreases the inertia on your ship. This helps to limit the strain on your ship when traveling at ultra-high velocities or through exotic space.`
      },
      {
        selector: ".subspace-charge",
        content: `Each sector of your ship must be charged appropriately for the ${sysName} to sufficiently protect your ship. Drag the arrows next to each sector's power bar to the light blue line. The line might change position based on how the ${sysName} distributes the stress across your ship. If the bar ever changes, make sure to line it up again.`
      },
      {
        selector: ".power-levels",
        content: `You can know that the sector power levels are balanced when the power available and power used are the same number.`
      }
    ];
  };
  render() {
    const {
      simulator: { assets },
      totalPower,
      id,
      clientObj
    } = this.props;
    const diff = () => {
      const totalDiff = subspaceSectors.reduce((prev, which) => {
        const { value, required } = this.props[which];
        const stateVal = this.state[which];
        const distance = Math.abs(
          (stateVal || stateVal === 0 ? stateVal * 100 : value) / required - 1
        );
        return prev + Math.abs(1 - distance);
      }, 0);
      return totalDiff / subspaceSectors.length;
    };
    const total = subspaceSectors.reduce(
      (prev, next) => prev + this.props[next].value,
      0
    );
    return (
      <div className="card-subspaceField">
        {subspaceSectors.map(s => (
          <div key={`sector-${s}`} className={`subspace-charge ${s}`}>
            <Mutation
              mutation={gql`
                mutation SetSubspaceFieldValue(
                  $id: ID!
                  $which: String!
                  $value: Int!
                ) {
                  setSubspaceFieldSectorValue(
                    id: $id
                    which: $which
                    value: $value
                  )
                }
              `}
            >
              {action => (
                <ChargeBar
                  label={titleCase(s)}
                  levelColor="cyan"
                  color="#0088ff"
                  levelMultiply={100}
                  lineLevel={this.props[s].required / 100}
                  value={this.props[s].value / 100}
                  invert
                  mouseMove={level =>
                    this.setState({ [s]: Math.abs(1 - level) })
                  }
                  mouseUp={level =>
                    action({
                      variables: {
                        id,
                        which: s,
                        value: Math.round(100 * level)
                      }
                    }).then(() => {
                      this.setState({ [s]: null });
                    })
                  }
                />
              )}
            </Mutation>
          </div>
        ))}
        <div className="ship-top">
          <div
            className="main"
            style={{
              filter: `drop-shadow(0px 0px 20px rgba(0, 255, 255, ${diff()}))`,
              backgroundImage: `url('/assets${assets.top}')`
            }}
            alt="Ship Top"
          />
        </div>
        <div className="ship-side">
          <div
            className="main"
            style={{
              filter: `drop-shadow(0px 0px 20px rgba(0, 255, 255, ${diff()}))`,
              backgroundImage: `url('/assets${assets.side}')`
            }}
            alt="Ship Side"
          />
        </div>
        <div className="power-levels">
          <h1>Power In Use: {total}</h1>
          <h1>Power Available: {totalPower}</h1>
        </div>
        <Tour steps={this.trainingSteps()} client={clientObj} />
      </div>
    );
  }
}
export default SubspaceField;
