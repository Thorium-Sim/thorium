import React, { Component } from "react";
import { Query } from "react-apollo";
import { Container, Row, Col, Input } from "reactstrap";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { titleCase } from "change-case";
import "./style.scss";

// const queryData = `
// `;

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
// const SUBSCRIPTION = gql`
//   subscription TasksUpdate($simulatorId: ID!) {
//     tasksUpdate(simulatorId: $simulatorId) {
// ${queryData}
//     }
//   }
// `;

const ValueInput = ({ label, type, value, onBlur }) => {
  return (
    <div>
      {(() => {
        if (type === "text")
          return (
            <label>
              {titleCase(label)}
              <Input
                type="text"
                placeholder={value}
                onBlur={e => onBlur(e.target.value)}
              />
            </label>
          );
        if (type === "textarea")
          return (
            <label>
              {titleCase(label)}
              <Input
                type="textarea"
                rows={3}
                placeholder={value}
                onBlur={e => onBlur(e.target.value)}
              />
            </label>
          );
        if (type === "roomPicker")
          return <label>{titleCase(label)} - Room Picker</label>;
        if (typeof type === "object" && type.length > 0)
          return (
            <label>
              {titleCase(label)}
              <Input
                type="select"
                value={value}
                onChange={e => onBlur(e.target.value)}
              >
                {type.map(v => (
                  <option key={`${v.label}-${v.value}`} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </Input>
            </label>
          );
        if (typeof type === "object")
          return (
            <label>
              {titleCase(label)}
              <Input
                {...type}
                placeholder={value}
                onBlur={e => onBlur(e.target.value)}
              />
            </label>
          );
        return (
          <label>
            {titleCase(label)}
            <div>Invalid input type</div>
          </label>
        );
      })()}
    </div>
  );
};

class TasksCore extends Component {
  state = {
    selectedDefinition: "nothing",
    station: "nothing",
    requiredValues: {}
  };
  render() {
    const { taskDefinitions, simulator } = this.props;
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
      <Container className="core-tasks">
        <Row>
          <Col sm={12}>
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
          </Col>
        </Row>
        {definition && (
          <Row>
            {!definition.active && (
              <Col sm={12}>
                <strong>
                  This task might be redundant or unnecessary. Double check it
                  before assigning it.
                </strong>
              </Col>
            )}
            <Col sm={4}>
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
                  onBlur={value =>
                    this.setState(state => ({
                      requiredValues: { ...state.requiredValues, [v]: value }
                    }))
                  }
                />
              ))}
            </Col>
            <Col sm={8}>
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
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

const TasksData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { taskDefinitions } = data;
      if (loading || !taskDefinitions) return null;
      return (
        // <SubscriptionHelper
        //   subscribe={() =>
        //     subscribeToMore({
        //       document: SUBSCRIPTION,
        //       variables: { simulatorId: props.simulator.id },
        //       updateQuery: (previousResult, { subscriptionData }) => {
        //         return Object.assign({}, previousResult, {
        //           tasks: subscriptionData.data.tasksUpdate
        //         });
        //       }
        //     })
        //   }
        // >
        <TasksCore {...props} taskDefinitions={taskDefinitions} />
        // </SubscriptionHelper>
      );
    }}
  </Query>
);
export default TasksData;
