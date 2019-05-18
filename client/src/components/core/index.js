import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Core from "./CoreComponents";

const fragment = gql`
  fragment FlightData on Flight {
    id
    name
    date
    flightType
    running
    simulators {
      id
      name
      layout
      stations {
        name
        cards {
          name
          hidden
        }
        messageGroups
      }
      assets {
        mesh
        texture
        side
        top
        logo
        bridge
      }
    }
  }
`;

const QUERY = gql`
  query Flights($id: ID!) {
    flights(id: $id) {
      ...FlightData
    }
    clients(flightId: $id) {
      id
      simulator {
        id
      }
      station {
        name
      }
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription FlightsUpdate($id: ID!) {
    flightsUpdate(id: $id) {
      ...FlightData
    }
  }
  ${fragment}
`;
const CACHE_INVALID_SUB = gql`
  subscription ClearCache($flight: ID!) {
    clearCache(flight: $flight)
  }
`;
const CLIENT_SUB = gql`
  subscription ClientsUpdate($flightId: ID!) {
    clientChanged(flightId: $flightId) {
      id
      simulator {
        id
      }
      station {
        name
      }
    }
  }
`;
class CoreData extends Component {
  state = {};
  render() {
    const { flightId, history } = this.props;
    return (
      <Query query={QUERY} variables={{ id: flightId }}>
        {({ loading, data, subscribeToMore }) => {
          const { flights, clients } = data;
          if (loading || !flights) return null;
          if (
            !flights ||
            (flights.map(f => f.id).indexOf(flightId) === -1 &&
              flightId !== "c")
          ) {
            history.push("/");
            return null;
          }
          const flight = flightId ? flights.find(f => f.id === flightId) : {};
          const simulators = flight && flight.id ? flight.simulators : [];

          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { id: flightId },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      flights: subscriptionData.data.flightsUpdate
                    });
                  }
                })
              }
            >
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: CACHE_INVALID_SUB,
                    variables: { flight: flightId },
                    updateQuery: previousResult => {
                      window.location.reload();
                      return previousResult;
                    }
                  })
                }
              />
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: CLIENT_SUB,
                    variables: { flightId },
                    updateQuery: (previousResult, { subscriptionData }) => {
                      return Object.assign({}, previousResult, {
                        clients: subscriptionData.data.clientChanged
                      });
                    }
                  })
                }
              />
              <Core
                {...this.props}
                flight={flight}
                simulators={simulators}
                clients={clients}
              />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default CoreData;
