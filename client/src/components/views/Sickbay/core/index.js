import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import { Container } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import PatientControls from "./PatientControls";

import "../style.scss";

const fragment = gql`
  fragment SickbayCoreData on Sickbay {
    id
    bunks {
      id
      patient {
        id
        age
        rank
        name
        gender
        position
        charts {
          id
          o2levels
          symptoms
          heartRate
          diagnosis
          treatment
          treatmentRequest
          temperature
          bloodPressure
          admitTime
          dischargeTime
          painPoints {
            x
            y
          }
        }
      }
      scanning
      scanRequest
      scanResults
    }
  }
`;

const QUERY = gql`
  query Sickbay($simulatorId: ID!) {
    sickbay(simulatorId: $simulatorId) {
      ...SickbayCoreData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription SickbayUpdate($simulatorId: ID!) {
    sickbayUpdate(simulatorId: $simulatorId) {
      ...SickbayCoreData
    }
  }
  ${fragment}
`;

class SickbayCore extends Component {
  state = { currentBunk: null };
  render() {
    const { bunks, id, simulator } = this.props;
    const { currentBunk } = this.state;
    return (
      <Container className="sickbay-core">
        <div className="bunks-container">
          <p>
            <strong>Bunks</strong>
          </p>
          <div className="bunks-list">
            {bunks.map((b, i) => {
              const chart = b.patient
                ? b.patient.charts.concat().sort((a, c) => {
                    if (new Date(a.admitTime) > new Date(c.admitTime))
                      return -1;
                    if (new Date(a.admitTime) < new Date(c.admitTime)) return 1;
                    return 0;
                  })[0]
                : {};
              return (
                <p
                  className={`${chart.treatmentRequest ? "text-info" : ""} ${
                    b.scanning ? "text-danger" : ""
                  } ${currentBunk === b.id ? "active" : ""}`}
                  onClick={() => this.setState({ currentBunk: b.id })}
                  key={b.id}
                >
                  Bunk {i + 1}
                </p>
              );
            })}
          </div>
        </div>

        {currentBunk && (
          <PatientControls
            simulator={simulator}
            sickbayId={id}
            {...bunks.find(b => b.id === currentBunk)}
          />
        )}
      </Container>
    );
  }
}

const SickbayCoreData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { sickbay } = data;
      if (loading || !sickbay) return null;
      if (!sickbay[0]) return <div>No Sickbay</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  sickbay: subscriptionData.data.sickbayUpdate
                });
              }
            })
          }
        >
          <SickbayCore {...props} {...sickbay[0]} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default SickbayCoreData;
