import React from "react";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag";
import {Query} from "@apollo/client/react/components";
import TorpedoInventory from "@client/cards/TorpedoLoading/inventory";

const TORPEDO_QUERY = gql`
  query Torpedo($id: ID!) {
    torpedo(id: $id) {
      id
      inventory {
        id
        type
        probe {
          id
          name
          launched
        }
      }
    }
  }
`;

const Torpedo = props => {
  const {id} = props;
  return (
    <GenericSystemConfig {...props}>
      <Query query={TORPEDO_QUERY} variables={{id}}>
        {({data, loading}) => {
          if (loading) return null;
          const {torpedo} = data;
          return (
            <TorpedoInventory
              {...torpedo}
              refetchQueries={[{query: TORPEDO_QUERY, variables: {id}}]}
            />
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};
export default Torpedo;
