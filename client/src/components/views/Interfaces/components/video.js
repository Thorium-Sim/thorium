import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export const CompVideo = ({ id, interfaceId, config = {} }) => {
  const { autoPlay = true, loop = true } = config;
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
          <video
            src={`/assets${config.src}`}
            style={{
              width: `${config.width || 50}px`,
              height: config.height ? `${config.height}px` : null,
              objectFit: "fill"
            }}
            autoPlay={autoPlay}
            muted
            loop={loop}
            playsInline
            alt={config.label}
            draggable={false}
          />
        </div>
      )}
    </Mutation>
  );
};
