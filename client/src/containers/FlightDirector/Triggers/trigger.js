import React, { Component, Fragment } from "react";
import {
  Library,
  DiagramProvider,
  DiagramContext,
  Canvas,
  Config
} from "react-node-diagrams";
import {
  Col,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import * as components from "./components";

console.log(components);

// I'm lazy
const compare = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export default class Trigger extends Component {
  state = {};
  render() {
    const { triggers } = this.props;
    const { selectedTrigger } = this.state;
    const trigger = triggers.find(c => c.id === selectedTrigger);
    return (
      <Container
        fluid
        style={{
          height: "calc(100vh - 60px)"
        }}
      >
        <Row style={{ height: "100%" }}>
          <Col sm={3} style={{ height: "100%" }}>
            <h3>Trigger Groups</h3>
            <ListGroup>
              {triggers.map(c => (
                <ListGroupItem
                  key={c.id}
                  active={c.id === selectedTrigger}
                  onClick={() => this.setState({ selectedTrigger: c.id })}
                >
                  {c.name}
                </ListGroupItem>
              ))}
            </ListGroup>
            <Mutation
              mutation={gql`
                mutation AddTriggerGroup($name: String!) {
                  addTrigger(name: $name)
                }
              `}
            >
              {action => (
                <Button
                  color="success"
                  size="sm"
                  block
                  onClick={() => {
                    const name = window.prompt(
                      "What is the name of the new event connector?"
                    );
                    if (!name) return;
                    action({ variables: { name } });
                  }}
                >
                  Add Trigger Group
                </Button>
              )}
            </Mutation>
            {trigger && (
              <Fragment>
                <Mutation
                  mutation={gql`
                    mutation RemoveTriggerGroup($id: ID!) {
                      removeTrigger(id: $id)
                    }
                  `}
                >
                  {action => (
                    <Button
                      color="danger"
                      size="sm"
                      block
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to remove this event connector group?"
                          )
                        ) {
                          action({ variables: { id: selectedTrigger } });
                          this.setState({ selectedTrigger: null });
                        }
                      }}
                    >
                      Remove Trigger Group
                    </Button>
                  )}
                </Mutation>
                <Mutation
                  mutation={gql`
                    mutation RenameTriggerGroup($id: ID!, $name: String!) {
                      renameTrigger(id: $id, name: $name)
                    }
                  `}
                >
                  {action => (
                    <Button
                      color="warning"
                      size="sm"
                      block
                      onClick={() => {
                        const name = window.prompt(
                          "What is the new name of the trigger?",
                          trigger.name
                        );
                        if (!name) return;
                        action({
                          variables: { id: selectedTrigger, name }
                        });
                      }}
                    >
                      Rename Trigger Group
                    </Button>
                  )}
                </Mutation>
              </Fragment>
            )}
          </Col>
          {trigger && (
            <Mutation
              key={trigger.id}
              mutation={gql`
                mutation UpdateTrigger(
                  $id: ID!
                  $components: JSON
                  $connections: JSON
                  $config: JSON
                  $values: JSON
                ) {
                  updateTrigger(
                    id: $id
                    components: $components
                    connections: $connections
                    config: $config
                    values: $values
                  )
                }
              `}
            >
              {action => (
                <DiagramProvider
                  {...trigger}
                  registeredComponents={components}
                  onUpdate={({ components, connections, config, values }) => {
                    const variables = { id: trigger.id };
                    if (!compare(components, trigger.components))
                      variables.components = components;
                    if (!compare(connections, trigger.connections))
                      variables.connections = connections;
                    if (!compare(config, trigger.config))
                      variables.config = config;
                    if (!compare(values, trigger.values))
                      variables.values = values;
                    action({ variables });
                  }}
                >
                  <Col sm={3} style={{ height: "100%" }}>
                    <DiagramContext.Consumer>
                      {({ selectedComponent }) =>
                        selectedComponent ? <Config /> : <Library />
                      }
                    </DiagramContext.Consumer>
                  </Col>
                  <Col sm={6} style={{ height: "100%" }}>
                    {" "}
                    <Canvas />
                  </Col>
                </DiagramProvider>
              )}
            </Mutation>
          )}
        </Row>
      </Container>
    );
  }
}
