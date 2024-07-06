import { useQuery, useSubscription } from "@apollo/client";
import React from "react";
import gql from "graphql-tag.macro";
import FighterData from "./fighterData";
import "./style.scss";

const fragment = gql`
  fragment CrmMovementData on Crm {
    id
    displayName
    fighterImage
    phasers {
      target {
        x
        y
      }
      destination {
        x
        y
      }
    }
    torpedos {
      id
      position {
        x
        y
      }
      destroyed
    }
    enemies {
      id
      icon
      size
      destroyed
      position {
        x
        y
      }
    }
    fighters {
      id
      icon
      size
      destroyed
      docked
      position {
        x
        y
      }
    }
    interval
  }
`;

export const CRM_MOVEMENT_QUERY = gql`
  query CrmMovement($simulatorId: ID!) {
    crm(simulatorId: $simulatorId) {
      ...CrmMovementData
    }
  }
  ${fragment}
`;
export const CRM_MOVEMENT_SUBSCRIPTION = gql`
  subscription CrmMovement($simulatorId: ID!) {
    crmMovementUpdate(simulatorId: $simulatorId) {
      ...CrmMovementData
    }
  }
  ${fragment}
`;
const CrmData = props => {
  const {simulator} = props;
  const {data, loading} = useQuery(CRM_MOVEMENT_QUERY, {
    variables: {simulatorId: simulator.id},
  });
  const {data: subData} = useSubscription(CRM_MOVEMENT_SUBSCRIPTION, {
    variables: {simulatorId: simulator.id},
  });
  if (loading || !data) return null;
  const crm = subData ? subData.crmMovementUpdate : data.crm;
  return <FighterData {...props} crm={crm} />;
};

CrmData.hypercard = true;

export default CrmData;
