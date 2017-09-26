import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Transitioner from "../helpers/transitioner";
import Tour from "reactour";
import DamageOverlay from "../helpers/DamageOverlay";

import "./style.scss";

const STEALTH_SUB = gql`
  subscription StealthFieldUpdate($simulatorId: ID!) {
    stealthFieldUpdate(simulatorId: $simulatorId) {
      id
      name
      state
      charge
      activated
      quadrants {
        fore
        aft
        port
        starboard
      }
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
    }
  }
`;

const SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID, $type: String) {
    systemsUpdate(simulatorId: $simulatorId, type: $type) {
      id
      name
      type
      stealthFactor
    }
  }
`;

const limit = 0.05;
const factor = 0.005;
class StealthField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systems: props.data.systems || null
    };
    this.subscription = null;
    this.systemsSubscription = null;
    this.looping = true;
    this.loop = this.loop.bind(this);
    window.requestAnimationFrame(this.loop);
  }
  componentDidMount() {
    this.looping = true;
    this.props.data.startPolling(1000);
  }
  componentWillUnmount() {
    this.looping = false;
    this.props.data.stopPolling();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: STEALTH_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ stealthField: subscriptionData.data.stealthFieldUpdate })
            .toJS();
        }
      });
    } /*
    if (!this.systemsSubscription && !nextProps.data.loading) {
      this.systemsSubscription = nextProps.data.subscribeToMore({
        document: SYSTEMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ systems: subscriptionData.data.systemsUpdate })
            .toJS();
        }
      });
    }*/
    if (nextProps.data.systems && !this.state.systems) {
      // We only need to initialize the state
      this.setState({
        systems: nextProps.data.systems.filter(
          s => typeof s.stealthFactor === "number"
        )
      });
    }
  }
  loop(currentTime) {
    if (this.looping) {
      window.requestAnimationFrame(this.loop);
    } else {
      return;
    }
    if (Math.round(currentTime) % 2 !== 0) return;
    if (this.props.data.loading) return;
    if (!this.props.data.systems) return;
    const systemsState = this.state.systems;
    const systemsProps = this.props.data.systems;
    if (!systemsState || !systemsProps) return;
    this.setState({
      systems: systemsState
        .filter(s => typeof s.stealthFactor === "number")
        .map(s => {
          const propSys = systemsProps.find(ps => ps.id === s.id);
          let sign = Math.sign(Math.random() - 0.5);
          if (Math.abs(s.stealthFactor - propSys.stealthFactor) > limit) {
            sign = -1 * Math.sign(s.stealthFactor - propSys.stealthFactor);
          }
          let stealthFactor = Math.min(
            1,
            Math.max(0, s.stealthFactor + sign * Math.random() * factor)
          );

          return {
            id: s.id,
            name: s.name,
            type: s.type,
            stealthFactor
          };
        })
    });
  }
  _activate() {
    const { id } = this.props.data.stealthField[0];
    const mutation = gql`
      mutation ActivateStealth($id: ID!) {
        activateStealth(id: $id)
      }
    `;
    const variables = { id };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _deactivate() {
    const { id } = this.props.data.stealthField[0];
    const mutation = gql`
      mutation DeactivateStealth($id: ID!) {
        deactivateStealth(id: $id)
      }
    `;
    const variables = { id };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    if (this.props.data.loading) return null;
    const stealthField = this.props.data.stealthField[0];
    if (!stealthField) return <p>No Stealth Field</p>;
    const { systems } = this.state;
    return (
      <Container fluid className="card-stealthField">
        <DamageOverlay
          system={stealthField}
          message={`${stealthField.name} Offline`}
        />
        <Row>
          <Col sm="2" />
          <Col sm="2" />
          <Col sm="4">
            {stealthField.activated &&
              (stealthField.state
                ? <Button
                    size="lg"
                    color="warning"
                    className="stealth-button"
                    block
                    onClick={this._deactivate.bind(this)}
                  >
                    Deactivate Stealth Field
                  </Button>
                : <Button
                    size="lg"
                    color="primary"
                    className="stealth-button"
                    block
                    onClick={this._activate.bind(this)}
                  >
                    Activate Stealth Field
                  </Button>)}
          </Col>
          <Col sm="2" />
          <Col sm="2" />
        </Row>
        <Row className="stealth-board">
          <TransitionGroup>
            {[StealthBars]
              .filter(s => stealthField.state)
              .map(Comp => <Comp key={Comp.name} systems={systems} />)}
          </TransitionGroup>
        </Row>
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </Container>
    );
  }
}

const trainingSteps = [
  {
    selector: ".stealth-button",
    content:
      "The ship’s stealth field allows it to move through space without being detected by other starships. If your stealth field needs to be activated, click this button to activate or deactivate the stealth field."
  },
  {
    selector: ".stealth-board",
    content:
      "This dashboard shows the way that the ship’s operations impact the stealth field. Use of some shp functionality may increase the ship’s probability of being detected. For example, sending out messages and other signals makes it obvious to other starships that this ship is around. They may not be able to see the ship, but they’ll notice that someone is there. If you start shooting at them, they will probably realize that something fishy is going on."
  }
];

class StealthBars extends Transitioner {
  systemName(sys) {
    if (sys.type === "Shield") {
      return `${sys.name} Shields`;
    }
    if (sys.type === "Engine") {
      return `${sys.name} Engines`;
    }
    return sys.name;
  }
  render() {
    const { systems } = this.props;
    return (
      <div className="stealthBars">
        {systems.filter(s => typeof s.stealthFactor === "number").map(s => {
          return (
            <Row key={s.id} className="mt-1">
              <Col sm="3" className="text-right">
                {this.systemName(s)}
              </Col>
              <Col sm="9">
                <div className="bar-container">
                  <div
                    className="bar"
                    style={{
                      width: `${s.stealthFactor * 100}%`,
                      backgroundSize: `5px 3px, ${100 /
                        s.stealthFactor}%, ${100 / s.stealthFactor}%`
                    }}
                  />
                </div>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}
const STEALTH_QUERY = gql`
  query StealthField($simulatorId: ID!) {
    stealthField(simulatorId: $simulatorId) {
      id
      name
      state
      charge
      activated
      quadrants {
        fore
        aft
        port
        starboard
      }
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
    }
    systems(simulatorId: $simulatorId) {
      id
      name
      type
      stealthFactor
    }
  }
`;

export default graphql(STEALTH_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(StealthField));
