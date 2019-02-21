import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Row, Col, Button } from "reactstrap";
import { Query, withApollo } from "react-apollo";
import { OutputField } from "../../generic/core";
import SubscriptionHelper from "helpers/subscriptionHelper";

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
    }
  }
`;

function isAligned({ fore, aft, port, starboard }) {
  return fore === 0.5 && aft === 0.5 && port === 0.5 && starboard === 0.5;
}

class StealthFieldCore extends Component {
  componentDidMount() {
    this.refetchSystems();
  }
  refetchSystems = () => {
    const { refetch } = this.props;
    refetch();
    this.timeout = setTimeout(this.refetchSystems, 1000);
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  systemName(sys) {
    if (sys.type === "Shield") {
      return `${sys.name} Shields`;
    }
    return sys.displayName || sys.name;
  }
  toggleStealth = () => {
    const { stealthField } = this.props;
    const { id, state } = stealthField;
    let mutation;
    if (!state) {
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
  };
  fluxCharge = () => {
    const mutation = gql`
      mutation FluxStealth($id: ID) {
        fluxStealthQuadrants(id: $id)
      }
    `;
    const variables = {
      id: this.props.stealthField.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const { systems, stealthField } = this.props;
    // Calculate the systems that are highest
    let alertHigh = false;
    const highSystems = systems.filter(s => s.stealthFactor > 0.5).map(s => {
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
        <Button color="warning" size="sm" onClick={this.fluxCharge}>
          Flux
        </Button>
        <Row>
          <Col sm="12">
            <OutputField
              onClick={this.toggleStealth}
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
              {highSystems.length === 0
                ? "No Alert Systems"
                : highSystems.length > 1
                  ? `${highSystems.length} Alert Systems`
                  : `${highSystems[0] && highSystems[0].name} (${Math.round(
                      highSystems[0] ? highSystems[0].stealthFactor * 100 : 0
                    )})`}
            </OutputField>
            {stealthField &&
              stealthField.charge && (
                <OutputField alert={!isAligned(stealthField.quadrants)}>
                  {isAligned(stealthField.quadrants) ? "Aligned" : "Misaligned"}
                </OutputField>
              )}
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
  }
`;

const SYSTEMS_QUERY = gql`
  query Systems($simulatorId: ID!) {
    systems(simulatorId: $simulatorId) {
      id
      name
      displayName
      type
      stealthFactor
    }
  }
`;

const StealthFieldData = props => {
  return (
    <Query
      query={STEALTH_QUERY}
      variables={{
        simulatorId: props.simulator.id
      }}
    >
      {({ loading, data, subscribeToMore }) => {
        if (loading || !data.stealthField) return null;
        const stealthField = data.stealthField[0];
        if (!stealthField) return <p>No Stealth Field Systems</p>;
        return (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: STEALTH_SUB,
                variables: {
                  simulatorId: props.simulator.id
                },
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    stealthField: subscriptionData.data.stealthFieldUpdate
                  });
                }
              })
            }
          >
            <Query
              query={SYSTEMS_QUERY}
              variables={{
                simulatorId: props.simulator.id
              }}
              pollInterval={500}
            >
              {({ data: systemsData, startPolling, refetch }) => (
                <StealthFieldCore
                  {...props}
                  stealthField={stealthField}
                  systems={
                    systemsData && systemsData.systems
                      ? systemsData.systems
                      : []
                  }
                  startPolling={startPolling}
                  refetch={refetch}
                />
              )}
            </Query>
          </SubscriptionHelper>
        );
      }}
    </Query>
  );
};
export default withApollo(StealthFieldData);
