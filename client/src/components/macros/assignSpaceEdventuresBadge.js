import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import { FormGroup, Label, Input } from "helpers/reactstrap";

export default ({ updateArgs, args, stations, clients }) => {
  return (
    <Query
      fetchPolicy="cache-first"
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
              {!data && !data.thorium ? (
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
              ) : loading ? (
                "Loading..."
              ) : (
                "Not connected to a SpaceEdVentures.com Center. Cannot get badges."
              )}
            </div>
          </Label>
          <div>
            <Label>Station</Label>

            <Input
              type="select"
              value={args.station || ""}
              onChange={e => updateArgs("station", e.target.value)}
            >
              <option value="" disabled>
                Select a Station
              </option>
              {stations && stations.length > 0 && (
                <optgroup label="Stations">
                  {stations.map(c => (
                    <option value={c.name} key={c.name}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              )}
              {clients && clients.length > 0 && (
                <optgroup label="Clients">
                  {clients.map(c => (
                    <option value={c.id} key={c.id}>
                      {c.id}
                    </option>
                  ))}
                </optgroup>
              )}
            </Input>
          </div>
        </FormGroup>
      )}
    </Query>
  );
};
