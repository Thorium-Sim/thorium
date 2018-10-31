import React from "react";
import { Input } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ValueInput from "../../../components/views/Tasks/core/ValueInput";

const TaskConfig = ({ id, name, values, definition }) => {
  return (
    <div>
      <label>Definition</label>
      <Input type="text" readOnly value={definition.name} />
      <label>Name</label>
      <Mutation
        mutation={gql`
          mutation RenameTaskTemplate($id: ID!, $name: String!) {
            renameTaskTemplate(id: $id, name: $name)
          }
        `}
      >
        {action => (
          <Input
            type="text"
            defaultValue={name}
            onBlur={e => action({ variables: { id, name: e.target.value } })}
          />
        )}
      </Mutation>
      <label>Values</label>
      <Mutation
        mutation={gql`
          mutation SetTaskTemplateValues($id: ID!, $values: JSON!) {
            setTaskTemplateValues(id: $id, values: $values)
          }
        `}
      >
        {action =>
          Object.keys(definition.valuesInput).map(v => (
            <ValueInput
              key={v}
              label={v}
              type={definition.valuesInput[v]}
              value={values[v] || definition.valuesValue[v]}
              onBlur={value =>
                action({
                  variables: {
                    id,
                    values: {
                      ...values,
                      [v]: value
                    }
                  }
                })
              }
            />
          ))
        }
      </Mutation>
    </div>
  );
};
export default TaskConfig;
