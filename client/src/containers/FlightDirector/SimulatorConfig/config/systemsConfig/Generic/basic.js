import React, { Fragment } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { GENERIC_QUERY } from "./index";
const Basic = ({ id, name, displayName, simulatorId }) => {
  return (
    <Mutation
      mutation={gql`
        mutation UpdateName($id: ID!, $name: String, $displayName: String) {
          updateSystemName(
            systemId: $id
            name: $name
            displayName: $displayName
          )
        }
      `}
      refetchQueries={[
        { query: GENERIC_QUERY, variables: { id, simulatorId } }
      ]}
    >
      {action => (
        <Fragment>
          <FormGroup>
            <Label>
              Name
              <Input
                type="text"
                defaultValue={name}
                onBlur={e =>
                  action({ variables: { id, name: e.target.value } })
                }
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>
              Display Name
              <Input
                type="text"
                defaultValue={displayName || ""}
                onBlur={e =>
                  action({ variables: { id, displayName: e.target.value } })
                }
              />
            </Label>
          </FormGroup>
        </Fragment>
      )}
    </Mutation>
  );
};
export default Basic;
