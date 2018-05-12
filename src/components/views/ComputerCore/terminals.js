import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

function status(stat) {
  switch (stat) {
    case "F":
      return "Functional";
    case "O":
      return "Offline";
    case "R":
      return "Restarting";
    default:
      return "";
  }
}

class Terminals extends Component {
  state = {};
  render() {
    const { selectedTerminal } = this.state;
    const { terminals, id } = this.props;
    return (
      <Fragment>
        <h4>Terminal Listing</h4>
        <ListGroup className="terminal-list">
          {terminals.map(t => (
            <ListGroupItem
              key={`terminal-${t.id}`}
              className={selectedTerminal === t.id ? "selected" : ""}
              onClick={() => this.setState({ selectedTerminal: t.id })}
            >
              {t.name} - {status(t.status)}
            </ListGroupItem>
          ))}
        </ListGroup>
        <Mutation
          mutation={gql`
            mutation RestartTerminal($id: ID!, $terminalId: ID!) {
              restartComputerCoreTerminal(id: $id, terminalId: $terminalId)
            }
          `}
          variables={{ id, terminalId: selectedTerminal }}
        >
          {action => (
            <Button
              color="danger"
              disabled={!selectedTerminal}
              onClick={() => {
                action();
                this.setState({ selectedTerminal: null });
              }}
            >
              Restart Terminal
            </Button>
          )}
        </Mutation>
      </Fragment>
    );
  }
}

export default Terminals;
