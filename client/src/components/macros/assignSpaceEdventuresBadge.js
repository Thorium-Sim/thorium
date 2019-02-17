import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <Query
      query={gql`
        query Badges {
          thorium {
            spaceEdventuresCenter {
              badges {
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
            Space EdVentures Badge
            <div>
              {loading ? (
                "Loading"
              ) : error ? (
                "Error loading badges."
              ) : data &&
              data.thorium &&
              data.thorium.spaceEdventuresCenter &&
              data.thorium.spaceEdventuresCenter.badges ? (
                <Input
                  type="select"
                  value={args ? args.badgeId : "select"}
                  onChange={evt => updateArgs("badgeId", evt.target.value)}
                >
                  <option value="select">Select a Badge</option>
                  {data.thorium.spaceEdventuresCenter.badges.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </Input>
              ) : (
                "Not connected to a SpaceEdVentures.com Center. Cannot get badges."
              )}
            </div>
          </Label>
        </FormGroup>
      )}
    </Query>
  );
};
