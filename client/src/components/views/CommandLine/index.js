import React from "react";
import { Container, Input } from "reactstrap";
import gql from "graphql-tag.macro";
import { withApollo, Mutation, Subscription, Query } from "react-apollo";
import Tour from "helpers/tourHelper";
import { FormattedMessage } from "react-intl";
import "./style.scss";
const trainingSteps = [
  {
    selector: ".nothing",
    content: (
      <FormattedMessage
        id="command-line-training-1"
        defaultMessage="The command line allows you to run low-level commands on your simulator. These commands could allow you to bypass or override certain parts of the controls."
      />
    )
  },
  {
    selector: ".terminal-main-input",
    content: (
      <FormattedMessage
        id="command-line-training-2"
        defaultMessage="This is where you type in your commands. To see what commands are available, type 'help'. Hit 'return' on your keyboard when you are done typing a command."
      />
    )
  },
  {
    selector: ".terminal-output",
    content: (
      <FormattedMessage
        id="command-line-training-3"
        defaultMessage="The output of your command will appear here. This is where you will see what your command did and if it was successful or not."
      />
    )
  }
];

// It might be possible to make this more complex by having
// the ability to perform multiple actions as part of the
// node diagram API which link into the command line
// API. Things like locking the command line, sending
// additional messages after a delay, overwriting the
// current terminal line, etc.

// The goal would be to replicate the commands in the ./commands file.
const CommandLineOutput = ({ output }) => {
  const outputRef = React.useRef();
  React.useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);
  return (
    <div className="terminal-output" ref={outputRef}>
      {output}
    </div>
  );
};
const CommandLine = ({ clientObj, simulator }) => {
  const [input, setInput] = React.useState("");
  return (
    <Container fluid className="terminal-card">
      <Query
        query={gql`
          query Client($clientId: ID!) {
            clients(clientId: $clientId) {
              id
              commandLineOutput
            }
          }
        `}
        variables={{ clientId: clientObj.id }}
      >
        {({ loading, data }) => (
          <Subscription
            subscription={gql`
              subscription ClientUpdate($clientId: ID!) {
                commandLineOutputUpdate(clientId: $clientId)
              }
            `}
            variables={{ clientId: clientObj.id }}
          >
            {() => (
              <CommandLineOutput
                output={
                  !data.clients
                    ? "Accessing Command Line Interface..."
                    : data.clients[0].commandLineOutput.join("\n")
                }
              />
            )}
          </Subscription>
        )}
      </Query>

      <Mutation
        mutation={gql`
          mutation Mutation(
            $simulatorId: ID!
            $command: String!
            $arg: String
          ) {
            executeCommandLine(
              simulatorId: $simulatorId
              command: $command
              arg: $arg
            )
          }
        `}
      >
        {action => (
          <Input
            className="terminal-main-input"
            placeholder="Input Command..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                const cmd = input.split(" ");
                action({
                  variables: {
                    simulatorId: simulator.id,
                    command: cmd[0],
                    arg: cmd.slice(1, Infinity).join(" ")
                  }
                });
                setInput("");
                return;
              }
            }}
          />
        )}
      </Mutation>

      <Tour steps={trainingSteps} client={clientObj} />
    </Container>
  );
};

export default withApollo(CommandLine);
