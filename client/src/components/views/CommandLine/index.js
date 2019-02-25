import React, { Component } from "react";
import Terminal from "terminal-in-react";
import { Container } from "reactstrap";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
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
    selector: ".terminal-output-line",
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

class CommandLine extends Component {
  showMsg = () => "Hello World";

  render() {
    return (
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Terminal
          //  plugins={[Commands(this.props)]}
          commands={{
            programmer: () => "Alex Anderson 🚀",
            help: (cmd, print) => {
              const { simulator, client } = this.props;
              const query = gql`
                query CommandLineCommands($simulatorId: ID!) {
                  commandLineCommands(simulatorId: $simulatorId) {
                    name
                    help
                    hidden
                  }
                }
              `;
              client
                .query({ query, variables: { simulatorId: simulator.id } })
                .then(({ data: { commandLineCommands } }) => {
                  print(
                    commandLineCommands
                      .filter(c => !c.hidden)
                      .map(c => `${c.name}${c.help ? ": " : ""}${c.help}`)
                      .join("\n")
                  );
                });
            }
          }}
          commandPassThrough={(cmd, print) => {
            // do something async
            const { simulator, client } = this.props;
            const mutation = gql`
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
            `;
            const command = cmd[0];
            const arg = cmd.slice(1, Infinity).join(" ");
            client
              .mutate({
                mutation,
                variables: { simulatorId: simulator.id, command, arg }
              })
              .then(({ data: { executeCommandLine } }) => {
                print(executeCommandLine);
              });
          }}
          hideTopBar={true}
          allowTabs={false}
          prompt="green"
          color="green"
          outputColor="green"
          backgroundColor="rgba(0,0,0,0.7)"
          barColor="black"
          style={{
            fontWeight: "bold",
            fontSize: "1em",
            border: "solid 1px rgba(255,255,255,0.5)"
          }}
          msg={`Welcome to Ubuntu 31.04.5 LTS (GNU/Linux 3.13.0-125-generic x86_64)

  System information

  System load:  0.26                Processes:           133
  Usage of /:   63.7% of 147.51YB   Users logged in:     0
  Memory usage: 85%                 IP address for eth0: 172.19.45.181
  Swap usage:   0%

79 packages can be updated.
60 updates are security updates.


Last login: ip-10-0-43-69.ec2.internal

Type "help" to get a list of available commands`}
        />
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}

export default withApollo(CommandLine);
