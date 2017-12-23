import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Button } from "reactstrap";
import randomWords from "random-words";
import CardContainer from "../containers/Card";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Caching from "./caching";
import playSound from "./generic/SoundPlayer";
import "./client.css";

class ClientWrapper extends Component {
  constructor(props) {
    super(props);
    let clientId = localStorage.getItem("thorium_clientId");
    if (!clientId) {
      clientId = randomWords(3).join("-");
      // Just to test out the webpack
      localStorage.setItem("thorium_clientId", clientId);
    }
    this.state = {
      clientId
    };
  }
  updateClientId = clientId => {
    const oldClientId = this.state.clientId;
    localStorage.setItem("thorium_clientId", clientId);
    this.setState({ clientId });
    this.props.client.mutate({
      mutation: gql`
        mutation RemoveClient($id: ID!) {
          clientDisconnect(client: $id)
        }
      `,
      variables: { id: oldClientId }
    });
    this.props.client.mutate({
      mutation: gql`
        mutation RegisterClient($client: ID!) {
          clientConnect(client: $client)
        }
      `,
      variables: { client: clientId }
    });
  };
  render() {
    return (
      <Client
        clientId={this.state.clientId}
        updateClientId={this.updateClientId}
      />
    );
  }
}

export default withApollo(ClientWrapper);

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
  changeClientId = evt => {
    evt.preventDefault();
    const newClientId = prompt("What is the new client ID?");
    if (newClientId) {
      this.props.updateClientId(newClientId);
    }
  };
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
      <div className="credit-bg">
        <Container>
          <img
            alt="Logo"
            src={require("./logo.png")}
            draggable="false"
            onClick={this.toggleDebug}
          />
          <h1>Thorium</h1>

          {this.state.debug ? (
            <div className="debug">
              <h4>
                <Button color="info" onClick={this.changeClientId}>
                  Client ID: {client.id}
                </Button>
              </h4>
              <h5>Flight: {flight.name}</h5>
              <h5>Simulator: {simulator.name}</h5>
              <h5>Station: {station.name}</h5>
              <h5>Login Name: {client.loginName}</h5>
              <h5>
                Download the client app:{" "}
                <a download="Thorium.zip" href="/thorium.zip">
                  Mac
                </a>
                {/*| <a download="Thorium.zip" href="/sciences.ogg">Windows</a>
                | <a download="Thorium.zip" href="/sciences.ogg">Linux</a>*/}
              </h5>
            </div>
          ) : (
            <div ref="scroll" className="scroll">
              {creditList.map(c => (
                <div key={c.header} className="creditSection">
                  <h3>{c.header}</h3>
                  <h4>{c.content}</h4>
                </div>
              ))}
            </div>
          )}
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
      caches
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
    this.simulatorSub = null;
    window.onbeforeunload = () => {
      props.client.mutate({
        mutation: gql`
          mutation RemoveClient($id: ID!) {
            clientDisconnect(client: $id)
          }
        `,
        variables: { id: props.clientId }
      });
      return null;
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.clientId !== nextProps.clientId) {
      this.clientSubscription && this.clientSubscription();
      this.clientSubscription = null;
    }
    if (!this.clientSubscription && !nextProps.data.loading) {
      this.clientSubscription = nextProps.data.subscribeToMore({
        document: CLIENT_SUB,
        variables: { client: nextProps.clientId }
      });
    }
    const client = nextProps.data.clients[0];
    if (
      !client ||
      (client.simulator &&
        this.props.data.clients &&
        this.props.data.clients[0] &&
        this.props.data.clients[0].simulator &&
        client.simulator.id !== this.props.data.clients[0].simulator.id)
    ) {
      this.simulatorSub && this.simulatorSub();
      this.simulatorSub = null;
    }
    if (!this.simulatorSub && !nextProps.data.loading) {
      if (client && client.simulator) {
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
    // Play the sound effect
    const c = nextProps.data.clients ? nextProps.data.clients[0] : {};
    const oldClient = this.props.data.clients ? this.props.data.clients[0] : {};
    const { flight, simulator, station } = c;
    const {
      flight: oldFlight,
      simulator: oldSimulator,
      station: oldStation
    } = oldClient;
    if (
      flight &&
      simulator &&
      station &&
      !(oldFlight && oldSimulator && oldStation)
    ) {
      this.props.playSound({ url: "/sciences.ogg" });
    }
  }
  componentDidMount() {
    this.props.client.mutate({
      mutation: gql`
        mutation RegisterClient($client: ID!) {
          clientConnect(client: $client)
        }
      `,
      variables: { client: this.props.clientId }
    });
  }
  render() {
    let flight;
    let simulator;
    let station;
    let client = {};
    if (!this.props.data.loading && this.props.data.clients[0]) {
      client = this.props.data.clients[0];
      flight = client.flight;
      simulator = client.simulator;
      station = client.station;
    }
    return (
      <div>
        <Caching client={client} />
        {flight && simulator && station ? (
          <CardContainer
            flight={flight}
            simulator={simulator}
            station={station}
            client={client}
          />
        ) : (
          <Credits
            {...this.props}
            clientId={this.props.clientId}
            updateClientId={this.props.updateClientId}
          />
        )}
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
      caches
    }
  }
`;

const Client = withRouter(
  graphql(ClientQuery, {
    options: ownProps => ({
      variables: {
        clientId: ownProps.clientId
      }
    })
  })(withApollo(playSound(ClientView)))
);
