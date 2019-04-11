import React from "react";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export const CompButton = ({ id, interfaceId, config }) => {
  return (
    <Mutation
      mutation={gql`
        mutation TriggerInterface($id: ID!, $objectId: ID!) {
          triggerInterfaceObject(id: $id, objectId: $objectId)
        }
      `}
      variables={{ id: interfaceId, objectId: id }}
    >
      {action => <Button onClick={() => action()}>{config.objectLabel}</Button>}
    </Mutation>
  );
};
