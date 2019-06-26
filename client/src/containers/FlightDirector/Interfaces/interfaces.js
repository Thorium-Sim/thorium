import React, { Component, Fragment } from "react";

import {
  Col,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from "helpers/reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import Canvas from "./canvas";
import "./style.scss";

export default class Interfaces extends Component {
  state = {};
  // handleImport = evt => {
  //   const data = new FormData();
  //   Array.from(evt.target.files).forEach((f, index) =>
  //     data.append(`files[${index}]`, f)
  //   );
  //   fetch(
  //     `${window.location.protocol}//${window.location.hostname}:${parseInt(
  //       window.location.port,
  //       10
  //     ) + 1}/importInterface`,
  //     {
  //       method: "POST",
  //       body: data
  //     }
  //   ).then(() => {
  //     //  window.location.reload();
  //   });
  // };
  render() {
    const { interfaces, interfaceDevices } = this.props;
    const { selectedInterface } = this.state;
    const interfaceObj = interfaces.find(c => c.id === selectedInterface);
    return (
      <Container
        className="interface-container"
        fluid
        style={{
          height: "calc(100vh - 60px)"
        }}
      >
        <Row style={{ height: "100%" }}>
          <Col sm={3} style={{ height: "100%" }}>
            <h3>Interfaces</h3>
            <ListGroup>
              {interfaces.map(c => (
                <ListGroupItem
                  key={c.id}
                  active={c.id === selectedInterface}
                  onClick={() => this.setState({ selectedInterface: c.id })}
                >
                  {c.name}
                </ListGroupItem>
              ))}
            </ListGroup>
            <Mutation
              mutation={gql`
                mutation AddInterfaceGroup($name: String!) {
                  addInterface(name: $name)
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
                      "What is the name of the new interface?"
                    );
                    if (!name) return;
                    action({ variables: { name } });
                  }}
                >
                  Add Interface
                </Button>
              )}
            </Mutation>
            {/* <label style={{ display: "block" }}>
              <div className="btn btn-info btn-sm btn-block">
                Import Interface
              </div>
              <input type="file" hidden onChange={this.handleImport} />
            </label> */}
            {interfaceObj && (
              <Fragment>
                <Mutation
                  mutation={gql`
                    mutation RemoveInterfaceGroup($id: ID!) {
                      removeInterface(id: $id)
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
                            "Are you sure you want to remove this interface?"
                          )
                        ) {
                          action({ variables: { id: selectedInterface } });
                          this.setState({ selectedInterface: null });
                        }
                      }}
                    >
                      Remove Interface
                    </Button>
                  )}
                </Mutation>
                <Mutation
                  mutation={gql`
                    mutation RenameInterfaceGroup($id: ID!, $name: String!) {
                      renameInterface(id: $id, name: $name)
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
                          "What is the new name of the interface?",
                          interfaceObj.name
                        );
                        if (!name) return;
                        action({
                          variables: { id: selectedInterface, name }
                        });
                      }}
                    >
                      Rename Interface
                    </Button>
                  )}
                </Mutation>
                {/* <Button
                  size="sm"
                  tag="a"
                  href={`${window.location.protocol}//${
                    window.location.hostname
                  }:${parseInt(window.location.port, 10) +
                    1}/exportInterface/${selectedInterface}`}
                  block
                  color="info"
                >
                  Export Interface
                </Button> */}
              </Fragment>
            )}
          </Col>
          <Canvas
            interfaceObj={interfaceObj}
            interfaceDevices={interfaceDevices}
          />
        </Row>
      </Container>
    );
  }
}
