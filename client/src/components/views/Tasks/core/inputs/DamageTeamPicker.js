import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "reactstrap";
import { randomFromList } from "helpers/randomFromList";
import FontAwesome from "react-fontawesome";

const crewQuery = gql`
  query CrewPositions($simulatorId: ID!) {
    crew(simulatorId: $simulatorId, position: "damage") {
      id
      position
    }
  }
`;
const DamageTeamPicker = ({ simulatorId, onChange, value = {} }) => (
  <Query query={crewQuery} variables={{ simulatorId }}>
    {({ loading, data: { crew = [] } }) => {
      if (loading) return null;
      const positions = crew.reduce(
        (prev, next) =>
          prev.indexOf(next.position) === -1
            ? prev.concat(next.position)
            : prev,
        []
      );
      const availablePositions = positions.filter(
        p => Object.keys(value).indexOf(p) === -1
      );
      return (
        <div>
          {Object.entries(value).map(([key, val]) => (
            <div
              key={key}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <select
                value={key}
                onChange={e => {
                  const { [key]: _, ...rest } = value;
                  onChange({ ...rest, [e.target.value]: val });
                }}
              >
                {positions
                  .filter(
                    p => Object.keys(value).indexOf(p) === -1 || key === p
                  )
                  .map(p => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
              </select>
              <input
                value={val}
                type="number"
                min={1}
                max={5}
                style={{ width: "unset" }}
                onChange={e => onChange({ ...value, [key]: e.target.value })}
              />
              <FontAwesome
                name="ban"
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const { [key]: myKey, ...rest } = value;
                  onChange(rest);
                }}
              />
            </div>
          ))}
          {availablePositions.length > 0 && (
            <Button
              color="success"
              size="sm"
              onClick={() => {
                onChange({ ...value, [randomFromList(availablePositions)]: 1 });
              }}
            >
              Add Officers
            </Button>
          )}
        </div>
      );
    }}
  </Query>
);

export default DamageTeamPicker;
