import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { Button } from "reactstrap";

const Destroyed = ({ hypercard, clientId }) => {
  return (
    <div className="card-crm-destroyed">
      <h1>Fighter is Destroyed</h1>
      {hypercard && (
        <Mutation
          mutation={gql`
            mutation Hypercard($clientId: ID!) {
              setClientHypercard(clientId: $clientId, component: null)
            }
          `}
          variables={{ clientId }}
        >
          {action => (
            <Button
              size="lg"
              color="danger"
              onClick={action}
              className="station-control"
            >
              Return Normal Station Control
            </Button>
          )}
        </Mutation>
      )}
    </div>
  );
};

export default Destroyed;
