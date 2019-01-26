import React, { Fragment, Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import "./style.scss";

const queryData = `
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
}
`;

const QUERY = gql`
  query TaskReport($simulatorId: ID!) {
    taskReport(simulatorId: $simulatorId) {
${queryData}
    }
    systems(simulatorId:$simulatorId) {
      id
      name
      type
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription TaskReportUpdate($simulatorId: ID!) {
    taskReportUpdate(simulatorId: $simulatorId) {
${queryData}
    }
  }
`;

class TaskReportCreator extends Component {
  state = { type: "default", name: "", stepCount: 8 };
  render() {
    const { type, systemId, name, stepCount } = this.state;
    const { simulator, cancel, systems } = this.props;
    return (
      <div className="taskReport-creator">
        <p>Create New Task Report</p>
        <label>
          Name
          <Input
            type="text"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <label>
          System
          <Input
            type="select"
            value={systemId || "nothing"}
            onChange={e => this.setState({ systemId: e.target.value })}
          >
            <option value="nothing">Choose a System</option>
            {systems
              .concat()
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
          </Input>
        </label>
        <label>
          Type
          <Input
            type="select"
            value={type}
            onChange={e => this.setState({ type: e.target.value })}
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
            onChange={e =>
              this.setState({ stepCount: parseInt(e.target.value, 10) })
            }
          >
            <option value="3">Superficial</option>
            <option value="5">Short</option>
            <option value="8">Medium</option>
            <option value="12">Long</option>
          </Input>
        </label>
        <div className="button-area">
          <Button style={{ flex: 1 }} color="danger" size="sm" onClick={cancel}>
            Cancel
          </Button>
          <Mutation
            mutation={gql`
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
            `}
            variables={{
              simulatorId: simulator.id,
              systemId,
              name,
              stepCount,
              type
            }}
          >
            {action => (
              <Button
                style={{ flex: 1 }}
                color="success"
                size="sm"
                disabled={!name || !systemId}
                onClick={() => action().then(cancel)}
              >
                Create
              </Button>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

function typeLabel(type) {
  if (type === "rnd") return "Research & Development";
  if (type === "engineering") return "Engineering";
  return "Repair";
}
class TaskReportCore extends Component {
  state = {};
  render() {
    const { simulator, systems, taskReport } = this.props;
    const { creating, selectedReport } = this.state;
    const report = taskReport.find(t => t.id === selectedReport);
    return (
      <div className="taskReport-core">
        {creating ? (
          <TaskReportCreator
            simulator={simulator}
            systems={systems}
            cancel={() => this.setState({ creating: false })}
          />
        ) : (
          <Fragment>
            <div className="report-area">
              <ListGroup style={{ flex: 1, overflowY: "auto" }}>
                {taskReport
                  .map(t => t.type)
                  .filter((a, i, arr) => arr.indexOf(a) === i)
                  .sort()
                  .map(type => (
                    <Fragment key={`report-${type}`}>
                      <ListGroupItem disabled>{typeLabel(type)}</ListGroupItem>
                      {taskReport.filter(t => t.type === type).map(t => (
                        <ListGroupItem
                          key={t.id}
                          active={t.id === selectedReport}
                          onClick={() =>
                            this.setState({ selectedReport: t.id })
                          }
                          className={`${t.verifyRequested ? "text-info" : ""} ${
                            t.verified ? "text-success" : ""
                          }`}
                        >
                          <p>
                            {t.name}{" "}
                            {t.tasks.filter(v => v.verified).length <
                            t.tasks.length
                              ? `(${t.tasks.filter(v => v.verified).length + 1}/
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
                      <Button size="sm" color="danger">
                        Clear Report
                      </Button>
                      <Button size="sm" color="success">
                        Complete Report
                      </Button>
                    </div>
                    {report.tasks.map((t, i) => (
                      <div
                        key={t.id}
                        className={`task ${t.verified ? "text-success" : ""}`}
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
                          <Button size="sm" color="success">
                            Verify
                          </Button>
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
                onClick={() => this.setState({ creating: true })}
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
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { taskReport, systems } = data;
      if (loading || !taskReport || !systems) return null;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  taskReport: subscriptionData.data.taskReportUpdate
                });
              }
            })
          }
        >
          <TaskReportCore
            {...props}
            taskReport={taskReport}
            systems={systems}
          />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default TaskReportData;
