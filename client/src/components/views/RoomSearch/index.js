import React from "react";
import RoomSearch from "../CommInternal/roomSearch";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";

const QUERY = gql`
  query Decks($simulatorId: ID!) {
    decks(simulatorId: $simulatorId) {
      id
      number
      rooms {
        id
        name
      }
    }
  }
`;

const RoomSearchData = props => {
  return (
    <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
      {({ loading, data: { decks } }) =>
        loading ? null : <RoomSearch decks={decks} />
      }
    </Query>
  );
};

export default RoomSearchData;
