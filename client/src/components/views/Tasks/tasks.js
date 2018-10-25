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
} from "reactstrap";
import { FormattedMessage } from "react-intl";
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
                tasks.map(t => (
                  <ListGroupItem
                    key={t.id}
                    active={selectedTask === t.id}
                    onClick={() => this.setState({ selectedTask: t.id })}
                  >
                    <div>
                      <strong>{t.values.name || t.definition}</strong>
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
              <Button size="lg" color="success" disabled={!task}>
                <FormattedMessage
                  id="tasks-verify-button"
                  defaultMessage="Verify Task Completion"
                />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Tasks;
