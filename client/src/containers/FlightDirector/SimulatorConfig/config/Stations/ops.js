import gql from "graphql-tag";

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
  renameStation: gql`
    mutation RenameStation($id: ID!, $name: String!, $newName: String!) {
      editStationInStationSet(
        stationSetID: $id
        stationName: $name
        newStationName: $newName
      )
    }
  `,
  addStation: gql`
    mutation AddStation($id: ID!, $name: String!) {
      addStationToStationSet(stationSetID: $id, stationName: $name)
    }
  `,
  removeStation: gql`
    mutation RemoveStation($id: ID!, $stationName: String!) {
      removeStationFromStationSet(stationSetID: $id, stationName: $stationName)
    }
  `,
  addCard: gql`
    mutation AddCard(
      $id: ID!
      $name: String!
      $cardName: String!
      $cardComponent: String!
      $cardIcon: String
    ) {
      addCardToStation(
        stationSetID: $id
        stationName: $name
        cardName: $cardName
        cardComponent: $cardComponent
        cardIcon: $cardIcon
      )
    }
  `,
  removeCard: gql`
    mutation RemoveCard($id: ID!, $stationName: String!, $cardName: String!) {
      removeCardFromStation(
        stationSetID: $id
        stationName: $stationName
        cardName: $cardName
      )
    }
  `,
  updateStationCard: gql`
    mutation EditCard(
      $stationSetId: ID!
      $stationName: String!
      $cardName: String!
      $name: String
      $component: String
      $icon: String
    ) {
      editCardInStationSet(
        stationSetID: $stationSetId
        stationName: $stationName
        cardName: $cardName
        newCardName: $name
        cardComponent: $component
        cardIcon: $icon
      )
    }
  `,
  toggleStationMessageGroup: gql`
    mutation ToggleMessageGroup(
      $stationSetId: ID!
      $station: String!
      $group: String!
      $state: Boolean!
    ) {
      toggleStationMessageGroup(
        stationSetId: $stationSetId
        station: $station
        group: $group
        state: $state
      )
    }
  `,
  toggleStationLogin: gql`
    mutation ToggleStationLogin(
      $stationSetID: ID!
      $stationName: String!
      $login: Boolean!
    ) {
      setStationLogin(
        stationSetID: $stationSetID
        stationName: $stationName
        login: $login
      )
    }
  `,
  toggleStationExec: gql`
    mutation ToggleStationExec(
      $stationSetID: ID!
      $stationName: String!
      $exec: Boolean!
    ) {
      setStationExecutive(
        stationSetID: $stationSetID
        stationName: $stationName
        exec: $exec
      )
    }
  `,
  toggleStationWidget: gql`
    mutation AddWidgetsToStation(
      $stationSetID: ID!
      $stationName: String!
      $widget: String!
      $state: Boolean!
    ) {
      toggleStationWidgets(
        stationSetID: $stationSetID
        stationName: $stationName
        widget: $widget
        state: $state
      )
    }
  `
};

export default ops;
