import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";

const QUERY = gql`
  query FlightTypes {
    thorium {
      spaceEdventuresCenter {
        flightTypes {
          id
          name
        }
      }
    }
  }
`;
const AssignSpaceEdventuresFlightType = ({ updateArgs, args, client }) => {
  return (
    <Query query={QUERY}>
      {({ data, error }) => {
        if (error) {
          return <div>Error: {error.message}</div>;
        }
        const flightTypes =
          data &&
          data.thorium &&
          data.thorium.spaceEdventuresCenter &&
          data.thorium.spaceEdventuresCenter.flightTypes;
        return (
          <FormGroup className="macro-template">
            <Label>
              Flight Type
              {flightTypes ? (
                <Input
                  type="select"
                  value={args.flightType || ""}
                  onChange={e => updateArgs("flightType", e.target.value)}
                >
                  <option value="" disabled>
                    Choose a flight type
                  </option>

                  {flightTypes.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </Input>
              ) : (
                <div>Loading...</div>
              )}
            </Label>
          </FormGroup>
        );
      }}
    </Query>
  );
};

export default AssignSpaceEdventuresFlightType;
