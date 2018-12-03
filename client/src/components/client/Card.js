import React, { Component } from "react";
import Layouts from "../layouts";
import Keyboard from "components/views/Keyboard";
import ActionsMixin from "../generic/Actions";
import Alerts from "../generic/Alerts";
import SoundPlayer from "./soundPlayer";
import Reset from "./reset";
import TrainingPlayer from "helpers/trainingPlayer";
import { subscribe } from "../../helpers/pubsub";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const Blackout = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 10000,
        backgroundColor: "black"
      }}
    />
  );
};

const CardRenderer = props => {
  const { simulator, station, flight, client, card, changeCard } = props.test
    ? {
        simulator: {
          id: "test",
          name: "Test",
          alertLevel: "5",
          layout: "LayoutShipStation",
          assets: {
            mesh: "/Simulator/default/mesh.obj",
            texture: "/Simulator/default/texture.jpg",
            side: "/Simulator/default/side.png",
            top: "/Simulator/default/top.png",
            logo: "/Simulator/default/logo.svg"
          }
        },
        assets: {
          mesh: "/Simulator/default/mesh.obj",
          texture: "/Simulator/default/texture.jpg",
          side: "/Simulator/default/side.png",
          top: "/Simulator/default/top.png",
          logo: "/Simulator/default/logo.svg"
        },
        station: {
          name: "Test",
          widgets: [
            "keyboard",
            "composer",
            "objectives",
            "calculator",
            "remote",
            "messages",
            "officerLog",
            "damageReport"
          ],
          cards: [
            {
              id: "test",
              name: "Test",
              component: props.component || "Navigation"
            }
          ]
        },
        flight: { id: "test" },
        client: { loginState: "login", loginName: "Test", id: "test" },
        card: "Test"
      }
    : props;
  const layoutName =
    client.layout || station.layout || simulator.layout || "LayoutCorners";

  let LayoutComponent = Layouts[layoutName] || Layouts.LayoutDefault;
  if (station.name === "Viewscreen") {
    LayoutComponent = Layouts[layoutName + "Viewscreen"] || LayoutComponent;
  }
  if (client.offlineState === "blackout" || station.name === "Blackout") {
    return (
      <Blackout clientObj={client} station={station} simulator={simulator} />
    );
  }
  if (station.name.match(/keyboard:.{8}-.{4}-.{4}-.{4}-.{12}/gi)) {
    return (
      <Keyboard
        keyboard={station.name.replace("keyboard:", "")}
        simulator={simulator}
      />
    );
  }
  if (station.name === "Sound") {
    return <SoundPlayer simulator={simulator} />;
  }
  return (
    <LayoutComponent
      clientObj={client}
      flight={flight}
      simulator={simulator}
      station={station}
      cardName={card}
      changeCard={changeCard}
    />
  );
};

function isMedia(src = "") {
  console.log(src);
  const extensions = [
    ".wav",
    ".mp4",
    ".mp3",
    ".mov",
    ".ogg",
    ".ogv",
    ".aac",
    ".m4a",
    ".m4v",
    ".webm",
    ".mpg",
    ".mpeg"
  ];
  return extensions.find(e => src.toLowerCase().indexOf(e) > -1);
}
export default class CardFrame extends Component {
  constructor(props) {
    super(props);
    if (props.test) {
      this.state = {
        card: "Test"
      };
    } else {
      this.state = {
        card: this.props.station.cards && this.props.station.cards[0].name
      };
    }
  }
  componentDidMount() {
    this.cardChangeRequestSubscription =
    subscribe("cardChangeRequest", payload => {
      // Searching in order of priority, find a matching card by component (card
      // names may have been changed to protect the innocent) then change to that card's name.
      let found = false;
      for(let i=0; i<payload.changeToCard.length; i++) {
        let matchingCard = this.props.station.cards.find(c => c.component === payload.changeToCard[i]);
        if(matchingCard) {
          this.changeCard(matchingCard.name);
          found = true;
          break;
        }
      }
      if(!found) {
        // TODO: See if we can open a relevant widget instead
      }
    });
  }
  componentWillUnmount() {
    // Unsubscribe
    this.cardChangeRequestSubscription();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.station.name !== this.props.station.name) {
      this.setState({
        card: this.props.station.cards && this.props.station.cards[0].name
      });
    }
  }
  changeCard = name => {
    const card = this.props.station.cards.find(c => c.name === name)
      ? name
      : this.props.station.cards && this.props.station.cards[0].name;
    if (this.cardChanged || this.state.card === card) return;
    this.cardChanged = true;
    setTimeout(() => (this.cardChanged = false), 500);
    this.setState({
      card
    });
  };
  render() {
    const {
      station: { training: stationTraining },
      simulator: { caps, training: simTraining },
      client
    } = this.props;
    return (
      <div className={caps ? "all-caps" : ""}>
        <ActionsMixin {...this.props} changeCard={this.changeCard}>
          <CardRenderer
            {...this.props}
            card={this.state.card}
            changeCard={this.changeCard}
            client={{
              ...client,
              training:
                simTraining && stationTraining && isMedia(stationTraining)
                  ? false
                  : client.training
            }}
          />
          {this.props.client && (
            <Reset
              station={this.props.station}
              clientId={this.props.client.id}
              reset={() =>
                this.setState({ card: this.props.station.cards[0].name })
              }
            />
          )}
          {simTraining &&
            stationTraining &&
            client.training &&
            isMedia(stationTraining) && (
              <Mutation
                mutation={gql`
                  mutation ClientSetTraining($id: ID!, $training: Boolean!) {
                    clientSetTraining(client: $id, training: $training)
                  }
                `}
                variables={{
                  id: client.id,
                  training: false
                }}
              >
                {action => (
                  <TrainingPlayer
                    src={`/assets${stationTraining}`}
                    close={action}
                  />
                )}
              </Mutation>
            )}
          <Alerts
            key={`alerts-${
              this.props.simulator ? this.props.simulator.id : "simulator"
            }-${this.props.station ? this.props.station.name : "station"}`}
            ref="alert-widget"
            simulator={this.props.simulator}
            station={this.props.station}
          />
        </ActionsMixin>
      </div>
    );
  }
}
