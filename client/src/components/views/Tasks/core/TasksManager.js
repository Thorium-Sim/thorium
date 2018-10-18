import React, { Component, Fragment } from "react";
import { Card, Button, ListGroup, ListGroupItem } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class TasksManager extends Component {
  state = {};
  render() {
    const { tasks, newTask } = this.props;
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
            <Button size="sm" color="info" block>
              Dismiss Verified
            </Button>
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
                  {value.map(t => (
                    <ListGroupItem
                      key={t.id}
                      active={t.id === selectedTask}
                      onClick={() => this.setState({ selectedTask: t.id })}
                      className={`${t.verified ? "text-success" : ""}`}
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
                  <strong>Instructions:</strong>
                </p>
                <Card style={{ whiteSpace: "pre-wrap" }}>
                  {task.instructions}
                </Card>
                {!task.verified && (
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
                )}
              </Fragment>
            )}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <Button block color="success" size="sm" onClick={newTask}>
            New Task
          </Button>
        </div>
      </div>
    );
  }
}

export default TasksManager;
