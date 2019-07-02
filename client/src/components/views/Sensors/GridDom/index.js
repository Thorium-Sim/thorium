import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Grid from "./grid";
import "./style.scss";

const fragment = gql`
  fragment ContactData on SensorContact {
    id
    name
    size
    color
    icon
    picture
    speed
    type
    rotation
    location {
      x
      y
      z
    }
    destination {
      x
      y
      z
    }
    position {
      x
      y
      z
    }
    startTime
    endTime
    infrared
    cloaked
    destroyed
    forceUpdate
    targeted
    locked
    disabled
    hostile
  }
`;

export const QUERY = gql`
  query Contacts($sensorsId: ID) {
    sensorContacts(sensorsId: $sensorsId) {
      ...ContactData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription SensorContactsChanged($sensorId: ID) {
    sensorContactUpdate(sensorId: $sensorId) {
      ...ContactData
    }
  }
  ${fragment}
`;

class GridData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ sensorsId: this.props.sensor }}>
        {({ loading, data, subscribeToMore, client }) => {
          const { sensorContacts } = data;
          if (loading || !sensorContacts) return null;
          if (!sensorContacts) return <div>No Contacts</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { sensorId: this.props.sensor },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      sensorContacts: subscriptionData.data.sensorContactUpdate
                    });
                  }
                })
              }
            >
              <Grid {...this.props} client={client} contacts={sensorContacts} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default GridData;
