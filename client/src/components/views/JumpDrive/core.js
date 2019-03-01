import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { Table, Button } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { OutputField, InputField } from "../../generic/core";
import { titleCase } from "change-case";
import "./style.scss";

const fragment = gql`
  fragment JumpDriveData on JumpDrive {
    id
    name
    displayName
    stress
    power {
      power
    }
    sectors {
      aft {
        level
        offset
      }
      fore {
        level
        offset
      }
      port {
        level
        offset
      }
      starboard {
        level
        offset
      }
    }
    env
    enabled
    activated
  }
`;

const QUERY = gql`
  query JumpDrive($simulatorId: ID!) {
    jumpDrive(simulatorId: $simulatorId) {
      ...JumpDriveData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription JumpDriveUpdate($simulatorId: ID!) {
    jumpDriveUpdate(simulatorId: $simulatorId) {
      ...JumpDriveData
    }
  }
  ${fragment}
`;

const JumpDriveCore = ({
  id,
  power: { power },
  sectors,
  env,
  activated,
  stress,
  enabled
}) => (
  <div className="jumpDrive-core">
    <Mutation
      mutation={gql`
        mutation ActivateJumpdrive($id: ID!, $activated: Boolean!) {
          setJumpdriveActivated(id: $id, activated: $activated)
        }
      `}
    >
      {action => (
        <OutputField
          onClick={() => action({ variables: { id, activated: !activated } })}
          alert={activated}
        >
          {activated ? "Activated" : "Deactivated"}
        </OutputField>
      )}
    </Mutation>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p>Total Power: {power}</p>
      <label>
        <Mutation
          mutation={gql`
            mutation SetJumpDriveEnabled($id: ID!, $enabled: Boolean!) {
              setJumpDriveEnabled(id: $id, enabled: $enabled)
            }
          `}
          variables={{ id, enabled: !enabled }}
        >
          {action => (
            <input type="checkbox" checked={enabled} onChange={action} />
          )}
        </Mutation>
        Enabled
      </label>
      <span>
        Current Envelope:{" "}
        <Mutation
          mutation={gql`
            mutation SetJumpDriveEnv($id: ID!, $env: Float!) {
              setJumpdriveEnvs(id: $id, envs: $env)
            }
          `}
        >
          {action => (
            <InputField
              prompt={`What would you like to set the envelope level to (1 - 6)?`}
              onClick={val => {
                const env = parseFloat(val);
                if (!env || env < 1 || env > 6) return;
                action({ variables: { id, env } });
              }}
              style={{ display: "inline-block", width: "20px" }}
            >
              {Math.round(env * 100) / 100}
            </InputField>
          )}
        </Mutation>
      </span>
    </div>
    <Table size="sm">
      <thead>
        <tr>
          <th>Sector</th>
          <th>Power</th>
          <th>Stress</th>
        </tr>
      </thead>
      <tbody>
        {["fore", "aft", "port", "starboard"].map(s => (
          <tr key={s}>
            <td>{titleCase(s)}</td>
            <td>{sectors[s].level}</td>
            <td
              className={`${sectors[s].offset > 0.5 ? "text-warning" : ""} ${
                sectors[s].offset > 0.7 ? "text-danger" : ""
              }`}
            >
              {Math.round(sectors[s].offset * 100) / 100}{" "}
              <Mutation
                mutation={gql`
                  mutation HitStress($id: ID!, $sector: String!) {
                    hitJumpDriveStress(id: $id, sector: $sector)
                  }
                `}
                variables={{ id, sector: s }}
              >
                {action => (
                  <Button
                    style={{ float: "right" }}
                    size="sm"
                    color="warning"
                    onClick={action}
                  >
                    Hit
                  </Button>
                )}
              </Mutation>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <p>
      Total Stress: {Math.round(stress * 100) / 100}{" "}
      <Mutation
        mutation={gql`
          mutation HitStress($id: ID!, $sector: String!) {
            hitJumpDriveStress(id: $id, sector: $sector)
          }
        `}
        variables={{ id, sector: "all" }}
      >
        {action => (
          <Button size="sm" color="warning" onClick={action}>
            Hit All
          </Button>
        )}
      </Mutation>
    </p>
  </div>
);

const JumpDriveData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { jumpDrive } = data;
      if (loading || !jumpDrive) return null;
      if (!jumpDrive[0]) return <div>No JumpDrive</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  jumpDrive: subscriptionData.data.jumpDriveUpdate
                });
              }
            })
          }
        >
          <JumpDriveCore {...props} {...jumpDrive[0]} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default JumpDriveData;
