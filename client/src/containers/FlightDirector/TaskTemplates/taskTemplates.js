import React, { Fragment, Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  Button,
  Badge
} from "reactstrap";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import "./style.scss";
import TaskConfig from "./taskConfig";

const QUERY = gql`
  query TaskDefinitions {
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

class TaskTemplates extends Component {
  state = { selectedDef: "nothing" };
  render() {
    const { selectedDef, selectedTemplate } = this.state;
    const { taskTemplates } = this.props;
    return (
      <Query query={QUERY}>
        {({ loading, data: { taskDefinitions }, subscribeToMore }) => {
          if (loading) return null;
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
          const taskTemplate = taskTemplates.find(
            t => t.id === selectedTemplate
          );
          return (
            <Container fluid className="task-templates">
              <Row>
                <Col sm={3}>
                  <h3>Definitions</h3>
                  <ListGroup style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    {Object.entries(definitionGroups).map(([key, value]) => (
                      <Fragment key={key}>
                        <ListGroupItem>
                          <strong>{key}</strong>
                        </ListGroupItem>
                        {value.map(v => (
                          <ListGroupItem
                            key={v.name}
                            active={v.name === selectedDef}
                            onClick={() =>
                              this.setState({ selectedDef: v.name })
                            }
                          >
                            {v.name}{" "}
                            <Badge>
                              {
                                taskTemplates.filter(
                                  t => t.definition === v.name
                                ).length
                              }
                            </Badge>
                          </ListGroupItem>
                        ))}
                      </Fragment>
                    ))}
                  </ListGroup>
                </Col>
                <Col
                  sm={4}
                  style={{ display: "flex", flexDirection: "column" }}
                >
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
                        </ListGroupItem>
                      ))}
                  </ListGroup>
                  {selectedDef !== "nothing" && (
                    <Mutation
                      mutation={gql`
                        mutation AddTaskTemplate($definition: String!) {
                          addTaskTemplate(definition: $definition)
                        }
                      `}
                      variables={{ definition: selectedDef }}
                    >
                      {action => (
                        <Button
                          color="success"
                          onClick={() =>
                            action().then(({ data: { addTaskTemplate } }) =>
                              this.setState({
                                selectedTemplate: addTaskTemplate
                              })
                            )
                          }
                        >
                          Add Template
                        </Button>
                      )}
                    </Mutation>
                  )}
                  {taskTemplate && (
                    <Mutation
                      mutation={gql`
                        mutation RemoveTaskTemplate($id: ID!) {
                          removeTaskTemplate(id: $id)
                        }
                      `}
                      variables={{ id: taskTemplate.id }}
                    >
                      {action => (
                        <Button
                          color="danger"
                          onClick={() =>
                            action().then(() =>
                              this.setState({ selectedTemplate: null })
                            )
                          }
                        >
                          Remove Template
                        </Button>
                      )}
                    </Mutation>
                  )}
                </Col>
                {taskTemplate && (
                  <Col sm={5}>
                    <h3>Template Config</h3>
                    <Card>
                      <CardBody>
                        <TaskConfig
                          {...taskTemplate}
                          definition={taskDefinitions.find(
                            d => d.name === taskTemplate.definition
                          )}
                        />
                      </CardBody>
                    </Card>
                  </Col>
                )}
              </Row>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default TaskTemplates;
