import React, { Component } from "react";
import { Button } from "reactstrap";
import { TweenMax } from "gsap";
import { findDOMNode } from "react-dom";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import DamageOverlay from "../helpers/DamageOverlay";
import "./style.css";

import TorpedoFire from "./torpedoFire";

const TORPEDO_SUB = gql`
  subscription TorpedosUpdate($simulatorId: ID!) {
    torpedosUpdate(simulatorId: $simulatorId) {
      id
      loaded
      name
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      inventory {
        id
        type
        probe
      }
      state
    }
  }
`;

class TorpedoLoading extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: TORPEDO_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            torpedos: subscriptionData.torpedosUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  render() {
    if (this.props.data.loading) return null;
    const torpedos = this.props.data.torpedos;
    return (
      <div className="torpedo-loading">
        {torpedos.map(
          t =>
            torpedos.length > (this.props.maxLaunchers || Infinity) ? (
              <TorpedoFire key={t.id} torpedo={t} client={this.props.client} />
            ) : (
              <TorpedoLoader
                key={t.id}
                torpedo={t}
                client={this.props.client}
              />
            )
        )}
      </div>
    );
  }
}

const Torpedo = ({ state, type }) => {
  const style = {
    opacity: state !== "loaded" ? 0 : 1,
    top: state === "loaded" || state === "fired" ? "86%" : "2px",
    left: state === "fired" ? "70px" : "3px",
    transition: `opacity 1s ease-in ${state === "loaded"
      ? ""
      : "2s"}, top 3s ease-in-out, left 0.2s ease-in`
  };
  let color = "rgb(200, 120, 255)";
  switch (type) {
    case "photon":
      color = "rgb(255,0,0)";
      break;
    case "quantum":
      color = "rgb(0,80,255)";
      break;
    case "probe":
      color = "rgb(40,140,40)";
      break;
    case "other":
    default:
      color = "rgb(200, 120, 255)";
      break;
  }

  return (
    <div className="torpedoHolder">
      <svg
        className="torpedo"
        style={style}
        width="100%"
        height="100%"
        viewBox="0 0 32 10"
      >
        <g transform="matrix(1,0,0,1,-199,-136)">
          <path
            style={{ fill: color }}
            d="M209,136L226,136C228.761,136 231,138.239 231,141C231,141 231,141 231,141C231,143.761 228.761,146 226,146C220,146 210,146 204,146C201.239,146 199,143.761 199,141C199,141 199,141 199,141C199,139.674 199.527,138.402 200.464,137.464C201.402,136.527 202.674,136 204,136L208,136L208,139L206,139L206,136L205,136L205,140L209,140L209,136ZM209,144L209,143L204,143L204,144L209,144ZM213,144L213,143L210,143L210,144L213,144ZM216,144L216,143L215,143L215,144L216,144ZM218,144L218,143L217,143L217,144L218,144ZM225,144L225,143L222,143L222,144L225,144ZM230,142L230,141L200,141L200,142L230,142ZM221,140L221,136L220,136L220,139L211,139L211,136L210,136L210,140L221,140ZM226,140L226,136L225,136L225,139L223,139L223,136L222,136L222,140L226,140Z"
          />
        </g>
      </svg>
    </div>
  );
};

class Transitioner extends Component {
  componentWillEnter(callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(
      el,
      0.5,
      { z: 100, rotationY: 0, opacity: 0, transformPerspective: 200 },
      {
        z: 0,
        rotationY: 0,
        opacity: 1,
        transformPerspective: 200,
        onComplete: callback
      }
    );
  }
  componentWillLeave(callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(
      el,
      0.5,
      { z: 0, rotationY: 0, opacity: 1, transformPerspective: 200 },
      {
        z: -100,
        rotationY: 0,
        opacity: 0,
        transformPerspective: 200,
        onComplete: callback
      }
    );
  }
}
class TorpedoTube extends Transitioner {
  render() {
    const {
      torpedoState,
      torpedoType,
      updateScreen,
      unloadTorpedo,
      fireTorpedo,
      enabled
    } = this.props;
    return (
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <div className="torpedoButton">
          {torpedoState === "idle" ? (
            <Button
              block
              color="info"
              disabled={!enabled}
              onClick={updateScreen.bind(this, "TorpedoPick")}
            >
              Load Torpedo
            </Button>
          ) : (
            <div>
              <Button
                block
                color="warning"
                disabled={!enabled}
                onClick={unloadTorpedo}
              >
                Unload Torpedo
              </Button>
              {/*<Button
                block
                color="danger"
                disabled={!enabled}
                onClick={fireTorpedo}
              >
                Fire Torpedo
              </Button>*/}
            </div>
          )}
        </div>
        <Torpedo state={torpedoState} type={torpedoType} />
        <img
          alt="torpedo"
          role="presentation"
          className="torpedoImage"
          draggable="false"
          src={require("./torpedo.svg")}
        />
      </div>
    );
  }
}

