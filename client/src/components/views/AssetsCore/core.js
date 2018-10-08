import React from "react";
import Assets from "../../../containers/FlightDirector/SimulatorConfig/config/Assets";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

const queryData = `
id
name
date
running
simulators {
  id
  name
  layout
  stations {
    name
    cards {
      name
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
`;

const query = gql`query Flights($id: ID!) {
  flights(id: $id) {
${queryData}
  }
  clients(flightId:$id) {
    id
    simulator {
      id
    }
    station {
      name
    }
  }
}`;
const AssetsCore = props => {
  return (
    <Assets
      update={() => {
        props.client.query({ query, variables: { id: props.flight.id } });
      }}
      selectedSimulator={props.simulator}
    />
  );
};

export default withApollo(AssetsCore);
