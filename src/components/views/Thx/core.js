import React from "react";
import {Row, Col, Progress, Button, ButtonGroup} from "helpers/reactstrap";
import {OutputField} from "../../generic/core";
import {Query, Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const fragment = gql`
  fragment THXData on Thx {
    id
    name
    clients {
      id
      lock
      charge
      connected
      station {
        name
      }
      executive
    }
    activated
  }
`;

export const THX_CORE_QUERY = gql`
  query THX($simulatorId: ID!) {
    thx(simulatorId: $simulatorId) {
      ...THXData
    }
  }
  ${fragment}
`;
export const THX_CORE_SUB = gql`
  subscription THXUpdate($simulatorId: ID!) {
    thxUpdate(simulatorId: $simulatorId) {
      ...THXData
    }
  }
  ${fragment}
`;

const THXCore = ({simulator, activated, name, clients, id}) => (
  <div className="thx-core">
    <Mutation
      mutation={gql`
        mutation ActivateTHX($id: ID!) {
          activateThx(id: $id)
        }
      `}
      variables={{id}}
    >
      {activate => (
        <Mutation
          mutation={gql`
            mutation ActivateTHX($id: ID!) {
              deactivateThx(id: $id)
            }
          `}
          variables={{id}}
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
    <ButtonGroup>
      <Mutation
        mutation={gql`
          mutation Reset($id: ID!) {
            resetThx(id: $id)
          }
        `}
        variables={{id}}
      >
        {action => (
          <Button size="sm" color="warning" onClick={action}>
            Reset {name}
          </Button>
        )}
      </Mutation>
      <Mutation
        mutation={gql`
          mutation SetClientHypercard($simulatorId: ID, $component: String) {
            setClientHypercard(component: $component, simulatorId: $simulatorId)
          }
        `}
        variables={{
          component: "Thx",
          simulatorId: simulator.id,
        }}
      >
        {action => (
          <Button size="sm" color="danger" onClick={action}>
            Engage THX Control
          </Button>
        )}
      </Mutation>
      <Mutation
        mutation={gql`
          mutation SetClientHypercard($simulatorId: ID, $component: String) {
            setClientHypercard(component: $component, simulatorId: $simulatorId)
          }
        `}
        variables={{
          component: null,
          simulatorId: simulator.id,
        }}
      >
        {action => (
          <Button size="sm" color="info" onClick={action}>
            Disengage THX Control
          </Button>
        )}
      </Mutation>
    </ButtonGroup>
    {clients
      .filter(c => c.connected)
      .map(c => (
        <Row key={`client-${c.id}`}>
          <Col sm={6}>
            {c.id} ({c.station.name})
          </Col>
          <Col sm={6}>
            {c.executive ? (
              "Executive"
            ) : (
              <Progress
                value={c.charge}
                max={1}
                color={c.lock ? "danger" : "primary"}
              >
                {Math.round(c.charge * 100)}%
              </Progress>
            )}
          </Col>
        </Row>
      ))}
  </div>
);

const THXData = props => (
  <Query query={THX_CORE_QUERY} variables={{simulatorId: props.simulator.id}}>
    {({loading, data, subscribeToMore}) => {
      if (loading || !data) return null;
      const {thx} = data;
      if (!thx[0]) return <div>No THX</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: THX_CORE_SUB,
              variables: {simulatorId: props.simulator.id},
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  thx: subscriptionData.data.thxUpdate,
                });
              },
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
