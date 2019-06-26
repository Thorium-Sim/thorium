import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export const CompImage = ({ id, interfaceId, config }) => {
  return (
    <Mutation
      mutation={gql`
        mutation TriggerInterface($id: ID!, $objectId: ID!) {
          triggerInterfaceObject(id: $id, objectId: $objectId)
        }
      `}
      variables={{ id: interfaceId, objectId: id }}
    >
      {action => (
        <div onClick={() => action().catch(err => console.log(err))}>
          <img
            style={{
              width: parseFloat(config.width) || 50,
              height: parseFloat(config.height),
              resizeMode: "stretch"
            }}
            alt=""
            src={`/assets${config.src}`}
          />
        </div>
      )}
    </Mutation>
  );
};
