import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "helpers/reactstrap";

const deckLabel = (selectedDeck, decks) => {
  if (selectedDeck) {
    if (decks.find(d => d.id === selectedDeck)) {
      return `Deck ${decks.find(d => d.id === selectedDeck).number}`;
    }
    return selectedDeck;
  }
  return "Select Deck";
};

export const DeckDropdown = ({
  allDecks,
  selectedDeck,
  decks,
  setSelected,
  disabled,
  children,
  size
}) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle block caret disabled={disabled} size={size}>
        {deckLabel(selectedDeck, decks)}
      </DropdownToggle>
      <DropdownMenu style={{ maxHeight: "200px", overflowY: "auto" }}>
        {allDecks && (
          <DropdownItem
            onClick={() => {
              setSelected({ deck: "All Decks", room: null });
            }}
          >{`All Decks`}</DropdownItem>
        )}
        {decks
          .concat()
          .sort((a, b) => {
            if (a.number < b.number) return -1;
            if (b.number < a.number) return 1;
            return 0;
          })
          .map(d => (
            <DropdownItem
              key={d.id}
              onClick={() => {
                setSelected({ deck: d.id, room: null });
              }}
            >{`Deck ${d.number}`}</DropdownItem>
          ))}
        {children && <DropdownItem divider />}
        {children}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

function selectRoomLabel(selectedRoom, selectedDeck, decks) {
  if (!selectedRoom) return "Select Room";
  const deck = decks.find(d => d.id === selectedDeck);
  if (!deck) return "Select Room";

  const room = deck.rooms.find(r => r.id === selectedRoom);
  if (!room) return "Select Room";
  return room.name;
}
export const RoomDropdown = ({
  selectedDeck,
  otherSelected,
  selectedRoom,
  decks,
  setSelected,
  disabled,
  size
}) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle block caret disabled={disabled} size={size}>
        {selectRoomLabel(selectedRoom, selectedDeck, decks)}
      </DropdownToggle>
      {selectedDeck && (
        <DropdownMenu style={{ maxHeight: "200px", overflowY: "auto" }}>
          <DropdownItem header>
            {decks.find(d => d.id === selectedDeck)
              ? `Deck ${decks.find(d => d.id === selectedDeck).number}`
              : "All Decks"}
          </DropdownItem>
          {decks.find(d => d.id === selectedDeck) &&
            decks
              .find(d => d.id === selectedDeck)
              .rooms.map(r => (
                <DropdownItem
                  key={r.id}
                  disabled={r.id === otherSelected}
                  onClick={() => {
                    setSelected({ room: r.id });
                  }}
                >
                  {r.name}
                </DropdownItem>
              ))}
        </DropdownMenu>
      )}
    </UncontrolledDropdown>
  );
};
