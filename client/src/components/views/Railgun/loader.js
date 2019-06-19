import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { Button } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { CSSTransitionGroup } from "react-transition-group";
import Tour from "helpers/tourHelper";
import DamageOverlay from "../helpers/DamageOverlay";

const initialSteps = [
  {
    selector: ".nothing",
    content: (
      <FormattedMessage
        id="railgun-loader-training-1"
        defaultMessage="The railgun is a point-defense weapon designed to destroy incoming projectiles. This screen is where you load bolts into the railgun."
      />
    )
  },
  {
    selector: ".railgun-controls",
    content: (
      <FormattedMessage
        id="railgun-loader-training-2"
        defaultMessage="Here you can see the number of bolts loaded. Make sure you don't run out of railgun bolts!"
      />
    )
  }
];
export default class RailgunLoader extends Component {
  static trainingSteps = [
    {
      selector: ".load-button",
      content: (
        <FormattedMessage
          id="railgun-loader-training-3"
          defaultMessage="Click this button to load a bolt into the railgun."
        />
      )
    }
  ];
  state = {};
  load = action => () => {
    action();
    this.setState({ loaded: true });
    setTimeout(() => this.setState({ loaded: false }), 200);
  };
  render() {
    const {
      id,
      displayName,
      ammo,
      availableAmmo,
      maxAmmo,
      hasLoader,
      mainScreen
    } = this.props;
    const { loaded } = this.state;
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
              variables={{ id }}
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
                  <FormattedMessage
                    id="railgun-load"
                    description="A button which adds one bolt of ammunition to the railgun."
                    defaultMessage="Load Railgun"
                  />
                </Button>
              )}
            </Mutation>
          )}
          <h4>
            <FormattedMessage
              id="railgun-loaded-ammo"
              description="How much ammunition has been loaded into the railgun."
              defaultMessage="Loaded Ammunition: {ammo}"
              values={{
                ammo
              }}
            />
          </h4>
          {!hasLoader && (
            <h4>
              <FormattedMessage
                id="railgun-available-ammo"
                description="How much ammunition is available to be loaded into the railgun."
                defaultMessage="Available Ammunition: {availableAmmo}"
                values={{
                  availableAmmo
                }}
              />
            </h4>
          )}
        </div>
        <div className="spacer" />
        <div className="railgun">
          <div className="ammo-holder">
            <div className="ammo-shadow" />
            <CSSTransitionGroup
              transitionName="fire"
              transitionEnterTimeout={600}
              transitionLeaveTimeout={100}
            >
              {Array(ammo)
                .fill(0)
                .map((_, i, arr) => (
                  <div key={`bolt-${i}`} className="bolt-holder">
                    <img
                      alt="bolt"
                      draggable="false"
                      src={require("./bolt.svg")}
                      style={{
                        transform: `translateY(-${(arr.length - i - 1) * 20}px)`
                      }}
                    />
                  </div>
                ))}
            </CSSTransitionGroup>
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
