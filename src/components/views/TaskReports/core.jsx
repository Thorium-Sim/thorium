import React, {Fragment, Component} from "react";
import {Query, Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import {Button, Input, ListGroup, ListGroupItem} from "helpers/reactstrap";
import {useMutation} from "@apollo/client";

import "./style.scss";

const fragment = gql`
  fragment TaskReportCoreData on TaskReport {
    id
    type
    name
    system {
      id
      name
    }
    stepCount
    tasks {
      id
      instructions
      verified
      definition
      verifyRequested
    }
  }
`;

export const TASK_REPORTS_CORE_QUERY = gql`
  query TaskReport($simulatorId: ID!) {
    taskReport(simulatorId: $simulatorId) {
      ...TaskReportCoreData
    }
    systems(simulatorId: $simulatorId, extra: true) {
      id
      name
      displayName
      type
    }
    exocomps(simulatorId: $simulatorId) {
      id
      damage {
        damaged
      }
    }
  }
  ${fragment}
`;
export const TASK_REPORTS_CORE_SUB = gql`
  subscription TaskReportUpdate($simulatorId: ID!) {
    taskReportUpdate(simulatorId: $simulatorId) {
      ...TaskReportCoreData
    }
  }
  ${fragment}
`;

function typeValue(type) {
  if (type === "default") return "Repair";
  if (type === "rnd") return "R&D";
  if (type === "engineering") return "Report";
  return "Report";
}
const CREATE_EXTRA_MUTATION = gql`
  mutation CreateExtraSystem($simulatorId: ID!, $params: String!) {
    addSystemToSimulator(
      simulatorId: $simulatorId
      className: "System"
      params: $params
    )
  }
`;
const GENERATE_REPORT = gql`
  mutation GenerateTaskReport(
    $simulatorId: ID!
    $systemId: ID!
    $name: String!
    $stepCount: Int!
    $type: String!
  ) {
    generateTaskReport(
      simulatorId: $simulatorId
      systemId: $systemId
      name: $name
      stepCount: $stepCount
      type: $type
    )
  }
`;

const TaskReportCreator = ({simulator, systems, cancel, exocomps}) => {
  const [type, setType] = React.useState("default");
  const [name, setName] = React.useState("");
  const [systemId, setSystemId] = React.useState(null);
  const [stepCount, setStepCount] = React.useState(8);

  const defaultName =
    systemId &&
    `${
      systems
        .concat(
          exocomps.map((e, i) => ({
            ...e,
            type: "Exocomp",
            name: `Exocomp ${i + 1}`,
          })),
        )
        .find(s => s.id === systemId).name
    } ${typeValue(type)}`;

  const [createExtraSystemAction] = useMutation(CREATE_EXTRA_MUTATION);
  const [generateReportAction] = useMutation(GENERATE_REPORT, {
    variables: {
      simulatorId: simulator.id,
      systemId,
      name: name || defaultName,
      stepCount,
      type,
    },
  });

  const createExtraSystem = async () => {
    const name = prompt("What is the name of the system?");
    if (!name) return;
    const existingSystem = systems.find(
      s => s.name === name || s.displayName === name,
    );
    if (existingSystem) {
      setSystemId(existingSystem.id);
      return;
    }
    const variables = {
      simulatorId: simulator.id,
      params: JSON.stringify({
        name,
        extra: true,
      }),
    };
    const {data} = await createExtraSystemAction({variables});
    setSystemId(data.addSystemToSimulator);
  };
  return (
    <div className="taskReport-creator">
      <p>Create New Task Report</p>

      <label>
        System
        <Input
          type="select"
          value={systemId || "nothing"}
          onChange={e =>
            e.target.value === "add"
              ? createExtraSystem()
              : setSystemId(e.target.value)
          }
        >
          <option value="nothing">Choose a System</option>
          {systems
            .concat(
              exocomps.map((e, i) => ({
                ...e,
                type: "Exocomp",
                name: `Exocomp ${i + 1}`,
              })),
            )
            .sort((a, b) => {
              if (a.type > b.type) return 1;
              if (a.type < b.type) return -1;
              return 0;
            })
            .map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.type})
              </option>
            ))}
          <option value="add">Add System</option>
        </Input>
      </label>
      <label>
        Name
        <Input
          type="text"
          value={name}
          placeholder={defaultName}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Type
        <Input
          type="select"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="default">Damage</option>
          <option value="rnd">Research & Development</option>
          <option value="engineering">Engineering</option>
        </Input>
      </label>
      <label>
        Report Length
        <Input
          type="select"
          value={stepCount}
          onChange={e => {
            if (e.target.value === "set") {
              const count = window.prompt("How many steps?");
              if (isNaN(parseInt(count, 10)) || parseInt(count, 10) <= 0)
                return;
              setStepCount(parseInt(count, 10));
              return;
            }
            setStepCount(parseInt(e.target.value, 10));
          }}
        >
          {![3, 5, 8, 12].includes(stepCount) && (
            <option value={stepCount}>{stepCount} Steps</option>
          )}
          <option value="set">Enter Step Count</option>
          <option value="3">Superficial</option>
          <option value="5">Short</option>
          <option value="8">Medium</option>
          <option value="12">Long</option>
        </Input>
      </label>
      <div className="button-area">
        <Button style={{flex: 1}} color="danger" size="sm" onClick={cancel}>
          Cancel
        </Button>

        <Button
          style={{flex: 1}}
          color="success"
          size="sm"
          disabled={!systemId}
          onClick={() => generateReportAction().then(cancel)}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

