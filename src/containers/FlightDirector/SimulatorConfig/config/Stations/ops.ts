import gql from "graphql-tag.macro";

const ops = {
  create: gql`
    mutation CreateStationSet($id: ID!, $name: String!) {
      createStationSet(name: $name, simulatorId: $id)
    }
  `,
  rename: gql`
    mutation RenameStationSet($id: ID!, $name: String!) {
      renameStationSet(stationSetID: $id, name: $name)
    }
  `,
  remove: gql`
    mutation RemoveStationSet($id: ID!) {
      removeStationSet(stationSetID: $id)
    }
  `,
};

export default ops;

export type mutationKeys =
  | "create"
  | "rename"
  | "remove"
  | "renameStation"
  | "addStation"
  | "removeStation"
  | "addCard"
  | "removeCard"
  | "updateStationCard"
  | "toggleStationMessageGroup"
  | "toggleStationLogin"
  | "toggleStationExec"
  | "toggleStationWidget"
  | "setStationLayout";
