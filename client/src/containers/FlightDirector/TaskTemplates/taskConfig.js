import React from "react";
import { Input } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ValueInput from "../../../components/views/Tasks/core/ValueInput";

const TaskConfig = ({ id, name, values, definition, reportTypes = [] }) => {
  const updateReportTypes = (which, checked, action) => {
    const newReportTypes = checked
      ? reportTypes.concat(which)
      : reportTypes.filter(c => c !== which);
    action({
      variables: {
        id,
        reportTypes: newReportTypes.filter((a, i, arr) => arr.indexOf(a) === i)
      }
    });
  };
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
      <label>Report Type</label>
      <Mutation
        mutation={gql`
          mutation SetTaskTemplateReportTypes(
            $id: ID!
            $reportTypes: [String]!
          ) {
            setTaskTemplateReportTypes(id: $id, reportTypes: $reportTypes)
          }
        `}
      >
        {action => (
          <div style={{ display: "flex" }}>
            <label>
              Damage{" "}
              <input
                type="checkbox"
                checked={reportTypes.indexOf("default") > -1}
                onChange={e =>
                  updateReportTypes("default", e.target.checked, action)
                }
              />
            </label>
            <label>
              R&D{" "}
              <input
                type="checkbox"
                checked={reportTypes.indexOf("rnd") > -1}
                onChange={e =>
                  updateReportTypes("rnd", e.target.checked, action)
                }
              />
            </label>
            <label>
              Engineering{" "}
              <input
                type="checkbox"
                checked={reportTypes.indexOf("engineering") > -1}
                onChange={e =>
                  updateReportTypes("engineering", e.target.checked, action)
                }
              />
            </label>
          </div>
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
              value={values[v]}
              definitionValue={definition.valuesValue[v]}
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
