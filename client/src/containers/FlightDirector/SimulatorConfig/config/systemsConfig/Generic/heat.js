import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { Mutation } from "react-apollo";
import { GENERIC_QUERY } from "./index";
import gql from "graphql-tag";

const Power = ({ id, simulatorId, heatRate }) => {
  return (
    <FormGroup>
      <Label>Heat Rate (lower is slower)</Label>
      <Mutation
        mutation={gql`
          mutation SetHeatRate($id: ID!, $rate: Float) {
            setHeatRate(id: $id, rate: $rate)
          }
        `}
        refetchQueries={[
          { query: GENERIC_QUERY, variables: { id, simulatorId } }
        ]}
      >
        {action => (
          <Input
            type="number"
            min={0}
            defaultValue={heatRate}
            onChange={e => action({ variables: { id, rate: e.target.value } })}
          />
        )}
      </Mutation>
    </FormGroup>
  );
};
export default Power;
