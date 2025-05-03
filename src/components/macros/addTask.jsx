import React, {Fragment, Component} from "react";
import {Query, useQuery} from "react-apollo";
import {Badge, ListGroup, ListGroupItem, Input} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import ValueInput from "../views/Tasks/core/ValueInput";
import ConfigureMacro from "../views/Tasks/core/ConfigureMacro";
import {ConfigureMacro as ConfigMacro} from "containers/FlightDirector/TaskTemplates/taskConfig";
/*
input TaskInput {
  simulatorId: ID
  definition: String
  values: JSON
  station: String
}
*/

const QUERY = gql`
  query TaskDefinitions($simulatorId: ID) {
    taskDefinitions(simulatorId: $simulatorId) {
      id
      class
      name
      active
      stations {
        name
      }
      valuesInput
      valuesValue
    }
    taskTemplates {
      id
      name
      definition
      values
      macros {
        id
        args
        event
        delay
      }
      preMacros {
        id
        args
        event
        delay
      }
    }
  }
`;

class TasksCore extends Component {
  state = {
    selectedDefinition: "nothing",
  };
  updateTask = data => {
    const {updateArgs, args = {}} = this.props;
    const {taskInput = {}} = args;
    updateArgs("taskInput", {...taskInput, ...data});
  };
  render() {
    const {
      taskDefinitions,
      taskTemplates = [],
      args = {},
      lite,
      simulatorId,
      client,
    } = this.props;
    const {taskInput = {}} = args;
    const {
      definition: selectedDefinition,
      values: requiredValues = {},
      macros = [],
      preMacros = [],
    } = taskInput;
    const {configureMacroId} = this.state;
    const definitionGroups = taskDefinitions
      .concat()
      .sort((a, b) => {
        if (a.class > b.class) return 1;
        if (a.class < b.class) return -1;
        return 0;
      })
      .reduce((prev, n) => {
        prev[n.class] = prev[n.class] ? prev[n.class].concat(n) : [n];
        return prev;
      }, {});
    const definition = taskDefinitions.find(t => t.id === selectedDefinition);
    const configureMacro = macros.find(c => c.id === configureMacroId);
    return (
      <div
        className="core-tasks"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: "60vh",
          width: "100%",
          maxWidth: "30vw",
        }}
        key={this.state.forcedKey}
      >
        {configureMacro ? (
          <ConfigureMacro
            cancel={() => this.setState({configureMacroId: null})}
            macro={configureMacro}
            update={action =>
              this.updateTask({
                macros: macros.map(m =>
                  m.id === configureMacroId ? {...m, ...action} : m,
                ),
              })
            }
            client={client}
          />
        ) : (
          <div style={{display: "flex", flex: 1, height: "100%"}}>
            {!lite && (
              <Fragment>
                <div
                  style={{
                    flex: 5,
                    height: "100%",
                    maxHeight: "calc(60vh - 20px)",
                    overflowY: "auto",
                  }}
                >
                  Definitions
                  <ListGroup>
                    {Object.entries(definitionGroups).map(([key, value]) => (
                      <Fragment key={key}>
                        <ListGroupItem>
                          <strong>{key}</strong>
                        </ListGroupItem>
                        {value.map(v => (
                          <ListGroupItem
                            key={v.name}
                            active={v.name === selectedDefinition}
                            onClick={() =>
                              this.updateTask({definition: v.name})
                            }
                          >
                            {v.name}{" "}
                            <Badge>
                              {
                                taskTemplates.filter(
                                  t => t.definition === v.name,
                                ).length
                              }
                            </Badge>
                          </ListGroupItem>
                        ))}
                      </Fragment>
                    ))}
                  </ListGroup>
                </div>
              </Fragment>
            )}
            <div
              style={{
                flex: 7,
                maxHeight: "calc(60vh - 20px)",
                overflowY: "auto",
              }}
            >
              {definition && (
                <Fragment>
                  <div>
                    <label>Templates (optional)</label>
                    <Input
                      type="select"
                      value="none"
                      onChange={e => {
                        const template = taskTemplates.find(
                          t => t.id === e.target.value,
                        );
                        this.updateTask({
                          values: template.values,
                          macros: template.macros,
                          preMacros: template.preMacros,
                        });
                        this.setState({forcedKey: Math.random()});
                      }}
                    >
                      <option value="none">Choose a Template</option>
                      {taskTemplates
                        .filter(t => t.definition === selectedDefinition)
                        .map(t => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                    </Input>
                  </div>
                  <p>
                    If the values are left blank, a default value will be used.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <div>
                      {Object.keys(definition.valuesInput).map(v => (
                        <ValueInput
                          key={v}
                          label={v}
                          type={definition.valuesInput[v]}
                          value={requiredValues[v]}
                          placeholder={definition.valuesValue[v]}
                          onBlur={value =>
                            this.updateTask({
                              values: {
                                ...requiredValues,
                                [v]: value,
                              },
                            })
                          }
                        />
                      ))}
                    </div>
                  </div>
                  {simulatorId && (
                    <div>
                      <p>Task Instructions:</p>

                      <Query
                        query={gql`
                          query Instructions(
                            $simulatorId: ID
                            $definition: String!
                            $values: JSON!
                            $task: TaskInput
                          ) {
                            taskInstructions(
                              simulatorId: $simulatorId
                              definition: $definition
                              requiredValues: $values
                              task: $task
                            )
                          }
                        `}
                        variables={{
                          simulatorId,
                          definition: definition.id,
                          values: {
                            ...definition.valuesValue,
                            ...requiredValues,
                          },
                          task: {},
                        }}
                      >
                        {({loading, data, error}) =>
                          loading ? (
                            <p>Loading instructions...</p>
                          ) : error ? (
                            <p>
                              Error:
                              {error.message}
                            </p>
                          ) : (
                            <p style={{whiteSpace: "pre-wrap"}}>
                              {data.taskInstructions}
                            </p>
                          )
                        }
                      </Query>
                    </div>
                  )}
                  <hr />
                  <div>
                    <ConfigMacro
                      action={({variables: {macros}}) =>
                        this.updateTask({macros})
                      }
                      id={"id"}
                      macros={macros}
                      client={client}
                    />
                    <ConfigMacro
                      pre
                      action={({variables: {macros}}) =>
                        this.updateTask({preMacros: macros})
                      }
                      id={"id"}
                      macros={preMacros}
                      client={client}
                    />
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const TaskCreator = props => {
  const {loading, data} = useQuery(QUERY, {
    variables: {simulatorId: props.simulatorId},
  });
  if (loading || !data) return null;
  const {taskDefinitions, taskTemplates} = data;

  return (
    <TasksCore
      {...props}
      taskDefinitions={taskDefinitions}
      taskTemplates={taskTemplates}
    />
  );
};

export default TaskCreator;

// export default ({ updateArgs, args, client }) => {
//   return <FormGroup className="macro-addTask" />;
// };
