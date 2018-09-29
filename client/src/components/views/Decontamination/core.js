import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const queryData = `
    id
    deconActive
    deconProgram
    deconOffset
    deconLocation
    autoFinishDecon
`;

const QUERY = gql`
  query Sickbay($simulatorId: ID!) {
    sickbay(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription SickbayUpdate($simulatorId: ID!) {
    sickbayUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

const DecontaminationCore = ({
  id,
  deconActive,
  deconProgram,
  deconOffset,
  deconLocation,
  autoFinishDecon
}) => (
  <div className="decontamination-core">
    <label>
      <Mutation
        mutation={gql`
          mutation AutoDecon($id: ID!, $finish: Boolean!) {
            setDeconAutoFinish(id: $id, finish: $finish)
          }
        `}
      >
        {action => (
          <input
            type="checkbox"
            checked={autoFinishDecon}
            onChange={e =>
              action({ variables: { id, finish: e.target.checked } })
            }
          />
        )}
      </Mutation>{" "}
      Auto-finish Decon Program
    </label>
    {deconActive ? (
      <div>
        <p className="text-danger">Decon Active</p>
        <p>Program: {deconProgram}</p>
        <p>Location: {deconLocation}</p>
        <p>Offset: {Math.round(deconOffset)}%</p>
        <Mutation
          mutation={gql`
            mutation FinishProgram($id: ID!) {
              completeDeconProgram(id: $id)
            }
          `}
          variables={{ id }}
        >
          {action => (
            <Button size="sm" color="warning" onClick={action}>
              Finish Program
            </Button>
          )}
        </Mutation>
      </div>
    ) : (
      <p>No active decon program</p>
    )}
  </div>
);

const DeconData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { sickbay } = data;
      if (loading || !sickbay) return null;
      if (!sickbay[0]) return <div>No Sickbay</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  sickbay: subscriptionData.data.sickbayUpdate
                });
              }
            })
          }
        >
          <DecontaminationCore {...props} {...sickbay[0]} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default DeconData;
