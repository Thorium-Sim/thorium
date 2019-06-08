import React from "react";
import {
  Input,
  ListGroup,
  ListGroupItem,
  Button,
  ButtonGroup
} from "reactstrap";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import EventName from "containers/FlightDirector/MissionConfig/EventName";

const ClientInfo = ({
  id,
  simulator,
  commandLineOutput,
  commandLineFeedback
}) => {
  const [input, setInput] = React.useState("");
  const outputRef = React.useRef();
  React.useEffect(() => {
    if (outputRef.current && commandLineOutput) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [commandLineOutput]);
  return (
    <>
      <div className="output" ref={outputRef}>
        {commandLineOutput.join("\n")}
      </div>
      <Mutation
        mutation={gql`
          mutation Mutation(
            $simulatorId: ID!
            $clientId: ID!
            $output: String!
          ) {
            addCommandLineOutput(
              simulatorId: $simulatorId
              clientId: $clientId
              output: $output
            )
          }
        `}
      >
        {action => (
          <Input
            size="sm"
            className="terminal-main-input"
            placeholder="Input Response..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                action({
                  variables: {
                    simulatorId: simulator.id,
                    clientId: id,
                    output: input
                  }
                });
                setInput("");
                return;
              }
            }}
          />
        )}
      </Mutation>
      <small>
        Use this input to write back command responses as if you were the
        computer.
      </small>
      {commandLineFeedback.map(c => (
        <div key={c.id}>
          <p>Command Approval: {c.command}</p>
          <div className="flex flex-wrap">
            {c.triggers.length > 0 ? (
              <pre>
                Approve Triggers:{"\n"}
                {c.triggers.map(e => (
                  <div className="trigger-name">
                    <EventName id={e.event} label={e.event} />
                  </div>
                ))}
              </pre>
            ) : null}
            <Mutation
              mutation={gql`
                mutation HandleFeedback(
                  $simulatorId: ID!
                  $clientId: ID!
                  $feedbackId: ID!
                  $isApproved: Boolean!
                ) {
                  handleCommandLineFeedback(
                    simulatorId: $simulatorId
                    clientId: $clientId
                    feedbackId: $feedbackId
                    isApproved: $isApproved
                  )
                }
              `}
            >
              {action => (
                <ButtonGroup>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() =>
                      action({
                        variables: {
                          simulatorId: simulator.id,
                          clientId: id,
                          feedbackId: c.id,
                          isApproved: false
                        }
                      })
                    }
                  >
                    Deny
                  </Button>
                  <Button
                    size="sm"
                    color="success"
                    onClick={() =>
                      action({
                        variables: {
                          simulatorId: simulator.id,
                          clientId: id,
                          feedbackId: c.id,
                          isApproved: true
                        }
                      })
                    }
                  >
                    Approve
                  </Button>
                </ButtonGroup>
              )}
            </Mutation>
          </div>
        </div>
      ))}
    </>
  );
};
const CommandLineCore = ({ simulator, clients, ...rest }) => {
  const [selectedClient, setSelectedClient] = React.useState(null);
  const client = clients.find(c => c.id === selectedClient);
  console.log(simulator, rest);
  return (
    <div className="commandline-core">
      <div className="commandline-clients">
        <ListGroup>
          {clients
            .map(c => ({
              ...c,
              station: simulator.stations.find(
                s => c.station && s.name === c.station.name
              )
            }))
            .filter(
              c =>
                console.log(c) ||
                (c.commandLineOutput &&
                  c.commandLineOutput.length > 0 &&
                  c.station &&
                  c.station.cards.find(s => s.component === "CommandLine"))
            )
            .map(c => (
              <ListGroupItem
                key={c.id}
                active={c.id === selectedClient}
                className={c.commandLineFeedback.length > 0 ? "bg-danger" : ""}
                onClick={() => setSelectedClient(c.id)}
              >
                {c.id}
              </ListGroupItem>
            ))}
        </ListGroup>
      </div>
      <div className="commandline-info">
        {client && <ClientInfo {...client} simulator={simulator} />}
      </div>
    </div>
  );
};

export default CommandLineCore;
