import React, { Component, Fragment } from "react";
import { Card, Button, ListGroup, ListGroupItem } from "reactstrap";
import { Duration } from "luxon";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { titleCase } from "change-case";

export function parseDuration(time) {
  return Object.entries(
    Duration.fromObject({
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: Math.round((time || 0) / 1000)
    })
      .normalize()
      .toObject()
  )
    .filter(t => t[1] !== 0)
    .map(t => `${t[1]} ${titleCase(t[0])}`)
    .join(", ");
}

class Timer extends Component {
  state = {};
  componentDidMount() {
    this.timeout = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timeout);
  }
  render() {
    const { endTime, startTime } = this.props;
    if (!startTime) return parseDuration(endTime);
    return parseDuration(
      (endTime ? new Date(endTime) : new Date()) - new Date(startTime)
    );
  }
}
class TasksManager extends Component {
  state = {};
  render() {
    const { tasks, newTask, stats } = this.props;
    const { selectedTask, showDismissed } = this.state;
    const taskGroup = tasks.reduce((prev, next) => {
      if (!showDismissed && next.dismissed) return prev;
      prev[next.station] = prev[next.station]
        ? prev[next.station].concat(next)
        : [next];
      return prev;
    }, {});
    const task = tasks.find(t => t.id === selectedTask);
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <p>Tasks</p>
            <Mutation
              mutation={gql`
                mutation DismissVerified($simulatorId: ID!) {
                  dismissVerifiedTasks(simulatorId: $simulatorId)
                }
              `}
              variables={{ simulatorId: this.props.simulator.id }}
            >
              {action => (
                <Button size="sm" color="info" block onClick={action}>
                  Dismiss Verified
                </Button>
              )}
            </Mutation>
            <p>
              <label>
                Show Dismissed:{" "}
                <input
                  type="checkbox"
                  checked={showDismissed}
                  onChange={e =>
                    this.setState({ showDismissed: e.target.checked })
                  }
                />
              </label>
            </p>
            <ListGroup style={{ flex: 1, overflowY: "auto" }}>
              {Object.entries(taskGroup).map(([key, value]) => (
                <Fragment key={key}>
                  <ListGroupItem disabled>{key}</ListGroupItem>
                  {value
                    .concat()
                    .sort((a, b) => {
                      if (a.verified > b.verified) return 1;
                      if (b.verified > a.verified) return -1;
                      return 0;
                    })
                    .map(t => (
                      <ListGroupItem
                        key={t.id}
                        active={t.id === selectedTask}
                        onClick={() => this.setState({ selectedTask: t.id })}
                        className={`${t.verifyRequested ? "text-info" : ""} ${
                          t.verified ? "text-success" : ""
                        }`}
                      >
                        {t.definition}
                      </ListGroupItem>
                    ))}
                </Fragment>
              ))}
            </ListGroup>
          </div>
          <div style={{ flex: 3, overflowY: "auto" }}>
            <p>Task Information</p>
            {task && (
              <Fragment>
                <p>
                  <strong>Verified:</strong> {task.verified ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Time Elapsed:</strong> <Timer {...task} />{" "}
                </p>
                <p>
                  <strong>Instructions:</strong>
                </p>
                <Card style={{ whiteSpace: "pre-wrap" }}>
                  {task.instructions}
                </Card>
                {!task.verified && (
                  <Fragment>
                    <Mutation
                      mutation={gql`
                        mutation VerifyTask($taskId: ID!) {
                          verifyTask(taskId: $taskId)
                        }
                      `}
                      variables={{ taskId: task.id }}
                    >
                      {action => (
                        <Button
                          size="sm"
                          color="success"
                          onClick={() => {
                            action();
                            this.setState({ selectedTask: null });
                          }}
                        >
                          Verify
                        </Button>
                      )}
                    </Mutation>
                    <Mutation
                      mutation={gql`
                        mutation VerifyTask($taskId: ID!) {
                          verifyTask(taskId: $taskId, dismiss: true)
                        }
                      `}
                      variables={{ taskId: task.id }}
                    >
                      {action => (
                        <Button
                          size="sm"
                          color="success"
                          onClick={() => {
                            action();
                            this.setState({ selectedTask: null });
                          }}
                        >
                          Verify {"&"} Dismiss
                        </Button>
                      )}
                    </Mutation>
                    {task.verifyRequested && (
                      <Mutation
                        mutation={gql`
                          mutation RejectTask($taskId: ID!) {
                            denyTaskVerify(id: $taskId)
                          }
                        `}
                        variables={{ taskId: task.id }}
                      >
                        {action => (
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => {
                              action();
                            }}
                          >
                            Reject
                          </Button>
                        )}
                      </Mutation>
                    )}
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <Button block color="success" size="sm" onClick={newTask}>
            New Task
          </Button>
          <Button block color="info" size="sm" onClick={stats}>
            Stats
          </Button>
        </div>
      </div>
    );
  }
}

export default TasksManager;
