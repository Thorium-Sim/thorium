import React, { Component } from "react";
import Layouts from "../layouts";
import Keyboard from "components/views/Keyboard";
import InterfaceCard from "components/views/Interfaces";
import ActionsMixin from "../generic/Actions";
import Alerts from "../generic/Alerts";
import SoundPlayer from "./soundPlayer";
import Reset from "./reset";
import TrainingPlayer from "helpers/trainingPlayer";
import { subscribe, publish } from "../../helpers/pubsub";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

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

  let LayoutComponent = Layouts[layoutName] || Layouts.LayoutCorners;
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
        clientObj={client}
      />
    );
  }
  if (station.name.match(/interface-id:.{8}-.{4}-.{4}-.{4}-.{12}/gi)) {
    return (
      <InterfaceCard
        interfaceId={station.name.replace("interface-id:", "")}
        simulator={simulator}
      />
    );
  }
  if (station.name === "Sound") {
    return <SoundPlayer clientObj={client} simulator={simulator} />;
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
    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);
    this.cardChangeRequestSubscription = subscribe(
      "cardChangeRequest",
      payload => {
        // Searching in order of priority, find a matching card by component (card
        // names may have been changed to protect the innocent) then change to that card's name.
        let found = false;
        for (let i = 0; i < payload.changeToCard.length; i++) {
          let matchingCard = this.props.station.cards.find(
            c => c.component === payload.changeToCard[i]
          );
          if (matchingCard) {
            this.changeCard(matchingCard.name);
            found = true;
            break;
          }
        }
        if (!found) {
          const widgetName = payload.changeToCard.find(c =>
            this.props.station.widgets.includes(c)
          );
          if (widgetName) {
            publish("widgetOpen", widgetName);
          }
        }
      }
    );
  }
  componentWillUnmount() {
    // Unsubscribe
    this.cardChangeRequestSubscription();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.station.name !== this.props.station.name) {
      this.setState({
        card:
          this.props.station.cards &&
          this.props.station.cards[0] &&
          this.props.station.cards[0].name
      });
    }
  }
  changeCard = name => {
    const card = this.props.station.cards.find(c => c.name === name)
      ? name
      : this.props.station.cards &&
        this.props.station.cards[0] &&
        this.props.station.cards[0].name;
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
    const { visible } = this.state;

    return (
      <div
        className={`client-container ${caps ? "all-caps" : ""} ${
          visible ? "visible" : ""
        }`}
      >
        <ActionsMixin {...this.props} changeCard={this.changeCard} />
        {client.cracked && <div className="cracked-screen" />}
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
              this.setState({
                card:
                  this.props.station.cards &&
                  this.props.station.cards[0] &&
                  this.props.station.cards[0].name
              })
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
        {client.offlineState !== "blackout" && (
          <Alerts
            key={`alerts-${
              this.props.simulator ? this.props.simulator.id : "simulator"
            }-${this.props.station ? this.props.station.name : "station"}`}
            ref="alert-widget"
            simulator={this.props.simulator}
            station={this.props.station}
          />
        )}
      </div>
    );
  }
}
