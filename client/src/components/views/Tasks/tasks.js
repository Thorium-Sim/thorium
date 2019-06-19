import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  CardBlock,
  Button
} from "helpers/reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { FormattedMessage } from "react-intl";
import FontAwesome from "react-fontawesome";

class Tasks extends Component {
  state = {};
  render() {
    const { tasks } = this.props;
    const { selectedTask } = this.state;
    const task = tasks.find(t => t.id === selectedTask);
    return (
      <Container className="card-tasks">
        <Row>
          <Col sm={4}>
            <h3>
              <FormattedMessage id="tasks-list" defaultMessage="Tasks List" />
            </h3>
            <ListGroup>
              {tasks.length === 0 ? (
                <ListGroupItem>No Tasks</ListGroupItem>
              ) : (
                tasks
                  .concat()
                  .sort((a, b) => {
                    if (a.verified > b.verified) return 1;
                    if (b.verified > a.verified) return -1;
                    return 0;
                  })
                  .map(t => (
                    <ListGroupItem
                      key={t.id}
                      active={selectedTask === t.id}
                      onClick={() => this.setState({ selectedTask: t.id })}
                    >
                      <div>
                        <strong
                          className={`${t.verifyRequested ? "text-info" : ""} ${
                            t.verified ? "text-success" : ""
                          }`}
                        >
                          {t.values.name || t.definition}
                        </strong>{" "}
                        {t.verifyRequested && (
                          <FontAwesome spin name="refresh" />
                        )}
                      </div>
                      <div className="truncated-instructions">
                        {t.instructions}
                      </div>
                    </ListGroupItem>
                  ))
              )}
            </ListGroup>
          </Col>
          <Col sm={8} style={{ display: "flex", flexDirection: "column" }}>
            <h3>
              <FormattedMessage
                id="tasks-instructions"
                defaultMessage="Task Instructions"
              />
            </h3>
            <Card>
              <CardBlock>{task && task.instructions}</CardBlock>
            </Card>
            <div>
              <Mutation
                mutation={gql`
                  mutation RequestVerify($id: ID!) {
                    requestTaskVerify(id: $id)
                  }
                `}
                variables={{ id: task && task.id }}
              >
                {action => (
                  <Button
                    size="lg"
                    color="success"
                    disabled={
                      !task || (task && (task.verifyRequested || task.verified))
                    }
                    onClick={action}
                  >
                    {task ? (
                      task.verifyRequested ? (
                        <FormattedMessage
                          id="tasks-verify-in-progress"
                          defaultMessage="Verification In Progress..."
                        />
                      ) : task.verified ? (
                        <FormattedMessage
                          id="tasks-completed"
                          defaultMessage="Task Completed"
                        />
                      ) : (
                        <FormattedMessage
                          id="tasks-verify-button"
                          defaultMessage="Verify Task Completion"
                        />
                      )
                    ) : (
                      <FormattedMessage
                        id="tasks-verify-button"
                        defaultMessage="Verify Task Completion"
                      />
                    )}
                  </Button>
                )}
              </Mutation>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Tasks;
