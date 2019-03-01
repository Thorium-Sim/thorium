import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-addTrigger">
      <Label>Trigger</Label>
      <Input
        type="select"
        value={args.trigger}
        onChange={e => updateArgs("trigger", e.target.value)}
      >
        <option value="nothing">Select a trigger.</option>
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
          {({ loading, data: { triggers } }) =>
            loading
              ? null
              : triggers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))
          }
        </Query>
      </Input>
    </FormGroup>
  );
};
