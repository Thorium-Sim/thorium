import React from "react";
import gql from "graphql-tag.macro";
import FileExplorer from "components/views/TacticalMap/fileExplorer";

const Images = ({
  fighterImage,
  fighterIcon,
  enemyIcon,
  imagePick,
  setImagePick,
  client,
  id
}) => {
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
};
export default Images;
