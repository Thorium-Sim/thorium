import React, {Component} from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "helpers/reactstrap";
import {
  Link,
  Route,
  useParams,
  useNavigate,
  Routes,
  Outlet,
} from "react-router-dom";
import DefinitionList from "../../../TaskTemplates/definitionList";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import {Query, Mutation} from "react-apollo";

const fragment = gql`
  fragment TaskTemplateConfigData on TaskTemplate {
    id
    name
    definition
    values
    reportTypes
  }
`;

const SUB = gql`
  subscription TaskTemplatesUpdate {
    taskTemplatesUpdate {
      ...TaskTemplateConfigData
    }
  }
  ${fragment}
`;

const QUERY = gql`
  query TaskDefinitions {
    taskTemplates {
      ...TaskTemplateConfigData
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
  ${fragment}
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
      task: {id: $taskId, required: $required, nextSteps: $nextSteps}
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
      task: {id: $taskId, required: $required, nextSteps: $nextSteps}
    )
  }
`;

const TemplateList = ({taskTemplates, type, id, damageTasks}) => {
  const {selectedDef, selectedTemplate} = useParams();
  const navigate = useNavigate();
  return (
    <>
      <Col sm={4}>
        <h3>Templates</h3>
        <ListGroup style={{flex: 1, overflowY: "auto", maxHeight: "80vh"}}>
          {taskTemplates
            .filter(t => t.definition === selectedDef)
            .map(t => (
              <ListGroupItem
                key={t.id}
                onClick={() => navigate(t.id)}
                active={t.id === selectedTemplate}
              >
                {t.name}
                <Mutation
                  mutation={type === "simulator" ? SIMULATOR_ADD : SYSTEM_ADD}
                  variables={{
                    id,
                    task: {id: t.id, required: false, nextSteps: []},
                  }}
                  refetchQueries={["Simulators", "System"]}
                >
                  {add => (
                    <Mutation
                      mutation={
                        type === "simulator" ? SIMULATOR_REMOVE : SYSTEM_REMOVE
                      }
                      variables={{id, taskId: t.id}}
                      refetchQueries={["Simulators", "System"]}
                    >
                      {remove => (
                        <input
                          type="checkbox"
                          checked={damageTasks.find(d => d.id === t.id)}
                          onChange={e => (e.target.checked ? add() : remove())}
                        />
                      )}
                    </Mutation>
                  )}
                </Mutation>
              </ListGroupItem>
            ))}
        </ListGroup>
      </Col>
      <Outlet />
    </>
  );
};

const TaskConfig = ({type, id, damageTasks}) => {
  const {selectedTemplate} = useParams();
  return (
    <Col sm={4}>
      <Mutation
        mutation={type === "simulator" ? SIMULATOR_UPDATE : SYSTEM_UPDATE}
        refetchQueries={["Simulators", "System"]}
      >
        {action => {
          const task = damageTasks.find(d => d.id === selectedTemplate);
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
                        required: e.target.checked,
                      },
                    })
                  }
                />{" "}
                Required
              </label>
            </div>
          );
        }}
      </Mutation>
    </Col>
  );
};

const DefList = ({taskTemplates, damageTasks}) => {
  return (
    <>
      <Col sm={4}>
        <DefinitionList
          taskTemplates={taskTemplates.map(t => ({
            ...t,
            assigned: !!damageTasks.find(d => d.id === t.id),
          }))}
        />
      </Col>
      <Outlet />
    </>
  );
};
class DamageTasks extends Component {
  state = {};
  render() {
    const {id, damageTasks, type = "simulator"} = this.props;
    return (
      <Query query={QUERY}>
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {taskTemplates} = data;
          return (
            <Container>
              <small>
                Define damage report steps in{" "}
                <Link to="/config/tasks/taskTemplates">Task Templates</Link>{" "}
                before assigning.
              </small>
              <Row>
                <SubscriptionHelper
                  subscribe={() =>
                    subscribeToMore({
                      document: SUB,
                      updateQuery: (previousResult, {subscriptionData}) => {
                        return Object.assign({}, previousResult, {
                          taskTemplates:
                            subscriptionData.data.taskTemplatesUpdate,
                        });
                      },
                    })
                  }
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <DefList
                        taskTemplates={taskTemplates}
                        damageTasks={damageTasks}
                      />
                    }
                  >
                    <Route
                      path=":selectedDef"
                      element={
                        <TemplateList
                          taskTemplates={taskTemplates}
                          type={type}
                          id={id}
                          damageTasks={damageTasks}
                        />
                      }
                    >
                      <Route
                        path=":selectedTemplate"
                        element={
                          <TaskConfig
                            type={type}
                            id={id}
                            damageTasks={damageTasks}
                          />
                        }
                      />
                    </Route>
                  </Route>
                </Routes>
              </Row>
            </Container>
          );
        }}
      </Query>
    );
  }
}
export default DamageTasks;
