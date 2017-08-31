import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Row, Button } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";
import FontAwesome from "react-fontawesome";
import Tour from "reactour"

import Tank from "./tank";

import "./style.scss";

const COOLANT_SUB = gql`
  subscription CoolantUpdate($simulatorId: ID!) {
    coolantUpdate(simulatorId: $simulatorId) {
      id
      name
      coolant
      coolantRate
    }
  }
`;

const COOLANT_SYSTEM_SUB = gql`
  subscription CoolanSystemtUpdate($simulatorId: ID!) {
    coolantSystemUpdate(simulatorId: $simulatorId) {
      systemId
      simulatorId
      name
      coolant
      coolantRate
    }
  }
`;

class CoolantControl extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.coolantSystemSub = null;
    this.mouseup = () => {
      const coolant = this.props.data.coolant[0];
      const mutation = gql`
        mutation TransferCoolant($coolantId: ID!, $which: String) {
          transferCoolant(coolantId: $coolantId, which: $which)
        }
      `;
      const variables = {
        coolantId: coolant.id,
        which: "stop"
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: COOLANT_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ coolant: subscriptionData.data.coolantUpdate })
            .toJS();
        }
      });
    }
    if (!this.coolantSystemSub && !nextProps.data.loading) {
      this.coolantSystemSub = nextProps.data.subscribeToMore({
        document: COOLANT_SYSTEM_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ systemCoolant: subscriptionData.data.coolantSystemUpdate })
            .toJS();
        }
      });
    }
  }
  transferCoolant(systemId, which) {
    const coolant = this.props.data.coolant[0];
    const variables = {
      coolantId: coolant.id,
      systemId,
      which
    };
    const mutation = gql`
      mutation TransferCoolant($coolantId: ID!, $systemId: ID, $which: String) {
        transferCoolant(
          coolantId: $coolantId
          systemId: $systemId
          which: $which
        )
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
    document.addEventListener("mouseup", this.mouseup);
  }
  render() {
    if (this.props.data.loading) return null;
    const coolant = this.props.data.coolant[0];
    const { systemCoolant } = this.props.data;
    return (
      <Container fluid className="card-coolant">
        <Row>
          <Tank {...coolant} />
          <div className="coolant-containers">
            {systemCoolant.map(s =>
              <CoolantBar
                {...s}
                key={s.systemId}
                transferCoolant={this.transferCoolant.bind(this)}
              />
            )}
          </div>
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
    selector: ".enginesBar",
    content:
      "This coolant tank is filled with ethylene glycol (C2H6O2), which looks like this:"
  },
  {
    selector: "button.speedBtn",
    content: "Coolant is used to cool down the engines, which emit a lot of heat when running. It’s also used to cool down our phasers. CAUTION: Do NOT drink. May be administered to the bad guys."
  },
  {
    selector: ".full-stop",
    content: "Use the “Fill coolant” and “Fill reservoir” buttons to redirect coolant from your tank to the other systems in the ship. You’ll need to make sure the engines and the phasers have enough coolant to continue running, while making sure to keep enough coolant in the tank to get the ship home safely at the end of the mission."
  },
];

const CoolantBar = ({ systemId, name, coolant, transferCoolant }) => {
  return (
    <div>
      <div className="coolant-bar">
        <p>
          {name}
        </p>
        <CoolantLeftBracket />
        <CoolantMiddleBar />
        <div
          className="coolant-fill"
          style={{ width: `calc(${coolant * 100}% - 15px)` }}
        />
        <CoolantRightBracket />
      </div>
      <div className="coolant-control-button">
        <Button
          color="info"
          onMouseDown={transferCoolant.bind(this, systemId, "tank")}
        >
          <FontAwesome name="arrow-left" /> Fill Reservoir
        </Button>
        <Button
          color="primary"
          onMouseDown={transferCoolant.bind(this, systemId, "system")}
        >
          Fill Coolant <FontAwesome name="arrow-right" />
        </Button>
      </div>
    </div>
  );
};

const CoolantLeftBracket = () => {
  return (
    <div className="coolant-bracket">
      <svg
        height="100%"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: "1.41421"
        }}
        width="100%"
        version="1.1"
        viewBox="0 0 7 37"
        xmlSpace="preserve"
      >
        <path
          style={{ fill: "#2f2f2f" }}
          d="M2,0.009l0,-0.009l5,0l0,37l-5,0l0,-1.991l1,0l0,-1l-1,0l0,-10l-1,0l-1,0l0,-3l2,0l0,-5l-2,0l0,-1l0,-1l0,-1l2,0l0,-1l0,-1l0,-1l0,-1l0,-1l0,-1l0,-1l0,-1l0,-1l0,-1l1,0l0,-1l-1,0l0,-2l0,0ZM4,35.009l0,0.991l2,0l0,-0.991l-2,0ZM6,3.009l-2,0l0,31l2,0l0,-6.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-2.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991ZM6,1l-2,0l0,1.009l0,-0.009l2,0l0,-0.991l0,-0.009l0,0Z"
        />
      </svg>
    </div>
  );
};
const CoolantRightBracket = () => {
  return (
    <div className="coolant-bracket right">
      <svg
        height="100%"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: "1.41421"
        }}
        width="100%"
        version="1.1"
        viewBox="0 0 5 35"
        xmlSpace="preserve"
      >
        <path
          style={{ fill: "#2f2f2f" }}
          d="M1,35l0,-2l2,0l0,-31l-3,0l0,-2l5,0l0,35l-4,0Z"
        />
      </svg>
    </div>
  );
};
const CoolantMiddleBar = () => {
  return <div className="coolant-bracket center" />;
};
const COOLANT_QUERY = gql`
  query Coolant($simulatorId: ID!) {
    coolant(simulatorId: $simulatorId) {
      id
      name
      coolant
      coolantRate
    }
    systemCoolant(simulatorId: $simulatorId) {
      systemId
      simulatorId
      name
      coolant
      coolantRate
    }
  }
`;
export default graphql(COOLANT_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CoolantControl));
