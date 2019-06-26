import React from "react";
import { withApollo, Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Buttons from "./buttons";
import Images from "./images";
import Fighters from "./fighters";
import Stats from "./stats";

import "../style.scss";

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
    fighterStrength
    enemyStrength
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
const CrmCore = ({ fighterImage, fighterIcon, enemyIcon, ...props }) => {
  const [imagePick, setImagePick] = React.useState(null);

  if (imagePick) {
    return (
      <Images
        fighterImage={fighterImage}
        fighterIcon={fighterIcon}
        enemyIcon={enemyIcon}
        imagePick={imagePick}
        setImagePick={setImagePick}
        {...props}
      />
    );
  }
  return (
    <div className="crm-core">
      <Buttons {...props} />

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

      <Fighters {...props} />
      <Stats {...props} />
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
