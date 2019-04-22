import React, { useState } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import {
  Table,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalFooter
} from "reactstrap";

const DockingConfig = ({ data, selectedSimulator, client }) => {
  const [settingPosition, setSettingPosition] = useState(false);
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

  const { docking, assetFolders, decks } = data;
  if (!docking) return null;
  const settingPort = docking.find(d => d.id === settingPosition);
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
            {docking
              .filter(d => d.type === "shuttlebay")
              .map(d => (
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
                    {assetFolders[0] ? (
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
                    ) : (
                      <p>
                        Make sure you have a 'Docking Images' folder inside your
                        assets folder.
                      </p>
                    )}
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
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {docking
              .filter(d => d.type === "dockingport")
              .map(d => (
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
                      color="warning"
                      size="xs"
                      onClick={() => setSettingPosition(d.id)}
                    >
                      Set Position
                    </Button>
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
      <fieldset className="form-group">
        <label>Specialized Docking</label>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Deck</th>
              <th>Image</th>
              <th>Preview</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {docking
              .filter(d => d.type === "specialized")
              .map(d => (
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
                      value={(d.deck && d.deck.id) || ""}
                      onChange={evt =>
                        updateDocking(d.id, "deckId", evt.target.value)
                      }
                    >
                      <option value="" disabled>
                        No Deck
                      </option>
                      {decks
                        .concat()
                        .sort((a, b) => {
                          if (a.number > b.number) return 1;
                          if (a.number < b.number) return -1;
                          return 0;
                        })
                        .map(d => (
                          <option key={d.id} value={d.id}>
                            Deck {d.number}
                          </option>
                        ))}
                    </Input>
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
                    <img
                      alt="Specialized Docking"
                      src={`/assets${d.image}`}
                      width="40"
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
        <Button color="success" onClick={() => addDocking("specialized")}>
          Add Specialized Docking
        </Button>
      </fieldset>
      {settingPort && (
        <Modal
          isOpen={settingPosition}
          toggle={() => setSettingPosition(false)}
          size="lg"
        >
          <ModalHeader toggle={() => setSettingPosition(false)}>
            <div>Set Docking Port Position: {settingPort.name}</div>
            <small>
              Click where this docking port should go on the ship image.
            </small>
          </ModalHeader>
          <div style={{ position: "relative" }}>
            <img
              src={`/assets${selectedSimulator.assets.top}`}
              alt="Ship Top"
              draggable="false"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                cursor: "pointer"
              }}
              onClick={e => {
                const {
                  height,
                  width,
                  top,
                  left
                } = e.target.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;
                updateDocking(settingPosition, "position", { x, y, z: 0 });
              }}
            />
            <div
              className="port-positioner"
              style={{
                transform: `translate(${(settingPort.position.x || 0) *
                  100}%, ${(settingPort.position.y || 0) * 100}%)`
              }}
            >
              <div className="port-position" />
            </div>
          </div>
          <ModalFooter>
            <Button color="primary" onClick={() => setSettingPosition(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

const DOCKING_QUERY = gql`
  query DockingConfig($id: ID!) {
    docking(simulatorId: $id) {
      id
      name
      type
      image
      deck {
        id
      }
      position {
        x
        y
      }
    }
    decks(simulatorId: $id) {
      id
      number
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
