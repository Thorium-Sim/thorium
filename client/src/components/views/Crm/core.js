import React from "react";
import { withApollo, Query, Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { InputField } from "../../generic/core";
import { Table, Button, ButtonGroup } from "reactstrap";
import FileExplorer from "components/views/TacticalMap/fileExplorer";

import "./style.scss";

const fragment = gql`
  fragment CrmCoreData on Crm {
    id
    fighterImage
    fighterCount
    fighterDestroyedCount
    enemyCount
    enemyDestroyedCount
    fighterIcon
    enemyIcon
    fighters {
      id
      client {
        id
        station {
          name
        }
      }
      frags
      docked
      destroyed
    }
  }
`;

const QUERY = gql`
  query Crm($simulatorId: ID!) {
    crm(simulatorId: $simulatorId) {
      ...CrmCoreData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription CrmUpdate($simulatorId: ID!) {
    crmUpdate(simulatorId: $simulatorId) {
      ...CrmCoreData
    }
  }
  ${fragment}
`;
const CrmCore = ({
  id,
  simulator,
  fighters,
  fighterCount,
  fighterDestroyedCount,
  enemyCount,
  enemyDestroyedCount,
  fighterImage,
  fighterIcon,
  enemyIcon,
  attacking,
  client
}) => {
  const [imagePick, setImagePick] = React.useState(null);
  const images = { fighterImage, fighterIcon, enemyIcon };
  const mutations = {
    fighterImage: gql`
      mutation Image($id: ID!, $image: String!) {
        crmSetFighterImage(id: $id, image: $image)
      }
    `,
    fighterIcon: gql`
      mutation Image($id: ID!, $image: String!) {
        crmSetFighterIcon(id: $id, image: $image)
      }
    `,
    enemyIcon: gql`
      mutation Image($id: ID!, $image: String!) {
        crmSetEnemyIcon(id: $id, image: $image)
      }
    `
  };
  if (imagePick) {
    return (
      <FileExplorer
        directory={
          imagePick === "fighterImage"
            ? "/Docking Images"
            : "/Sensor Contacts/Icons"
        }
        selectedFiles={[images[imagePick]]}
        onClick={(evt, container) => {
          const variables = { id, image: container.fullPath };
          client.mutate({ mutation: mutations[imagePick], variables });
          setImagePick(null);
        }}
      />
    );
  }
  return (
    <div className="crm-core">
      <ButtonGroup>
        <Mutation
          mutation={gql`
            mutation SetClientHypercard($simulatorId: ID, $component: String) {
              setClientHypercard(
                component: $component
                simulatorId: $simulatorId
              )
            }
          `}
          variables={{
            component: "CrmFighter",
            simulatorId: simulator.id
          }}
        >
          {action => (
            <Button color="success" size="sm" onClick={action}>
              Activate All Stations
            </Button>
          )}
        </Mutation>
        <Mutation
          mutation={gql`
            mutation SetClientHypercard($simulatorId: ID, $component: String) {
              setClientHypercard(
                component: $component
                simulatorId: $simulatorId
              )
            }
          `}
          variables={{
            component: "CrmFighter",
            simulatorId: simulator.id
          }}
        >
          {action => (
            <Button color="warning" size="sm" onClick={action}>
              Deactivate All Stations
            </Button>
          )}
        </Mutation>
      </ButtonGroup>
      <div>
        <label>
          <Mutation
            mutation={gql`
              mutation Attack($id: ID!, $attacking: Boolean!) {
                crmSetAttacking(id: $id, attacking: $attacking)
              }
            `}
          >
            {action => (
              <input
                type="checkbox"
                checked={attacking}
                onClick={e =>
                  action({ variables: { id, attacking: e.target.checked } })
                }
              />
            )}
          </Mutation>{" "}
          Enemies are attacking
        </label>
      </div>
      <div className="crm-images">
        <div className="crm-image" onClick={() => setImagePick("fighterImage")}>
          <p>Fighter Image</p>
          <img src={`/assets${fighterImage}`} draggable={false} alt="" />
        </div>
        <div className="crm-image" onClick={() => setImagePick("fighterIcon")}>
          <p>Fighter Icon</p>
          <img src={`/assets${fighterIcon}`} draggable={false} alt="" />
        </div>
        <div className="crm-image" onClick={() => setImagePick("enemyIcon")}>
          <p>Enemy Icon</p>
          <img src={`/assets${enemyIcon}`} draggable={false} alt="" />
        </div>
      </div>
      <div className="crm-clients">
        <Table size="sm">
          <thead>
            <tr>
              <th>Client</th>
              <th>Station</th>
              <th>Docked</th>
              <th>Destroyed</th>
              <th>Frags</th>
            </tr>
          </thead>
          <tbody>
            {fighters.map(f => (
              <tr key={f.id}>
                <td>{f.client && f.client.id}</td>
                <td>{f.client && f.client.station.name}</td>
                <td>{f.docked ? "🔵" : null}</td>
                <td>
                  {f.destroyed ? (
                    <>
                      🔴
                      <Mutation
                        mutation={gql`
                          mutation Restore($id: ID!, $clientId: ID!) {
                            crmRestoreFighter(id: $id, clientId: $clientId)
                          }
                        `}
                        variables={{ id, clientId: f.client && f.client.id }}
                      >
                        {action => (
                          <Button onClick={action} color="success" size="sm">
                            Restore
                          </Button>
                        )}
                      </Mutation>
                    </>
                  ) : null}
                </td>
                <td>{f.frags}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="crm-stats">
        <div>
          (Alive/Total) Fighters : {fighterCount - fighterDestroyedCount} /{" "}
          {fighterCount}
        </div>
        <div>
          Enemies: {enemyCount - enemyDestroyedCount} /{" "}
          <Mutation
            mutation={gql`
              mutation EnemyCount($id: ID!, $count: Int!) {
                crmSetEnemyCount(id: $id, count: $count)
              }
            `}
          >
            {action => (
              <InputField
                onClick={e => action({ variables: { id, count: e } })}
                style={{ display: "inline-block", width: "30px" }}
                prompt={
                  "What would you like to change the enemy count to? (This will adjust the destroyed count.)"
                }
              >
                {enemyCount}
              </InputField>
            )}
          </Mutation>
        </div>
      </div>
    </div>
  );
};

const CrmData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { crm } = data;
      if (loading) return null;
      if (!crm) return <div>No CRM System</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  crm: subscriptionData.data.crmUpdate
                });
              }
            })
          }
        >
          <CrmCore {...props} {...crm} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default withApollo(CrmData);
