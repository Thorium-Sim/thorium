import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-triggerSurvey">
      <Label>Survey</Label>
      <Input
        type="select"
        value={args.id || ""}
        onChange={e => updateArgs("id", e.target.value)}
      >
        <option value="" disabled>
          Choose a survey
        </option>
        <Query
          query={gql`
            query Surveys {
              surveyform(active: false) {
                id
                title
              }
            }
          `}
        >
          {({ data }) => {
            if (data && data.surveyform)
              return data.surveyform.map(s => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ));
            return null;
          }}
        </Query>
      </Input>
    </FormGroup>
  );
};
