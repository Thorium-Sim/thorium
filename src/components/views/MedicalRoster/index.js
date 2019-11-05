import React from "react";
import gql from "graphql-tag.macro";
import Roster from "./roster";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import {useQuery} from "@apollo/react-hooks";

const fragment = gql`
  fragment CrewData on Crew {
    id
    firstName
    lastName
    age
    rank
    name
    gender
    position
  }
`;

export const MEDICAL_ROSTER_QUERY = gql`
  query MedicalRoster($simulatorId: ID!) {
    sickbay(simulatorId: $simulatorId) {
      id
      sickbayRoster {
        ...CrewData
      }
    }
    crew(simulatorId: $simulatorId) {
      ...CrewData
    }
  }
  ${fragment}
`;
export const MEDICAL_ROSTER_SUB = gql`
  subscription Sickbay($simulatorId: ID!) {
    sickbayUpdate(simulatorId: $simulatorId) {
      id
      sickbayRoster {
        ...CrewData
      }
    }
  }
  ${fragment}
`;

export const MEDICAL_ROSTER_CREW_SUB = gql`
  subscription CrewSub($simulatorId: ID!) {
    crewUpdate(simulatorId: $simulatorId) {
      ...CrewData
    }
  }
  ${fragment}
`;

const MedicalRoster = props => {
  const {simulator} = props;
  const {loading, data, subscribeToMore} = useQuery(MEDICAL_ROSTER_QUERY, {
    variables: {simulatorId: simulator.id},
  });
  const sickbaySubConfig = React.useMemo(
    () => ({
      variables: {simulatorId: simulator.id},
      updateQuery: (previousResult, {subscriptionData}) => {
        return Object.assign({}, previousResult, {
          sickbay: subscriptionData.data.sickbayUpdate,
        });
      },
    }),
    [simulator.id],
  );
  const crewSubConfig = React.useMemo(
    () => ({
      variables: {simulatorId: simulator.id},
      updateQuery: (previousResult, {subscriptionData}) => {
        return Object.assign({}, previousResult, {
          crew: subscriptionData.data.crewUpdate,
        });
      },
    }),
    [simulator.id],
  );
  useSubscribeToMore(subscribeToMore, MEDICAL_ROSTER_QUERY, sickbaySubConfig);
  useSubscribeToMore(subscribeToMore, MEDICAL_ROSTER_CREW_SUB, crewSubConfig);

  if (loading || !data) return null;
  const {sickbay, crew} = data;

  if (!sickbay[0]) return <div>No sickbay</div>;
  return <Roster {...props} {...sickbay[0]} crew={crew} />;
};
export default MedicalRoster;
