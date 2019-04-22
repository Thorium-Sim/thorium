import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import { DeckDropdown, RoomDropdown } from "helpers/shipStructure";

const DeckSelect = props => {
  const { simulatorId, onChange, value, deckOnly } = props;
  return (
    <Query
      query={gql`
        query Decks($simulatorId: ID!) {
          decks(simulatorId: $simulatorId) {
            id
            number
            rooms {
              id
              name
            }
          }
        }
      `}
      variables={{
        simulatorId
      }}
    >
      {({ loading, data }) => {
        if (loading) return <p>Loading...</p>;
        let deck = null;
        const room = data.decks.reduce((prev, next) => {
          if (prev) return prev;
          if (deck) return prev;
          if (next.id === value) {
            deck = next.id;
            return null;
          }
          const foundRoom = next.rooms.find(r => r.id === value);
          if (foundRoom) {
            deck = next.id;
            return foundRoom.id;
          }
          return null;
        }, null);
        return (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            <DeckDropdown
              allDecks
              selectedDeck={deck}
              decks={data.decks}
              size="sm"
              setSelected={a => onChange(a.deck)}
            />
            {!deckOnly && (
              <RoomDropdown
                selectedDeck={deck}
                selectedRoom={room}
                size="sm"
                decks={data.decks}
                disabled={!deck}
                setSelected={a => onChange(a.room)}
              />
            )}
          </div>
        );
      }}
    </Query>
  );
};

export default DeckSelect;