function typeLabel(type) {
  if (type === "rnd") return "Research & Development";
  if (type === "engineering") return "Engineering";
  return "Repair";
}
class TaskReportCore extends Component {
  state = {};
  render() {
    const {simulator, systems, taskReport, exocomps} = this.props;
    const {creating, selectedReport} = this.state;
    const report = taskReport.find(t => t.id === selectedReport);
    return (
      <div className="taskReport-core">
        {creating ? (
          <TaskReportCreator
            simulator={simulator}
            systems={systems}
            exocomps={exocomps}
            cancel={() => this.setState({creating: false})}
          />
        ) : (
          <Fragment>
            <div className="report-area">
              <ListGroup style={{flex: 2, overflowY: "auto"}}>
                {taskReport
                  .map(t => t.type)
                  .filter((a, i, arr) => arr.indexOf(a) === i)
                  .sort()
                  .map(type => (
                    <Fragment key={`report-${type}`}>
                      <ListGroupItem disabled>{typeLabel(type)}</ListGroupItem>
                      {taskReport
                        .filter(t => t.type === type)
                        .map(t => (
                          <ListGroupItem
                            key={t.id}
                            active={t.id === selectedReport}
                            onClick={() =>
                              this.setState({selectedReport: t.id})
                            }
                            className={`${
                              t.tasks.find(tt => tt.verifyRequested)
                                ? "text-info"
                                : ""
                            } ${
                              !t.tasks.find(tt => !tt.verified)
                                ? "text-success"
                                : ""
                            }`}
                          >
                            <p>
                              {t.name}{" "}
                              {t.tasks.filter(v => v.verified).length <
                              t.tasks.length
                                ? `(${
                                    t.tasks.filter(v => v.verified).length + 1
                                  }/
                            ${t.tasks.length})`
                                : null}
                            </p>
                            <small>{t.system.name}</small>
                          </ListGroupItem>
                        ))}
                    </Fragment>
                  ))}
              </ListGroup>
              <div className="instructions">
                {report && (
                  <Fragment>
                    <strong>{report.name}</strong>
                    <div className="button-area">
                      <Mutation
                        mutation={gql`
                          mutation ClearReport($id: ID!) {
                            clearTaskReport(id: $id)
                          }
                        `}
                        variables={{id: report.id}}
                      >
                        {action => (
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => {
                              action();
                              this.setState({selectedReport: null});
                            }}
                          >
                            Clear Report
                          </Button>
                        )}
                      </Mutation>
                      <Mutation
                        mutation={gql`
                          mutation CompleteReport($id: ID!) {
                            completeTaskReport(id: $id)
                          }
                        `}
                        variables={{id: report.id}}
                      >
                        {action => (
                          <Button
                            size="sm"
                            color="success"
                            onClick={() => {
                              action();
                              this.setState({selectedReport: null});
                            }}
                          >
                            Complete Report
                          </Button>
                        )}
                      </Mutation>
                    </div>
                    {report.tasks.map((t, i) => (
                      <div
                        key={t.id}
                        className={`task ${t.verified ? "text-success" : ""} ${
                          t.verifyRequested ? "text-info" : ""
                        }`}
                      >
                        <p>
                          <strong>
                            Step {i + 1}: {t.definition}
                          </strong>
                        </p>
                        <p>
                          <em>Instructions:</em>
                        </p>
                        <p className="instructions">{t.instructions}</p>
                        {!t.verified && (
                          <Mutation
                            mutation={gql`
                              mutation VerifyTask($id: ID!, $stepId: ID!) {
                                verifyTaskReportStep(id: $id, stepId: $stepId)
                              }
                            `}
                            variables={{id: report.id, stepId: t.id}}
                          >
                            {action => (
                              <Button
                                size="sm"
                                color="success"
                                onClick={action}
                              >
                                Verify
                              </Button>
                            )}
                          </Mutation>
                        )}
                      </div>
                    ))}
                  </Fragment>
                )}
              </div>
            </div>
            <div className="button-area">
              <Button
                size="sm"
                color="success"
                onClick={() => this.setState({creating: true})}
              >
                New Task Report
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const TaskReportData = props => (
  <Query
    query={TASK_REPORTS_CORE_QUERY}
    variables={{simulatorId: props.simulator.id}}
  >
    {({loading, data, subscribeToMore}) => {
      if (loading || !data) return null;
      const {taskReport, systems, exocomps} = data;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: TASK_REPORTS_CORE_SUB,
              variables: {simulatorId: props.simulator.id},
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  taskReport: subscriptionData.data.taskReportUpdate,
                });
              },
            })
          }
        >
          <TaskReportCore
            {...props}
            taskReport={taskReport}
            systems={systems}
            exocomps={exocomps}
          />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default TaskReportData;
