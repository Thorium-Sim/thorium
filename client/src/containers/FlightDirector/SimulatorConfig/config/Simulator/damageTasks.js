import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import DefinitionList from "../../../TaskTemplates/definitionList";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { Query, Mutation } from "react-apollo";
import FontAwesome from "react-fontawesome";
const queryData = `
id
name
definition
values
reportTypes`;

const SUB = gql`
subscription TaskTemplatesUpdate {
  taskTemplatesUpdate {
    ${queryData}
  }
}`;

const QUERY = gql`
  query TaskDefinitions {
    taskTemplates {
   ${queryData}
  }
    taskDefinitions {
      id
      class
      name
      stations {
        name
      }
      valuesInput
      valuesValue
    }
  }
`;

const SIMULATOR_ADD = gql`
  mutation AddDamageTask($id: ID!, $task: DamageTaskInput!) {
    addSimulatorDamageTask(simulatorId: $id, task: $task)
  }
`;
const SYSTEM_ADD = gql`
  mutation AddDamageTask($id: ID!, $task: DamageTaskInput!) {
    addSystemDamageTask(systemId: $id, task: $task)
  }
`;
const SIMULATOR_REMOVE = gql`
  mutation RemoveDamageTask($id: ID!, $taskId: ID!) {
    removeSimulatorDamageTask(simulatorId: $id, taskId: $taskId)
  }
`;
const SYSTEM_REMOVE = gql`
  mutation RemoveDamageTask($id: ID!, $taskId: ID!) {
    removeSystemDamageTask(systemId: $id, taskId: $taskId)
  }
`;
const SIMULATOR_UPDATE = gql`
  mutation EditDamageTask(
    $id: ID!
    $taskId: ID!
    $required: Boolean
    $nextSteps: [ID]
  ) {
    updateSimulatorDamageTask(
      simulatorId: $id
      task: { id: $taskId, required: $required, nextSteps: $nextSteps }
    )
  }
`;
const SYSTEM_UPDATE = gql`
  mutation EditDamageTask(
    $id: ID!
    $taskId: ID!
    $required: Boolean
    $nextSteps: [ID]
  ) {
    updateSystemDamageTask(
      systemId: $id
      task: { id: $taskId, required: $required, nextSteps: $nextSteps }
    )
  }
`;
class DamageTasks extends Component {
  state = {};
  render() {
    const { selectedDef, selectedTemplate } = this.state;
    const { id, damageTasks, type = "simulator" } = this.props;
    return (
      <Query query={QUERY}>
        {({
          loading,
          data: { taskDefinitions, taskTemplates },
          subscribeToMore
        }) => {
          if (loading) return null;
          return (
            <Container>
              <small>
                Define damage report steps in{" "}
                <Link to="/config/taskTemplates">Task Templates</Link> before
                assigning.
              </small>
              <Row>
                <SubscriptionHelper
                  subscribe={() =>
                    subscribeToMore({
                      document: SUB,
                      updateQuery: (previousResult, { subscriptionData }) => {
                        return Object.assign({}, previousResult, {
                          taskTemplates:
                            subscriptionData.data.taskTemplatesUpdate
                        });
                      }
                    })
                  }
                />
                <Col sm={4}>
                  <DefinitionList
                    taskDefinitions={taskDefinitions}
                    taskTemplates={taskTemplates.map(t => ({
                      ...t,
                      assigned: !!damageTasks.find(d => d.id === t.id)
                    }))}
                    selectedDef={selectedDef}
                    setSelectedDef={v =>
                      this.setState({ selectedDef: v, selectedTemplate: null })
                    }
                  />
                </Col>
                <Col sm={4}>
                  <h3>Templates</h3>
                  <ListGroup
                    style={{ flex: 1, overflowY: "auto", maxHeight: "80vh" }}
                  >
                    {taskTemplates
                      .filter(t => t.definition === selectedDef)
                      .map(t => (
                        <ListGroupItem
                          key={t.id}
                          onClick={() =>
                            this.setState({ selectedTemplate: t.id })
                          }
                          active={t.id === selectedTemplate}
                        >
                          {t.name}
                          <Mutation
                            mutation={
                              type === "simulator" ? SIMULATOR_ADD : SYSTEM_ADD
                            }
                            variables={{
                              id,
                              task: { id: t.id, required: false, nextSteps: [] }
                            }}
                            refetchQueries={["Simulators", "System"]}
                          >
                            {add => (
                              <Mutation
                                mutation={
                                  type === "simulator"
                                    ? SIMULATOR_REMOVE
                                    : SYSTEM_REMOVE
                                }
                                variables={{ id, taskId: t.id }}
                                refetchQueries={["Simulators", "System"]}
                              >
                                {remove => (
                                  <input
                                    type="checkbox"
                                    checked={damageTasks.find(
                                      d => d.id === t.id
                                    )}
                                    onChange={e =>
                                      e.target.checked ? add() : remove()
                                    }
                                  />
                                )}
                              </Mutation>
                            )}
                          </Mutation>
                        </ListGroupItem>
                      ))}
                  </ListGroup>
                </Col>
                <Col sm={4}>
                  <Mutation
                    mutation={
                      type === "simulator" ? SIMULATOR_UPDATE : SYSTEM_UPDATE
                    }
                    refetchQueries={["Simulators", "System"]}
                  >
                    {action => {
                      const task = damageTasks.find(
                        d => d.id === selectedTemplate
                      );
                      if (!task) return null;
                      return (
                        <div>
                          <h4>Selected Damage Task</h4>
                          <label>
                            <input
                              type="checkbox"
                              checked={task.required || false}
                              onChange={e =>
                                action({
                                  variables: {
                                    id,
                                    taskId: selectedTemplate,
                                    required: e.target.checked
                                  }
                                })
                              }
                            />{" "}
                            Required
                          </label>
                          <p>
                            <strong>
                              Steps that <em>must</em> follow this step (must
                              already be added to damage task list):
                            </strong>
                          </p>
                          <Input
                            type="select"
                            value={"choose"}
                            onChange={e =>
                              action({
                                variables: {
                                  id,
                                  taskId: selectedTemplate,
                                  nextSteps: task.nextSteps
                                    .map(ns => ns.id)
                                    .concat(e.target.value)
                                }
                              })
                            }
                          >
                            <option value="choose" disabled>
                              Choose A Damage Step
                            </option>
                            {damageTasks
                              .filter(d => d.id !== selectedTemplate)
                              .map(o => (
                                <option key={o.id} value={o.id}>
                                  {o.taskTemplate.name} (
                                  {o.taskTemplate.definition})
                                </option>
                              ))}
                          </Input>
                          {task.nextSteps.map(s => (
                            <p key={`next-${s.id}`}>
                              {s.name} ({s.definition}){" "}
                              <FontAwesome
                                name="ban"
                                className="text-danger"
                                onClick={() => {
                                  action({
                                    variables: {
                                      id,
                                      taskId: selectedTemplate,
                                      nextSteps: task.nextSteps
                                        .map(ns => ns.id)
                                        .filter(ns => ns !== s.id)
                                    }
                                  });
                                }}
                              />
                            </p>
                          ))}
                        </div>
                      );
                    }}
                  </Mutation>
                </Col>
              </Row>
            </Container>
          );
        }}
      </Query>
    );
  }
}
export default DamageTasks;
