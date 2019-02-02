import React from "react";
import ChargeBar from "../StealthField/chargeBar";
import { titleCase } from "change-case";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
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
  render() {
    const {
      simulator: { assets },
      totalPower,
      id
    } = this.props;
    const diff = which => {
      const { value, required } = this.props[which];
      const stateVal = this.state[which];
      const distance = Math.abs(
        (stateVal || stateVal === 0 ? stateVal * 100 : value) / required - 1
      );
      return Math.abs(1 - distance);
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
                mutation($id: ID!, $which: String!, $value: Int!) {
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
            style={{ backgroundImage: `url('/assets${assets.top}')` }}
            alt="Ship Top"
          />
          <div
            className="fore"
            style={{
              filter: `drop-shadow(0px 0px 20px rgba(0, 255, 255, ${diff(
                "fore"
              )}))`,
              backgroundImage: `url('/assets${assets.top}')`
            }}
            alt="Ship Top"
          />
          <div
            className="starboard"
            style={{
              filter: `drop-shadow(0px 0px 20px rgba(0, 255, 255, ${diff(
                "starboard"
              )}))`,
              backgroundImage: `url('/assets${assets.top}')`
            }}
            alt="Ship Top"
          />
          <div
            className="aft"
            style={{
              filter: `drop-shadow(0px 0px 20px rgba(0, 255, 255, ${diff(
                "aft"
              )}))`,
              backgroundImage: `url('/assets${assets.top}')`
            }}
            alt="Ship Top"
          />
          <div
            className="port"
            style={{
              filter: `drop-shadow(0px 0px 20px rgba(0, 255, 255, ${diff(
                "port"
              )}))`,
              backgroundImage: `url('/assets${assets.top}')`
            }}
            alt="Ship Top"
          />
          <div
            className="main"
            style={{ backgroundImage: `url('/assets${assets.top}')` }}
            alt="Ship Top"
          />
        </div>
        <div className="ship-side">
          <div
            className="main"
            style={{ backgroundImage: `url('/assets${assets.side}')` }}
            alt="Ship Side"
          />
          <div
            className="dorsal"
            style={{
              filter: `drop-shadow(0px 0px 20px rgba(0, 255, 255, ${diff(
                "dorsal"
              )}))`,
              backgroundImage: `url('/assets${assets.side}')`
            }}
            alt="Ship Top"
          />
          <div
            className="ventral"
            style={{
              filter: `drop-shadow(0px 0px 20px rgba(0, 255, 255, ${diff(
                "ventral"
              )}))`,
              backgroundImage: `url('/assets${assets.side}')`
            }}
            alt="Ship Top"
          />
          <div
            className="main"
            style={{ backgroundImage: `url('/assets${assets.side}')` }}
            alt="Ship Side"
          />
        </div>
        <div className="power-levels">
          <h1>Power In Use: {total}</h1>
          <h1>Power Available: {totalPower}</h1>
        </div>
      </div>
    );
  }
}
export default SubspaceField;
