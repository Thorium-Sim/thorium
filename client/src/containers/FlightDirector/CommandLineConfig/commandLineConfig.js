import React, { Component, Fragment } from "react";
import {
  Library,
  DiagramProvider,
  DiagramContext,
  Canvas,
  Config
} from "helpers/react-node-diagrams";
import {
  Col,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import * as components from "./components";
import MacroListMaker from "../macroListMaker";
import debounce from "helpers/debounce";
const compare = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export default class CommandLineConfig extends Component {
  state = {};
  render() {
    const { commandLines } = this.props;
    const { selectedCommandLine } = this.state;
    const commandLine = commandLines.find(c => c.id === selectedCommandLine);
    return (
      <Container
        fluid
        style={{
          height: "calc(100vh - 60px)"
        }}
      >
        <Row style={{ height: "100%" }}>
          <Col sm={3} style={{ height: "100%" }}>
            <h3>Command Lines</h3>
            <ListGroup style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {commandLines.map(c => (
                <ListGroupItem
                  key={c.id}
                  active={c.id === selectedCommandLine}
                  onClick={() => this.setState({ selectedCommandLine: c.id })}
                >
                  {c.name}
                </ListGroupItem>
              ))}
            </ListGroup>
            <Mutation
              mutation={gql`
                mutation AddCommandLine($name: String!) {
                  addCommandLine(name: $name)
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
                      "What is the name of the new command line?"
                    );
                    if (!name) return;
                    action({ variables: { name } });
                  }}
                >
                  Add Command Line
                </Button>
              )}
            </Mutation>
            {commandLine && (
              <Fragment>
                <Mutation
                  mutation={gql`
                    mutation RemoveCommandLine($id: ID!) {
                      removeCommandLine(id: $id)
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
                            "Are you sure you want to remove this command line?"
                          )
                        ) {
                          action({ variables: { id: selectedCommandLine } });
                          this.setState({ selectedCommandLine: null });
                        }
                      }}
                    >
                      Remove Command Line
                    </Button>
                  )}
                </Mutation>
                <Mutation
                  mutation={gql`
                    mutation RenameCommandLine($id: ID!, $name: String!) {
                      renameCommandLine(id: $id, name: $name)
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
                          "What is the new name of the command line?",
                          commandLine.name
                        );
                        if (!name) return;
                        action({
                          variables: { id: selectedCommandLine, name }
                        });
                      }}
                    >
                      Rename Command Line
                    </Button>
                  )}
                </Mutation>
              </Fragment>
            )}
          </Col>
          {commandLine && (
            <Mutation
              key={commandLine.id}
              mutation={gql`
                mutation UpdateCommandLine(
                  $id: ID!
                  $components: JSON
                  $connections: JSON
                  $config: JSON
                  $values: JSON
                ) {
                  updateCommandLine(
                    id: $id
                    components: $components
                    connections: $connections
                    config: $config
                    values: $values
                  )
                }
              `}
            >
              {mutate => {
                const action = debounce(args => mutate(args), 1000);
                return (
                  <MacroListMaker
                    exceptions={[
                      "triggerAction",
                      "removeLibraryEntry",
                      "hideSimulatorCard",
                      "unhideSimulatorCard"
                    ]}
                  >
                    {eventList => (
                      <DiagramProvider
                        registeredComponents={{ ...components, ...eventList }}
                        {...commandLine}
                        onUpdate={({
                          components,
                          connections,
                          config,
                          values
                        }) => {
                          const variables = { id: commandLine.id };
                          if (!compare(components, commandLine.components))
                            variables.components = components;
                          if (!compare(connections, commandLine.connections))
                            variables.connections = connections;
                          if (!compare(config, commandLine.config))
                            variables.config = config;
                          if (!compare(values, commandLine.values))
                            variables.values = values;
                          action({ variables });
                        }}
                      >
                        <Col sm={3} style={{ height: "100%" }}>
                          <DiagramContext.Consumer>
                            {({ selectedComponent, registeredComponents }) =>
                              selectedComponent ? <Config /> : <Library />
                            }
                          </DiagramContext.Consumer>
                        </Col>
                        <Col sm={6} style={{ height: "100%" }}>
                          <Canvas />
                        </Col>
                      </DiagramProvider>
                    )}
                  </MacroListMaker>
                );
              }}
            </Mutation>
          )}
        </Row>
      </Container>
    );
  }
}