class TorpedoPick extends Transitioner {
  render() {
    const torpedoWidth = 120;
    const { updateScreen, loadTorpedo, inventory } = this.props;
    const types = inventory.reduce((prev, next) => {
      if (prev[next.type]) {
        prev[next.type] += 1;
      } else {
        prev[next.type] = 1;
      }
      return prev;
    }, {});

    return (
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <div className="torpedoPickScroll">
          <div
            className="torpedoPicker"
            style={{ width: Object.keys(types).length * torpedoWidth }}
          >
            {Object.keys(types).map((t, i) => {
              let imgKey = t;

              if (["photon", "quantum", "probe"].indexOf(imgKey) < 0) {
                imgKey = "other";
              }
              const img = require(`./torpedos/${imgKey}.svg`);
              return (
                <div
                  key={t + i}
                  onClick={loadTorpedo.bind(
                    this,
                    (inventory.find(inv => inv.type === t) || {}).id
                  )}
                  className="torpedoPick"
                  style={{ width: torpedoWidth }}
                >
                  <img
                    alt="torpedo"
                    draggable="false"
                    role="presentation"
                    src={img}
                  />
                  <span style={{ textTransform: "capitalize" }}>
                    {t} ({types[t]})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <Button
          block
          color="warning"
          onClick={updateScreen.bind(this, "TorpedoTube")}
        >
          Cancel
        </Button>
      </div>
    );
  }
}

const TORPEDO_QUERY = gql`
  query Torpedos($simulatorId: ID!) {
    torpedos(simulatorId: $simulatorId) {
      id
      loaded
      name
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      inventory {
        id
        type
        probe
      }
      state
    }
  }
`;

class TorpedoLoader extends Component {
  constructor(props) {
    super(props);
    let type = "other";
    if (props.torpedo.loaded !== "false") {
      const loadedTorp = props.torpedo.inventory.find(
        t => t.id === props.torpedo.loaded
      );
      type = loadedTorp.type;
    }
    this.state = {
      torpedoState: props.torpedo.state,
      torpedoType: type,
      enabled: true,
      screen: "TorpedoTube"
    };
  }
  componentWillReceiveProps(nextProps) {
    // Update the state based on the props
    const torpedo = nextProps.torpedo;
    let type = this.state.torpedoType;
    if (torpedo.loaded !== "false") {
      const loadedTorp = torpedo.inventory.find(t => t.id === torpedo.loaded);
      type = loadedTorp.type;
    }
    this.setState({
      torpedoState: torpedo.state,
      torpedoType: type
    });
  }

  updateScreen(screen) {
    this.setState({
      screen
    });
  }
  loadTorpedo(which) {
    const torpedo = this.props.torpedo;
    const mutation = gql`
      mutation loadWarhead($id: ID!, $warheadId: ID!) {
        torpedoLoadWarhead(id: $id, warheadId: $warheadId)
      }
    `;
    const variables = {
      id: torpedo.id,
      warheadId: which
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      enabled: false
    });
    //Reenable the buttons
    setTimeout(() => {
      this.setState({
        enabled: true
      });
    }, 4000);
    this.updateScreen("TorpedoTube");
  }
  unloadTorpedo() {
    const torpedo = this.props.torpedo;
    const mutation = gql`
      mutation unloadWarhead($id: ID!) {
        torpedoUnload(id: $id)
      }
    `;
    const variables = {
      id: torpedo.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      enabled: false
    });
    //Reenable the buttons
    setTimeout(() => {
      this.setState({
        enabled: true
      });
    }, 4000);
  }
  fireTorpedo() {
    const torpedo = this.props.torpedo;
    const mutation = gql`
      mutation fireWarhead($id: ID!) {
        torpedoFire(id: $id)
      }
    `;
    const variables = {
      id: torpedo.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      enabled: false
    });
    //Reenable the buttons
    setTimeout(() => {
      this.setState({
        enabled: true
      });
    }, 4000);
  }
  render() {
    const components = { TorpedoTube: TorpedoTube, TorpedoPick: TorpedoPick };
    const torpedo = this.props.torpedo;
    return (
      <div className="torpedo-loader">
        <DamageOverlay
          system={torpedo}
          message={`${torpedo.name} Offline`}
          style={{
            height: "250px",
            width: "500px"
          }}
        />
        <h3 className="text-center">{torpedo.name}</h3>
        {Object.keys(components)
          .map(compName => {
            const Comp = components[compName];
            if (this.state.screen === compName) {
              return (
                <Comp
                  key={Comp.name}
                  {...this.state}
                  inventory={torpedo.inventory}
                  loadTorpedo={this.loadTorpedo.bind(this)}
                  unloadTorpedo={this.unloadTorpedo.bind(this)}
                  updateScreen={this.updateScreen.bind(this)}
                  fireTorpedo={this.fireTorpedo.bind(this)}
                />
              );
            }
            return null;
          })
          .filter(a => a)}
      </div>
    );
  }
}

export default graphql(TORPEDO_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(TorpedoLoading));
