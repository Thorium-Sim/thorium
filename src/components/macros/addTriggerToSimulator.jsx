import React from "react";
import {FormGroup, Label} from "helpers/reactstrap";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";

export default ({updateArgs, args, client}) => {
  return (
    <FormGroup className="macro-addTrigger">
      <Label>Trigger</Label>
      <Query
        query={gql`
          query Triggers {
            triggers {
              id
              name
            }
          }
        `}
      >
        {({loading, data}) => {
          if (loading || !data) return null;
          const {triggers} = data;
          return (
            <select
              className={"form-control"}
              type="select"
              value={args.trigger}
              onChange={e => updateArgs("trigger", e.target.value)}
            >
              <option value="nothing">Select a trigger.</option>

              {triggers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          );
        }}
      </Query>
    </FormGroup>
  );
};
