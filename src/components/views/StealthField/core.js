import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Row, Col, Button } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import { OutputField } from "../../generic/core";

import "./style.css";

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
    }
  }
`;
/*
const SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID, $type: String) {
    systemsUpdate(simulatorId: $simulatorId, type: $type) {
      id
      name
      type
      stealthFactor
    }
  }
`;*/

class StealthFieldCore extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.systemsSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: STEALTH_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            stealthField: subscriptionData.data.stealthFieldUpdate
          });
        }
      });
    }
    if (!this.systemsSubscription && !nextProps.data.loading) {
      this.props.data.startPolling(1000);
      /*this.systemsSubscription = nextProps.data.subscribeToMore({
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
      });*/
    }
  }
  componentWillUnmount() {
    this.props.data.stopPolling(1000);
    this.subscription && this.subscription();
  }
  systemName(sys) {
    if (sys.type === "Shield") {
      return `${sys.name} Shields`;
    }
    if (sys.type === "Engine") {
      return `${sys.name} Engines`;
    }
    return sys.name;
  }
  toggleStealth() {
    const { id, state } = this.props.data.stealthField[0];
    let mutation;
    if (state) {
      mutation = gql`
        mutation ActivateStealth($id: ID!) {
          activateStealth(id: $id)
        }
      `;
    } else {
      mutation = gql`
        mutation DeactivateStealth($id: ID!) {
          deactivateStealth(id: $id)
        }
      `;
    }
    const variables = { id };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  updateActivated(e) {
    const { id } = this.props.data.stealthField[0];
    const mutation = gql`
      mutation ToggleActivated($id: ID!, $state: Boolean!) {
        setStealthActivated(id: $id, state: $state)
      }
    `;
    const variables = {
      id,
      state: e.target.checked
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  updateCharge(e) {
    const { id } = this.props.data.stealthField[0];
    const mutation = gql`
      mutation ToggleCharge($id: ID!, $state: Boolean!) {
        setStealthCharge(id: $id, state: $state)
      }
    `;
    const variables = {
      id,
      state: e.target.checked
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  fluxCharge = () => {
    const mutation = gql`
      mutation FluxStealth($id: ID) {
        fluxStealthQuadrants(id: $id)
      }
    `;
    const variables = {
      id: this.props.data.stealthField[0].id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.stealthField) return null;
    const stealthField = this.props.data.stealthField[0];
    if (!stealthField) return <p>No Stealth Field Systems</p>;

    // Calculate the systems that are highest
    let alertHigh = false;
    const highSystems = this.props.data.systems
      .filter(s => s.stealthFactor > 0.5)
      .map(s => {
        if (s.stealthFactor > 0.8) {
          alertHigh = true;
        }
        return s;
      });
    const sysStyle = {};
    if (highSystems.length > 0) {
      sysStyle.backgroundColor = "yellow";
      sysStyle.borderColor = "#CCCC00";
    }
    const highSystemsText = highSystems.reduce((prev, s, i) => {
      let returnString = `${this.systemName(s)} (${Math.round(
        s.stealthFactor * 100
      )})`;
      if (i < highSystems.length - 1) returnString += ", ";
      return prev + returnString;
    }, "");
    return (
      <Container className="targeting-core">
        <label>
          {" "}
          Activate{" "}
          <input
            checked={stealthField.activated}
            onChange={this.updateActivated.bind(this)}
            type="checkbox"
          />
        </label>
        <label>
          Charge{" "}
          <input
            checked={stealthField.charge}
            onChange={this.updateCharge.bind(this)}
            type="checkbox"
          />
        </label>
        <Button color="warning" size="sm" onClick={this.fluxCharge}>
          Flux
        </Button>
        <Row>
          <Col sm="12">
            <OutputField
              onMouseDown={this.toggleStealth.bind(this)}
              alert={stealthField.state}
            >
              {stealthField.state ? "Activated" : "Deactivated"}
            </OutputField>
          </Col>
          <Col sm="12">
            <OutputField
              id="stealth-systems"
              style={sysStyle}
              alert={alertHigh}
              title={highSystemsText}
            >
              {highSystems.length > 1
                ? `${highSystems.length} Alert Systems`
                : `${highSystems[0] && highSystems[0].name} (${Math.round(
                    highSystems[0] ? highSystems[0].stealthFactor * 100 : 0
                  )})`}
            </OutputField>
          </Col>
        </Row>
      </Container>
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
      simulatorId: ownProps.simulator.id,
      names: ["Icons", "Pictures"]
    }
  })
})(withApollo(StealthFieldCore));
