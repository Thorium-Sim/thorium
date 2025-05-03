import React from "react";
import RoomSearch from "../CommInternal/roomSearch";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";

export const ROOM_SEARCH_QUERY = gql`
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
    <Query
      query={ROOM_SEARCH_QUERY}
      variables={{simulatorId: props.simulator.id}}
    >
      {({loading, data}) =>
        loading || !data ? null : <RoomSearch decks={data.decks} />
      }
    </Query>
  );
};

export default RoomSearchData;
