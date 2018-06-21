import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Input } from "reactstrap";
import { titleCase } from "change-case";
import Views from "../index";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.css";

const TEMPLATE_SUB = gql`
  subscription ClientsUpdate($simulatorId: ID) {
    clientChanged(simulatorId: $simulatorId) {
      id
      station {
        name
      }
      hypercard
      loginName
    }
  }
`;

class ClientCore extends Component {
  setHypercard = (clientId, component, simulatorId) => {
    const mutation = gql`
      mutation SetClientHypercard(
        $clientId: ID
        $simulatorId: ID
        $component: String
      ) {
        setClientHypercard(
          clientId: $clientId
          component: $component
          simulatorId: $simulatorId
        )
      }
    `;
    const variables = {
      clientId,
      component: component === "null" ? null : component,
      simulatorId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const { clients } = this.props.data;
    if (!clients) return null;
    const viewList = Object.keys(Views)
      .filter(v => !Views[v].hypercard)
      .concat()
      .sort()
      .map((v, i) => (
        <option key={`${i}-${v}`} value={v}>
          {titleCase(v)}
        </option>
      ));
    const hypercardList = Object.keys(Views)
      .filter(v => Views[v].hypercard)
      .concat()
      .sort()
      .map((v, i) => (
        <option key={`${i}-${v}`} value={v}>
          {titleCase(v)}
        </option>
      ));
    return (
      <div className="clients-card">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TEMPLATE_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  clients: subscriptionData.data.clientChanged
                });
              }
            })
          }
        />
        <Input
          className="hypercard-picker"
          value={"nothing"}
          onChange={e =>
            this.setHypercard(null, e.target.value, this.props.simulator.id)
          }
          type="select"
        >
          <option value="nothing" disabled>
            Change all clients
          </option>
          <option value="null">No Hypercard</option>
          <optgroup label="Designed to be Hypercards">{hypercardList}</optgroup>
          <optgroup label="Standard Cards">{viewList}</optgroup>
        </Input>
        {clients.map(c => (
          <div key={c.id}>
            <span>{`${c.id} - ${
              c.station ? c.station.name : ""
            } - ${c.loginName || ""}`}</span>
            <Input
              className="hypercard-picker"
              value={c.hypercard === null ? "null" : c.hypercard}
              onChange={e => this.setHypercard(c.id, e.target.value)}
              type="select"
            >
              <option value="null">No Hypercard</option>
              <optgroup label="Designed to be Hypercards">
                {hypercardList}
              </optgroup>
              <optgroup label="Standard Cards">{viewList}</optgroup>
            </Input>
          </div>
        ))}
      </div>
    );
  }
}

const TEMPLATE_QUERY = gql`
  query Clients($simulatorId: ID) {
    clients(simulatorId: $simulatorId) {
      id
      station {
        name
      }
      hypercard
      loginName
    }
  }
`;
export default graphql(TEMPLATE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ClientCore));
