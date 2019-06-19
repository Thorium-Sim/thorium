import React, { Fragment } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import FontAwesome from "react-fontawesome";
import EventName from "../MissionConfig/EventName";
import MacroWrapper from "../MissionConfig/MacroConfig";
import EventPicker from "../MissionConfig/EventPicker";
import uuid from "uuid";
import { titleCase } from "change-case";

const colors = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark"
];

const ActionList = ({
  configId,
  id,
  color,
  category,
  selectedAction,
  setSelectedAction,
  actions,
  addAction,
  removeAction
}) => {
  return (
    <Fragment>
      <h3>Actions</h3>
      <Label>
        Color
        <Mutation
          mutation={gql`
            mutation UpdateColor(
              $configId: ID!
              $id: ID!
              $color: NotifyColors!
            ) {
              setMacroButtonColor(configId: $configId, id: $id, color: $color)
            }
          `}
        >
          {action => (
            <Input
              type="select"
              value={color}
              onChange={e =>
                action({ variables: { configId, id, color: e.target.value } })
              }
            >
              <option disabled>Choose a color</option>
              {colors.map(c => (
                <option key={c} value={c}>
                  {titleCase(c)}
                </option>
              ))}
            </Input>
          )}
        </Mutation>
      </Label>
      <Label>
        Category
        <Mutation
          mutation={gql`
            mutation UpdateCategory(
              $configId: ID!
              $id: ID!
              $category: String!
            ) {
              setMacroButtonCategory(
                configId: $configId
                id: $id
                category: $category
              )
            }
          `}
        >
          {action => (
            <Input
              type="text"
              defaultValue={category}
              onBlur={e =>
                action({
                  variables: { configId, id, category: e.target.value }
                })
              }
            />
          )}
        </Mutation>
      </Label>
      <ListGroup style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {actions.map(e => (
          <ListGroupItem
            key={`${id}-${e.id}`}
            onClick={() => setSelectedAction(e.id)}
            active={e.id === selectedAction}
          >
            <EventName id={e.event} />{" "}
            <FontAwesome
              name="ban"
              className="text-danger pull-right"
              onClick={() => removeAction(e.id)}
            />
          </ListGroupItem>
        ))}
      </ListGroup>
      <EventPicker
        className={"btn btn-sm btn-success"}
        handleChange={e => addAction(e.target.value)}
      />
    </Fragment>
  );
};

