import React from "react";
import {Button} from "helpers/reactstrap";
import gql from "graphql-tag";
import {withApollo} from "@apollo/client/react/hoc";

const PathConfig = ({client, tacticalMapId, layerId}) => {
  const addPath = () => {
    const mutation = gql`
      mutation AddTacticalPath(
        $mapId: ID!
        $layerId: ID!
        $path: TacticalPathInput!
      ) {
        addTacticalMapPath(mapId: $mapId, layerId: $layerId, path: $path)
      }
    `;
    const variables = {
      mapId: tacticalMapId,
      layerId: layerId,
      path: {},
    };
    client.mutate({
      mutation,
      variables,
    });
  };
  return (
    <div>
      <Button onClick={addPath}>Add Path</Button>
    </div>
  );
};
export default withApollo(PathConfig);
