import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo, Mutation } from "react-apollo";
import { TypingField } from "../../generic/core";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const SHUTTLE_SUB = gql`
  subscription ShuttlesUpdate($simulatorId: ID) {
    dockingUpdate(simulatorId: $simulatorId, type: shuttlebay) {
      id
      name
      clamps
      compress
      doors
      image
      docked
      damage {
        damaged
      }
      direction
    }
  }
`;

class Shuttles extends Component {
  updateShuttle = (id, which, value) => {
    const mutation = gql`
      mutation UpdateShuttleBay($port: DockingPortInput!) {
        updateDockingPort(port: $port)
      }
    `;
    const port = {
      id
    };
    port[which] = value;
    this.props.client.mutate({
      mutation,
      variables: { port }
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.docking) return null;
    const { docking } = this.props.data;
    if (docking.length === 0) return <p>No Shuttlebays</p>;
    return (
      <div className="shuttles-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SHUTTLE_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  docking: subscriptionData.data.dockingUpdate
                });
              }
            })
          }
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th title="Clamps">Cl</th>
              <th title="Compress">Co</th>
              <th title="Doors">Do</th>
              <th title="Present">Pr</th>
              <th title="Direction">Dir</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {docking.map(d => (
              <tr key={d.id}>
                <td>
                  <Mutation
                    mutation={
                      d.damage.damaged
                        ? gql`
                            mutation FixSystem($id: ID!) {
                              repairSystem(systemId: $id)
                            }
                          `
                        : gql`
                            mutation DamageDockingPort($id: ID!) {
                              damageSystem(systemId: $id)
                            }
                          `
                    }
                    variables={{ id: d.id }}
                  >
                    {action => (
                      <TypingField
                        input
                        value={d.name}
                        alert={d.damage.damaged}
                        onBlur={evt =>
                          this.updateShuttle(d.id, "name", evt.target.value)
                        }
                        onDoubleClick={action}
                      />
                    )}
                  </Mutation>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={d.clamps}
                    onChange={evt =>
                      this.updateShuttle(d.id, "clamps", evt.target.checked)
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={d.compress}
                    onChange={evt =>
                      this.updateShuttle(d.id, "compress", evt.target.checked)
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={d.doors}
                    onChange={evt =>
                      this.updateShuttle(d.id, "doors", evt.target.checked)
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={d.docked}
                    onChange={evt =>
                      this.updateShuttle(d.id, "docked", evt.target.checked)
                    }
                  />
                </td>
                <td>
                  <select
                    style={{ height: "18px" }}
                    value={d.direction}
                    onChange={evt =>
                      this.updateShuttle(d.id, "direction", evt.target.value)
                    }
                  >
                    <option value='unspecified'>Unspecified</option>
                    <option value='arriving'>Arriving</option>
                    <option value='departing'>Departing</option>
                  </select>
                </td>
                <td>
                  <select
                    style={{ height: "18px" }}
                    value={d.image}
                    onChange={evt =>
                      this.updateShuttle(d.id, "image", evt.target.value)
                    }
                  >
                    <option disabled>Select an image</option>
                    {this.props.data.assetFolders[0].objects.map(a => (
                      <option key={a.id} value={a.fullPath}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <small>Double click name to damage/repair</small>
      </div>
    );
  }
}

const SHUTTLE_QUERY = gql`
  query Shuttles($simulatorId: ID, $names: [String]) {
    docking(simulatorId: $simulatorId, type: shuttlebay) {
      id
      name
      clamps
      compress
      doors
      image
      docked
      damage {
        damaged
      }
      direction
    }
    assetFolders(names: $names) {
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
export default graphql(SHUTTLE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id,
      names: ["Docking Images"]
    }
  })
})(withApollo(Shuttles));
