import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";
import {Query} from "react-apollo";
import gql from "graphql-tag";

export default ({updateArgs, args, client}) => {
  return (
    <FormGroup className="macro-macroAction">
      <Label>Macro</Label>
      <Query
        query={gql`
          query Macros {
            macros {
              id
              name
            }
          }
        `}
      >
        {({loading, data}) => {
          if (loading) return null;
          return (
            <Input
              type="select"
              value={args.macroId || "nothing"}
              onChange={e => updateArgs("macroId", e.target.value)}
            >
              <option disabled value="nothing">
                Pick a macro
              </option>

              {data.macros.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </Input>
          );
        }}
      </Query>
    </FormGroup>
  );
};
