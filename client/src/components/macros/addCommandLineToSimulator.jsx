import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";
import {Query} from "@apollo/client/react/components";
import gql from "graphql-tag";

export default React.memo(({updateArgs, args, client}) => {
  return (
    <Query
      query={gql`
        query CommandLines {
          commandLine {
            id
            name
            commands {
              name
            }
          }
        }
      `}
    >
      {({loading, data}) => {
        if (loading || !data) return null;
        const {commandLine} = data;
        return (
          <FormGroup className="macro-addCommandLine">
            <Label>Command Line</Label>
            <Input
              type="select"
              value={args.commandLine || "nothing"}
              onChange={e => updateArgs("commandLine", e.target.value)}
            >
              <option value="nothing" disabled>
                Select a command line.
              </option>
              {commandLine.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        );
      }}
    </Query>
  );
});
