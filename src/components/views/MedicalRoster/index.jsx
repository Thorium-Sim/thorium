import React from "react";
import gql from "graphql-tag.macro";
import Roster from "./roster";
import {useQuery, useSubscription} from "@apollo/client";

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
  const {loading, data} = useQuery(MEDICAL_ROSTER_QUERY, {
    variables: {simulatorId: simulator.id},
  });
  const {data: sickbaySubData} = useSubscription(MEDICAL_ROSTER_SUB, {
    variables: {simulatorId: simulator.id},
  });
  const {data: crewSubData} = useSubscription(MEDICAL_ROSTER_CREW_SUB, {
    variables: {simulatorId: simulator.id},
  });

  if (loading || !data) return null;
  const sickbay = sickbaySubData ? sickbaySubData.sickbayUpdate : data.sickbay;
  const crew = crewSubData ? crewSubData.crewUpdate : data.crew;

  if (!sickbay) return <div>No sickbay</div>;
  return <Roster {...props} {...sickbay[0]} crew={crew} />;
};
export default MedicalRoster;
