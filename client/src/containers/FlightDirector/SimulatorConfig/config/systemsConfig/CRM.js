import React from "react";
import GenericSystemConfig from "./Generic";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import Images from "components/views/Crm/core/images";

const CRM_QUERY = gql`
  query CRM($id: ID!) {
    crm(id: $id) {
      id
      fighterImage
      fighterIcon
      enemyIcon
    }
  }
`;

const Crm = props => {
  const { id } = props;
  const [imagePick, setImagePick] = React.useState(null);

  return (
    <GenericSystemConfig {...props}>
      <Query query={CRM_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading || !data.crm) return null;
          const crm = data.crm;
          const { fighterImage, fighterIcon, enemyIcon } = crm;
          if (imagePick) {
            return (
              <Images
                fighterImage={fighterImage}
                fighterIcon={fighterIcon}
                enemyIcon={enemyIcon}
                imagePick={imagePick}
                setImagePick={setImagePick}
                refetchQueries={[{ query: CRM_QUERY, variables: { id } }]}
                {...props}
              />
            );
          }
          return (
            <div className="crm-core">
              <div className="crm-images">
                <div
                  className="crm-image"
                  onClick={() => setImagePick("fighterImage")}
                >
                  <p>Fighter Image</p>
                  <img
                    src={`/assets${fighterImage}`}
                    draggable={false}
                    alt=""
                  />
                </div>
                <div
                  className="crm-image"
                  onClick={() => setImagePick("fighterIcon")}
                >
                  <p>Fighter Icon</p>
                  <img src={`/assets${fighterIcon}`} draggable={false} alt="" />
                </div>
                <div
                  className="crm-image"
                  onClick={() => setImagePick("enemyIcon")}
                >
                  <p>Enemy Icon</p>
                  <img src={`/assets${enemyIcon}`} draggable={false} alt="" />
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};

export default Crm;
