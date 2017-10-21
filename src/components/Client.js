import React, { Component } from "react";
import { withRouter } from "react-router";
import { Container, Button } from "reactstrap";
import randomWords from "random-words";
import CardContainer from "../containers/Card";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import "./client.scss";

let clientId = localStorage.getItem("thorium_clientId");
if (!clientId) {
  clientId = randomWords(3).join("-");
  // Just to test out the webpack
  localStorage.setItem("thorium_clientId", clientId);
}

const creditList = [
  {
    header: "Created By:",
    content: "Alex Anderson 🚀"
  },
  {
    header: "Conceptual Design",
    content: "Matt Ricks 🤔"
  },
  {
    header: "Technical Consultant",
    content: "Brent Anderson 🤓"
  },
  {
    header: "Documentation & Training",
    content: "Crystal Anderson 💎"
  },
  {
    header: "Curve Frame Design",
    content: "BJ Warner 🎨 & Todd Rasband 🖌"
  },
  {
    header: "Docking Images (Endless Sky)",
    content: (
      <div>
        <p>Maximilian Korber (CC-BY-SA-4.0)</p>
        <p>Iaz Poolar (CC-BY-SA-4.0)</p>
        <p>Michael Zahniser (CC-BY-SA-4.0)</p>
      </div>
    )
  },
  {
    header: "Card Icons",
    content: (
      <div>
        <p>jet engine by Arthur Shlain from the Noun Project</p>
        <p>Coolant Temperature by Ben Johnson from the Noun Project</p>
        <p>sensor by Bakunetsu Kaito from the Noun Project</p>
        <p>Gyroscope by Arthur Shlain from the Noun Project</p>
        <p>Radar by Oliviu Stoian from the Noun Project</p>
        <p>Feather Icon Pack</p>
      </div>
    )
  }
];
class Credits extends Component {
  state = { debug: false, scroll: 0 };
  toggleDebug = () => {
    this.setState({
      debug: !this.state.debug
    });
  };
  componentDidMount() {
    this.looping = true;
    this.loop();
  }
  componentWillUnmount() {
    this.looping = false;
  }
  loop = () => {
    if (!this.looping) return;
    const el = this.refs.scroll;

    this.setState({
      scroll:
        el && el.scrollHeight - el.clientHeight <= this.state.scroll
          ? 0
          : this.state.scroll + 0.1 || 1
    });
    requestAnimationFrame(this.loop);
  };
  changeClientId = () => {};
  render() {
    const { props } = this;
    let client = {};
    let flight = {};
    let simulator = {};
    let station = {};
    if (this.refs.scroll) {
      this.refs.scroll.scrollTop = this.state.scroll;
    }
    if (!props.data.loading) {
      client = props.data.clients.length > 0 ? props.data.clients[0] : {};
      simulator = client.simulator || {};
      flight = client.flight || {};
      station = client.station || {};
    }
    return (
      <div className="credit-bg" onClick={this.toggleDebug}>
        <Container>
          <img
            role="presentation"
            src={require("./logo.png")}
            draggable="false"
          />
          <h1>Thorium</h1>
          {this.state.debug
            ? <div className="debug">
                <h4>
                  <Button color="info" onClick={this.changeClientId}>
                    Client ID: {client.id}
                  </Button>
                </h4>
                <h5>
                  Flight: {flight.name}
                </h5>
                <h5>
                  Simulator: {simulator.name}
                </h5>
                <h5>
                  Station: {station.name}
                </h5>
                <h5>
                  Login Name: {client.loginName}
                </h5>
              </div>
            : <div ref="scroll" className="scroll">
                {creditList.map(c =>
                  <div key={c.header} className="creditSection">
                    <h3>
                      {c.header}
                    </h3>
                    <h4>
                      {c.content}
                    </h4>
                  </div>
                )}
              </div>}
        </Container>
      </div>
    );
  }
}

const CLIENT_SUB = gql`
  subscription ClientChanged($client: ID!) {
    clientChanged(client: $client) {
      id
      flight {
        id
        name
        date
      }
      simulator {
        id
        name
        alertlevel
        layout
      }
      station {
        name
        login
        messageGroups
        widgets
        cards {
          name
          component
        }
      }
      loginName
      loginState
      offlineState
      training
    }
  }
`;

const SIMULATOR_SUB = gql`
  subscription SimulatorUpdate($id: ID!) {
    simulatorsUpdate(simulatorId: $id) {
      id
      name
      alertlevel
      layout
    }
  }
`;

class ClientView extends Component {
  constructor(props) {
    super(props);
    this.clientSubscription = null;
    this.clientPingSubscription = null;
    this.simulatorSub = null;
    window.onbeforeunload = () => {
      props.client.mutate({
        mutation: gql`
          mutation RemoveClient($id: ID!) {
            clientDisconnect(client: $id)
          }
        `,
        variables: { id: clientId }
      });
      return null;
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.clientSubscription && !nextProps.data.loading) {
      this.clientSubscription = nextProps.data.subscribeToMore({
        document: CLIENT_SUB,
        variables: { client: clientId }
      });
    }
    if (!this.simulatorSub && !nextProps.data.loading) {
      const client = nextProps.data.clients[0];
      if (client.simulator) {
        if (
          !this.props.data.clients ||
          client.simulator.id !== this.props.data.clients[0].simulator.id
        ) {
          this.simulatorSub && this.simulatorSub();

          this.simulatorSub = nextProps.data.subscribeToMore({
            document: SIMULATOR_SUB,
            variables: { id: client.simulator.id },
            updateQuery: (previousResult, { subscriptionData }) => {
              const sim = subscriptionData.data.simulatorsUpdate[0];
              return Object.assign({}, previousResult, {
                clients: previousResult.clients.map(
                  ({
                    flight,
                    id,
                    loginName,
                    loginState,
                    offlineState,
                    station,
                    __typename
                  }) => ({
                    flight,
                    id,
                    loginName,
                    loginState,
                    offlineState,
                    station,
                    __typename,
                    simulator: {
                      __typename: "Simulator",
                      id: sim.id,
                      alertlevel: sim.alertlevel,
                      layout: sim.layout,
                      name: sim.name
                    }
                  })
                )
              });
            }
          });
        }
      }
    }
  }
  componentDidMount() {
    this.props.client.mutate({
      mutation: gql`
        mutation RegisterClient($client: ID!) {
          clientConnect(client: $client)
        }
      `,
      variables: { client: clientId }
    });
  }
  render() {
    let flight,
      simulator,
      station,
      client = {};
    if (!this.props.data.loading) {
      client = this.props.data.clients[0];
      flight = client.flight;
      simulator = client.simulator;
      station = client.station;
    }
    return (
      <div>
        {flight && simulator && station
          ? <CardContainer
              flight={flight}
              simulator={simulator}
              station={station}
              client={client}
            />
          : <Credits {...this.props} />}
      </div>
    );
  }
}

const ClientQuery = gql`
  query Clients($clientId: ID) {
    clients(clientId: $clientId) {
      id
      flight {
        id
        name
        date
      }
      simulator {
        id
        name
        alertlevel
        layout
      }
      station {
        name
        login
        messageGroups
        widgets
        cards {
          name
          component
        }
      }
      loginName
      loginState
      offlineState
      training
    }
  }
`;

export default withRouter(
  graphql(ClientQuery, {
    options: {
      variables: {
        clientId: clientId
      }
    }
  })(withApollo(ClientView))
);
