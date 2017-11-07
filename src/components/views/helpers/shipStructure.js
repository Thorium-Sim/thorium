import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export const DeckDropdown = ({
  allDecks,
  selectedDeck,
  decks,
  setSelected,
  disabled
}) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle block caret disabled={disabled}>
        {selectedDeck
          ? decks.find(d => d.id === selectedDeck)
            ? `Deck ${decks.find(d => d.id === selectedDeck).number}`
            : "All Decks"
          : "Select Deck"}
      </DropdownToggle>
      <DropdownMenu style={{ maxHeight: "200px", overflowY: "scroll" }}>
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
            console.log(a.number, b.number);
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
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export const RoomDropdown = ({
  selectedDeck,
  otherSelected,
  selectedRoom,
  decks,
  setSelected,
  disabled
}) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle block caret disabled={disabled}>
        {selectedRoom
          ? decks
              .find(d => d.id === selectedDeck)
              .rooms.find(r => r.id === selectedRoom).name
          : "Select Room"}
      </DropdownToggle>
      {selectedDeck && (
        <DropdownMenu style={{ maxHeight: "200px", overflowY: "scroll" }}>
          <DropdownItem header>
            {decks.find(d => d.id === selectedDeck)
              ? `Deck ${decks.find(d => d.id === selectedDeck).number}`
              : "All Decks"}
          </DropdownItem>
          {decks.find(d => d.id === selectedDeck) &&
            decks.find(d => d.id === selectedDeck).rooms.map(r => (
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
