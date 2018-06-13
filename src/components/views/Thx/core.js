import React from "react";
import { Row, Col, Progress, Button } from "reactstrap";
import { OutputField } from "../../generic/core";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.css";

const queryData = `
id
name
clients {
  id
  lock
  charge
  station
}
activated
`;

const QUERY = gql`
  query THX($simulatorId: ID!) {
    thx(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription THXUpdate($simulatorId: ID!) {
    thxUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

const THXCore = ({ activated, name, clients, id }) => (
  <div className="thx-core">
    <Mutation
      mutation={gql`
        mutation ActivateTHX($id: ID!) {
          activateThx(id: $id)
        }
      `}
      variables={{ id }}
    >
      {activate => (
        <Mutation
          mutation={gql`
            mutation ActivateTHX($id: ID!) {
              deactivateThx(id: $id)
            }
          `}
          variables={{ id }}
        >
          {deactivate => (
            <OutputField
              alert={activated}
              onDoubleClick={activated ? deactivate : activate}
            >
              {activated ? "Activated" : "Deactivated"}
            </OutputField>
          )}
        </Mutation>
      )}
    </Mutation>
    <Mutation
      mutation={gql`
        mutation Reset($id: ID!) {
          resetThx(id: $id)
        }
      `}
      variables={{ id }}
    >
      {action => (
        <Button block size="sm" color="warning" onClick={action}>
          Reset {name}
        </Button>
      )}
    </Mutation>
    {clients.map(c => (
      <Row key={`client-${c.id}`}>
        <Col sm={3}>
          {c.id} ({c.station})
        </Col>
        <Col sm={3} />
        <Col sm={6}>
          <Progress value={c.charge} max={1}>
            {Math.round(c.charge * 100)}%
          </Progress>
        </Col>
      </Row>
    ))}
  </div>
);

const THXData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { thx } = data;
      if (loading || !thx) return null;
      if (!thx[0]) return <div>No THX</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  thx: subscriptionData.data.thxUpdate
                });
              }
            })
          }
        >
          <THXCore {...props} {...thx[0]} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default THXData;
