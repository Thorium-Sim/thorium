import React, {Fragment} from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";
import {Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import {GENERIC_QUERY} from "./index";

const SYSTEM_QUERY = gql`
  query Systems($simulatorId: ID!) {
    systems(simulatorId: $simulatorId) {
      id
      name
      type
      displayName
      upgradeName
      upgradeBoard
      upgradeMacros {
        id
        event
        args
        delay
      }
    }
  }
`;

const Basic = ({id, simulatorId, name, displayName}) => {
  return (
    <>
      <Mutation
        mutation={gql`
          mutation UpdateName(
            $id: ID!
            $name: String
            $displayName: String
            $upgradeName: String
          ) {
            updateSystemName(
              systemId: $id
              name: $name
              displayName: $displayName
              upgradeName: $upgradeName
            )
          }
        `}
        refetchQueries={[
          {query: GENERIC_QUERY, variables: {id, simulatorId}},
          {query: SYSTEM_QUERY, variables: {simulatorId}},
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
                  onBlur={e => action({variables: {id, name: e.target.value}})}
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
                    action({variables: {id, displayName: e.target.value}})
                  }
                />
              </Label>
            </FormGroup>
          </Fragment>
        )}
      </Mutation>
    </>
  );
};
export default Basic;
