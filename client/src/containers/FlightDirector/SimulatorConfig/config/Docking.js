import React from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Table, Button, Input } from "reactstrap";

const DockingConfig = ({ data, selectedSimulator, client }) => {
  function addDocking(type = "shuttlebay") {
    const mutation = gql`
      mutation CreateShuttlebay($port: DockingPortInput!) {
        createDockingPort(port: $port)
      }
    `;
    const variables = {
      port: {
        simulatorId: selectedSimulator.id,
        type
      }
    };
    console.log(variables);
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["DockingConfig"]
    });
  }

  function removeDocking(id) {
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

  function updateDocking(id, which, value) {
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
            {docking.filter(d => d.type === "shuttlebay").map(d => (
              <tr key={d.id}>
                <td>
                  <Input
                    defaultValue={d.name || ""}
                    onChange={evt =>
                      updateDocking(d.id, "name", evt.target.value)
                    }
                  />
                </td>
                <td>
                  <Input
                    type="select"
                    value={d.image || ""}
                    onChange={evt =>
                      updateDocking(d.id, "image", evt.target.value)
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
                  <img alt="Shuttle" src={`/assets${d.image}`} width="40" />
                </td>
                <td>
                  <Button
                    color="danger"
                    size="xs"
                    onClick={() => removeDocking(d.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button color="success" onClick={() => addDocking("shuttlebay")}>
          Add Shuttlebay
        </Button>
      </fieldset>
      <fieldset className="form-group">
        <label>Docking Ports</label>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {docking.filter(d => d.type === "dockingport").map(d => (
              <tr key={d.id}>
                <td>
                  <Input
                    defaultValue={d.name || ""}
                    onChange={evt =>
                      updateDocking(d.id, "name", evt.target.value)
                    }
                  />
                </td>

                <td>
                  <Button
                    color="danger"
                    size="xs"
                    onClick={() => removeDocking(d.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button color="success" onClick={() => addDocking("dockingport")}>
          Add Docking Port
        </Button>
      </fieldset>
    </div>
  );
};

const DOCKING_QUERY = gql`
  query DockingConfig($id: ID) {
    docking(simulatorId: $id) {
      id
      name
      type
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
