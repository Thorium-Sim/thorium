import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import {Container} from "helpers/reactstrap";
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

export const SICKBAY_CORE_QUERY = gql`
  query Sickbay($simulatorId: ID!) {
    sickbay(simulatorId: $simulatorId) {
      ...SickbayCoreData
    }
  }
  ${fragment}
`;
export const SICKBAY_CORE_SUB = gql`
  subscription SickbayUpdate($simulatorId: ID!) {
    sickbayUpdate(simulatorId: $simulatorId) {
      ...SickbayCoreData
    }
  }
  ${fragment}
`;

class SickbayCore extends Component {
  state = {currentBunk: null};
  render() {
    const {bunks, id, simulator} = this.props;
    const {currentBunk} = this.state;
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
                  onClick={() => this.setState({currentBunk: b.id})}
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
  <Query
    query={SICKBAY_CORE_QUERY}
    variables={{simulatorId: props.simulator.id}}
  >
    {({loading, data, subscribeToMore}) => {
      if (loading || !data) return null;
      const {sickbay} = data;
      if (!sickbay[0]) return <div>No Sickbay</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SICKBAY_CORE_SUB,
              variables: {simulatorId: props.simulator.id},
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  sickbay: subscriptionData.data.sickbayUpdate,
                });
              },
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
