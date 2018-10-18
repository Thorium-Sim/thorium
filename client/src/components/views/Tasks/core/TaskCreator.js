import React, { Fragment, Component } from "react";
import { Query, Mutation } from "react-apollo";
import { Input, Button } from "reactstrap";
import gql from "graphql-tag";
import ValueInput from "./ValueInput";
import "./style.scss";

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
  }
`;
class TasksCore extends Component {
  state = {
    selectedDefinition: "nothing",
    station: "nothing",
    requiredValues: {}
  };
  render() {
    const { taskDefinitions, simulator, cancel } = this.props;
    const { selectedDefinition, requiredValues, station } = this.state;
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
    return (
      <div
        className="core-tasks"
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <div>
          <Input
            type="select"
            bsSize="sm"
            value={selectedDefinition}
            onChange={e => {
              const definition = taskDefinitions.find(
                t => t.id === e.target.value
              );

              this.setState({
                selectedDefinition: e.target.value,
                requiredValues: {},
                station:
                  definition.stations.length === 1
                    ? definition.stations[0].name
                    : "nothing"
              });
            }}
          >
            <option value="nothing" disabled>
              Select a task definition
            </option>
            {Object.entries(definitionGroups).map(([key, value]) => (
              <optgroup key={key} label={key}>
                {value.map(v => (
                  <option key={v.name} value={v.name}>
                    {v.active ? "✅" : "❌"} {v.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </Input>
        </div>
        <div style={{ flex: 1, height: "100%" }}>
          {definition && (
            <Fragment>
              {!definition.active && (
                <div>
                  <strong>
                    This task might be redundant or unnecessary. Double check it
                    before assigning it.
                  </strong>
                </div>
              )}
              <div style={{ display: "flex", height: "100%" }}>
                <div
                  style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}
                >
                  <Input
                    type="select"
                    value={station}
                    onChange={e => this.setState({ station: e.target.value })}
                  >
                    <option value="nothing" disabled>
                      Select a station
                    </option>
                    {definition.stations.map(s => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </Input>
                  {Object.keys(definition.valuesInput).map(v => (
                    <ValueInput
                      key={v}
                      label={v}
                      type={definition.valuesInput[v]}
                      value={definition.valuesValue[v]}
                      simulatorId={simulator.id}
                      onBlur={value =>
                        this.setState(state => ({
                          requiredValues: {
                            ...state.requiredValues,
                            [v]: value
                          }
                        }))
                      }
                    />
                  ))}
                </div>
                <div style={{ flex: 3 }}>
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
                      simulatorId: simulator.id,
                      definition: definition.id,
                      values: { ...definition.valuesValue, ...requiredValues },
                      task: { station }
                    }}
                  >
                    {({ loading, data, error }) =>
                      loading ? (
                        <p>Loading instructions...</p>
                      ) : error ? (
                        <p>
                          Error:
                          {error.message}
                        </p>
                      ) : (
                        <p style={{ whiteSpace: "pre-wrap" }}>
                          {data.taskInstructions}
                        </p>
                      )
                    }
                  </Query>
                </div>
              </div>
            </Fragment>
          )}
        </div>

        <div style={{ display: "flex" }}>
          <Button size="sm" color="danger" onClick={cancel} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Mutation
            mutation={gql`
              mutation AddTask($taskInput: TaskInput!) {
                addTask(taskInput: $taskInput)
              }
            `}
            variables={{
              taskInput: {
                simulatorId: simulator.id,
                definition: definition && definition.id,
                values: {
                  ...(definition ? definition.valuesValue : {}),
                  ...requiredValues
                },
                station
              }
            }}
          >
            {action => (
              <Button
                size="sm"
                color="success"
                onClick={() => {
                  action();
                  cancel();
                }}
                style={{ flex: 1 }}
                disabled={!definition}
              >
                Create Task
              </Button>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

const TaskCreator = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { taskDefinitions } = data;
      if (loading || !taskDefinitions) return null;
      return <TasksCore {...props} taskDefinitions={taskDefinitions} />;
    }}
  </Query>
);
export default TaskCreator;
