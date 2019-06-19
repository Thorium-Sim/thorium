import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <Query
      query={gql`
        query Missions {
          thorium {
            spaceEdventuresCenter {
              missions {
                id
                name
              }
            }
          }
        }
      `}
    >
      {({ loading, data, error }) => (
        <FormGroup className="macro-template">
          <Label>
            Space EdVentures Mission
            <div>
              {loading ? (
                "Loading"
              ) : error ? (
                "Error loading missions."
              ) : data &&
                data.thorium &&
                data.thorium.spaceEdventuresCenter &&
                data.thorium.spaceEdventuresCenter.missions ? (
                <Input
                  type="select"
                  value={args ? args.badgeId : "select"}
                  onChange={evt => updateArgs("badgeId", evt.target.value)}
                >
                  <option value="select">Select a Mission</option>
                  {data.thorium.spaceEdventuresCenter.missions.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </Input>
              ) : (
                "Not connected to a SpaceEdVentures.com Center"
              )}
            </div>
          </Label>
        </FormGroup>
      )}
    </Query>
  );
};