const ActionConfig = ({ event, delay, args, updateAction }) => {
  return (
    <Fragment>
      <EventName id={event} />{" "}
      <Card className="scroll" style={{ maxHeight: "75vh" }}>
        <CardBody>
          <FormGroup>
            <Label>Item Delay (in milliseconds)</Label>
            <Input
              type="number"
              defaultValue={delay}
              onBlur={e => updateAction("delay", parseInt(e.target.value))}
            />
          </FormGroup>
          <MacroWrapper
            event={event}
            args={args}
            updateMacro={(key, data) => updateAction(key, data)}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};
const MacroConfig = ({ macros }) => {
  const [selectedMacro, setSelectedMacro] = React.useState(null);
  const [selectedButton, setSelectedButton] = React.useState(null);
  const [selectedAction, setSelectedAction] = React.useState(null);
  const macro = macros.find(m => m.id === selectedMacro);
  const button = macro && macro.buttons.find(b => b.id === selectedButton);
  const actionObj = button && button.actions.find(a => a.id === selectedAction);
  return (
    <Container
      fluid
      style={{
        height: "calc(100vh - 60px)"
      }}
    >
      <Row style={{ height: "100%" }}>
        <Col sm={3} style={{ height: "100%" }}>
          <h3>Macro Buttons</h3>
          <ListGroup style={{ maxHeight: "60vh", overflowY: "auto" }}>
            {macros.map(m => (
              <ListGroupItem
                key={m.id}
                active={m.id === selectedMacro}
                onClick={() => {
                  setSelectedMacro(m.id);
                  setSelectedButton(null);
                  setSelectedAction(null);
                }}
              >
                {m.name}
              </ListGroupItem>
            ))}
          </ListGroup>
          <Mutation
            mutation={gql`
              mutation AddMacro($name: String!) {
                addMacroButtonConfig(name: $name)
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
                    "What is the name of the new macro button config?"
                  );
                  if (!name) return;
                  action({ variables: { name } }).then(res => {
                    setSelectedMacro(res.data.addMacroButtonConfig);
                    setSelectedButton(null);
                    setSelectedAction(null);
                  });
                }}
              >
                Add Macro Button Config
              </Button>
            )}
          </Mutation>
          {macro && (
            <Fragment>
              <Mutation
                mutation={gql`
                  mutation RemoveMacro($id: ID!) {
                    removeMacroButtonConfig(id: $id)
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
                          "Are you sure you want to remove this macro button config?"
                        )
                      ) {
                        action({ variables: { id: selectedMacro } });
                        setSelectedAction(null);
                        setSelectedButton(null);
                        setSelectedMacro(null);
                      }
                    }}
                  >
                    Remove Macro Button Config
                  </Button>
                )}
              </Mutation>
              <Mutation
                mutation={gql`
                  mutation RenameMacro($id: ID!, $name: String!) {
                    renameMacroButtonConfig(id: $id, name: $name)
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
                        "What is the new name of the macro button config?",
                        macro.name
                      );
                      if (!name) return;
                      action({
                        variables: { id: selectedMacro, name }
                      });
                    }}
                  >
                    Rename Macro Button Config
                  </Button>
                )}
              </Mutation>
            </Fragment>
          )}
        </Col>
        <Col sm={3} style={{ height: "100%" }}>
          {macro && (
            <>
              <h3>Buttons</h3>
              <ListGroup style={{ maxHeight: "60vh", overflowY: "auto" }}>
                {macro.buttons.map(m => (
                  <ListGroupItem
                    key={m.id}
                    active={m.id === selectedButton}
                    onClick={() => {
                      setSelectedButton(m.id);
                      setSelectedAction(null);
                    }}
                  >
                    {m.name}
                    <br />
                    <small>{m.category}</small>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Mutation
                mutation={gql`
                  mutation AddButton($configId: ID!, $name: String!) {
                    addMacroButton(configId: $configId, name: $name)
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
                        "What is the name of the new button?"
                      );
                      if (!name) return;
                      action({ variables: { name, configId: macro.id } }).then(
                        res => {
                          setSelectedButton(res.data.addMacroButton);
                          setSelectedAction(null);
                        }
                      );
                    }}
                  >
                    Add Button
                  </Button>
                )}
              </Mutation>
              {button && (
                <Fragment>
                  <Mutation
                    mutation={gql`
                      mutation RemoveMacro($configId: ID!, $id: ID!) {
                        removeMacroButton(configId: $configId, id: $id)
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
                              "Are you sure you want to remove this button?"
                            )
                          ) {
                            action({ variables: { id: selectedButton } });
                            setSelectedAction(null);
                            setSelectedButton(null);
                          }
                        }}
                      >
                        Remove Macro Button Config
                      </Button>
                    )}
                  </Mutation>
                  <Mutation
                    mutation={gql`
                      mutation RenameMacro(
                        $configId: ID!
                        $id: ID!
                        $name: String!
                      ) {
                        renameMacroButton(
                          configId: $configId
                          id: $id
                          name: $name
                        )
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
                            "What is the new name of the button?",
                            macro.name
                          );
                          if (!name) return;
                          action({
                            variables: {
                              configId: macro.id,
                              id: selectedButton,
                              name
                            }
                          });
                        }}
                      >
                        Rename Button
                      </Button>
                    )}
                  </Mutation>
                </Fragment>
              )}
            </>
          )}
        </Col>
        <Mutation
          mutation={gql`
            mutation MacroUpdate(
              $configId: ID!
              $id: ID!
              $actions: [ActionInput]!
            ) {
              updateMacroButtonActions(
                configId: $configId
                id: $id
                actions: $actions
              )
            }
          `}
        >
          {action => (
            <Fragment>
              <Col sm={3} style={{ height: "100%" }}>
                {button && (
                  <ActionList
                    key={selectedButton}
                    configId={macro.id}
                    {...button}
                    addAction={e =>
                      action({
                        variables: {
                          configId: macro.id,
                          id: button.id,
                          actions: button.actions.concat({
                            id: uuid.v4(),
                            event: e,
                            args: "{}",
                            delay: 0
                          })
                        }
                      })
                    }
                    removeAction={id =>
                      action({
                        variables: {
                          configId: macro.id,
                          id: button.id,
                          actions: button.actions.filter(a => a.id !== id)
                        }
                      })
                    }
                    selectedAction={selectedAction}
                    setSelectedAction={setSelectedAction}
                  />
                )}
              </Col>
              <Col sm={3}>
                {actionObj && (
                  <ActionConfig
                    key={actionObj.id}
                    {...actionObj}
                    updateAction={(key, data) =>
                      action({
                        variables: {
                          configId: macro.id,
                          id: button.id,
                          actions: button.actions.map(a => {
                            if (a.id === actionObj.id) {
                              return { ...a, [key]: data };
                            }
                            return a;
                          })
                        }
                      })
                    }
                  />
                )}
              </Col>
            </Fragment>
          )}
        </Mutation>
      </Row>
    </Container>
  );
};

export default MacroConfig;
