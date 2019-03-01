import React from "react";
import { Query, Mutation } from "react-apollo";
import { TypingField } from "../../generic/core";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const fragment = gql`
  fragment DockingCoreData on DockingPort {
    id
    name
    shipName
    clamps
    compress
    doors
    image
    docked
    damage {
      damaged
    }
  }
`;

const QUERY = gql`
  query Docking($simulatorId: ID!) {
    docking(simulatorId: $simulatorId, type: dockingport) {
      ...DockingCoreData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription DockingUpdate($simulatorId: ID!) {
    dockingUpdate(simulatorId: $simulatorId, type: dockingport) {
      ...DockingCoreData
    }
  }
  ${fragment}
`;

const DockingPortCore = ({ docking }) => (
  <div className="dockingPort-core">
    <table>
      <thead>
        <tr>
          <th>Port Name</th>
          <th>Ship Name</th>
          <th title="Clamps">Clamps</th>
          <th title="Doors">Ramps</th>
          <th title="Present">Present</th>
          {/* <th title="Direction">Dir</th>
              <th>Image</th> */}
        </tr>
      </thead>
      <Mutation
        mutation={gql`
          mutation UpdateShuttleBay($port: DockingPortInput!) {
            updateDockingPort(port: $port)
          }
        `}
      >
        {update => (
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
                          update({
                            variables: {
                              port: { id: d.id, name: evt.target.value }
                            }
                          })
                        }
                        onDoubleClick={action}
                      />
                    )}
                  </Mutation>
                </td>
                <td>
                  <TypingField
                    input
                    value={d.shipName}
                    onBlur={evt =>
                      update({
                        variables: {
                          port: { id: d.id, shipName: evt.target.value }
                        }
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={d.clamps}
                    onChange={evt =>
                      update({
                        variables: {
                          port: { id: d.id, clamps: evt.target.checked }
                        }
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={d.doors}
                    onChange={evt =>
                      update({
                        variables: {
                          port: { id: d.id, doors: evt.target.checked }
                        }
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={d.docked}
                    onChange={evt => {
                      let { shipName: dShipName } = d;
                      if (evt.target.checked === true) {
                        if (!dShipName)
                          dShipName = prompt("What is the name of the ship?");
                      }
                      update({
                        variables: {
                          port: {
                            id: d.id,
                            docked: evt.target.checked,
                            shipName: dShipName
                          }
                        }
                      });
                    }}
                  />
                </td>
                {/* <td>
                  <select
                    style={{ height: "18px" }}
                    value={d.direction}
                    onChange={evt =>
                    update({variables:{port:{id:d.id, direction:evt.target.value}}})
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
                    update({variables:{port:{id:d.id, image:evt.target.value}}})
                    }
                  >
                    <option disabled>Select an image</option>
                    {this.props.data.assetFolders[0].objects.map(a => (
                      <option key={a.id} value={a.fullPath}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </td> */}
              </tr>
            ))}
          </tbody>
        )}
      </Mutation>
    </table>
    <small>Double click name to damage/repair</small>
  </div>
);

const DockingPortData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { docking } = data;
      if (loading || !docking) return null;
      if (docking.length === 0) return <div>No Docking Ports</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  docking: subscriptionData.data.dockingUpdate
                });
              }
            })
          }
        >
          <DockingPortCore {...props} docking={docking} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default DockingPortData;
