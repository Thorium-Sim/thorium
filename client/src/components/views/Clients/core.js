import React from "react";
import { Table } from "reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.scss";

const queryData = `
id
station {
  name
}
loginName
`;

const QUERY = gql`
  query Clients($simulatorId: ID!) {
    clients(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription ClientUpdate($simulatorId: ID!) {
    clientChanged(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

const excludedStations = ["Sound", "Viewscreen"];

const ClientCore = ({ clients }) => (
  <div className="client-card">
    <Table size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Station</th>
          <th>Client</th>
        </tr>
      </thead>
      <tbody>
        {clients
          .filter(
            c =>
              c.station &&
              c.station.name.indexOf("keyboard") === -1 &&
              excludedStations.indexOf(c.station.name) === -1
          )
          .concat()
          .sort((a, b) => {
            if (a.station.name > b.station.name) return 1;
            if (a.station.name < b.station.name) return -1;
            return 0;
          })
          .map(c => (
            <tr key={c.id}>
              <td>{c.loginName}</td>
              <td>{c.station.name}</td>
              <td>{c.id}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  </div>
);

const ClientData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { clients } = data;
      if (loading || !clients) return null;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  clients: subscriptionData.data.clientChanged
                });
              }
            })
          }
        >
          <ClientCore {...props} clients={clients} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default ClientData;
