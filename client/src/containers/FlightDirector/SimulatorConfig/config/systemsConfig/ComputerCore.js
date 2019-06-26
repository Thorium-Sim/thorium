import React, { useState } from "react";
import {
  FormGroup,
  Button,
  Label,
  Input,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "helpers/reactstrap";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag.macro";
import { Mutation, Query } from "react-apollo";

const COMPUTER_CORE = gql`
  query ComputerCore($id: ID!) {
    oneComputerCore(id: $id) {
      id
      users {
        id
        name
        level
        hacker
        password
      }
    }
  }
`;
const ComputerCore = props => {
  const { id } = props;
  const [selected, setSelected] = useState(null);
  return (
    <GenericSystemConfig {...props}>
      <Query query={COMPUTER_CORE} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return null;
          const { oneComputerCore: computerCore } = data;
          const levels = Object.keys(
            computerCore.users.reduce(
              (prev, next) => ({
                ...prev,
                [next.level]: [...(prev[next.level] || []), next]
              }),
              {}
            )
          );
          const selectedUser = computerCore.users.find(s => s.id === selected);
          return (
            <FormGroup className="beams">
              <h4>Computer Core Users</h4>
              <Row>
                <Col sm={5}>
                  <Mutation
                    mutation={gql`
                      mutation NewUser($id: ID!) {
                        addComputerCoreUser(id: $id) {
                          id
                        }
                      }
                    `}
                    variables={{ id }}
                    refetchQueries={[
                      { query: COMPUTER_CORE, variables: { id } }
                    ]}
                  >
                    {action => (
                      <Button
                        block
                        color="success"
                        onClick={() =>
                          action().then(({ data }) =>
                            setSelected(data.addComputerCoreUser.id)
                          )
                        }
                      >
                        New User
                      </Button>
                    )}
                  </Mutation>
                  <ListGroup
                    style={{
                      maxHeight: "60vh",
                      overflowY: "auto"
                    }}
                  >
                    {levels.map(l => (
                      <>
                        <ListGroupItem key={`level-${l}`} className="disabled">
                          Level {l}
                        </ListGroupItem>
                        {computerCore.users
                          .filter(f => parseInt(f.level) === parseInt(l))
                          .map(m => (
                            <ListGroupItem
                              key={m.id}
                              active={selected === m.id}
                              onClick={() => setSelected(m.id)}
                            >
                              {m.name}
                            </ListGroupItem>
                          ))}
                      </>
                    ))}
                  </ListGroup>
                </Col>
                {selectedUser && (
                  <Mutation
                    mutation={gql`
                      mutation UpdateUser(
                        $id: ID!
                        $userId: ID!
                        $name: String
                        $password: String
                        $level: Int
                        $hacker: Boolean
                      ) {
                        updateComputerCoreUser(
                          id: $id
                          userId: $userId
                          name: $name
                          password: $password
                          level: $level
                          hacker: $hacker
                        )
                      }
                    `}
                    refetchQueries={[
                      { query: COMPUTER_CORE, variables: { id } }
                    ]}
                  >
                    {update => (
                      <Col sm={7} key={selectedUser.id}>
                        <Label>
                          Name:{" "}
                          <Input
                            type="text"
                            defaultValue={selectedUser.name}
                            onBlur={e =>
                              update({
                                variables: {
                                  id,
                                  userId: selectedUser.id,
                                  name: e.target.value
                                }
                              })
                            }
                          />
                        </Label>
                        <Label>
                          Password:{" "}
                          <Input
                            type="text"
                            defaultValue={selectedUser.password}
                            onBlur={e =>
                              update({
                                variables: {
                                  id,
                                  userId: selectedUser.id,
                                  password: e.target.value
                                }
                              })
                            }
                          />
                        </Label>
                        <Label>
                          Level:{" "}
                          <Input
                            type="select"
                            value={selectedUser.level}
                            onChange={e =>
                              update({
                                variables: {
                                  id,
                                  userId: selectedUser.id,
                                  level: Number(e.target.value)
                                }
                              })
                            }
                          >
                            {Array(10)
                              .fill(0)
                              .map((l, i) => (
                                <option
                                  key={`level-select-${i + 1}`}
                                  value={i + 1}
                                >
                                  Level {i + 1}
                                </option>
                              ))}
                          </Input>
                        </Label>
                        <Label>
                          Hacker:{" "}
                          <Input
                            type="checkbox"
                            checked={selectedUser.hacker}
                            style={{ marginLeft: "20px" }}
                            onChange={e =>
                              update({
                                variables: {
                                  id,
                                  userId: selectedUser.id,
                                  hacker: e.target.checked
                                }
                              })
                            }
                          />
                        </Label>
                        <Mutation
                          mutation={gql`
                            mutation RemoveCoreUser($id: ID!, $userId: ID!) {
                              removeComputerCoreUser(id: $id, userId: $userId)
                            }
                          `}
                          variables={{ id, userId: selectedUser.id }}
                          refetchQueries={[
                            { query: COMPUTER_CORE, variables: { id } }
                          ]}
                        >
                          {action => (
                            <Button
                              color="danger"
                              onClick={() => {
                                action();
                                setSelected(null);
                              }}
                            >
                              Delete
                            </Button>
                          )}
                        </Mutation>
                      </Col>
                    )}
                  </Mutation>
                )}
              </Row>
            </FormGroup>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};
export default ComputerCore;
