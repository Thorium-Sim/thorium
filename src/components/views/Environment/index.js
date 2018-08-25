import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import Environment from "./environment";
import "./style.css";
/*
Cool. We're here.$
Type here if you can see htis.
I can see htis
.Okay. QUick review. Come down there 
*/
const queryData = `
id
number
environment{
  nitrogen
  oxygen
  trace
  temperature
  humidity
  gravity
  pressure
}
`;
// This is a graph QL query. We wrote it to get the data that we need from our decks
const QUERY = gql`
  query Environment($simulatorId: ID!) {
    decks(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription EnvironmentUpdate($simulatorId: ID!) {
    decksUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

// These two things take the data above and convert them into a query call and a subscription call
// Can you tell me what the subscription will do?
//You can say "I don't remember
//If I remember, I think it will "subscribe" to the server for more information. So every time
//There is a change on the server side, the subscription will update the front end. That's what
//i remember Nice. You've got it.

// This stuff below is just a wrapper to get all of the data.
// It will take the initial data from the query and any new
// data from the Subscription and pass that data... those data... whatever
// to the Environment componnet, which is in the 'environment.js' file. That's
// where teh fun stuff happens. This looks like it is wired up right, so lets
// go to the environment file. I'm just going to delete these comments.
// Before we go, do you have any questions?
//Yeah, just let me copy down this stuff for reference later. That ok?
// I won't delete it then. Just make sure you delete it before you commit to Git
//K ^.^
//K, lets go over to environment.jsBoom
class EnvironmentData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { decks } = data;
          if (loading || !decks) return null;

          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      decks: subscriptionData.data.decksUpdate
                    });
                  }
                })
              }
            >
              <Environment {...this.props} decks={decks} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}

export default EnvironmentData;
