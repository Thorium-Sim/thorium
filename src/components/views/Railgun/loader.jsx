import React, {Component} from "react";
import {Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import {Button} from "helpers/reactstrap";

import {TransitionGroup, CSSTransition} from "react-transition-group";
import Tour from "helpers/tourHelper";
import DamageOverlay from "../helpers/DamageOverlay";

const initialSteps = [
  {
    selector: ".nothing",
    content: "The railgun is a point-defense weapon designed to destroy incoming projectiles. This screen is where you load bolts into the railgun.",
  },
  {
    selector: ".railgun-controls",
    content: "Here you can see the number of bolts loaded. Make sure you don't run out of railgun bolts!",
  },
];
export default class RailgunLoader extends Component {
  static trainingSteps = [
    {
      selector: ".load-button",
content: "Click this button to load a bolt into the railgun.",
    },
  ];
  state = {};
  load = action => () => {
    action();
    this.setState({loaded: true});
    setTimeout(() => this.setState({loaded: false}), 200);
  };
  render() {
    const {
      id,
      displayName,
      ammo,
      availableAmmo,
      maxAmmo,
      hasLoader,
      mainScreen,
    } = this.props;
    const {loaded} = this.state;
    return (
      <div className="railgun-loader">
        <DamageOverlay message={`${displayName} Offline`} system={this.props} />
        <div className="railgun-controls">
          {!hasLoader && (
            <Mutation
              mutation={gql`
                mutation LoadRailgun($id: ID!) {
                  loadRailgun(id: $id)
                }
              `}
              variables={{id}}
            >
              {action => (
                <Button
                  block
                  className="load-button"
                  onClick={this.load(action)}
                  disabled={loaded || ammo >= maxAmmo}
                  color="warning"
                  size="lg"
                >
                  Load Bolt
                </Button>
              )}
            </Mutation>
          )}
          <h4>
            Loaded Ammunition: {ammo}
          </h4>
          {!hasLoader && (
            <h4>
Available Ammunition: {availableAmmo}
            </h4>
          )}
        </div>
        <div className="spacer" />
        <div className="railgun">
          <div className="ammo-holder">
            <div className="ammo-shadow" />
            <TransitionGroup>
              {Array(ammo)
                .fill(0)
                .map((_, i, arr) => (
                  <CSSTransition
                    key={`bolt-${i}`}
                    classNames="fire"
                    timeout={{enter: 600, exit: 100}}
                  >
                    <div className="bolt-holder">
                      <img
                        alt="bolt"
                        draggable="false"
                        src={require("./bolt.svg")}
                        style={{
                          transform: `translateY(-${
                            (arr.length - i - 1) * 20
                          }px)`,
                        }}
                      />
                    </div>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </div>
        </div>
        {!mainScreen && (
          <Tour
            steps={initialSteps.concat(RailgunLoader.trainingSteps)}
            client={this.props.clientObj}
          />
        )}
      </div>
    );
  }
}
