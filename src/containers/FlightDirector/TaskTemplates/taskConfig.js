import React, {useState} from "react";
import {Input, Button} from "helpers/reactstrap";
import {Mutation, withApollo} from "react-apollo";
import gql from "graphql-tag.macro";
import ValueInput from "../../../components/views/Tasks/core/ValueInput";
import EventPicker from "containers/FlightDirector/MissionConfig/EventPicker";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import FontAwesome from "react-fontawesome";
import uuid from "uuid";
import MacroConfig from "../../../components/views/Macros/macroConfig";

const TaskConfig = ({
  id,
  name,
  values,
  definition,
  macros,
  preMacros,
  reportTypes = [],
  client,
}) => {
  const updateReportTypes = (which, checked, action) => {
    const newReportTypes = checked
      ? reportTypes.concat(which)
      : reportTypes.filter(c => c !== which);
    action({
      variables: {
        id,
        reportTypes: newReportTypes.filter((a, i, arr) => arr.indexOf(a) === i),
      },
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
            onBlur={e => action({variables: {id, name: e.target.value}})}
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
          <div style={{display: "flex"}}>
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
                      [v]: value,
                    },
                  },
                })
              }
            />
          ))
        }
      </Mutation>
      <Mutation
        mutation={gql`
          mutation SetTaskMacro($id: ID!, $macros: [TimelineItemInput]!) {
            setTaskTemplateMacros(id: $id, macros: $macros)
          }
        `}
      >
        {action => (
          <ConfigureMacro
            action={action}
            id={id}
            macros={macros}
            client={client}
          />
        )}
      </Mutation>
      <Mutation
        mutation={gql`
          mutation SetTaskMacro($id: ID!, $macros: [TimelineItemInput]!) {
            setTaskTemplatePreMacros(id: $id, macros: $macros)
          }
        `}
      >
        {action => (
          <ConfigureMacro
            pre
            action={action}
            id={id}
            macros={preMacros}
            client={client}
          />
        )}
      </Mutation>
    </div>
  );
};

export const ConfigureMacro = ({
  action,
  id,
  macros,
  client,
  pre,
  label = `Will be triggered when task is ${pre ? "created" : "complete"}`,
}) => {
  const [configureMacro, setConfigureMacro] = useState(null);
  const update = ({id: macroId, ...rest}) => {
    setConfigureMacro(macro => {
      return {...macro, ...rest};
    });
  };

  if (configureMacro) {
    return (
      <div className="macro-config">
        <div style={{flex: 1}}>
          <label>Macro Config</label>
          <MacroConfig
            action={configureMacro}
            updateAction={update}
            client={client}
          />
        </div>
        <Button
          size="sm"
          block
          color="success"
          onClick={() => {
            action({
              variables: {
                id,
                macros: macros.map(m =>
                  m.id === configureMacro.id ? {...m, ...configureMacro} : m,
                ),
              },
            });
            setConfigureMacro(null);
          }}
          style={{marginBottom: "20px"}}
        >
          Done Configuring Macro
        </Button>
      </div>
    );
  }
  return (
    <div>
      <label>
        {pre ? "Pre" : ""}Macros <small>{label}</small>
      </label>
      <EventPicker
        className={"btn btn-sm btn-success"}
        handleChange={e => {
          const {value: event} = e.target;
          action({
            variables: {
              id,
              macros: macros
                .map(({__typename, ...rest}) => rest)
                .concat({
                  event,
                  args: "{}",
                  delay: 0,
                  id: uuid.v4(),
                }),
            },
          });
        }}
      />
      {macros.map(m => (
        <div
          key={m.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>
            <EventName id={m.event} label={m.event} />
          </span>{" "}
          <Button
            size="sm"
            color="warning"
            onClick={() => setConfigureMacro(m)}
          >
            Configure Macro
          </Button>{" "}
          <FontAwesome
            name="ban"
            className="text-danger"
            onClick={() =>
              action({
                variables: {
                  id,
                  macros: macros
                    .map(({__typename, ...rest}) => rest)
                    .filter(mm => mm.id !== m.id),
                },
              })
            }
          />
        </div>
      ))}
    </div>
  );
};
export default withApollo(TaskConfig);
