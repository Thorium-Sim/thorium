import { Query } from "@apollo/client";
import React from "react";
import gql from "graphql-tag.macro";
import {Button} from "helpers/reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const fragment = gql`
  fragment DeconCoreData on Sickbay {
    id
    deconActive
    deconProgram
    deconOffset
    deconLocation
    autoFinishDecon
  }
`;

export const DECON_CORE_QUERY = gql`
  query Sickbay($simulatorId: ID!) {
    sickbay(simulatorId: $simulatorId) {
      ...DeconCoreData
    }
  }
  ${fragment}
`;
export const DECON_CORE_SUB = gql`
  subscription SickbayUpdate($simulatorId: ID!) {
    sickbayUpdate(simulatorId: $simulatorId) {
      ...DeconCoreData
    }
  }
  ${fragment}
`;

const DecontaminationCore = ({
  id,
  deconActive,
  deconProgram,
  deconOffset,
  deconLocation,
  autoFinishDecon,
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
            onChange={e => action({variables: {id, finish: e.target.checked}})}
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
          variables={{id}}
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
  <Query query={DECON_CORE_QUERY} variables={{simulatorId: props.simulator.id}}>
    {({loading, data, subscribeToMore}) => {
      if (loading || !data) return null;
      const {sickbay} = data;
      if (!sickbay[0]) return <div>No Sickbay</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: DECON_CORE_SUB,
              variables: {simulatorId: props.simulator.id},
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  sickbay: subscriptionData.data.sickbayUpdate,
                });
              },
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
