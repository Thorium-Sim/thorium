import React from "react";
import Layouts from "../layouts";
import Keyboard from "components/views/Keyboard";
import InterfaceCard from "components/views/Interfaces";
import ActionsMixin from "../generic/Actions";
import Alerts from "../generic/Alerts";
import SoundPlayer from "./soundPlayer";
import Reset from "./reset";
import TrainingPlayer from "helpers/trainingPlayer";
import {subscribe, publish} from "../../helpers/pubsub";
import {useMutation} from "react-apollo";
import gql from "graphql-tag.macro";
import {playSound} from "../generic/SoundPlayer";
import {randomFromList} from "helpers/randomFromList";
import styled from "styled-components";
const Blackout = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10000;
  background-color: black;
  *,
  & ~ * {
    display: none;
  }
`;
const CardRenderer = props => {
  const {simulator, station, flight, client, card, changeCard} = props;
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

export function isMedia(src = "") {
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
    ".mpeg",
  ];
  return extensions.find(e => src.toLowerCase().indexOf(e) > -1);
}

const SET_TRAINING_MUTATION = gql`
  mutation ClientSetTraining($id: ID!, $training: Boolean!) {
    clientSetTraining(client: $id, training: $training)
  }
`;

const CHANGE_CARD_MUTATION = gql`
  mutation SetCard($id: ID!, $card: String!) {
    clientSetCard(id: $id, card: $card)
  }
`;

const CardFrame = props => {
  const {
    station: {cards, widgets, training: stationTraining},
    station,
    simulator,
    simulator: {soundEffects, caps, flipped, training: simTraining},
    client,
  } = props;
  const cardChanged = React.useRef(false);
  const [visible, setVisible] = React.useState(false);
  const cardName = client?.currentCard?.name;
  React.useEffect(() => {
    setTimeout(() => setVisible(true), 500);
  }, []);
  const [changeCardMutation] = useMutation(CHANGE_CARD_MUTATION);
  const changeCard = React.useCallback(
    name => {
      const card = cards.find(c => c.name === name) ? name : cards?.[0]?.name;
      if (cardChanged.current || cardName === card) return;
      cardChanged.current = true;
      setTimeout(() => (cardChanged.current = false), 500);
      if (soundEffects?.cardChange) {
        playSound({
          url: `/assets${randomFromList(soundEffects.cardChange)}`,
        });
      }
      changeCardMutation({variables: {id: client.id, card: name}});
    },
    [cards, changeCardMutation, cardName, client.id, soundEffects],
  );

  React.useEffect(() => {
    return subscribe("cardChangeRequest", payload => {
      // Searching in order of priority, find a matching card by component (card
      // names may have been changed to protect the innocent) then change to that card's name.
      let found = false;
      for (let i = 0; i < payload.changeToCard.length; i++) {
        let matchingCard = cards.find(
          c => c.component === payload.changeToCard[i],
        );
        if (matchingCard) {
          changeCard(matchingCard.name);
          found = true;
          break;
        }
      }
      if (!found) {
        const widgetName = payload.changeToCard.find(c => widgets.includes(c));
        if (widgetName) {
          publish("widgetOpen", widgetName);
        }
      }
    });
  }, [cards, changeCard, widgets]);

  const [stopTraining] = useMutation(SET_TRAINING_MUTATION, {
    variables: {
      id: client.id,
      training: false,
    },
  });
  return (
    <div
      className={`client-container ${caps ? "all-caps" : ""} ${
        flipped ? "client-flipped" : ""
      } ${visible ? "visible" : ""}`}
    >
      <ActionsMixin {...props} changeCard={changeCard} />
      {client.cracked && <div className="cracked-screen" />}
      <CardRenderer
        {...props}
        card={client.currentCard.name}
        changeCard={changeCard}
        client={{
          ...client,
          training:
            simTraining && stationTraining && isMedia(stationTraining)
              ? false
              : client.training,
        }}
      />
      {client && <Reset station={station} clientId={client.id} />}
      {simTraining &&
        stationTraining &&
        client.training &&
        isMedia(stationTraining) && (
          <TrainingPlayer
            src={`/assets${stationTraining}`}
            close={stopTraining}
          />
        )}
      {client.offlineState !== "blackout" && (
        <Alerts
          key={`alerts-${simulator ? simulator.id : "simulator"}-${
            station ? station.name : "station"
          }`}
          simulator={simulator}
          station={station}
        />
      )}
    </div>
  );
};

export default CardFrame;
