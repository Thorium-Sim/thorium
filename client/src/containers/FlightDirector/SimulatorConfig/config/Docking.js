import React from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Table, Button, Input } from "reactstrap";
import { Asset } from "../../../../helpers/assets";
const DockingConfig = ({ data, selectedSimulator, client }) => {
  function addShuttle() {
    const mutation = gql`
      mutation CreateShuttlebay($port: DockingPortInput!) {
        createDockingPort(port: $port)
      }
    `;
    const variables = {
      port: {
        simulatorId: selectedSimulator.id,
        type: "shuttlebay"
      }
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["DockingConfig"]
    });
  }

  function removeShuttle(id) {
    const mutation = gql`
      mutation RemoveShuttlebay($id: ID!) {
        removeDockingPort(port: $id)
      }
    `;
    const variables = {
      id
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["DockingConfig"]
    });
  }

  function updateShuttle(id, which, value) {
    const mutation = gql`
      mutation UpdateShuttleBay($port: DockingPortInput!) {
        updateDockingPort(port: $port)
      }
    `;
    const port = {
      id
    };
    port[which] = value;
    client.mutate({
      mutation,
      variables: { port },
      refetchQueries: ["DockingConfig"]
    });
  }

  const { docking, assetFolders } = data;
  if (!docking) return null;
  return (
    <div className="docking-config">
      <fieldset className="form-group">
        <label>Shuttlebays</label>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Preview</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {docking.map(d => (
              <tr key={d.id}>
                <td>
                  <Input
                    defaultValue={d.name || ""}
                    onChange={evt =>
                      updateShuttle(d.id, "name", evt.target.value)
                    }
                  />
                </td>
                <td>
                  <Input
                    type="select"
                    value={d.image || ""}
                    onChange={evt =>
                      updateShuttle(d.id, "image", evt.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select An Image
                    </option>
                    {assetFolders[0].objects.map(a => (
                      <option key={a.id} value={a.fullPath}>
                        {a.name}
                      </option>
                    ))}
                  </Input>
                </td>
                <td>
                  <Asset asset={d.image}>
                    {({ src }) => <img alt="Shuttle" src={src} width="40" />}
                  </Asset>
                </td>
                <td>
                  <Button
                    color="danger"
                    size="xs"
                    onClick={() => removeShuttle(d.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button color="success" onClick={addShuttle}>
          Add Shuttlebay
        </Button>
      </fieldset>
      <fieldset className="form-group">
        <label>Docking Ports</label>
      </fieldset>
    </div>
  );
};

const DOCKING_QUERY = gql`
  query DockingConfig($id: ID) {
    docking(simulatorId: $id, type: shuttlebay) {
      id
      name
      image
    }
    assetFolders(names: ["Docking Images"]) {
      id
      name
      objects {
        id
        name
        fullPath
      }
    }
  }
`;

export default graphql(DOCKING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      id: ownProps.selectedSimulator.id
    }
  })
})(withApollo(DockingConfig));
