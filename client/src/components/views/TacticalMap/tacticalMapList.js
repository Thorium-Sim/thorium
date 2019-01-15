import React, { Fragment } from "react";
import { Button, Label, Input } from "reactstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";

const importTacticalMap = evt => {
  if (evt.target.files[0]) {
    const data = new FormData();
    Array.from(evt.target.files).forEach((f, index) =>
      data.append(`files[${index}]`, f)
    );
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${parseInt(
        window.location.port,
        10
      ) + 1}/importTacticalMap`,
      {
        method: "POST",
        body: data
      }
    ).then(() => {
      window.location.reload();
    });
  }
};

const TACTICAL_MAP_DATA = `
id
name
flight {
  id
}
template`;

const TACTICALMAP_SUB = gql`
  subscription TacticalMapUpdate {
    tacticalMapsUpdate {
     ${TACTICAL_MAP_DATA}
    }
  }
`;

const TACTICALMAP_QUERY = gql`
  query TacticalMap {
    tacticalMaps {
      ${TACTICAL_MAP_DATA}
    }
  }
`;

const TacticalMapList = ({
  flightId,
  tacticalMapId,
  selectTactical,
  deselectTactical,
  dedicated,
  client
}) => {
  const addTactical = () => {
    const name = prompt("What is the name of the new tactical map?");
    if (name) {
      const mutation = gql`
        mutation NewTactical($name: String!) {
          newTacticalMap(name: $name)
        }
      `;
      const variables = { name };
      client
        .mutate({
          mutation,
          variables
        })
        .then(res =>
          setTimeout(() => selectTactical(res.data.newTacticalMap), 300)
        );
    }
  };
  const duplicateTactical = () => {
    const name = prompt("What is the name for the duplicated tactical map?");
    if (name) {
      const mutation = gql`
        mutation DuplicateTactical($id: ID!, $name: String!) {
          duplicateTacticalMap(id: $id, name: $name)
        }
      `;
      const variables = {
        name,
        id: tacticalMapId
      };
      client.mutate({
        mutation,
        variables
      });
    }
  };
  const removeTactical = () => {
    if (window.confirm("Are you sure you want to delete this tactical?")) {
      const mutation = gql`
        mutation RemoveMap($id: ID!) {
          removeTacticalMap(id: $id)
        }
      `;
      const variables = {
        id: tacticalMapId
      };
      deselectTactical();
      client.mutate({
        mutation,
        variables,
        refetchQueries: ["TacticalMap"]
      });
    }
  };
  return (
    <Query query={TACTICALMAP_QUERY}>
      {({ loading, data, subscribeToMore }) => {
        if (loading || !data) return null;
        const { tacticalMaps } = data;
        const maps = tacticalMaps.filter(
          t => (flightId ? !t.flight || t.flight.id === flightId : !t.flight)
        );
        return (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: TACTICALMAP_SUB,
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    tacticalMaps: subscriptionData.data.tacticalMapsUpdate
                  });
                }
              })
            }
          >
            {dedicated ? (
              <Fragment>
                <p>Saved Maps</p>
                <ul className="saved-list">
                  {maps.filter(t => t.template).map(t => (
                    <li
                      key={t.id}
                      className={t.id === tacticalMapId ? "selected" : ""}
                      onClick={() => selectTactical(t.id)}
                    >
                      {t.name}
                    </li>
                  ))}
                </ul>
                <div>
                  <Button color="success" size="sm" onClick={addTactical}>
                    New
                  </Button>
                  <Button
                    color="info"
                    size="sm"
                    disabled={!tacticalMapId}
                    onClick={duplicateTactical}
                  >
                    Duplicate
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    disabled={!tacticalMapId}
                    onClick={removeTactical}
                  >
                    Remove
                  </Button>
                  <Button
                    as="a"
                    size="sm"
                    disabled={!tacticalMapId}
                    href={`${window.location.protocol}//${
                      window.location.hostname
                    }:${parseInt(window.location.port, 10) +
                      1}/exportTacticalMap/${tacticalMapId}`}
                  >
                    Export
                  </Button>
                  <Label>
                    <div className="btn btn-sm btn-info btn-block">Import</div>
                    <Input hidden type="file" onChange={importTacticalMap} />
                  </Label>
                </div>
              </Fragment>
            ) : (
              <div>
                <p>Flight Maps</p>
                <ul className="saved-list">
                  {maps.filter(t => !t.template).map(t => (
                    <li
                      key={t.id}
                      className={t.id === tacticalMapId ? "selected" : ""}
                      onClick={() => selectTactical(t.id)}
                    >
                      {t.name}
                    </li>
                  ))}
                </ul>
                <Button color="success" size="sm">
                  Save as Template Map
                </Button>
              </div>
            )}
          </SubscriptionHelper>
        );
      }}
    </Query>
  );
};

export default TacticalMapList;
