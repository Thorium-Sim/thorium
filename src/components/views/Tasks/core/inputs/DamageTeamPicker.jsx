import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import {Button} from "helpers/reactstrap";
import {randomFromList} from "helpers/randomFromList";
import {FaBan} from "react-icons/fa";

const crewQuery = gql`
  query CrewPositions($simulatorId: ID) {
    crew(simulatorId: $simulatorId, position: "damage") {
      id
      position
    }
  }
`;
const DamageTeamPicker = ({simulatorId, onChange, value = {}}) => (
  <Query query={crewQuery} variables={{simulatorId}}>
    {({loading, data}) => {
      if (loading || !data) return null;
      const {crew = []} = data;
      const positions =
        crew.length > 0
          ? crew.reduce(
              (prev, next) =>
                prev.indexOf(next.position) === -1
                  ? prev.concat(next.position)
                  : prev,
              [],
            )
          : [
              "Computer Specialist",
              "Custodian",
              "Electrician",
              "Explosive Expert",
              "Hazardous Waste Expert",
              "Maintenance Officer",
              "Mechanic",
              "Plumber",
              "Quality Assurance",
              "Structural Engineer",
              "Welder",
            ];
      const availablePositions = positions.filter(
        p => Object.keys(value).indexOf(p) === -1,
      );
      return (
        <div>
          {Object.entries(value).map(([key, val]) => (
            <div
              key={key}
              style={{display: "flex", justifyContent: "space-between"}}
            >
              <select
                value={key}
                onChange={e => {
                  const {[key]: _, ...rest} = value;
                  onChange({...rest, [e.target.value]: val});
                }}
              >
                {positions
                  .filter(
                    p => Object.keys(value).indexOf(p) === -1 || key === p,
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
                style={{width: "unset"}}
                onChange={e => onChange({...value, [key]: e.target.value})}
              />
              <FaBan
                className="text-danger"
                style={{cursor: "pointer"}}
                onClick={() => {
                  const {[key]: myKey, ...rest} = value;
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
                onChange({...value, [randomFromList(availablePositions)]: 1});
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
