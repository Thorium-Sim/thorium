import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Input } from "reactstrap";
import { titleCase } from "change-case";
import Views from "../index";
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
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: TEMPLATE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            clients: subscriptionData.data.clientChanged
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.internalSub && this.internalSub();
  }
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
    return (
      <div className="clients-card">
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
          {Object.keys(Views)
            .concat()
            .sort()
            .map((v, i) => (
              <option key={`${i}-${v}`} value={v}>
                {titleCase(v)}
              </option>
            ))}
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
              {Object.keys(Views)
                .concat()
                .sort()
                .map((v, i) => (
                  <option key={`client-${i}-${v}`} value={v}>
                    {titleCase(v)}
                  </option>
                ))}
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
