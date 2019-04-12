import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export const Toggle = ({ id, interfaceId, config, value = {} }) => {
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
        <div
          onClick={() => action()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <svg viewBox="0 0 80 160" width="40" height="80">
            <circle cx="40" cy="80" r="40" fill="#4e4e4e" />
            <ellipse cx="40.5" cy="81" rx="28.5" ry="29" fill="#303030" />
            <circle cx="40" cy="80" r="28" fill="#999" />
            <circle cx="40" cy="80" r="8" fill="#5e5e5e" />
            <ellipse
              cx="40.165"
              cy="80.159"
              rx="7.835"
              ry="7.841"
              fill="#2a2a2a"
            />
            {value.level ? (
              <path
                id="up"
                d="M23.594,21.468C23.207,20.044 23,18.546 23,17C23,7.617 30.617,0 40,0C49.383,0 57,7.617 57,17C57,18.38 56.835,19.722 56.524,21.007L56.524,21.007L56.524,21.009C56.429,21.399 40,80 40,80C40,80 23.617,21.553 23.597,21.477L23.594,21.468L23.594,21.468Z"
                fill="#bbb"
              />
            ) : (
              <path
                id="down"
                d="M56.406,138.532C56.793,139.956 57,141.454 57,143C57,152.383 49.383,160 40,160C30.617,160 23,152.383 23,143C23,141.62 23.165,140.278 23.476,138.993L23.476,138.993L23.476,138.991C23.571,138.601 40,80 40,80C40,80 56.383,138.447 56.403,138.523L56.406,138.532L56.406,138.532Z"
                fill="#bbb"
              />
            )}
          </svg>
          {config.objectLabel && (
            <p style={{ color: "white" }}>{config.objectLabel}</p>
          )}
        </div>
      )}
    </Mutation>
  );
};
